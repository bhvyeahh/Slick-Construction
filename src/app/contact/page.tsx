"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  // ── DATA STATE ──
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    bot_check: "", // Honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: "" });
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
      answer: "",
    });
    setCaptchaError(false);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptcha((prev) => ({ ...prev, answer: e.target.value }));
    setCaptchaError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
      setCaptchaError(true);
      return;
    }
    
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to send");
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "", bot_check: "" });
      generateCaptcha();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
    
      {/* Removed font-sans to let your global theme take over */}
      <main ref={mainRef} className="w-full bg-[#FFFFFF] text-[#1A1A1A] min-h-screen">
        <section className="pt-40 pb-24 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto min-h-[80vh] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* ── LEFT: Content ── */}
            <div className="flex flex-col gap-10">
              <div className="reveal-item">
                <span className="text-[#B8860B] text-[11px] font-bold uppercase tracking-[0.2em] mb-4 block">
                  Get in Touch
                </span>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-[#1A1A1A]">
                  We'll Respond <br /> Within Hours.
                </h1>
                <p className="text-gray-500 text-base leading-relaxed max-w-sm font-light">
                  Curated luxury construction and specialized remodels. Our team is ready to answer your inquiries.
                </p>
              </div>

              {/* Contact Info */}
              <div className="reveal-item flex flex-col gap-6">
                <div>
                  <p className="text-[#B8860B] text-[10px] uppercase tracking-widest font-bold mb-1">Direct Line</p>
                  <a href="tel:4159409199" className="text-lg font-medium hover:text-[#B8860B] transition-colors">(415) 940 9199</a>
                </div>
                <div>
                  <p className="text-[#B8860B] text-[10px] uppercase tracking-widest font-bold mb-1">Electronic Mail</p>
                  <a href="mailto:info@scsfinc.com" className="text-lg font-medium hover:text-[#B8860B] transition-colors">info@scsfinc.com</a>
                </div>
                <div>
                  <p className="text-[#B8860B] text-[10px] uppercase tracking-widest font-bold mb-1">Office Location</p>
                  <p className="text-lg font-medium text-[#1A1A1A]">1422 16th Ave, San Francisco, CA 94122, USA</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="reveal-item w-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="bot_check">Do not fill this out</label>
                  <input type="text" name="bot_check" id="bot_check" value={formData.bot_check} onChange={handleChange} tabIndex={-1} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    required 
                    name="name" 
                    placeholder="Name" 
                    onChange={handleChange} 
                    value={formData.name} 
                    className="bg-[#F8F8F8] border border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-[#B8860B] outline-none transition-all" 
                  />
                  <select 
                    required 
                    name="service" 
                    onChange={handleChange} 
                    value={formData.service} 
                    className="bg-[#F8F8F8] border border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-[#B8860B] outline-none transition-all text-gray-700"
                  >
                    <option value="" disabled>Select Service...</option>
                    <option value="Full Home Remodel">Full Home Remodel</option>
                    <option value="Kitchen Renovation">Kitchen Renovation</option>
                    <option value="Bathroom Remodel">Bathroom Remodel</option>
                    <option value="New Construction">New Construction</option>
                    <option value="Deck / Outdoor Living">Deck / Outdoor Living</option>
                    <option value="Other Inquiry">Other Inquiry</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    required 
                    name="email" 
                    type="email" 
                    placeholder="Email Address" 
                    onChange={handleChange} 
                    value={formData.email} 
                    className="bg-[#F8F8F8] border border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-[#B8860B] outline-none transition-all" 
                  />
                  <input 
                    required 
                    name="phone" 
                    type="tel" 
                    placeholder="Phone Number" 
                    onChange={handleChange} 
                    value={formData.phone} 
                    className="bg-[#F8F8F8] border border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-[#B8860B] outline-none transition-all" 
                  />
                </div>

                <textarea 
                  required 
                  name="message" 
                  rows={4} 
                  placeholder="Your Message" 
                  onChange={handleChange} 
                  value={formData.message} 
                  className="bg-[#F8F8F8] border border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-[#B8860B] outline-none transition-all resize-none" 
                />
                
                <div className="flex items-center justify-between bg-[#F8F8F8] border border-gray-200 px-4 py-3 rounded-sm">
                  <span className="text-xs text-gray-500 font-medium">Verify: {captcha.num1} + {captcha.num2} =</span>
                  <input 
                    required 
                    type="number" 
                    onChange={handleCaptchaChange} 
                    value={captcha.answer} 
                    className="w-16 bg-white border border-gray-200 text-center text-sm py-1 outline-none focus:border-[#B8860B]" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === "submitting" || status === "success"}
                  className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-[#B8860B] transition-colors disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                </button>

                {status === "success" && (
                  <p className="text-green-600 mt-2 text-xs font-bold text-center tracking-wide">
                    Message sent successfully.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-500 mt-2 text-xs font-bold text-center tracking-wide">
                    Failed to send. Please try again.
                  </p>
                )}
                {captchaError && (
                  <p className="text-red-500 mt-2 text-xs font-bold text-center tracking-wide">
                    Verification incorrect.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}