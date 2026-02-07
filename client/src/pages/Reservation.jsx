import { useState } from "react";
import { Utensils, Users, Calendar, Clock, Mail, Phone, User, ChevronRight } from "lucide-react";
import api from "../services/api";

/**
 * ATELIER FORM FIELD
 * Styled for elegance and focus.
 */
const FormField = ({ label, icon: Icon, name, type = "text", placeholder, errors, onChange, value, ...props }) => (
  <div className="space-y-2">
    <label className="text-[9px] uppercase tracking-[0.3em] text-[#344E41]/50 ml-4 font-black">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3B18A] group-focus-within:text-[#344E41] w-4 h-4 pointer-events-none z-10 transition-colors" />
      )}
      <input
        {...props}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full bg-[#FAF9F6] border ${
          errors[name] ? "border-red-400" : "border-[#344E41]/10"
        } rounded-[1.5rem] ${
          Icon ? "pl-12" : "px-6"
        } pr-6 py-4 text-[#344E41] font-serif italic focus:border-[#344E41] transition-all outline-none placeholder:text-[#344E41]/20`}
      />
    </div>
    {errors[name] && (
      <p className="text-red-500 text-[9px] ml-4 font-bold uppercase tracking-widest italic">
        {errors[name]}
      </p>
    )}
  </div>
);

const Reservation = () => {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    requests: "",
  });

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    const phoneRegex = /^[0-9+]{10}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter 10 digits";
    }
    if (!formData.date) newErrors.date = "Select a date";
    if (!formData.time) newErrors.time = "Select a time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");
    try {
      const response = await api.post("/reservations", formData);
      if (response.data.success) {
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#F4F1DE] flex items-center justify-center px-6 text-center">
        <div className="bg-[#344E41] p-16 rounded-[4rem] border border-[#A3B18A]/20 space-y-6 max-w-lg shadow-2xl animate-in zoom-in duration-700">
          <Utensils className="text-[#A3B18A] w-16 h-16 mx-auto mb-4" />
          <h3 className="text-4xl font-serif text-[#F4F1DE]">The message has been sent.</h3>
          <p className="text-[#F4F1DE]/70 font-serif italic">
           confirmation Pending, {formData.name.split(" ")[0]}. We'll contact you soon for the table confirmation.
          </p>
          <button 
            onClick={() => (window.location.href = "/")} 
            className="mt-8 px-10 py-4 bg-[#A3B18A] text-[#344E41] rounded-full uppercase text-[10px] font-black tracking-widest hover:bg-[#F4F1DE] transition-colors"
          >
            Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-32 pb-20 px-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#A3B18A] text-[10px] font-black uppercase tracking-[0.6em]">Reservations</span>
          <h1 className="text-6xl md:text-7xl font-serif text-[#344E41] leading-none">
            Join our <span className="italic font-light text-[#A3B18A]">Table.</span>
          </h1>
          <div className="h-px w-24 bg-[#344E41]/10 mx-auto mt-6"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#A3B18A] backdrop-blur-xl p-8 md:p-16 rounded-[4rem] border border-white shadow-[0_40px_100px_-20px_rgba(52,78,65,0.1)] space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              label="The Guest"
              name="name"
              icon={User}
              placeholder="Full Name"
              value={formData.name}
              errors={errors}
              onChange={handleChange}
            />
            <FormField
              label="Digital Address"
              name="email"
              type="email"
              icon={Mail}
              placeholder="email@example.com"
              value={formData.email}
              errors={errors}
              onChange={handleChange}
            />
            <FormField
              label="Direct Line"
              name="phone"
              icon={Phone}
              placeholder="Phone Number"
              value={formData.phone}
              errors={errors}
              onChange={handleChange}
            />

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] text-[#344E41]/50 ml-4 font-black">
                The Party
              </label>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3B18A] w-4 h-4 pointer-events-none z-10" />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#344E41]/10 rounded-[1.5rem] pl-12 pr-6 py-4 text-[#344E41] font-serif italic appearance-none focus:border-[#344E41] outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <FormField
              label="Selected Date"
              name="date"
              type="date"
              icon={Calendar}
              value={formData.date}
              errors={errors}
              onChange={handleChange}
            />
            <FormField
              label="Arrival Time"
              name="time"
              type="time"
              icon={Clock}
              value={formData.time}
              errors={errors}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-[0.3em] text-[#344E41]/50 ml-4 font-black">
              Special Notations
            </label>
            <textarea
              name="requests"
              rows="3"
              value={formData.requests}
              onChange={handleChange}
              className="w-full bg-[#FAF9F6] border border-[#344E41]/10 rounded-[2rem] p-8 text-[#344E41] font-serif italic resize-none focus:border-[#344E41] outline-none placeholder:text-[#344E41]/20"
              placeholder="Allergies, celebrations, or specific seating..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group w-full py-6 bg-[#344E41] text-[#F4F1DE] rounded-full text-xs font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-[#3E5C4D] transition-all active:scale-95 shadow-xl disabled:opacity-50"
          >
            {status === "sending" ? "Processing..." : "Confirm Invitation"}
            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <p className="mt-12 text-center text-[9px] uppercase tracking-[0.4em] text-[#344E41]/30 font-bold">
            Formal Attire Appreciated <span className="mx-4">•</span> Curating Moments
        </p>
      </div>
    </div>
  );
};

export default Reservation;