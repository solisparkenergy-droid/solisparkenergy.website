"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/leadgen/LeadForm";

// Custom component for the counting number animation
// Updated component for the counting number animation (Mobile Optimized)
function AnimatedCounter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    // Reduced margin to "0px" for mobile triggers and increased amount to 0.1
    const inView = useInView(ref, { once: true, amount: 0.1 });

    useEffect(() => {
        if (inView && ref.current) {
            const controls = animate(from, to, {
                duration: duration,
                delay: 0.2, // Tiny delay to ensure page transition is finished
                ease: "easeOut",
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(value).toString();
                    }
                },
            });
            return () => controls.stop();
        }
    }, [inView, from, to, duration]);

    return <span ref={ref}>{from}</span>;
}

export default function About() {
    const [expandedFounder, setExpandedFounder] = useState<number | null>(null);
    const [mnreState, setMnreState] = useState<"locked" | "form" | "unlocked">("locked");
    const [certName, setCertName] = useState("");
    const [certPhone, setCertPhone] = useState("");
    const [certEmail, setCertEmail] = useState("");
    const [certLoading, setCertLoading] = useState(false);

    async function handleCertSubmit(e: React.FormEvent) {
        e.preventDefault();
        setCertLoading(true);
        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: certName,
                    email: certEmail,
                    whatsapp: certPhone,
                    vertical: "solar-parks",
                    billRange: "",
                    pincode: "",
                }),
            });
        } catch {
            // non-blocking — unlock regardless
        } finally {
            setCertLoading(false);
            setMnreState("unlocked");
        }
    }

    const founders = [
        { 
            name: "Ranveer Dorai", 
            title: "Director of Engineering", 
            image: "/ranveer.jpg", 
            note: "We don't do theoreticals. I build systems that work in the dirt, heat, and grid chaos. From integrating bleeding-edge PMSG tech to high-yield panel mapping, my job is to make sure your plant produces maximum power with zero friction. We build it once, and we build it right." 
        },
        { 
            name: "Pruthvik Hariprasad", 
            title: "Director of Strategy", 
            image: "/pruthvik.jpg", 
            note: "Energy is a financial play. I take the CapEx risk off your table and engineer deployment models that guarantee immediate operational savings. Whether it's a massive utility-scale farm or a premium residential setup, we're here to make you profitable from Day 1." 
        }
    ];

    return (
        <main className="min-h-screen bg-[#FAF9F6] text-[#0A192F] overflow-hidden pt-24 md:pt-32">
            
            {/* SECTION 1: HERO & STATS */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04] mb-6">
                            We Build <br />
                            <span className="text-golden">Energy Empires.</span>
                        </h1>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
                        <img src="/solarpark-solar.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Utility-scale solar park" />
                    </motion.div>
                </div>

                {/* Stats Row with Animated Counters */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24 border-t border-gray-200 pt-12 md:pt-16">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-golden mb-2">
                            <AnimatedCounter to={119} />+
                        </h3>
                        <h4 className="text-xl font-bold text-[#0A192F] mb-2">Projects Delivered</h4>
                        <p className="text-gray-600 font-medium">Deployed fast. Built to last.</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-golden mb-2">
                            <AnimatedCounter to={12} />+ MW
                        </h3>
                        <h4 className="text-xl font-bold text-[#0A192F] mb-2">Active Capacity</h4>
                        <p className="text-gray-600 font-medium">Scaling India's clean energy grid, right now.</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-golden mb-2">
                            <AnimatedCounter to={8} /> States
                        </h3>
                        <h4 className="text-xl font-bold text-[#0A192F] mb-2">Operational Reach</h4>
                        <p className="text-gray-600 font-medium">Protecting bottom lines from grid inflation.</p>
                    </div>
                </motion.div>
            </section>

            {/* SECTION 2: ABOUT COMPANY */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">The <span className="text-golden">Unfair Advantage.</span></h2>
                        <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6">
                            Stop bleeding capital to the grid. Based in Bengaluru, Solispark Energy Pvt Ltd engineers utility-scale solar farms and elite <strong>Residential</strong> rooftop arrays that turn dead space into high-yield assets. We execute EPC & BOOT models differently.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed font-medium mb-8">
                            No legacy corporate friction—just aggressive execution. Founded by two relentless directors combining B.Tech engineering reality with MBA financial strategy, we leverage bleeding-edge <strong>PMSG (Permanent Magnet Synchronous Generator)</strong> technology to maximize your output. We aren't just an energy provider; we are your strategic moat.
                        </p>
                        <div className="bg-[#0A192F] rounded-2xl p-6 md:p-8 shadow-xl inline-block">
                            <p className="text-[#FBFBFB] font-medium text-lg md:text-xl">
                                Stop guessing. Claim your <span className="text-golden font-bold">Free Site Visit</span> & <span className="text-golden font-bold">Consultation</span> today.
                            </p>
                            <Link href="/contact" className="inline-block mt-6 btn-gold font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
                                Lock In Your Audit
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-xl">
                        <img src="/residential-solar.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Solispark residential solar installation" />
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3: MEET OUR FOUNDERS */}
            <section className="w-full bg-white py-32 relative z-10 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0A192F]">
                            Meet <span className="text-golden">The Architects</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {founders.map((founder, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                className="bg-[#FAF9F6] border border-gray-200 rounded-[2.5rem] p-8 flex flex-col items-center group transition-all hover:shadow-2xl"
                            >
                                {/* THE PILL SHAPE */}
                                <div className="w-56 h-[320px] md:w-72 md:h-[400px] rounded-[4rem] overflow-hidden shadow-xl mb-8 border-4 border-white relative">
                                    <Image src={founder.image} alt={founder.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                
                                <div className="text-center w-full">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#0A192F]">{founder.name}</h3>
                                    <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-6">{founder.title}</p>
                                    
                                    <button 
                                        onClick={() => setExpandedFounder(expandedFounder === idx ? null : idx)}
                                        className="inline-flex items-center gap-2 border-2 border-golden text-[#0A192F] hover:bg-golden font-bold px-6 py-3 rounded-full transition-all tracking-wide text-sm mb-4"
                                    >
                                        A Note from {founder.name.split(" ")[0]}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${expandedFounder === idx ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                                    </button>

                                    <AnimatePresence>
                                        {expandedFounder === idx && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden text-left mt-4"
                                            >
                                                <div className="text-6xl text-golden/30 font-serif leading-none mb-[-20px]">"</div>
                                                <p className="text-base text-gray-700 leading-relaxed font-medium px-4 pb-4 italic">
                                                    {founder.note}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: CERTIFICATES OF EXCELLENCE */}

            <section className="w-full bg-[#FAF9F6] py-32 relative z-10">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6">Certified Excellence.</h2>
                        <p className="text-lg text-gray-600 font-medium font-sans">Backed by the highest national authorities. We meet the strictest standards for infrastructure reliability, safety, and operational dominance.</p>
                    </div>

                    <div className="space-y-16">
                        {/* Certificate 1 - MNRE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-[2rem] shadow-lg border border-gray-100">
                            {/* Visual side */}
                            <div className="order-2 md:order-1 flex justify-center">
                                <div className="w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-[#0A192F] flex flex-col items-center justify-center gap-4 p-8 relative">
                                    {mnreState === "unlocked" ? (
                                        <div className="flex flex-col items-center gap-4 text-center">
                                            <div className="w-16 h-16 rounded-full bg-golden/20 flex items-center justify-center">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                                            </div>
                                            <p className="text-white font-bold text-base">Certificate Unlocked!</p>
                                            <p className="text-white/60 text-xs font-medium">Thank you. Your MNRE approval certificate is ready.</p>
                                            <a href="https://drive.google.com/file/d/1_JRLFVW73MO1nGeItM-Q7ikTbAEwB00T/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                                                className="mt-2 inline-flex items-center gap-2 btn-gold font-bold px-5 py-2.5 rounded-full text-sm">
                                                View Certificate
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                            </a>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                            </div>
                                            <p className="text-white font-bold text-sm text-center">MNRE Approval Certificate</p>
                                            <p className="text-white/40 text-xs text-center font-medium">Share your details to<br/>receive a verified copy</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* Text + form side */}
                            <div className="order-1 md:order-2">
                                <h3 className="text-3xl font-bold text-[#0A192F] mb-4">MNRE Approval</h3>
                                <p className="text-gray-600 font-medium leading-relaxed mb-6 font-sans">
                                    Government-recognized certification validating our utility-scale products&apos; elite quality and grid reliability. Share your details below to receive a verified copy.
                                </p>

                                {mnreState === "locked" && (
                                    <button onClick={() => setMnreState("form")}
                                        className="inline-flex items-center gap-2 bg-[#0A192F] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-golden transition-colors">
                                        Request Certificate Copy
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </button>
                                )}

                                {mnreState === "form" && (
                                    <form onSubmit={handleCertSubmit} className="flex flex-col gap-3 max-w-sm">
                                        <input required value={certName} onChange={e => setCertName(e.target.value)}
                                            placeholder="Your full name" className="border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-[#0A192F] outline-none focus:border-golden transition-colors" />
                                        <input required type="email" value={certEmail} onChange={e => setCertEmail(e.target.value)}
                                            placeholder="Email address" className="border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-[#0A192F] outline-none focus:border-golden transition-colors" />
                                        <input required value={certPhone} onChange={e => setCertPhone(e.target.value)}
                                            placeholder="WhatsApp number" type="tel" className="border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-[#0A192F] outline-none focus:border-golden transition-colors" />
                                        <button type="submit" disabled={certLoading}
                                            className="inline-flex items-center justify-center gap-2 btn-gold font-bold px-6 py-3 rounded-full text-sm disabled:opacity-60"
                                        >
                                            {certLoading ? "Verifying…" : "Get My Certificate"}
                                        </button>
                                    </form>
                                )}

                                {mnreState === "unlocked" && (
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm font-medium text-green-600">✓ Your certificate link is ready on the left.</p>
                                        <a href="https://drive.google.com/file/d/1_JRLFVW73MO1nGeItM-Q7ikTbAEwB00T/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#0A192F] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-golden transition-colors w-fit">
                                            View MNRE Certificate
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Certificate 2 - DPIIT */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-[2rem] shadow-lg border border-gray-100">
                            <div>
                                <h3 className="text-3xl font-bold text-[#0A192F] mb-4">DPIIT Recognition</h3>
                                <p className="text-gray-600 font-medium leading-relaxed mb-6 font-sans">
                                    Certified under the Start-up India initiative. This distinction underscores our aggressive, innovative approach to revolutionizing the renewable energy sector.
                                </p>
                                <a
                                    href="https://drive.google.com/file/d/1Kn-FXjc4sAehaERaZwbJIhHbSl7bO-wf/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex bg-[#0A192F] text-white px-6 py-3 rounded-full text-sm font-bold items-center gap-2 hover:bg-golden transition-colors"
                                >
                                    Download Company Profile
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                </a>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full max-w-[400px] aspect-[4/3] bg-white rounded-2xl flex items-center justify-center p-8 border border-gray-100 shadow-inner overflow-hidden">
                                    <img src="/mnre-logo.png" alt="MNRE Government of India Logo" className="w-full h-auto object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* BOTTOM CTA */}
            <section className="relative w-full py-20 md:py-28 px-6 md:px-12 bg-[#0A192F] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0A192F,#08152a)]" />
                <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,183,3,0.18),transparent_70%)] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="space-y-4 max-w-xl">
                        <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-golden">
                            Solispark · Free Site Visit
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                            Ready to own your energy?
                        </h2>
                        <p className="text-base text-white/65 font-medium leading-relaxed">
                            Get a free site visit, 3D system design, and savings report — backed by our Solispark guarantee. Zero cost, zero commitment.
                        </p>
                    </div>
                    <div className="w-full lg:w-auto lg:min-w-[420px]">
                        <LeadForm vertical="solar-parks" theme="dark" variant="card" />
                    </div>
                </div>
            </section>
        </main>
    );
}