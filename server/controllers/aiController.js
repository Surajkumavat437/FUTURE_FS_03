const axios = require("axios");
const MenuItem = require("../models/MenuItems");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const HF_MODEL = process.env.HF_MODEL_NAME;
const ROUTER_URL = process.env.AI_URL || "https://openrouter.ai/api/v1";
const normalize = value => String(value || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const listText = values => (Array.isArray(values) ? values : []).join(" ");
const includesTerm = (text, term) => new RegExp(`(^|\\s)${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`, "i").test(normalize(text));

function getPreferences(history) {
  const text = history.filter(entry => entry.role === "user").map(entry => entry.content).join(" ").toLowerCase();
  const budgetText = text.replace(/[₹]/g, " ");
  const budgetMatch = budgetText.match(/(?:under|below|within|up to|max(?:imum)?|budget(?: of| is)?|rs\.?|inr\s*)(\s*)(\d[\d,]*(?:\.\d+)?)/i)
    || budgetText.match(/(\d[\d,]*(?:\.\d+)?)\s*(?:rupees|inr|rs\.?)/i);
  const budget = budgetMatch ? Number(budgetMatch[budgetMatch.length - 1].replace(/,/g, "")) : null;
  const allergies = [];
  const allergyText = text
    .replace(/\b(?:not|never|no longer)\s+allergic to\s+[^.!?;]+?(?=\bbut\b|[.!?;]|$)/g, " ")
    .replace(/\b(?:no|without|don't have|do not have)\s+(?:any\s+)?(?:known\s+)?allerg(?:y|ies)\b/g, " ");
  const allergyMatch = allergyText.match(/(?:allergic to|allerg(?:y|ies)\s+to)\s+([^.!?;]+)/i)
    || allergyText.match(/(?:have|has)\s+(?:an?\s+)?(.+?)\s+allerg(?:y|ies)\b/i)
    || allergyText.match(/allerg(?:y|ies)\s+(?:for|with)\s+([^.!?;]+)/i);
  if (allergyMatch) allergies.push(...allergyMatch[1].split(/,|\band\b|\bor\b/).map(value => normalize(value).replace(/^(i have|a|an|the|i am|i m)\s+/, "").replace(/\s+(allergy|allergies)$/, "")).filter(Boolean));
  const dietary = [];
  if (/\bvegan\b/.test(text)) dietary.push("vegan");
  if (/\bvegetarian\b|\bveg\b/.test(text)) dietary.push("vegetarian");
  if (/gluten[ -]?free|celiac|coeliac/.test(text)) dietary.push("gluten-free");
  if (/dairy[ -]?free|lactose[ -]?free/.test(text)) dietary.push("dairy-free");
  if (/\bhalal\b/.test(text)) dietary.push("halal");
  let caffeine = null;
  if (/\b(decaf|no caffeine|caffeine[ -]?free|without caffeine)\b/.test(text)) caffeine = "none";
  else if (/\b(low|less|little) caffeine\b/.test(text)) caffeine = "low";
  else if (/\b(high|strong|more) caffeine\b/.test(text)) caffeine = "high";
  return { text, budget: Number.isFinite(budget) ? budget : null, allergies, dietary, caffeine };
}

function getCandidates(menuItems, preferences) {
  return menuItems.filter(item => {
    if (preferences.budget !== null && item.price > preferences.budget) return false;
    const tags = normalize(listText(item.dietaryTags));
    if (preferences.dietary.includes("vegan") && !includesTerm(tags, "vegan")) return false;
    if (preferences.dietary.includes("vegetarian") && !["vegetarian", "vegan"].some(tag => includesTerm(tags, tag))) return false;
    if (preferences.dietary.includes("gluten-free") && !includesTerm(tags, "gluten free")) return false;
    if (preferences.dietary.includes("dairy-free") && !includesTerm(tags, "dairy free")) return false;
    if (preferences.dietary.includes("halal") && !includesTerm(tags, "halal")) return false;
    if (preferences.caffeine === "none" && item.caffeineLevel !== "none") return false;
    if (preferences.caffeine === "low" && !["none", "low"].includes(item.caffeineLevel)) return false;
    if (preferences.caffeine === "high" && item.caffeineLevel !== "high") return false;
    if (preferences.allergies.length) {
      if (!item.ingredientInfoComplete) return false;
      const declared = normalize(`${listText(item.allergens)} ${listText(item.ingredients)}`);
      if (preferences.allergies.some(allergy => {
        const allergen = normalize(allergy);
        return Boolean(declared) && (declared.includes(allergen) || allergen.includes(declared) && allergen.length > 2
          || allergen.split(" ").some(term => term.length > 3 && declared.split(" ").some(foodTerm => foodTerm.startsWith(term) || term.startsWith(foodTerm))));
      })) return false;
    }
    return true;
  });
}

const getMenuRecommendation = async (req, res) => {
  try {
    const rawMessage = req.body?.message;
    if (!rawMessage || (Array.isArray(rawMessage) && rawMessage.length === 0)) {
      return res.status(400).json({ success: false, message: "Conversation history is required" });
    }
    const history = Array.isArray(rawMessage) ? rawMessage.slice(-20) : [{ role: "user", content: rawMessage }];
    if (history.some(entry => !entry || !["user", "assistant"].includes(entry.role) || typeof entry.content !== "string" || entry.content.length > 2000)) {
      return res.status(400).json({ success: false, message: "Conversation messages must have a valid role and text content under 2,000 characters." });
    }

    const menuItems = await MenuItem.find({ isAvailable: true }).select("name price category image description ingredients allergens dietaryTags flavorNotes caffeineLevel crossContactNotes ingredientInfoComplete");
    const preferences = getPreferences(history);
    const wantsRecommendation = preferences.budget !== null || preferences.allergies.length > 0 || preferences.dietary.length > 0 || preferences.caffeine !== null
      || /\b(recommend|recommendation|suggest|looking for|in the mood for|craving|i like|i love|i prefer|something (?:sweet|bitter|fruity|chocolate|strong|light))\b/i.test(preferences.text);
    const candidates = getCandidates(menuItems, preferences);
    const latestUserMessage = [...history].reverse().find(entry => entry.role === "user")?.content || "";
    const addRequested = wantsRecommendation && /\b(add|put|place)\b.{0,50}\b(cart|bag|basket)\b|\b(cart|bag|basket)\b.{0,50}\b(add|put|place)\b|\b(add|put|place)\s+(it|that|those|them|the recommended item)\b/i.test(latestUserMessage);
    if (wantsRecommendation && !candidates.length) {
      const allergyNote = preferences.allergies.length ? " Because you mentioned an allergy, I only consider items with verified ingredient and allergen details; none currently meet that check. Please ask our staff about ingredients and cross-contact before ordering." : " I couldn't find an available item matching those preferences; you could adjust your budget or preferences.";
      return res.status(200).json({ success: true, reply: allergyNote.trim(), addRequested: false, recommendedItem: null });
    }

    // Choose the item deterministically after hard constraints; the model only writes its short menu-grounded reason.
    const flavorWords = normalize(preferences.text).split(/\s+/).filter(word => word.length > 3);
    const ranked = candidates.map(item => {
      const details = normalize(`${item.name} ${item.description} ${listText(item.flavorNotes)} ${listText(item.ingredients)}`);
      return { item, score: flavorWords.reduce((score, word) => score + (details.includes(word) ? 1 : 0), 0) };
    }).sort((a, b) => b.score - a.score || a.item.price - b.item.price);
    const selected = wantsRecommendation ? ranked[0]?.item : null;
    const safeHistory = history.filter(entry => entry.role !== "system");
    let reason = selected ? (selected.description || `${selected.category} option at ₹${selected.price}.`) : "I can help with menu ingredients, flavors, or preparation details. What would you like to know?";
    const apiToken = process.env.OPENROUTER_API_KEY || process.env.HF_API_TOKEN;
    if (apiToken && HF_MODEL) {
      try {
        const targetUrl = ROUTER_URL.includes("/v1/chat/completions") ? ROUTER_URL : `${ROUTER_URL}/v1/chat/completions`;
        const response = await axios.post(targetUrl, {
          model: HF_MODEL,
          messages: [
            { role: "system", content: selected
              ? `You are a cafe menu concierge. Recommend only this selected available item: ${JSON.stringify({ name: selected.name, price: selected.price, category: selected.category, description: selected.description, ingredients: selected.ingredients, dietaryTags: selected.dietaryTags, flavorNotes: selected.flavorNotes, caffeineLevel: selected.caffeineLevel })}. Explain briefly why it fits the user's stated preferences. Never invent menu facts or say any item is safe for an allergy. Keep to 1-2 sentences.`
              : `You are a helpful cafe concierge. Answer the user's question briefly using only this available menu data: ${JSON.stringify(menuItems.map(item => ({ name: item.name, price: item.price, category: item.category, description: item.description, ingredients: item.ingredients, allergens: item.allergens, dietaryTags: item.dietaryTags, flavorNotes: item.flavorNotes, caffeineLevel: item.caffeineLevel })))}. Never invent menu facts or say any item is safe for an allergy. If menu data does not answer the question, say so.` },
            ...safeHistory
          ], max_tokens: 180, temperature: 0.2
        }, { headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" }, timeout: 20000 });
        const content = response.data?.choices?.[0]?.message?.content;
        if (typeof content === "string" && content.trim()) reason = content.trim();
      } catch (error) {
        console.error("Concierge model unavailable; using menu description:", error.message);
      }
    }
    const allergyCaution = selected && preferences.allergies.length
      ? ` Allergy note: listed allergens are ${selected.allergens?.length ? selected.allergens.join(", ") : "none"}; ingredients: ${selected.ingredients?.length ? selected.ingredients.join(", ") : "not listed"}. Cross-contact is possible${selected.crossContactNotes ? ` (${selected.crossContactNotes})` : ""}. These details are not a safety guarantee; please confirm with staff before ordering.`
      : "";
    if (selected) {
      const selectedNamePattern = new RegExp(selected.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      if (!selectedNamePattern.test(reason)) reason = `${selected.name}: ${reason}`;
    }
    res.status(200).json({
      success: true,
      reply: `${reason}${allergyCaution}`,
      addRequested,
      recommendedItem: selected ? { _id: selected._id, name: selected.name, price: selected.price, category: selected.category, image: selected.image, description: selected.description, allergens: selected.allergens || [], ingredients: selected.ingredients || [], crossContactNotes: selected.crossContactNotes || "" } : null
    });
  } catch (error) {
    console.error("AI Controller Error Detail:", { message: error.message, status: error.response?.status, data: error.response?.data });
    res.status(500).json({ success: false, message: "The concierge could not complete this request. Please try again." });
  }
};

module.exports = { getMenuRecommendation };
