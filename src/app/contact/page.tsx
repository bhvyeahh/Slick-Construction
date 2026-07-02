"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Simple Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    bot_check: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main
      ref={mainRef}
      className="w-full bg-white relative selection:bg-black selection:text-white"
    >
      {/* =======================
          1. DARK HEADER
      ======================== */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-item block text-neutral-400 font-mono text-sm tracking-widest uppercase mb-6">
            Get in Touch
          </span>
          <h1 className="reveal-item text-5xl md:text-7xl lg:text-[6vw] font-bold tracking-tighter leading-none mb-6">
            LET'S BUILD <br /> TOGETHER
          </h1>
          <p className="reveal-item text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
            Ready to start your project? We’d love to hear from you. Fill out
            the form below or contact us directly.
          </p>
        </div>
      </section>

      {/* =======================
          2. MAIN CONTENT (Split Layout)
      ======================== */}
      <section className="py-24 px-6 md:px-12 bg-white text-black min-h-screen">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* LEFT: Direct Info */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="reveal-item bg-[#F9F9F9] p-8 md:p-10 rounded-2xl border border-neutral-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
                Contact Info
              </h3>
              <div className="space-y-10">
                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:4156109225"
                      className="text-2xl font-bold hover:text-neutral-600 transition-colors"
                    >
                      (415) 610-9225
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@pivotalbuildersinc.com"
                      className="text-xl md:text-2xl font-bold hover:text-neutral-600 transition-colors break-all"
                    >
                      info@pivotalbuildersinc.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Office
                    </p>
                    <p className="text-xl font-medium text-neutral-800 leading-relaxed">
                      San Francisco, CA
                      <br />
                      Serving the Bay Area
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-item pl-4 border-l-2 border-neutral-200">
              <p className="text-neutral-500 italic text-lg leading-relaxed">
                "We prioritize clear communication and precise execution. Your
                project starts with a simple conversation."
              </p>
              <p className="mt-4 font-bold text-black">— Paul Magill</p>
            </div>
          </div>

          {/* RIGHT: Simple Form */}
          <div className="lg:col-span-7 reveal-item">
            <div className="bg-white p-0 md:p-4">
              <h2 className="text-3xl font-medium mb-8">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div style={{ display: "none" }} aria-hidden="true">
                  <label htmlFor="bot_check">
                    Do not fill this out if you are human
                  </label>
                  <input
                    type="text"
                    name="bot_check"
                    id="bot_check"
                    value={formData.bot_check}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                      Your Name
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 border-b border-neutral-300 p-4 focus:outline-none focus:border-black focus:bg-white transition-all rounded-t-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                      Email Address
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 border-b border-neutral-300 p-4 focus:outline-none focus:border-black focus:bg-white transition-all rounded-t-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                      Phone Number
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 border-b border-neutral-300 p-4 focus:outline-none focus:border-black focus:bg-white transition-all rounded-t-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                      Project Type
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 border-b border-neutral-300 p-4 focus:outline-none focus:border-black focus:bg-white transition-all rounded-t-md appearance-none"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Full Home Remodel">
                        Full Home Remodel
                      </option>
                      <option value="Kitchen Renovation">
                        Kitchen Renovation
                      </option>
                      <option value="Bathroom Remodel">Bathroom Remodel</option>
                      <option value="New Construction">New Construction</option>
                      <option value="Deck / Outdoor Living">
                        Deck / Outdoor Living
                      </option>
                      <option value="Other Inquiry">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border-b border-neutral-300 p-4 focus:outline-none focus:border-black focus:bg-white transition-all rounded-t-md resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="mt-8 bg-black text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto justify-center"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : status === "success"
                      ? "Message Sent!"
                      : "Send Message"}
                  {status === "idle" && <ArrowRight size={18} />}
                </button>

                {status === "success" && (
                  <p className="text-green-600 font-medium text-center md:text-left mt-4 animate-pulse">
                    Thank you! We'll be in touch shortly.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-red-600 font-medium text-center md:text-left mt-4">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
