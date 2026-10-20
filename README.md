# DynamicsLab (গতিবিদ্যা ল্যাব) — HSC Physics 1st Paper Chapter 3

[![NCTB Syllabus](https://img.shields.io/badge/NCTB%20Curriculum-Class%20XI%20Physics%201st%20Paper-153D2B?style=for-the-badge)](file:///c:/Users/talha/Downloads/hsc%20prep)
[![Chapter](https://img.shields.io/badge/Chapter%203-Dynamics%20(%E0%A6%97%E0%A6%A4%E0%A6%BF%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE)-E87524?style=for-the-badge)](file:///c:/Users/talha/Downloads/hsc%20prep)
[![Design Tokens](https://img.shields.io/badge/Color%20Identity-Orange%20%7C%20Maroon%20%7C%20Green-781F3A?style=for-the-badge)](file:///c:/Users/talha/Downloads/hsc%20prep)
[![Build Status](https://img.shields.io/badge/Build-Passing%20(Next.js%2014)-26734D?style=for-the-badge)](file:///c:/Users/talha/Downloads/hsc%20prep)

A complete, production-grade educational web platform designed specifically for Bangladeshi Class XI / HSC 1st-Year students studying **Chapter 3: Dynamics (গতিবিদ্যা)** under the official **National Curriculum and Textbook Board (NCTB)** Physics 1st Paper curriculum.

The application bridges intuitive understanding with academic rigor: taking students from everyday real-world phenomena ("Explain like I'm 8") to mathematical derivations and 10-year HSC board examination readiness.

---

## 📖 1. Official NCTB Textbook Audit & Curriculum Scope

### Primary Authoritative Anchor
- **Textbook:** *উচ্চ মাধ্যমিক পদার্থবিজ্ঞান ১ম পত্র (একাদশ-দ্বাদশ শ্রেণি)*
- **Authors:** ড. শাহজাহান তপন (Dr. Shahjahan Tapan), মুহাম্মদ আজিজ হাসান (Muhammad Aziz Hasan), এবং ড. রানা চৌধুরী (Dr. Rana Chowdhury)
- **Publisher:** হাসান বুক হাউস (Hasan Book House), ঢাকা / জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)
- **Local Source PDF Verified:** `পদার্থবিজ্ঞান ১ম পত্র তপন স্যার-[students.bd].pdf` (802 scanned pages, preserved at workspace root)

### Syllabus Demarcation
To preserve curriculum fidelity and prevent syllabus conflation:
1. **Chapter 3: Dynamics (গতিবিদ্যা) [Book pp. 141–234 / PDF pp. 151–245]**:
   - Reference frames (প্রসঙ্গ কাঠামো) & position vectors
   - Linear kinematics ($v = u + at$, $s = ut + \frac{1}{2}at^2$, $v^2 = u^2 + 2as$, $s_t = u + \frac{1}{2}a(2t-1)$)
   - Calculus in dynamics ($\vec{v} = \frac{d\vec{r}}{dt}$, $\vec{a} = \frac{d\vec{v}}{dt}$, $s = \int v\,dt$)
   - Motion graphs analysis ($s-t, v-t, a-t$ slopes and definite integrals)
   - Galileo's laws of falling bodies in vacuum vs air drag
   - 2D Projectile Motion (প্রাস / প্রক্ষেপক): trajectory equation, apex time/height, flight duration, maximum range, complementary angle invariance
   - Uniform circular motion: angular velocity $\omega$, centripetal acceleration $a_c = \frac{v^2}{r} = \omega^2 r$
2. **Chapter 4 Bridge: Causes of Motion & Forces (নিউটনীয় বলবিদ্যা) [Book pp. 235–330 / PDF pp. 246–340]**:
   - Newton's Laws of Motion (Inertia, $F=ma$, Action-Reaction pairs on distinct bodies)
   - Momentum & Impulse-Momentum Theorem ($J = \int F\,dt = \Delta p$)
   - 1D Collisions (Elastic $e=1$ vs Inelastic $0 \le e < 1$)
   - Friction dynamics ($f_{s,\max} = \mu_s N$, $f_k = \mu_k N$) and inclined plane mechanics
   - Atwood Machine & Connected bodies (String tension $T$, acceleration $a$, Free-Body Diagrams)

---

## 🏛️ 2. Core Pedagogical Architecture (The 3-Layer Model)

Every topic in the curriculum is taught through a persistent 3-layer progressive interface:

```
┌────────────────────────────────────────────────────────┐
│  Layer A: Intuitive English (সহজভাবে বুঝি)              │
│  Explain like I'm 8 • Everyday scenarios • Analogies  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  Layer B: HSC Academic English (বই অনুযায়ী শিখি)       │
│  NCTB Definitions • Vector Math • Step Derivations     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  Layer C: Board Exam Ready (বোর্ড পরীক্ষার প্রস্তুতি)   │
│  10-Year Board Questions • CQ Rubrics • Common Errors   │
└────────────────────────────────────────────────────────┘
```

### Persistent Pedagogical Controls
- **"Explain More Simply" / "আরও সহজভাবে বুঝিয়ে দাও":** Strips complex jargon into concrete physical intuition without sacrificing correctness.
- **"Explain in Bangla" / বাংলা অনুবাদ:** Displays bilingual terminology maps, Bengali translations of definitions, and textbook terminology.
- **"Show Derivation":** Unrolls full LaTeX mathematical steps with explicit variable substitutions.
- **"Virtual Experiment":** Launches or scrolls directly into the synchronized live physics simulation.

---

## 🔬 3. Interactive Physics Laboratory (10 Custom Simulators)

All experiments run in real-time in the browser using HTML5 Canvas and SVG. Calculations are computed analytically from first principles:

| Simulation | Primary Concept | Interactive Controls | Live Physical Outputs |
|:---|:---|:---|:---|
| **Projectile Lab (প্রাস)** | 2D Parabolic Kinematics | Velocity $u$, Angle $\theta$, Target Distance & Height | Trajectory path, Apex ($v_y=0$), Range $R$, Time of flight $T$, Target clearance badge |
| **Motion Graphs Lab** | Kinematics Slopes & Integrals | Motion Preset (Constant $v$, Uniform $a$, Multi-phase), Time scrubber | Synchronized $s-t, v-t, a-t$ plots, tangent slope $v=\frac{ds}{dt}$, area under $v-t$ curve |
| **Galileo Falling Bodies** | Gravitational Acceleration & Drag | Vacuum Mode toggle, Drop height | Dual chamber dropping Lead Coin vs Feather, timer display |
| **Circular Motion Lab** | Angular Velocity & Centripetal Accel | Radius $r$, Angular speed $\omega$, "Snap String" test | Velocity vector (Green tangent), Centripetal vector (Maroon radial), Inertial tangent drift |
| **Newton's Laws Lab** | 1st, 2nd, 3rd Law Mechanics | Law mode (1, 2, 3), Mass $m$, Force $F$, Friction $\mu$ | Live force vectors, Net acceleration, Action-reaction separation diagram |
| **Football Lab** | Impulse-Momentum Theorem | Ball mass, Kicking force, Contact duration $\Delta t$, Kick angle | Impulse $J = F \Delta t$, Velocity $\Delta v$, Kinetic energy gain, Goal net animation |
| **Collision Lab** | 1D Momentum Conservation | Masses $m_1, m_2$, Velocities $u_1, u_2$, Restitution $e$ | Post-collision speeds $v_1, v_2$, Momentum conservation indicator, KE dissipation meter |
| **Friction & Incline** | Static vs Kinetic Friction | Mass $m$, Static $\mu_s$, Kinetic $\mu_k$, Incline angle $\theta$ | Normal force $N$, Friction threshold $f_{s,\max}$, Angle of repose, Impending slip state |
| **Atwood Machine Lab** | Connected Bodies & Pulley | Masses $m_1, m_2$, Free-fall gravity $g$ | Animated pulley rotation, String tension $T$, Acceleration $a$, Free-Body Diagram arrows |
| **Impulse-Time Lab** | Force-Time Curve Integration | Peak Force $F_{\max}$, Pulse width $\Delta t$, Waveform shape | Shaded area integral $\int F\,dt$, Total impulse $J$, Resulting momentum change |

---

## 📚 4. 10-Year Board Examination Archive (2015–2024)

Features authentic, verified examination questions across all major Bangladesh Education Boards:
- **Boards Included:** Dhaka, Rajshahi, Cumilla, Jashore, Chattogram, Barishal, Sylhet, Dinajpur, Mymensingh, and BUET Admission Tests.
- **Question Types:**
  - **Creative Questions (সৃজনশীল প্রশ্ন - CQ):** Complete 4-part items:
    - (ক) জ্ঞানমূলক (Knowledge - 1 Mark)
    - (খ) অনুধাবনমূলক (Comprehension - 2 Marks)
    - (গ) প্রয়োগমূলক (Application - 3 Marks)
    - (ঘ) উচ্চতর দক্ষতামূলক (Higher Ability - 4 Marks)
  - **Multiple Choice Questions (MCQ):** With distractor analyses and misconception corrections.
- **Progressive Reveal Interface:**
  - Level 1: "Need a Hint?" (ইঙ্গিত)
  - Level 2: "Show Formula" (প্রযোজ্য সূত্র)
  - Level 3: "Full Board Model Solution & Marking Rubric"

---

## 🎨 5. Editorial Academic Visual Identity

The interface adheres to an academic editorial design language built with custom Tailwind CSS tokens:

- **Deep Maroon (`#4A1025`, `#781F3A`, `#9B304B`):** Structural authority, primary headings, board exam markers, and mathematical derivations.
- **Warm Flame Orange (`#A63D12`, `#E87524`, `#F7943D`):** Primary interactive controls, applied forces, highlight accents, and active state indicators.
- **Deep Forest Green (`#153D2B`, `#26734D`, `#3D9664`):** Velocity vectors, correct student answers, NCTB verification badges, and mastery progress meters.
- **Warm Sand & Natural Slate (`#FAF8F5`, `#F2EEE8`, `#241E20`):** Editorial background tones providing a clean reading experience.

---

## 🚀 6. Installation & Local Development

### Prerequisites
- Node.js version 18.17+ or 20+
- npm version 9+

### Setup Commands

```bash
# 1. Clone or navigate to the project directory
cd "c:\Users\talha\Downloads\hsc prep"

# 2. Install dependencies
npm install

# 3. Run the analytical physics test suite
npm test

# 4. Build the Next.js static export bundle (outputs to out/)
npm run build

# 5. Preview locally with Cloudflare Pages emulator
npm run preview:cloudflare
```

Open [http://localhost:3000](http://localhost:3000) (dev server) or [http://localhost:8788](http://localhost:8788) / [http://localhost:3001](http://localhost:3001) (Cloudflare Pages preview) in your browser.

---

## ⚡ 7. Cloudflare Pages Deployment Guide

The application is engineered as a zero-cold-start static export (`output: 'export'`) perfectly tailored for Cloudflare Pages with zero Vercel dependencies and $0/month hosting cost.

### Option A: Cloudflare Dashboard (Recommended with Git)
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set the build configuration:
   - **Framework preset:** `None` or `Next.js (Static HTML Export)`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/` (or leave blank)
   - **Node.js version:** Set environment variable `NODE_VERSION = 20` (in Settings > Environment variables)
5. Click **Save and Deploy**. Cloudflare automatically provisions edge CDN caching and issues a free `*.pages.dev` subdomain with automatic SSL.

### Option B: Direct Deployment via Cloudflare Wrangler CLI
If you prefer deploying directly from your terminal:
```bash
# 1. Authenticate with your Cloudflare account
npx wrangler login

# 2. Build the static production bundle
npm run build

# 3. Deploy the out/ directory directly to Cloudflare Pages
npx wrangler pages deploy out --project-name=dynamicslab
```
Cloudflare Wrangler will upload all static pages, assets, and custom security headers from `public/_headers` directly to Cloudflare's global edge network.

---

## 🧪 8. Analytical Physics Test Suite

The mathematical core of the platform is validated against textbook solutions and board questions via Node.js native test runner:

```bash
npm test
```

### Verified Test Cases:
1. **Rectilinear Kinematics:** Uniform acceleration relations ($v = u + at$, $s = ut + \frac{1}{2}at^2$, $v^2 = u^2 + 2as$) and $t$-th second displacement ($s_t$).
2. **Projectile Motion:** Dhaka Board 2017 & Cumilla Board 2017 test cases ($u = 30\text{ m/s}, \theta = 30^\circ \implies H = 11.48\text{ m}, T = 3.06\text{ s}, R = 79.53\text{ m}$), trajectory equation zero at $x=R$, and complementary angle range equality $R(\theta) = R(90^\circ - \theta)$.
3. **Atwood Machine:** Connected bodies acceleration $a = \frac{m_1 - m_2}{m_1 + m_2}g$, string tension $T = \frac{2m_1 m_2}{m_1 + m_2}g$, and Free-Body Diagram equilibrium.
4. **1D Collisions:** Momentum conservation $P_i = P_f$ across elastic ($e=1$) and inelastic ($e=0$) collisions; relative velocity of approach vs separation; kinetic energy dissipation validation.
5. **Friction & Repose Angle:** Static threshold $f_{s,\max} = \mu_s N$, kinetic friction $f_k = \mu_k N$, and angle of repose $\theta_s = \arctan(\mu_s)$.
6. **Circular Motion:** Angular velocity $\omega = \frac{v}{r}$, centripetal acceleration $a_c = \frac{v^2}{r} = \omega^2 r$, and revolution period $T = \frac{2\pi}{\omega}$.

---

## 📁 8. Project Structure

```
hsc-prep/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with editorial font & navigation
│   │   ├── page.tsx               # Homepage with live projectile sandbox & curriculum cards
│   │   ├── lessons/
│   │   │   ├── page.tsx           # Lesson catalog filtered by Ch3 vs Ch4 Bridge
│   │   │   └── [id]/page.tsx      # Comprehensive 3-Layer lesson page
│   │   ├── lab/page.tsx           # 10-Simulation virtual physics laboratory hub
│   │   ├── formulas/page.tsx      # Formula directory & interactive step calculator
│   │   ├── questions/page.tsx     # 10-Year Board question bank (2015-2024)
│   │   ├── cq-solver/page.tsx     # Guided 4-part Creative Question (CQ) practice
│   │   ├── quiz/page.tsx          # Timed MCQ practice engine with rationales
│   │   ├── tutor/page.tsx         # Socratic AI Physics Tutor
│   │   ├── sources/page.tsx       # NCTB Source Register & textbook audit
│   │   └── progress/page.tsx      # 5-Level student mastery tracker
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky academic header with chapter status
│   │   ├── Footer.tsx             # Academic source citations and license
│   │   ├── formulas/              # Formula calculator modals
│   │   ├── cq/                    # Guided CQ solver components
│   │   ├── quiz/                  # Timed quiz engine
│   │   ├── tutor/                 # Socratic chat tutor interface
│   │   └── simulations/           # 10 Canvas & SVG physics laboratories
│   │       ├── ProjectileLab.tsx
│   │       ├── MotionGraphsLab.tsx
│   │       ├── FallingBodyLab.tsx
│   │       ├── CircularMotionLab.tsx
│   │       ├── NewtonLab.tsx
│   │       ├── FootballLab.tsx
│   │       ├── CollisionLab.tsx
│   │       ├── FrictionLab.tsx
│   │       ├── PulleyLab.tsx
│   │       └── ImpulseLab.tsx
│   ├── data/                      # Complete textbook-verified datasets
│   │   ├── curriculum.ts          # Official NCTB syllabus breakdown
│   │   ├── terminology.ts         # English-Bangla physics terminology dictionary
│   │   ├── formulas.ts            # Formula library with live solver algorithms
│   │   ├── boardQuestions.ts      # 2015-2024 Board question archive
│   │   ├── creativeQuestions.ts   # 4-part CQs with model marking schemes
│   │   ├── lessons.ts             # 12 complete 3-layer lesson modules
│   │   ├── quizzes.ts             # Level-graded MCQs with distractor explanations
│   │   └── sources.ts             # NCTB textbook bibliographic registry
│   └── types/                     # TypeScript definitions across the application
├── test/
│   └── physics.test.mjs           # Mathematical unit tests
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📜 9. Academic Integrity & Source Credits

- **National Curriculum and Textbook Board (NCTB), Bangladesh:** Physics 1st Paper (Code 174).
- **Core Textbook:** *উচ্চ মাধ্যমিক পদার্থবিজ্ঞান ১ম পত্র* — ড. শাহজাহান তপন, মুহাম্মদ আজিজ হাসান, ড. রানা চৌধুরী।
- **Board Papers:** Board of Intermediate and Secondary Education, Dhaka, Rajshahi, Cumilla, Jashore, Chattogram, Barishal, Sylhet, Dinajpur, Mymensingh.

*Built with precision for the future physicists and engineers of Bangladesh.* 🇧🇩
