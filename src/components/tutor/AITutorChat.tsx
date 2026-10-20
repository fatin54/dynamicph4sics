'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Languages, BookOpen, Lightbulb } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  text: string;
  banglaText?: string;
  equations?: string[];
  suggestedFollowUp?: string[];
}

export default function AITutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Assalamu Alaikum! I am your HSC Dynamics AI Tutor. I can explain any concept from Chapter 3 (গতিবিদ্যা) or Chapter 4 Forces—from simple everyday analogies (like I\'m 8) to rigorous mathematical proofs and 10-year board question tricks. What topic would you like to explore today?',
      banglaText: 'আসসালামু আলাইকুম! আমি তোমার এইচএসসি গতিবিদ্যা ও বলবিদ্যা শিক্ষক। ৩য় অধ্যায়ের যেকোনো কনসেপ্ট সহজ উদাহরণ থেকে শুরু করে বোর্ড পরীক্ষার কঠিন সৃজনশীল প্রশ্নের সমাধান পর্যন্ত বুঝিয়ে দিতে পারি। আজ তুমি কোনটি শিখতে চাও?',
      suggestedFollowUp: [
        'Why does a heavier object not fall faster?',
        'Explain projectile motion like I am 8',
        'Why don\'t action and reaction forces cancel?',
        'How to prove the trajectory of prass is a parabola?',
      ],
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [preferBangla, setPreferBangla] = useState<boolean>(false);

  // Deterministic curated physics knowledge fallback engine
  const generateResponse = (prompt: string): Message => {
    const p = prompt.toLowerCase();

    if (p.includes('heavier') || p.includes('fall') || p.includes('galileo') || p.includes('ভারী') || p.includes('পড়ন্ত')) {
      return {
        role: 'assistant',
        text: `Great question! Here is why heavier objects do NOT fall faster in a vacuum:\n\n1. Socratic Step: What two things determine acceleration according to Newton\'s 2nd Law?\nFormula: a = F_net / m.\n\n2. The Gravitational Pull on a body of mass m is F = mg. A 10 kg iron ball experiences 10 times more downward gravitational force than a 1 kg ball!\n\n3. BUT a 10 kg ball also has 10 times more INERTIA (resistance to acceleration)! When you divide the force by the mass:\na = (m g) / m = g = 9.8 m/s².\n\nThe mass m cancels out completely! Therefore, all objects accelerate at the exact same rate g = 9.8 m/s² regardless of weight. The only reason a feather drifts down slowly in a room is air resistance (aerodynamic drag), not its mass!`,
        banglaText: `চমৎকার প্রশ্ন! বায়ুশূন্য স্থানে ভারী বস্তু কেন বেশি দ্রুত পড়ে না তা জেনে নাও:\n\n১. নিউটনের ২য় সূত্র বলে: a = F / m।\n২. একটি ১০ কেজি বস্তুর উপর পৃথিবীর আকর্ষণ বল (F = mg) ১ কেজি বস্তুর চেয়ে ১০ গুণ বেশি।\n৩. কিন্তু ১০ কেজি বস্তুর জড়তাও (গতি পরিবর্তনে বাধা) ঠিক ১০ গুণ বেশি! ফলে যখন বলকে ভর দিয়ে ভাগ করা হয়:\na = (mg) / m = g = ৯.৮ m/s²।\n\nভর m পুরোপুরি কাটাকাটি হয়ে যায়! একারণেই বায়ুশূন্য স্থানে পালক ও লোহার বল একই সাথে নিচে পড়ে।`,
        equations: ['a = \\frac{F}{m} = \\frac{mg}{m} = g = 9.8 \\text{ m/s}^2'],
        suggestedFollowUp: [
          'What did Apollo 15 do on the Moon?',
          'State Galileo\'s three laws of falling bodies',
        ],
      };
    } else if (p.includes('projectile') || p.includes('prass') || p.includes('parabola') || p.includes('প্রাস') || p.includes('পরাবৃত্ত')) {
      return {
        role: 'assistant',
        text: `Let's explain Projectile Motion (প্রাস) with complete clarity!\n\nIntuition: Imagine kicking a soccer ball obliquely into the sky at angle θ₀ with speed V₀. The ball performs two completely separate motions at the same time:\n\n1. Horizontal Motion: There is no horizontal gravity or force in the air (a_x = 0). So the ball coasts sideways at constant speed: v_x = V₀ cos θ₀.\n\n2. Vertical Motion: Gravity pulls it downward with acceleration a_y = -g. So it decelerates going up, stops for an instant at the peak (v_y = 0), and accelerates coming down!\n\nProof of Parabola: From x = (V₀ cos θ₀) t, we get t = x / (V₀ cos θ₀). Substituting t into y = (V₀ sin θ₀)t - 0.5gt² gives:\ny = (tan θ₀) x - [g / (2 V₀² cos² θ₀)] x².\nSince y is a quadratic function of x with a negative x² coefficient, it is a Parabola!`,
        banglaText: `প্রাসের গতিপথ পরাবৃত্ত হওয়ার কারণ:\n\nঅনুভূমিক দিকে কোনো বল নেই (a_x = 0), তাই অনুভূমিক বেগ সর্বদা সমবেগ: v_x = V₀ cos θ₀।\nউলম্ব দিকে অভিকর্ষজ ত্বরণ g সর্বদা নিচের দিকে টানে।\nসময়ের মান অপনয়ন করলে পাওয়া যায়: y = Ax - Bx² যা একটি পরাবৃত্ত বা প্যারাবোলার সমীকরণ।`,
        equations: [
          'x = (V_0 \\cos\\theta_0) t \\implies t = \\frac{x}{V_0 \\cos\\theta_0}',
          'y = (\\tan\\theta_0) x - \\left( \\frac{g}{2 V_0^2 \\cos^2\\theta_0} \\right) x^2',
        ],
        suggestedFollowUp: [
          'Why does maximum range occur at 45 degrees?',
          'Show me the Cumilla Board 2017 goalkeeper question',
        ],
      };
    } else if (p.includes('action') || p.includes('reaction') || p.includes('cancel') || p.includes('ক্রিয়া') || p.includes('প্রতিক্রিয়া')) {
      return {
        role: 'assistant',
        text: `Here is the #1 misconception in HSC mechanics: Why do Action and Reaction NOT cancel each other out?\n\nKey Rule: Two forces can ONLY cancel each other if they act on the EXACT SAME OBJECT!\n\nFor example:\nWhen you jump from a boat, your feet push the boat backward (Force 1: Action acting ON the boat).\nSimultaneously, the boat pushes your body forward (Force 2: Reaction acting ON you).\n\nBecause Force 1 acts on the boat, and Force 2 acts on your feet, they NEVER cancel each other! Each individual body experiences a non-zero net force and accelerates in opposite directions: F_AB = - F_BA.`,
        banglaText: `ক্রিয়া ও প্রতিক্রিয়া বল কেন পরস্পরকে নিষ্ক্রিয় করে না?\n\nকারণ দুটি বল তখনই একে অপরকে বাতিল করতে পারে যখন তারা একই বস্তুর উপর কাজ করে। কিন্তু নিউটনের ৩য় সূত্রে ক্রিয়া বল কাজ করে ১ম বস্তুতে এবং প্রতিক্রিয়া বল কাজ করে ২য় বস্তুতে! যেহেতু দুটি ভিন্ন বস্তুর ওপর কাজ করে, তাই তারা কখনোই পরস্পরকে নিষ্ক্রিয় করে না।`,
        equations: ['\\vec{F}_{AB} = -\\vec{F}_{BA}'],
        suggestedFollowUp: [
          'How does a horse pull a cart if the cart pulls back?',
          'What is the difference between normal force and reaction force?',
        ],
      };
    } else if (p.includes('circular') || p.includes('কৌণিক') || p.includes('বৃত্তীয়')) {
      return {
        role: 'assistant',
        text: `Why is circular motion at constant speed still accelerated motion?\n\nAcceleration is the rate of change of VELOCITY. Remember: velocity is a vector possessing both speed (magnitude) and direction!\n\nWhen a car circles a roundabout at a constant 30 km/h, its speed doesn\'t change, but its direction changes every single millisecond. To bend a straight path into a circle, you must continuously pull the object inward toward the center!\n\nThis inward radial acceleration is Centripetal Acceleration:\na_c = v² / r = ω² r directed toward the center.`,
        banglaText: `সুষম বৃত্তীয় গতিতে দ্রুতি ধ্রুব হলেও কেন ত্বরণ থাকে?\n\nত্বরণ হলো বেগের পরিবর্তনের হার। বেগ একটি ভেক্টর রাশি—এর মান ও দিক উভয়ই আছে। বৃত্তাকার পথে দ্রুতি এক থাকলেও প্রতি মুহূর্তে বেগের দিক বদলে যায়। এই দিক পরিবর্তনের জন্যই সর্বদা কেন্দ্রের দিকে কেন্দ্রমুখী ত্বরণ a_c = v²/r সৃষ্টি হয়।`,
        equations: ['a_c = \\frac{v^2}{r} = \\omega^2 r'],
        suggestedFollowUp: [
          'What is the angular speed of a wall clock hour hand?',
          'Derive v = omega * r',
        ],
      };
    } else {
      return {
        role: 'assistant',
        text: `That is an interesting topic in dynamics! Let's break it down into core principles:\n\n1. What reference frame are you observing the motion from?\n2. Are external forces acting, or is the system isolated?\n3. If acceleration is constant, apply the kinematic formulas (v = u + at, s = ut + 0.5at²).\n4. If forces are involved, set up a Free-Body Diagram and write F_net = ma.\n\nAsk me specifically about Projectiles, Newton's Laws, Galileo's Laws, Motion Graphs, or Board Questions!`,
        banglaText: `গতিবিদ্যার যেকোনো সমস্যা সমাধানের ধাপ:\n১. প্রসঙ্গ কাঠামো নির্ধারণ করো।\n২. ত্বরণ ধ্রুব হলে গতির সমীকরণ প্রয়োগ করো।\n৩. বল জড়িত থাকলে F = ma এবং FBD ব্যবহার করো।`,
        suggestedFollowUp: [
          'Explain projectile motion',
          'How does friction work on an inclined plane?',
        ],
      };
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(userMsg.text);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border shadow-sm flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-maroon-pale border-b border-maroon-light flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-maroon text-white flex items-center justify-center shadow-xs">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-maroon-deep flex items-center gap-2">
              HSC Dynamics AI Physics Tutor
              <span className="text-[10px] bg-forest-pale text-forest px-1.5 py-0.5 rounded font-mono font-semibold border border-forest-light">
                Class XI NCTB
              </span>
            </h3>
            <p className="text-[11px] text-maroon">
              Trained on Shahjahan Tapan textbook &amp; 10-year board questions
            </p>
          </div>
        </div>

        {/* Bilingual View Toggle */}
        <button
          onClick={() => setPreferBangla(!preferBangla)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-maroon-light text-maroon hover:bg-maroon hover:text-white transition-all shadow-2xs"
        >
          <Languages size={13} />
          <span>{preferBangla ? 'English Mode' : 'বাংলায় দেখুন'}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={idx}
              className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-orange text-white' : 'bg-maroon text-white'
                }`}
              >
                {isUser ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 leading-relaxed whitespace-pre-line ${
                  isUser
                    ? 'bg-orange text-white rounded-tr-xs shadow-xs'
                    : 'bg-sand-muted border border-sand-border text-sand-text rounded-tl-xs shadow-2xs'
                }`}
              >
                <p>{preferBangla && msg.banglaText ? msg.banglaText : msg.text}</p>

                {/* Display LaTeX equations if present */}
                {msg.equations && (
                  <div className="my-2.5 p-2 rounded-lg bg-sand-surface border border-sand-border font-mono font-bold text-orange-deep text-[11px]">
                    {msg.equations.map((eq, i) => (
                      <div key={i}>{eq}</div>
                    ))}
                  </div>
                )}

                {/* Suggested follow-up prompt pills */}
                {msg.suggestedFollowUp && (
                  <div className="mt-3 pt-2.5 border-t border-sand-border/50 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUp.map((fu, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(fu);
                        }}
                        className="text-[10px] px-2 py-1 rounded-lg bg-sand-surface border border-sand-border text-sand-text hover:border-orange hover:text-orange-deep transition-colors"
                      >
                        {fu}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-maroon text-white flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-sand-muted p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="p-3 bg-sand-surface border-t border-sand-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g., 'Why does a ball curve?', 'Prove trajectory parabola')..."
            className="flex-1 bg-sand-muted border border-sand-border rounded-xl px-4 py-2.5 text-xs text-sand-text focus:outline-hidden focus:border-orange"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-orange hover:bg-orange-deep text-white shadow-sm transition-colors"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
