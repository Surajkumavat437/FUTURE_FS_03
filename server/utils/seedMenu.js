require("dotenv").config({ path: "../.env" });
const connectDB = require("../config/db");
const MenuItems = require("../models/MenuItems");

const seedMenu = async () => {
  try {
    await connectDB();

    console.log("Purging old menu data...");
    await MenuItems.deleteMany();

    // Optimization string: 1200px width, 80% quality, automatic modern format (WebP)
    const HD_OPT = "auto=format&fit=crop&w=600&q=60";

    const fixedItems = [
      { 
        name: "Signature Espresso", 
        price: 120, 
        category: "Coffee", 
        description: "A complex double shot with notes of dark chocolate and citrus.", 
        image: `https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?${HD_OPT}`, 
        inStock: true 
      },
      { 
        name: "Macchiato Nitro", 
        price: 170, 
        category: "Coffee", 
        description: "Aerated nitro coffee topped with a dollop of dense cream.", 
        image: `https://images.unsplash.com/photo-1485808191679-5f86510681a2?${HD_OPT}`, 
        inStock: true 
      },
      { 
        name: "Spanish Latte", 
        price: 175, 
        category: "Coffee", 
        description: "Sweetened condensed milk mixed with our signature dark roast.", 
        image: `https://images.unsplash.com/photo-1541167760496-1628856ab772?${HD_OPT}`, 
        inStock: true 
      },
      { 
        name: "Lemon Meringue", 
        price: 210, 
        category: "Desserts", 
        description: "Zesty lemon curd topped with toasted marshmallow fluff.", 
        image: `https://images.unsplash.com/photo-1519915028121-7d3463d20b13?${HD_OPT}`, 
        inStock: true 
      }
    ];

    const workingItems = [
      // Coffee
      { name: "Velvet Cappuccino", price: 150, category: "Coffee", description: "Traditional 6oz pour with silky micro-foam and cocoa dust.", image: `https://images.unsplash.com/photo-1534778101976-62847782c213?${HD_OPT}`, inStock: true },
      { name: "Artisan Latte", price: 160, category: "Coffee", description: "Smooth espresso balanced with gently steamed local organic milk.", image: `https://images.pexels.com/photos/13510336/pexels-photo-13510336.jpeg?${HD_OPT}`, inStock: true },
      { name: "Flat White", price: 155, category: "Coffee", description: "Ristretto shots topped with a thin layer of velvety milk.", image: `https://images.pexels.com/photos/29179909/pexels-photo-29179909.jpeg?${HD_OPT}`, inStock: true },
      { name: "Cold Brew Reserve", price: 180, category: "Coffee", description: "18-hour steep Ethiopian beans served over a crystal clear ice sphere.", image: `https://images.unsplash.com/photo-1517701604599-bb29b565090c?${HD_OPT}`, inStock: true },
      { name: "Cortado", price: 140, category: "Coffee", description: "Equal parts espresso and warm milk for a bold yet smooth finish.", image: `https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?${HD_OPT}`, inStock: true },
      { name: "Affogato", price: 190, category: "Coffee", description: "Madagascar vanilla bean gelato drowned in a hot espresso shot.", image: `https://images.pexels.com/photos/33144564/pexels-photo-33144564.jpeg?${HD_OPT}`, inStock: true },
      { name: "Melted Mocha", price: 185, category: "Coffee", description: "70% Dark Ecuadorian chocolate melted into a creamy latte.", image: `https://images.pexels.com/photos/3504556/pexels-photo-3504556.jpeg?${HD_OPT}`, inStock: true },

      // Tea
      { name: "Ceremonial Matcha", price: 210, category: "Tea", description: "Stone-ground Japanese matcha whisked into a vibrant, creamy tea.", image: `https://images.unsplash.com/photo-1515823064-d6e0c04616a7?${HD_OPT}`, inStock: true },
      { name: "Earl Grey Reserve", price: 140, category: "Tea", description: "Black tea infused with pure bergamot oil and blue cornflowers.", image: `https://images.pexels.com/photos/34964937/pexels-photo-34964937.jpeg?${HD_OPT}`, inStock: true },
      { name: "Moroccan Mint", price: 130, category: "Tea", description: "Gunpowder green tea steeped with fresh garden mint leaves.", image: `https://images.pexels.com/photos/30906050/pexels-photo-30906050.jpeg?${HD_OPT}`, inStock: true },
      { name: "Hibiscus Glow", price: 150, category: "Tea", description: "Tart and floral crimson tea served hot or iced.", image: `https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?${HD_OPT}`, inStock: true },
      { name: "Oolong Supreme", price: 180, category: "Tea", description: "Semi-oxidized tea with notes of honey and roasted nuts.", image: `https://images.unsplash.com/photo-1576092768241-dec231879fc3?${HD_OPT}`, inStock: true },
      { name: "Masala Chai", price: 160, category: "Tea", description: "Strong black tea brewed with ginger, cardamom, and cinnamon.", image: `https://images.unsplash.com/photo-1571934811356-5cc061b6821f?${HD_OPT}`, inStock: true },
      { name: "Jasmine Pearl", price: 200, category: "Tea", description: "Hand-rolled tea pearls that bloom into a floral masterpiece.", image: `https://images.unsplash.com/photo-1597481499750-3e6b22637e12?${HD_OPT}`, inStock: true },
      { name: "Chamomile Zen", price: 140, category: "Tea", description: "Pure whole-flower chamomile for a soothing, caffeine-free rest.", image: `https://images.pexels.com/photos/6150659/pexels-photo-6150659.jpeg?${HD_OPT}`, inStock: true },
      { name: "Golden Turmeric", price: 190, category: "Tea", description: "Anti-inflammatory blend of turmeric, ginger, and black pepper.", image: `https://images.pexels.com/photos/9928286/pexels-photo-9928286.jpeg?${HD_OPT}`, inStock: true },
      { name: "Iced Peach White", price: 170, category: "Tea", description: "Delicate white tea cold-infused with fresh white peach slices.", image: `https://images.unsplash.com/photo-1556679343-c7306c1976bc?${HD_OPT}`, inStock: true },

      // Drinks
      { name: "Blueberry Fizz", price: 190, category: "Drinks", description: "Fresh blueberries muddled with sparkling water and lime.", image: `https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?${HD_OPT}`, inStock: true },
      { name: "Passionfruit Mojito", price: 210, category: "Drinks", description: "Non-alcoholic mojito with tart passionfruit and fresh mint.", image: `https://images.pexels.com/photos/7259052/pexels-photo-7259052.jpeg?${HD_OPT}`, inStock: true },
      { name: "Elderflower Tonic", price: 180, category: "Drinks", description: "Botanical elderflower syrup paired with premium tonic water.", image: `https://images.unsplash.com/photo-1556881286-fc6915169721?${HD_OPT}`, inStock: true },
      { name: "Cold Pressed Orange", price: 160, category: "Drinks", description: "100% Pure Valencia oranges, squeezed daily.", image: `https://images.unsplash.com/photo-1613478223719-2ab802602423?${HD_OPT}`, inStock: true },
      { name: "Pink Lemonade", price: 150, category: "Drinks", description: "Homemade lemonade infused with fresh strawberry purée.", image: `https://images.pexels.com/photos/28261727/pexels-photo-28261727.jpeg?${HD_OPT}`, inStock: true },
      { name: "Cucumber Cooler", price: 170, category: "Drinks", description: "Refreshing blend of cucumber, basil, and sparkling water.", image: `https://images.pexels.com/photos/5335918/pexels-photo-5335918.jpeg?${HD_OPT}`, inStock: true },
      { name: "Green Detox Juice", price: 220, category: "Drinks", description: "Kale, spinach, green apple, and celery cold-press blend.", image: `https://images.pexels.com/photos/17612827/pexels-photo-17612827.jpeg?${HD_OPT}`, inStock: true },
      { name: "Salted Caramel Shake", price: 250, category: "Drinks", description: "Thick vanilla milkshake swirled with sea salt caramel.", image: `https://images.unsplash.com/photo-1572490122747-3968b75cc699?${HD_OPT}`, inStock: true },
      { name: "Ginger Beer Brew", price: 165, category: "Drinks", description: "Naturally fermented ginger with a spicy kick.", image: `https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?${HD_OPT}`, inStock: true },
      { name: "Sparkling Rosé Tea", price: 230, category: "Drinks", description: "Effervescent white tea with hints of rose and strawberry.", image: `https://images.pexels.com/photos/34717263/pexels-photo-34717263.jpeg?${HD_OPT}`, inStock: true },

      // Snacks
      { name: "Truffle Fries", price: 180, category: "Snacks", description: "Golden fries tossed in white truffle oil and parmesan.", image: `https://images.pexels.com/photos/31806278/pexels-photo-31806278.jpeg?${HD_OPT}`, inStock: true },
      { name: "Avocado Crostini", price: 210, category: "Snacks", description: "Sourdough toast topped with smashed avocado and chili flakes.", image: `https://images.pexels.com/photos/30770319/pexels-photo-30770319.jpeg?${HD_OPT}`, inStock: true },
      { name: "Spiced Hummus", price: 195, category: "Snacks", description: "Creamy chickpea dip served with warm garlic pita.", image: `https://images.pexels.com/photos/5852249/pexels-photo-5852249.jpeg?${HD_OPT}`, inStock: true },
      { name: "Calamari Fritti", price: 280, category: "Snacks", description: "Lightly battered squid served with lemon aioli.", image: `https://images.pexels.com/photos/32179490/pexels-photo-32179490.jpeg?${HD_OPT}`, inStock: true },
      { name: "Caprese Sliders", price: 240, category: "Snacks", description: "Mini brioche buns with buffalo mozzarella and pesto.", image: `https://images.unsplash.com/photo-1521305916504-4a1121188589?${HD_OPT}`, inStock: true },
      { name: "Sweet Potato Wedges", price: 160, category: "Snacks", description: "Hand-cut wedges served with a spicy chipotle dip.", image: `https://images.unsplash.com/photo-1623238913973-21e45cced554?${HD_OPT}`, inStock: true },
      { name: "Gyoza Selection", price: 260, category: "Snacks", description: "Pan-seared vegetable dumplings with ginger soy dip.", image: `https://images.unsplash.com/photo-1496116218417-1a781b1c416c?${HD_OPT}`, inStock: true },
      { name: "Cheese Platter", price: 450, category: "Snacks", description: "Selection of three artisan cheeses with fig jam and crackers.", image: `https://images.pexels.com/photos/20351653/pexels-photo-20351653.jpeg?${HD_OPT}`, inStock: true },
      { name: "Garlic Edamame", price: 150, category: "Snacks", description: "Steamed soybeans tossed in roasted garlic and sea salt.", image: `https://images.pexels.com/photos/11073466/pexels-photo-11073466.jpeg?${HD_OPT}`, inStock: true },
      { name: "Mini Tacos", price: 220, category: "Snacks", description: "Crispy mini corn shells with black bean salsa.", image: `https://images.unsplash.com/photo-1565299585323-38d6b0865b47?${HD_OPT}`, inStock: true },

      // Meals
      { name: "Atelier Burger", price: 420, category: "Meals", description: "Wagyu beef patty with caramelized onions on brioche.", image: `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?${HD_OPT}`, inStock: true },
      { name: "Wild Mushroom Pasta", price: 380, category: "Meals", description: "Pappardelle tossed with porcini mushrooms and truffle cream.", image: `https://images.unsplash.com/photo-1473093226795-af9932fe5856?${HD_OPT}`, inStock: true },
      { name: "Quinoa Power Bowl", price: 350, category: "Meals", description: "Roasted veggies, kale, and avocado over organic quinoa.", image: `https://images.unsplash.com/photo-1512621776951-a57141f2eefd?${HD_OPT}`, inStock: true },
      { name: "Atlantic Salmon", price: 580, category: "Meals", description: "Pan-seared salmon with asparagus and lemon butter.", image: `https://images.unsplash.com/photo-1467003909585-2f8a72700288?${HD_OPT}`, inStock: true },
      { name: "Thai Green Curry", price: 390, category: "Meals", description: "Spicy coconut curry with bamboo shoots and jasmine rice.", image: `https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?${HD_OPT}`, inStock: true },
      { name: "Grilled Ribeye", price: 850, category: "Meals", description: "250g Prime ribeye served with rosemary potatoes.", image: `https://images.unsplash.com/photo-1544025162-d76694265947?${HD_OPT}`, inStock: true },
      { name: "Garden Risotto", price: 360, category: "Meals", description: "Creamy Arborio rice with spring peas and mint.", image: `https://images.unsplash.com/photo-1476124369491-e7addf5db371?${HD_OPT}`, inStock: true },
      { name: "Chicken Schnitzel", price: 410, category: "Meals", description: "Crispy panko-breaded chicken with warm potato salad.", image: `https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?${HD_OPT}`, inStock: true },
      { name: "Falafel Platter", price: 340, category: "Meals", description: "Handmade falafel, tabbouleh, and beet hummus.", image: `https://images.pexels.com/photos/28992227/pexels-photo-28992227.jpeg?${HD_OPT}`, inStock: true },
      { name: "Prawn Linguine", price: 460, category: "Meals", description: "King prawns with garlic, chili, and white wine sauce.", image: `https://images.unsplash.com/photo-1563379926898-05f4575a45d8?${HD_OPT}`, inStock: true },

      // Desserts
      { name: "Molten Lava Cake", price: 260, category: "Desserts", description: "Warm chocolate center served with hazelnut gelato.", image: `https://images.unsplash.com/photo-1606313564200-e75d5e30476c?${HD_OPT}`, inStock: true },
      { name: "Berry Cheesecake", price: 240, category: "Desserts", description: "New York style with a wild berry reduction.", image: `https://images.unsplash.com/photo-1533134242443-d4fd215305ad?${HD_OPT}`, inStock: true },
      { name: "Tiramisu Moderno", price: 280, category: "Desserts", description: "Coffee-soaked ladyfingers with whipped mascarpone.", image: `https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?${HD_OPT}`, inStock: true },
      { name: "Apple Galette", price: 220, category: "Desserts", description: "Rustic pastry with spiced apples and salted caramel.", image: `https://images.unsplash.com/photo-1519915028121-7d3463d20b13?${HD_OPT}`, inStock: true },
      { name: "Pistachio Baklava", price: 230, category: "Desserts", description: "Layered filo pastry with crushed nuts and honey syrup.", image: `https://images.pexels.com/photos/31472815/pexels-photo-31472815.jpeg?${HD_OPT}`, inStock: true },
      { name: "Macaron Trio", price: 190, category: "Desserts", description: "Assorted French macarons: Rose, Pistachio, and Vanilla.", image: `https://images.pexels.com/photos/32689629/pexels-photo-32689629.jpeg?${HD_OPT}`, inStock: true },
      { name: "Crème Brûlée", price: 250, category: "Desserts", description: "Classic vanilla custard with a burnt sugar crust.", image: `https://images.pexels.com/photos/5638511/pexels-photo-5638511.jpeg?${HD_OPT}`, inStock: true },
      { name: "Mango Sorbet", price: 180, category: "Desserts", description: "Refreshing 100% natural mango purée sorbet.", image: `https://images.pexels.com/photos/28525188/pexels-photo-28525188.jpeg?${HD_OPT}`, inStock: true },
      { name: "Dark Choco Mousse", price: 210, category: "Desserts", description: "Aired chocolate cream with a hint of sea salt.", image: `https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?${HD_OPT}`, inStock: true }
    ];

    const allItems = [...fixedItems, ...workingItems];
    await MenuItems.insertMany(allItems);
    
    console.log(`Success: Added ${fixedItems.length} fixed and ${workingItems.length} working items.`);
    process.exit();
  } catch (error) {
    console.error("Critical Error seeding data:", error.message);
    process.exit(1);
  }
};

seedMenu();