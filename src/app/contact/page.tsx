"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ArrowRight, Phone, Mail, MapPin, HardHat, ShieldAlert } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  // ── DATA STATE (Exact backend structure preserved) ──
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    bot_check: "", // Honeypot
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

const [workOrderId, setWorkOrderId] = useState("");
const [barcode, setBarcode] = useState<number[]>([]);
  // ── CAPTCHA STATE ──
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: "" });
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
  generateCaptcha();

  setWorkOrderId(`${Math.floor(Math.random() * 90000) + 10000}-SC`);

  setBarcode(
    Array.from({ length: 20 }, () =>
      Math.random() > 0.5 ? 2 : 4
    )
  );
}, []);

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
      answer: "",
    });
    setCaptchaError(false);
  };

  // ── GSAP ANIMATIONS ──
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
      
      // Stamp animation on success
      if (status === "success") {
        gsap.fromTo(".stamp-reveal", 
          { scale: 2, opacity: 0, rotation: -20 },
          { scale: 1, opacity: 1, rotation: -5, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }, mainRef);
    return () => ctx.revert();
  }, [status]);

  // ── HANDLERS ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // Generate current date for the "receipt"
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: '2-digit', day: '2-digit' 
  });

  return (
    <main ref={mainRef} className="w-full bg-[#0A0A0A] relative selection:bg-[#D4AF37] selection:text-black min-h-screen">
      
      {/* =======================
          1. WHITE HEADER (Letterhead)
      ======================== */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-white text-black relative overflow-hidden">
        {/* Blueprint/Grid Background Effect */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="reveal-item flex items-center gap-4 mb-8">
            <div className="w-4 h-4 bg-black" />
            <span className="text-black font-mono text-sm font-bold uppercase tracking-[0.3em]">
              Slick Construction HQ
            </span>
          </div>
          <h1 className="reveal-item text-6xl md:text-8xl lg:text-[9vw] font-black tracking-tighter leading-none mb-6 uppercase">
            CONTACT
          </h1>
          <p className="reveal-item text-gray-500 font-mono text-sm md:text-base max-w-xl uppercase tracking-widest leading-relaxed border-l-2 border-[#D4AF37] pl-4">
            INITIATE WORK ORDER // DISPATCH INQUIRY // ESTIMATION REQUEST. <br/>
            ALL SYSTEMS READY FOR TRANSMISSION.
          </p>
        </div>
      </section>

      {/* =======================
          2. MAIN CONTENT (Industrial Theme)
      ======================== */}
      <section className="py-24 px-6 md:px-12 text-white relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* ── LEFT: TECHNICAL SPECS (Info) ── */}
          <div className="lg:col-span-5 flex flex-col gap-12 font-mono">
            <div className="reveal-item">
              <h3 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <HardHat size={16} /> Operational Data
              </h3>
              
              <div className="space-y-8 border-l border-white/20 pl-6 relative">
                {/* Tech Line Decorators */}
                <div className="absolute left-[-4px] top-0 w-2 h-2 bg-[#D4AF37]" />
                <div className="absolute left-[-4px] bottom-0 w-2 h-2 bg-white/50" />

                <div className="group">
                  <p className="text-gray-500 text-[10px] tracking-widest mb-1 uppercase">Transmission / Voice</p>
                  <a href="tel:4156109225" className="text-xl md:text-2xl text-white hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                    <Phone size={18} className="text-gray-500 group-hover:text-[#D4AF37]" />
                    (415) 610-9225
                  </a>
                </div>

                <div className="group">
                  <p className="text-gray-500 text-[10px] tracking-widest mb-1 uppercase">Transmission / Data</p>
                  <a href="mailto:info@slickconstruction.com" className="text-lg md:text-xl text-white hover:text-[#D4AF37] transition-colors flex items-center gap-3 break-all">
                    <Mail size={18} className="text-gray-500 group-hover:text-[#D4AF37]" />
                    info@slickconstruction.com
                  </a>
                </div>

                <div className="group">
                  <p className="text-gray-500 text-[10px] tracking-widest mb-1 uppercase">Coordinates</p>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-500 mt-1" />
                    <p className="text-lg text-white leading-relaxed">
                      San Francisco, CA<br />
                      <span className="text-gray-500 text-sm">Serving the Greater Bay Area</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning / Notice Tag */}
            <div className="reveal-item bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-6 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-repeating-linear-gradient(45deg, #D4AF37, #D4AF37 10px, transparent 10px, transparent 20px)" />
              <p className="text-[#D4AF37] text-sm leading-relaxed uppercase tracking-widest">
                <span className="font-bold text-white">NOTICE:</span> Accuracy in project specifications ensures rapid dispatch of estimation protocols.
              </p>
            </div>
          </div>

          {/* ── RIGHT: WORK ORDER / RECEIPT FORM ── */}
          <div className="lg:col-span-7 reveal-item relative">
            
            {/* The "Receipt" Card */}
            <div className="bg-[#111] border-2 border-dashed border-white/20 p-8 md:p-12 relative shadow-2xl">
              
              {/* Receipt Header */}
              <div className="border-b-2 border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-mono">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">Work Order Manifest</h2>
                  <p className="text-gray-500 text-xs tracking-widest">ID: {workOrderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-bold text-sm">DATE: {currentDate}</p>
                  {/* CSS Barcode Simulation */}
                  <div className="flex gap-[2px] h-6 mt-2 opacity-50 justify-end">
                    {barcode.map((width, i) => (
  <div
    key={i}
    className="bg-white"
    style={{ width: `${width}px` }}
  />
))}
                  </div>
                </div>
              </div>

              {/* Form Status Overlay (Stamp) */}
              {status === "success" && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm border-2 border-dashed border-white/20">
                  <div className="stamp-reveal border-4 border-[#D4AF37] text-[#D4AF37] px-8 py-4 uppercase font-black text-4xl tracking-[0.3em] font-mono shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    RECEIVED
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 font-mono">
                
                {/* HONEYPOT */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="bot_check">Do not fill this out</label>
                  <input type="text" name="bot_check" id="bot_check" value={formData.bot_check} onChange={handleChange} tabIndex={-1} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Client Name // 01</label>
                    <input
                      required
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Contact Email // 02</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Comm Link (Phone) // 03</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Operation Type // 04</label>
                    <div className="relative">
                      <select
                        required
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer rounded-none"
                      >
                        <option value="" disabled className="bg-[#111] text-gray-500">Select Operation...</option>
                        <option value="Full Home Remodel" className="bg-[#111]">Full Home Remodel</option>
                        <option value="Kitchen Renovation" className="bg-[#111]">Kitchen Renovation</option>
                        <option value="Bathroom Remodel" className="bg-[#111]">Bathroom Remodel</option>
                        <option value="New Construction" className="bg-[#111]">New Construction</option>
                        <option value="Deck / Outdoor Living" className="bg-[#111]">Deck / Outdoor Living</option>
                        <option value="Other Inquiry" className="bg-[#111]">Other Inquiry</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37] text-xs">▼</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest">Project Specifications // 05</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none rounded-none"
                  ></textarea>
                </div>

                {/* SECURITY CAPTCHA */}
                <div className="bg-black/50 border border-[#D4AF37]/30 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-[#D4AF37]">
                    <ShieldAlert size={18} />
                    <span className="text-xs uppercase tracking-widest">Security Protocol:</span>
                    <span className="text-white font-bold bg-white/10 px-2 py-1 rounded">
                      {captcha.num1} + {captcha.num2} =
                    </span>
                  </div>
                  <input
                    required
                    type="number"
                    value={captcha.answer}
                    onChange={handleCaptchaChange}
                    className={`w-full md:w-24 bg-transparent border-b ${captchaError ? "border-red-500" : "border-white/20"} pb-1 text-white focus:outline-none focus:border-[#D4AF37] text-center rounded-none`}
                    placeholder="?"
                  />
                </div>

                {/* ACTIONS */}
                <div className="pt-6 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    className="w-full bg-[#D4AF37] text-black py-4 uppercase font-black tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === "submitting" ? "Transmitting..." : "Authorize Transmission"}
                    {status === "idle" && <ArrowRight size={18} />}
                  </button>
                  
                  {status === "error" && (
                    <p className="text-red-500 mt-4 text-xs tracking-widest uppercase">
                      Transmission Failure. Please try again.
                    </p>
                  )}
                  {captchaError && (
                    <p className="text-red-500 mt-4 text-xs tracking-widest uppercase">
                      Security Protocol Failed. Invalid integer.
                    </p>
                  )}
                </div>

              </form>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </main>
  );
}