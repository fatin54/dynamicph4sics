import { FormulaItem } from '@/types';

export const FORMULA_LIBRARY: FormulaItem[] = [
  {
    id: 'form-lin-v',
    name: 'Final Velocity under Uniform Acceleration',
    banglaName: 'সুষম ত্বরণে শেষ বেগ',
    category: 'linear_kinematics',
    latex: 'v = u + at',
    textbookNotation: 'v = v_0 + at',
    textbookSection: 'অনুচ্ছেদ ৩.৬',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Computes how fast an object is moving after accelerating uniformly at rate a for duration t starting from initial velocity u.',
    banglaExplanation: 'আদিবেগ u নিয়ে যাত্রা শুরু করে কোনো বস্তু a সুষম ত্বরণে t সময় চললে তার শেষ বেগ v নির্ণয় করা যায়।',
    variables: [
      { symbol: 'v', name: 'Final Velocity', banglaName: 'শেষ বেগ', unit: 'm/s', description: 'Velocity after time t', isVector: true },
      { symbol: 'u', name: 'Initial Velocity', banglaName: 'আদি বেগ', unit: 'm/s', description: 'Starting velocity at t = 0', isVector: true },
      { symbol: 'a', name: 'Acceleration', banglaName: 'ত্বরণ', unit: 'm/s²', description: 'Constant rate of velocity change', isVector: true },
      { symbol: 't', name: 'Elapsed Time', banglaName: 'সময়', unit: 's', description: 'Duration of accelerated motion' },
    ],
    conditions: ['Acceleration a must remain strictly constant throughout duration t', 'Motion must be along a rectilinear (1D) trajectory'],
    commonMistakes: ['Forgetting negative sign for deceleration/braking', 'Using this formula when acceleration varies with time'],
    workedExample: {
      id: 'ex-v-lin',
      title: 'Bus Accelerating from Rest',
      problemStatement: 'A city bus begins from rest (u = 0) and accelerates uniformly at 1.8 m/s² for 12 seconds along a straight highway. What is its final velocity in m/s and km/h?',
      givenData: [
        { symbol: 'u', value: '0', unit: 'm/s', description: 'Bus starts from rest' },
        { symbol: 'a', value: '1.8', unit: 'm/s²', description: 'Uniform acceleration' },
        { symbol: 't', value: '12', unit: 's', description: 'Time interval' },
      ],
      targetVariable: { symbol: 'v', unit: 'm/s', description: 'Final velocity' },
      formulaUsed: 'v = u + at',
      solutionSteps: [
        { step: 'Substitute the given values into the kinematic equation', latex: 'v = 0 + (1.8 \\times 12)' },
        { step: 'Calculate the numerical product', latex: 'v = 21.6 \\text{ m/s}' },
        { step: 'Convert to km/h by multiplying by 3.6', latex: 'v = 21.6 \\times 3.6 = 77.76 \\text{ km/h}' },
      ],
      finalAnswer: '21.6 m/s (77.76 km/h)',
      keyTakeaway: 'Always verify if initial rest is stated; that immediately gives u = 0.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'v', label: 'Final Velocity (v)', unit: 'm/s', defaultValue: 21.6 },
        { symbol: 'u', label: 'Initial Velocity (u)', unit: 'm/s', defaultValue: 0 },
        { symbol: 'a', label: 'Acceleration (a)', unit: 'm/s²', defaultValue: 1.8 },
        { symbol: 't', label: 'Time (t)', unit: 's', defaultValue: 12, min: 0.001 },
      ],
      solvableVariables: ['v', 'u', 'a', 't'],
      solve: (target, vals) => {
        const { v, u, a, t } = vals;
        if (target === 'v') {
          const res = u + a * t;
          return { result: res, steps: [`v = u + at`, `v = ${u} + (${a} × ${t})`, `v = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else if (target === 'u') {
          const res = v - a * t;
          return { result: res, steps: [`u = v - at`, `u = ${v} - (${a} × ${t})`, `u = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else if (target === 'a') {
          if (t === 0) throw new Error('Time t cannot be 0.');
          const res = (v - u) / t;
          return { result: res, steps: [`a = (v - u) / t`, `a = (${v} - ${u}) / ${t}`, `a = ${res.toFixed(3)} m/s²`], unit: 'm/s²' };
        } else {
          if (a === 0) throw new Error('Acceleration cannot be 0 for calculating time.');
          const res = (v - u) / a;
          if (res < 0) throw new Error('Calculated negative time. Check sign of velocity difference vs acceleration.');
          return { result: res, steps: [`t = (v - u) / a`, `t = (${v} - ${u}) / ${a}`, `t = ${res.toFixed(3)} s`], unit: 's' };
        }
      },
    },
  },
  {
    id: 'form-lin-s',
    name: 'Displacement under Uniform Acceleration',
    banglaName: 'সুষম ত্বরণে অতিক্রান্ত দূরত্ব / সরণ',
    category: 'linear_kinematics',
    latex: 's = ut + \\frac{1}{2}at^2',
    textbookNotation: 's = v_0 t + \\frac{1}{2}at^2',
    textbookSection: 'অনুচ্ছেদ ৩.৬',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Calculates the total straight-line displacement covered during time t when starting with velocity u and accelerating at constant rate a.',
    banglaExplanation: 'u আদিবেগ এবং a সুষম ত্বরণে t সময়ে কোনো বস্তুর মোট সরণ বা অতিক্রান্ত দূরত্ব নির্ণয়ের মূল সমীকরণ।',
    variables: [
      { symbol: 's', name: 'Displacement', banglaName: 'সরণ', unit: 'm', description: 'Net positional change', isVector: true },
      { symbol: 'u', name: 'Initial Velocity', banglaName: 'আদি বেগ', unit: 'm/s', description: 'Velocity at t = 0', isVector: true },
      { symbol: 'a', name: 'Acceleration', banglaName: 'ত্বরণ', unit: 'm/s²', description: 'Constant rate of acceleration', isVector: true },
      { symbol: 't', name: 'Time', banglaName: 'সময়', unit: 's', description: 'Total elapsed time' },
    ],
    conditions: ['Constant acceleration only', '1D motion along straight coordinate axis'],
    commonMistakes: ['Squaring the entire term (1/2 at)² instead of only t²', 'Forgetting negative sign when decelerating'],
    workedExample: {
      id: 'ex-s-lin',
      title: 'Car Braking to Stop',
      problemStatement: 'A car travelling at 25 m/s applies brakes and decelerates uniformly at 5 m/s² until it stops. Find the stopping distance.',
      givenData: [
        { symbol: 'u', value: '25', unit: 'm/s', description: 'Initial speed' },
        { symbol: 'a', value: '-5', unit: 'm/s²', description: 'Deceleration (negative)' },
        { symbol: 'v', value: '0', unit: 'm/s', description: 'Comes to stop' },
      ],
      targetVariable: { symbol: 's', unit: 'm', description: 'Stopping distance' },
      formulaUsed: 'v^2 = u^2 + 2as => s = -u^2 / (2a)',
      solutionSteps: [
        { step: 'Use v² = u² + 2as with v = 0', latex: '0 = 25^2 + 2(-5)s' },
        { step: 'Rearrange: 10s = 625', latex: 's = 62.5 \\text{ m}' },
      ],
      finalAnswer: '62.5 m',
      keyTakeaway: 'Braking acceleration is negative; always insert negative sign for deceleration.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 's', label: 'Displacement (s)', unit: 'm', defaultValue: 129.6 },
        { symbol: 'u', label: 'Initial Velocity (u)', unit: 'm/s', defaultValue: 0 },
        { symbol: 'a', label: 'Acceleration (a)', unit: 'm/s²', defaultValue: 1.8 },
        { symbol: 't', label: 'Time (t)', unit: 's', defaultValue: 12, min: 0.001 },
      ],
      solvableVariables: ['s', 'u', 'a'],
      solve: (target, vals) => {
        const { s, u, a, t } = vals;
        if (target === 's') {
          const res = u * t + 0.5 * a * t * t;
          return { result: res, steps: [`s = ut + 0.5at²`, `s = (${u} × ${t}) + 0.5 × ${a} × ${t}²`, `s = ${res.toFixed(3)} m`], unit: 'm' };
        } else if (target === 'u') {
          if (t === 0) throw new Error('Time cannot be zero.');
          const res = (s - 0.5 * a * t * t) / t;
          return { result: res, steps: [`u = (s - 0.5at²) / t`, `u = (${s} - 0.5 × ${a} × ${t}²) / ${t}`, `u = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else {
          if (t === 0) throw new Error('Time cannot be zero.');
          const res = (2 * (s - u * t)) / (t * t);
          return { result: res, steps: [`a = 2(s - ut) / t²`, `a = 2(${s} - ${u} × ${t}) / ${t}²`, `a = ${res.toFixed(3)} m/s²`], unit: 'm/s²' };
        }
      },
    },
  },
  {
    id: 'form-lin-v2',
    name: 'Velocity-Displacement Relation',
    banglaName: 'বেগ ও সরণের সম্পর্ক (সময়বিহীন সমীকরণ)',
    category: 'linear_kinematics',
    latex: 'v^2 = u^2 + 2as',
    textbookNotation: 'v^2 = v_0^2 + 2as',
    textbookSection: 'অনুচ্ছেদ ৩.৬',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Relates final velocity directly to initial velocity, acceleration, and displacement without needing the elapsed time.',
    banglaExplanation: 'সময় t এর মান সরাসরি উল্লেখ না থাকলে আদিবেগ, শেষ বেগ, ত্বরণ ও দূরত্বের মধ্যকার সম্পর্ক স্থাপনে এই সমীকরণ ব্যবহৃত হয়।',
    variables: [
      { symbol: 'v', name: 'Final Velocity', banglaName: 'শেষ বেগ', unit: 'm/s', description: 'Speed at final position' },
      { symbol: 'u', name: 'Initial Velocity', banglaName: 'আদি বেগ', unit: 'm/s', description: 'Speed at initial position' },
      { symbol: 'a', name: 'Acceleration', banglaName: 'ত্বরণ', unit: 'm/s²', description: 'Uniform acceleration' },
      { symbol: 's', name: 'Displacement', banglaName: 'সরণ', unit: 'm', description: 'Net distance along motion' },
    ],
    conditions: ['Constant acceleration', '1D path'],
    commonMistakes: ['Taking square root without considering directional sign (+ or -)'],
    workedExample: {
      id: 'ex-v2-lin',
      title: 'Bullet Penetrating Wood Block',
      problemStatement: 'A bullet moving at 300 m/s penetrates 0.12 m into a wooden block before stopping. Find the average resistive deceleration.',
      givenData: [
        { symbol: 'u', value: '300', unit: 'm/s', description: 'Initial speed' },
        { symbol: 'v', value: '0', unit: 'm/s', description: 'Final speed at rest' },
        { symbol: 's', value: '0.12', unit: 'm', description: 'Penetration distance' },
      ],
      targetVariable: { symbol: 'a', unit: 'm/s²', description: 'Deceleration' },
      formulaUsed: 'v^2 = u^2 + 2as',
      solutionSteps: [
        { step: 'Apply v² = u² + 2as', latex: '0 = 300^2 + 2a(0.12)' },
        { step: 'Solve for a', latex: '0.24 a = -90000 \\implies a = -3.75 \\times 10^5 \\text{ m/s}^2' },
      ],
      finalAnswer: '-375,000 m/s²',
      keyTakeaway: 'Extreme deceleration values are standard for bullet-impact problems.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'v', label: 'Final Velocity (v)', unit: 'm/s', defaultValue: 25 },
        { symbol: 'u', label: 'Initial Velocity (u)', unit: 'm/s', defaultValue: 10 },
        { symbol: 'a', label: 'Acceleration (a)', unit: 'm/s²', defaultValue: 3.5 },
        { symbol: 's', label: 'Displacement (s)', unit: 'm', defaultValue: 75 },
      ],
      solvableVariables: ['v', 'u', 'a', 's'],
      solve: (target, vals) => {
        const { v, u, a, s } = vals;
        if (target === 'v') {
          const val = u * u + 2 * a * s;
          if (val < 0) throw new Error('v² is negative! Physically impossible with given parameters.');
          const res = Math.sqrt(val);
          return { result: res, steps: [`v = √(u² + 2as)`, `v = √(${u}² + 2 × ${a} × ${s})`, `v = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else if (target === 'u') {
          const val = v * v - 2 * a * s;
          if (val < 0) throw new Error('u² is negative! Check inputs.');
          const res = Math.sqrt(val);
          return { result: res, steps: [`u = √(v² - 2as)`, `u = √(${v}² - 2 × ${a} × ${s})`, `u = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else if (target === 'a') {
          if (s === 0) throw new Error('Displacement s cannot be 0.');
          const res = (v * v - u * u) / (2 * s);
          return { result: res, steps: [`a = (v² - u²) / (2s)`, `a = (${v}² - ${u}²) / (2 × ${s})`, `a = ${res.toFixed(3)} m/s²`], unit: 'm/s²' };
        } else {
          if (a === 0) throw new Error('Acceleration a cannot be 0.');
          const res = (v * v - u * u) / (2 * a);
          return { result: res, steps: [`s = (v² - u²) / (2a)`, `s = (${v}² - ${u}²) / (2 × ${a})`, `s = ${res.toFixed(3)} m`], unit: 'm' };
        }
      },
    },
  },
  {
    id: 'form-lin-snth',
    name: 'Distance in the n-th Second',
    banglaName: 'n-তম সেকেন্ডে অতিক্রান্ত দূরত্ব',
    category: 'linear_kinematics',
    latex: 's_n = u + \\frac{1}{2}a(2n - 1)',
    textbookNotation: 's_t = v_0 + \\frac{1}{2}a(2t - 1)',
    textbookSection: 'অনুচ্ছেদ ৩.৬',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Calculates the distance traversed specifically during the single 1-second interval between t = (n - 1) and t = n.',
    banglaExplanation: 'কোনো বস্তু n-তম নির্দিষ্ট ১ সেকেন্ড সময়ে কতটুকু দূরত্ব অতিক্রম করে তা নির্ণয় করে। যেমন ৫ম সেকেন্ডে সরণ = (৫ সেকেন্ডে সরণ) - (৪ সেকেন্ডে সরণ)।',
    variables: [
      { symbol: 's_n', name: 'Distance in nth second', banglaName: 'n-তম সেকেন্ডে দূরত্ব', unit: 'm', description: 'Single-second displacement' },
      { symbol: 'u', name: 'Initial Velocity', banglaName: 'আদি বেগ', unit: 'm/s', description: 'Starting velocity' },
      { symbol: 'a', name: 'Acceleration', banglaName: 'ত্বরণ', unit: 'm/s²', description: 'Uniform acceleration rate' },
      { symbol: 'n', name: 'Second Index (n)', banglaName: 'সেকেন্ডের ক্রম (n)', unit: 's', description: 'Integer or fractional second mark' },
    ],
    conditions: ['Uniform acceleration', 'n must be ≥ 1'],
    commonMistakes: ['Confusing total distance s after n seconds with distance in the nth second s_n'],
    workedExample: {
      id: 'ex-snth',
      title: 'Train Accelerating from Station',
      problemStatement: 'A train starts from rest with acceleration a = 2.5 m/s². How far does it travel strictly during its 7th second?',
      givenData: [
        { symbol: 'u', value: '0', unit: 'm/s', description: 'Starts from rest' },
        { symbol: 'a', value: '2.5', unit: 'm/s²', description: 'Uniform acceleration' },
        { symbol: 'n', value: '7', unit: 's', description: '7th second interval' },
      ],
      targetVariable: { symbol: 's_7', unit: 'm', description: 'Distance in 7th second' },
      formulaUsed: 's_n = u + 0.5 a (2n - 1)',
      solutionSteps: [
        { step: 'Substitute into formula', latex: 's_7 = 0 + 0.5 \\times 2.5 \\times (2(7) - 1)' },
        { step: 'Evaluate parenthesis', latex: '2(7) - 1 = 13' },
        { step: 'Compute product', latex: 's_7 = 1.25 \\times 13 = 16.25 \\text{ m}' },
      ],
      finalAnswer: '16.25 m',
      keyTakeaway: 'Total distance after 7s is 0.5×2.5×49 = 61.25m, but during the 7th second alone it covers 16.25m.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 's_n', label: 'Distance in n-th second (s_n)', unit: 'm', defaultValue: 16.25 },
        { symbol: 'u', label: 'Initial Velocity (u)', unit: 'm/s', defaultValue: 0 },
        { symbol: 'a', label: 'Acceleration (a)', unit: 'm/s²', defaultValue: 2.5 },
        { symbol: 'n', label: 'Second Index (n)', unit: 's', defaultValue: 7, min: 1 },
      ],
      solvableVariables: ['s_n', 'u', 'a'],
      solve: (target, vals) => {
        const { s_n, u, a, n } = vals;
        const factor = 2 * n - 1;
        if (factor <= 0) throw new Error('n must be >= 1.');
        if (target === 's_n') {
          const res = u + 0.5 * a * factor;
          return { result: res, steps: [`s_n = u + 0.5a(2n - 1)`, `s_n = ${u} + 0.5 × ${a} × (2(${n}) - 1)`, `s_n = ${res.toFixed(3)} m`], unit: 'm' };
        } else if (target === 'u') {
          const res = s_n - 0.5 * a * factor;
          return { result: res, steps: [`u = s_n - 0.5a(2n - 1)`, `u = ${s_n} - 0.5 × ${a} × ${factor}`, `u = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else {
          const res = (2 * (s_n - u)) / factor;
          return { result: res, steps: [`a = 2(s_n - u) / (2n - 1)`, `a = 2(${s_n} - ${u}) / ${factor}`, `a = ${res.toFixed(3)} m/s²`], unit: 'm/s²' };
        }
      },
    },
  },
  {
    id: 'form-proj-h',
    name: 'Maximum Height of a Projectile',
    banglaName: 'প্রাসের সর্বাধিক উচ্চতা',
    category: 'projectile',
    latex: 'H = \\frac{u^2 \\sin^2 \\theta_0}{2g}',
    textbookNotation: 'H = \\frac{v_0^2 \\sin^2 \\theta_0}{2g}',
    textbookSection: 'অনুচ্ছেদ ৩.১০',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Calculates the highest vertical elevation reached by a projectile above its point of projection.',
    banglaExplanation: 'প্রক্ষেপকটি তার গতিপথে উল্লম্ব দিকে সর্বোচ্চ যে উচ্চতা অর্জন করে, যেখানে তার উল্লম্ব বেগ সাময়িকভাবে শূন্য হয়।',
    variables: [
      { symbol: 'H', name: 'Max Height', banglaName: 'সর্বাধিক উচ্চতা', unit: 'm', description: 'Peak vertical position' },
      { symbol: 'u', name: 'Launch Speed', banglaName: 'নিক্ষেপণ বেগ', unit: 'm/s', description: 'Initial projection speed' },
      { symbol: 'theta_0', name: 'Launch Angle', banglaName: 'নিক্ষেপণ কোণ', unit: 'degrees', description: 'Angle made with horizontal' },
      { symbol: 'g', name: 'Gravitational Accel.', banglaName: 'অভিকর্ষজ ত্বরণ', unit: 'm/s²', description: 'Standard: 9.8 m/s²' },
    ],
    conditions: ['Negligible air drag', 'Launch and peak in uniform gravity g', 'Angle measured from horizontal ground'],
    commonMistakes: ['Confusing sin²θ with sin(2θ)', 'Using degrees directly in radian math functions in code'],
    workedExample: {
      id: 'ex-proj-h',
      title: 'Cricket Ball Struck Obliquely',
      problemStatement: 'A batsman strikes a cricket ball at speed u = 40 m/s at an angle of 30° to the horizontal. Calculate the maximum height attained (g = 9.8 m/s²). [Board Exam Classic]',
      givenData: [
        { symbol: 'u', value: '40', unit: 'm/s', description: 'Initial velocity' },
        { symbol: 'theta_0', value: '30', unit: 'degrees', description: 'Launch angle' },
        { symbol: 'g', value: '9.8', unit: 'm/s²', description: 'Acceleration due to gravity' },
      ],
      targetVariable: { symbol: 'H', unit: 'm', description: 'Maximum height' },
      formulaUsed: 'H = (u² sin² θ_0) / (2g)',
      solutionSteps: [
        { step: 'Calculate vertical component: u sin 30° = 40 × 0.5 = 20 m/s', latex: 'u_y = 40 \\sin 30^\\circ = 20 \\text{ m/s}' },
        { step: 'Apply peak height equation', latex: 'H = \\frac{20^2}{2 \\times 9.8} = \\frac{400}{19.6}' },
        { step: 'Compute final result', latex: 'H = 20.408 \\text{ m}' },
      ],
      finalAnswer: '20.41 m',
      keyTakeaway: 'At the maximum height, only vertical velocity is zero; horizontal velocity remains u cos θ = 34.64 m/s.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'H', label: 'Max Height (H)', unit: 'm', defaultValue: 20.41 },
        { symbol: 'u', label: 'Launch Speed (u)', unit: 'm/s', defaultValue: 40, min: 0.1 },
        { symbol: 'theta_0', label: 'Angle (θ₀)', unit: 'deg', defaultValue: 30, min: 0, max: 90 },
        { symbol: 'g', label: 'Gravity (g)', unit: 'm/s²', defaultValue: 9.8, min: 0.1 },
      ],
      solvableVariables: ['H', 'u', 'theta_0'],
      solve: (target, vals) => {
        const { H, u, theta_0, g } = vals;
        const rad = (theta_0 * Math.PI) / 180;
        if (target === 'H') {
          const sinVal = Math.sin(rad);
          const res = (u * u * sinVal * sinVal) / (2 * g);
          return { result: res, steps: [`H = (u² sin² θ) / (2g)`, `H = (${u}² × sin²(${theta_0}°)) / (2 × ${g})`, `H = ${res.toFixed(3)} m`], unit: 'm' };
        } else if (target === 'u') {
          const sinVal = Math.sin(rad);
          if (sinVal === 0) throw new Error('Angle cannot be 0° to reach positive height.');
          const res = Math.sqrt((2 * g * H) / (sinVal * sinVal));
          return { result: res, steps: [`u = √(2gH) / sin θ`, `u = √(2 × ${g} × ${H}) / sin(${theta_0}°)`, `u = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else {
          const val = (2 * g * H) / (u * u);
          if (val > 1 || val < 0) throw new Error('Required height exceeds maximum possible height for given speed u.');
          const sinVal = Math.sqrt(val);
          const deg = (Math.asin(sinVal) * 180) / Math.PI;
          return { result: deg, steps: [`sin θ = √(2gH) / u`, `θ = arcsin(√(${2 * g * H} / ${u * u}))`, `θ = ${deg.toFixed(2)}°`], unit: 'deg' };
        }
      },
    },
  },
  {
    id: 'form-proj-t',
    name: 'Time of Flight of a Projectile',
    banglaName: 'প্রাসের বিচরণকাল বা উড্ডয়নকাল',
    category: 'projectile',
    latex: 'T = \\frac{2 u \\sin \\theta_0}{g}',
    textbookNotation: 'T = \\frac{2 v_0 \\sin \\theta_0}{g}',
    textbookSection: 'অনুচ্ছেদ ৩.১০',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Computes total time duration that the projectile spends flying through the air before returning to the ground plane.',
    banglaExplanation: 'প্রক্ষেপকটি শূন্যে নিক্ষিপ্ত হওয়ার পর পুনরায় ভূমিতে ফিরে আসতে মোট যে সময় লাগে।',
    variables: [
      { symbol: 'T', name: 'Time of Flight', banglaName: 'বিচরণকাল', unit: 's', description: 'Total time in air' },
      { symbol: 'u', name: 'Launch Speed', banglaName: 'নিক্ষেপণ বেগ', unit: 'm/s', description: 'Initial speed' },
      { symbol: 'theta_0', name: 'Launch Angle', banglaName: 'নিক্ষেপণ কোণ', unit: 'degrees', description: 'Angle above horizontal' },
      { symbol: 'g', name: 'Gravity', banglaName: 'অভিকর্ষজ ত্বরণ', unit: 'm/s²', description: 'Standard: 9.8 m/s²' },
    ],
    conditions: ['Landing point at same horizontal elevation as launch point'],
    commonMistakes: ['Confusing time to reach peak t = u sin θ / g with total flight time T = 2 u sin θ / g'],
    workedExample: {
      id: 'ex-proj-t',
      title: 'Football Hanging in Air',
      problemStatement: 'A goalkeeper punts a soccer ball with u = 25 m/s at 45°. How long does the ball hang in the air before hitting the pitch?',
      givenData: [
        { symbol: 'u', value: '25', unit: 'm/s', description: 'Kick speed' },
        { symbol: 'theta_0', value: '45', unit: 'degrees', description: 'Angle' },
        { symbol: 'g', value: '9.8', unit: 'm/s²', description: 'Gravity' },
      ],
      targetVariable: { symbol: 'T', unit: 's', description: 'Hang time' },
      formulaUsed: 'T = (2 u sin θ_0) / g',
      solutionSteps: [
        { step: 'Evaluate numerator: 2 × 25 × sin 45° = 50 × 0.7071 = 35.355', latex: '2u \\sin 45^\\circ = 35.355' },
        { step: 'Divide by g = 9.8', latex: 'T = \\frac{35.355}{9.8} = 3.608 \\text{ s}' },
      ],
      finalAnswer: '3.61 s',
      keyTakeaway: 'Hang time depends solely on the vertical velocity component u_y = u sin θ.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'T', label: 'Time of Flight (T)', unit: 's', defaultValue: 3.61 },
        { symbol: 'u', label: 'Launch Speed (u)', unit: 'm/s', defaultValue: 25, min: 0.1 },
        { symbol: 'theta_0', label: 'Angle (θ₀)', unit: 'deg', defaultValue: 45, min: 0, max: 90 },
        { symbol: 'g', label: 'Gravity (g)', unit: 'm/s²', defaultValue: 9.8, min: 0.1 },
      ],
      solvableVariables: ['T', 'u', 'theta_0'],
      solve: (target, vals) => {
        const { T, u, theta_0, g } = vals;
        const rad = (theta_0 * Math.PI) / 180;
        if (target === 'T') {
          const res = (2 * u * Math.sin(rad)) / g;
          return { result: res, steps: [`T = 2u sin θ / g`, `T = 2 × ${u} × sin(${theta_0}°) / ${g}`, `T = ${res.toFixed(3)} s`], unit: 's' };
        } else if (target === 'u') {
          const sinVal = Math.sin(rad);
          if (sinVal === 0) throw new Error('Angle cannot be 0 for flight.');
          const res = (g * T) / (2 * sinVal);
          return { result: res, steps: [`u = gT / (2 sin θ)`, `u = (${g} × ${T}) / (2 × sin(${theta_0}°))`, `u = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else {
          const val = (g * T) / (2 * u);
          if (val > 1) throw new Error('Time of flight too long for given launch speed.');
          const deg = (Math.asin(val) * 180) / Math.PI;
          return { result: deg, steps: [`sin θ = gT / 2u`, `θ = arcsin((${g} × ${T}) / (2 × ${u}))`, `θ = ${deg.toFixed(2)}°`], unit: 'deg' };
        }
      },
    },
  },
  {
    id: 'form-proj-r',
    name: 'Horizontal Range of a Projectile',
    banglaName: 'প্রাসের অনুভূমিক পাল্লা',
    category: 'projectile',
    latex: 'R = \\frac{u^2 \\sin 2\\theta_0}{g}',
    textbookNotation: 'R = \\frac{v_0^2 \\sin 2\\theta_0}{g}',
    textbookSection: 'অনুচ্ছেদ ৩.১০',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Calculates the horizontal distance traveled from launch point to the point where the projectile lands on the same horizontal level. Maximum at 45° where sin(2θ) = 1.',
    banglaExplanation: 'প্রক্ষেপক যে বিন্দু হতে নিক্ষিপ্ত হয় এবং পুনরায় ভূমিতে ফিরে আসে তাদের মধ্যবর্তী অনুভূমিক দূরত্ব। ৪৫° কোণে নিক্ষেপ করলে সর্বাধিক পাল্লা R_max = u²/g পাওয়া যায়।',
    variables: [
      { symbol: 'R', name: 'Horizontal Range', banglaName: 'অনুভূমিক পাল্লা', unit: 'm', description: 'Total horizontal distance' },
      { symbol: 'u', name: 'Launch Speed', banglaName: 'নিক্ষেপণ বেগ', unit: 'm/s', description: 'Initial velocity' },
      { symbol: 'theta_0', name: 'Launch Angle', banglaName: 'নিক্ষেপণ কোণ', unit: 'degrees', description: 'Angle relative to ground' },
      { symbol: 'g', name: 'Gravity', banglaName: 'অভিকর্ষজ ত্বরণ', unit: 'm/s²', description: 'Standard: 9.8 m/s²' },
    ],
    conditions: ['Landing at same horizontal level as launch', 'Negligible air resistance'],
    commonMistakes: ['Entering sin²(2θ) instead of sin(2θ)', 'Forgetting that complementary angles θ and 90°-θ yield identical ranges R'],
    workedExample: {
      id: 'ex-proj-r',
      title: 'Cumilla Board 2017: Identical Range for Two Angles',
      problemStatement: 'Two football players kick balls at the exact same initial speed u = 10 m/s, one at 30° and the other at 60°. Calculate the range for both balls.',
      givenData: [
        { symbol: 'u', value: '10', unit: 'm/s', description: 'Speed of kick' },
        { symbol: 'theta_1', value: '30', unit: 'degrees', description: '1st player angle' },
        { symbol: 'theta_2', value: '60', unit: 'degrees', description: '2nd player angle' },
        { symbol: 'g', value: '9.8', unit: 'm/s²', description: 'Gravity' },
      ],
      targetVariable: { symbol: 'R', unit: 'm', description: 'Horizontal range' },
      formulaUsed: 'R = (u² sin 2θ) / g',
      solutionSteps: [
        { step: 'For 30°: 2θ = 60°, sin 60° = √3 / 2 = 0.8660', latex: 'R_1 = \\frac{10^2 \\sin 60^\\circ}{9.8} = \\frac{100 \\times 0.866}{9.8} = 8.837 \\text{ m}' },
        { step: 'For 60°: 2θ = 120°, sin 120° = sin(180° - 60°) = sin 60° = 0.8660', latex: 'R_2 = \\frac{10^2 \\sin 120^\\circ}{9.8} = \\frac{100 \\times 0.866}{9.8} = 8.837 \\text{ m}' },
      ],
      finalAnswer: '8.84 m for both balls!',
      keyTakeaway: 'Complementary angles θ and (90° - θ) produce identical ranges, but different heights and flight times!',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'R', label: 'Horizontal Range (R)', unit: 'm', defaultValue: 8.84 },
        { symbol: 'u', label: 'Launch Speed (u)', unit: 'm/s', defaultValue: 10, min: 0.1 },
        { symbol: 'theta_0', label: 'Angle (θ₀)', unit: 'deg', defaultValue: 30, min: 0, max: 90 },
        { symbol: 'g', label: 'Gravity (g)', unit: 'm/s²', defaultValue: 9.8, min: 0.1 },
      ],
      solvableVariables: ['R', 'u', 'theta_0'],
      solve: (target, vals) => {
        const { R, u, theta_0, g } = vals;
        const rad2 = (2 * theta_0 * Math.PI) / 180;
        if (target === 'R') {
          const res = (u * u * Math.sin(rad2)) / g;
          return { result: res, steps: [`R = (u² sin 2θ) / g`, `R = (${u}² × sin(${2 * theta_0}°)) / ${g}`, `R = ${res.toFixed(3)} m`], unit: 'm' };
        } else if (target === 'u') {
          const sinVal = Math.sin(rad2);
          if (sinVal <= 0) throw new Error('Range is zero at 0° or 90°.');
          const res = Math.sqrt((R * g) / sinVal);
          return { result: res, steps: [`u = √(Rg / sin 2θ)`, `u = √(${R} × ${g} / sin(${2 * theta_0}°))`, `u = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else {
          const val = (R * g) / (u * u);
          if (val > 1) throw new Error('Requested range exceeds maximum range u²/g for this speed.');
          const twoThetaDeg = (Math.asin(val) * 180) / Math.PI;
          const thetaDeg = twoThetaDeg / 2;
          return { result: thetaDeg, steps: [`sin 2θ = Rg / u²`, `2θ = arcsin(${val.toFixed(3)}) = ${twoThetaDeg.toFixed(2)}°`, `θ = ${thetaDeg.toFixed(2)}° (or ${ (90 - thetaDeg).toFixed(2) }°)`], unit: 'deg' };
        }
      },
    },
  },
  {
    id: 'form-circ-w',
    name: 'Angular Velocity & Linear Speed Relation',
    banglaName: 'কৌণিক বেগ ও রৈখিক বেগের সম্পর্ক',
    category: 'circular_motion',
    latex: 'v = \\omega r, \\quad \\omega = 2\\pi f = \\frac{2\\pi}{T}',
    textbookNotation: 'v = \\omega r, \\quad \\omega = 2\\pi f',
    textbookSection: 'অনুচ্ছেদ ৩.১১',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Relates linear tangential speed v to angular rotation speed ω and path radius r. Also expresses ω in terms of frequency f and period T.',
    banglaExplanation: 'বৃত্তাকার পথে ঘূর্ণায়মান কোনো কণার রৈখিক বেগ v এবং কৌণিক বেগ ω এর মধ্যবর্তী মৌলিক সম্পর্ক v = ω r।',
    variables: [
      { symbol: 'v', name: 'Tangential Speed', banglaName: 'রৈখিক দ্রুতি', unit: 'm/s', description: 'Instantaneous speed along tangent' },
      { symbol: 'omega', name: 'Angular Velocity', banglaName: 'কৌণিক বেগ', unit: 'rad/s', description: 'Rate of angular rotation' },
      { symbol: 'r', name: 'Radius', banglaName: 'ব্যাসার্ধ', unit: 'm', description: 'Distance from axis of rotation' },
      { symbol: 'f', name: 'Frequency', banglaName: 'কম্পাঙ্ক', unit: 'Hz or rev/s', description: 'Rotations per second' },
    ],
    conditions: ['Circular path of fixed radius r'],
    commonMistakes: ['Using rpm directly without converting to rad/s (multiply by 2π/60)', 'Forgetting that points at different radii on same rotating disc have equal ω but different v'],
    workedExample: {
      id: 'ex-circ-fan',
      title: 'Ceiling Fan Blade Speed (Board Question Classic)',
      problemStatement: 'A ceiling fan rotates at 300 rpm. A speck of dust is stuck at radius r = 0.6 m on a blade. What is its angular velocity and linear speed?',
      givenData: [
        { symbol: 'N', value: '300', unit: 'rpm', description: 'Revolutions per minute' },
        { symbol: 'r', value: '0.6', unit: 'm', description: 'Radius from center' },
      ],
      targetVariable: { symbol: 'v', unit: 'm/s', description: 'Linear speed' },
      formulaUsed: 'ω = 2π N / 60, v = ω r',
      solutionSteps: [
        { step: 'Convert rpm to rad/s', latex: '\\omega = \\frac{2\\pi \\times 300}{60} = 10\\pi = 31.416 \\text{ rad/s}' },
        { step: 'Compute tangential velocity v = ω r', latex: 'v = 31.416 \\times 0.6 = 18.85 \\text{ m/s}' },
      ],
      finalAnswer: 'ω = 31.42 rad/s, v = 18.85 m/s',
      keyTakeaway: 'All points on a rigid rotating body share the exact same angular velocity ω, but linear velocity scales directly with radius r.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'v', label: 'Linear Speed (v)', unit: 'm/s', defaultValue: 18.85 },
        { symbol: 'omega', label: 'Angular Velocity (ω)', unit: 'rad/s', defaultValue: 31.42 },
        { symbol: 'r', label: 'Radius (r)', unit: 'm', defaultValue: 0.6, min: 0.001 },
      ],
      solvableVariables: ['v', 'omega', 'r'],
      solve: (target, vals) => {
        const { v, omega, r } = vals;
        if (target === 'v') {
          const res = omega * r;
          return { result: res, steps: [`v = ω r`, `v = ${omega} × ${r}`, `v = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else if (target === 'omega') {
          if (r === 0) throw new Error('Radius cannot be zero.');
          const res = v / r;
          return { result: res, steps: [`ω = v / r`, `ω = ${v} / ${r}`, `ω = ${res.toFixed(3)} rad/s`], unit: 'rad/s' };
        } else {
          if (omega === 0) throw new Error('Angular velocity cannot be zero.');
          const res = v / omega;
          return { result: res, steps: [`r = v / ω`, `r = ${v} / ${omega}`, `r = ${res.toFixed(3)} m`], unit: 'm' };
        }
      },
    },
  },
  {
    id: 'form-circ-ac',
    name: 'Centripetal Acceleration',
    banglaName: 'কেন্দ্রমুখী ত্বরণ',
    category: 'circular_motion',
    latex: 'a_c = \\frac{v^2}{r} = \\omega^2 r',
    textbookNotation: 'a = \\frac{v^2}{r} = \\omega^2 r',
    textbookSection: 'অনুচ্ছেদ ৩.১২',
    isOfficialChapter3: true,
    plainEnglishExplanation: 'Calculates the inward radial acceleration required to keep a particle traveling in a circle of radius r at speed v.',
    banglaExplanation: 'বৃত্তাকার পথে ধ্রুব দ্রুতিতে চলমান কোনো বস্তুর বেগের দিক প্রতিনিয়ত পরিবর্তন করার জন্য কেন্দ্রের দিকে যে ত্বরণ ক্রিয়াশীল থাকে।',
    variables: [
      { symbol: 'a_c', name: 'Centripetal Acceleration', banglaName: 'কেন্দ্রমুখী ত্বরণ', unit: 'm/s²', description: 'Radial inward acceleration' },
      { symbol: 'v', name: 'Tangential Speed', banglaName: 'রৈখিক বেগ', unit: 'm/s', description: 'Speed along circle' },
      { symbol: 'r', name: 'Radius', banglaName: 'বৃত্তাকার ব্যাসার্ধ', unit: 'm', description: 'Radius of circle' },
    ],
    conditions: ['Circular path', 'Direction is radially inward toward center'],
    commonMistakes: ['Thinking uniform circular motion has zero acceleration because speed is constant (velocity direction changes continuously!)'],
    workedExample: {
      id: 'ex-circ-ac',
      title: 'Car Rounding a Highway Curve',
      problemStatement: 'A racecar navigates a curved circular track of radius 150 m at a constant speed of 30 m/s. What centripetal acceleration does it experience?',
      givenData: [
        { symbol: 'v', value: '30', unit: 'm/s', description: 'Speed of car' },
        { symbol: 'r', value: '150', unit: 'm', description: 'Track radius' },
      ],
      targetVariable: { symbol: 'a_c', unit: 'm/s²', description: 'Centripetal acceleration' },
      formulaUsed: 'a_c = v² / r',
      solutionSteps: [
        { step: 'Substitute v and r', latex: 'a_c = \\frac{30^2}{150} = \\frac{900}{150}' },
        { step: 'Calculate result', latex: 'a_c = 6.0 \\text{ m/s}^2' },
      ],
      finalAnswer: '6.0 m/s²',
      keyTakeaway: 'This acceleration is provided by friction between the car tires and the road surface.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'a_c', label: 'Centripetal Accel. (a_c)', unit: 'm/s²', defaultValue: 6.0 },
        { symbol: 'v', label: 'Speed (v)', unit: 'm/s', defaultValue: 30, min: 0.1 },
        { symbol: 'r', label: 'Radius (r)', unit: 'm', defaultValue: 150, min: 0.1 },
      ],
      solvableVariables: ['a_c', 'v', 'r'],
      solve: (target, vals) => {
        const { a_c, v, r } = vals;
        if (target === 'a_c') {
          const res = (v * v) / r;
          return { result: res, steps: [`a_c = v² / r`, `a_c = ${v}² / ${r}`, `a_c = ${res.toFixed(3)} m/s²`], unit: 'm/s²' };
        } else if (target === 'v') {
          const res = Math.sqrt(a_c * r);
          return { result: res, steps: [`v = √(a_c × r)`, `v = √(${a_c} × ${r})`, `v = ${res.toFixed(3)} m/s`], unit: 'm/s' };
        } else {
          if (a_c === 0) throw new Error('Acceleration cannot be 0.');
          const res = (v * v) / a_c;
          return { result: res, steps: [`r = v² / a_c`, `r = ${v}² / ${a_c}`, `r = ${res.toFixed(3)} m`], unit: 'm' };
        }
      },
    },
  },
  {
    id: 'form-force-fma',
    name: 'Newton\'s Second Law of Motion',
    banglaName: 'নিউটনের গতির দ্বিতীয় সূত্র',
    category: 'forces_momentum',
    latex: 'F = ma',
    textbookNotation: 'F = ma = \\frac{dp}{dt}',
    textbookSection: 'অনুচ্ছেদ ৪.২',
    isOfficialChapter3: false,
    plainEnglishExplanation: 'Calculates the net external force required to accelerate an object of mass m at rate a.',
    banglaExplanation: 'বস্তুর ভরবেগের পরিবর্তনের হার তার উপর প্রযুক্ত বলের সমানুপাতিক এবং বল যেদিকে ক্রিয়া করে ভরবেগের পরিবর্তনও সেদিকে ঘটে। ধ্রুব ভরের ক্ষেত্রে F = ma।',
    variables: [
      { symbol: 'F', name: 'Net Force', banglaName: 'নিট প্রযুক্ত বল', unit: 'N', description: 'Net vector force', isVector: true },
      { symbol: 'm', name: 'Mass', banglaName: 'ভর', unit: 'kg', description: 'Measure of object inertia' },
      { symbol: 'a', name: 'Acceleration', banglaName: 'ত্বরণ', unit: 'm/s²', description: 'Resulting acceleration', isVector: true },
    ],
    conditions: ['Mass m must remain constant', 'F must be the NET external resultant force'],
    commonMistakes: ['Substituting an individual applied force instead of subtracting friction to get net force'],
    workedExample: {
      id: 'ex-fma',
      title: 'Accelerating a Sled on Rough Ground',
      problemStatement: 'A 50 kg sled is pulled horizontally with a force of 180 N across rough snow where opposing friction is 30 N. Find its acceleration.',
      givenData: [
        { symbol: 'm', value: '50', unit: 'kg', description: 'Mass of sled' },
        { symbol: 'F_pull', value: '180', unit: 'N', description: 'Applied pull' },
        { symbol: 'f_friction', value: '30', unit: 'N', description: 'Opposing friction' },
      ],
      targetVariable: { symbol: 'a', unit: 'm/s²', description: 'Acceleration' },
      formulaUsed: 'F_net = F_pull - f = ma => a = F_net / m',
      solutionSteps: [
        { step: 'Calculate net horizontal force', latex: 'F_{net} = 180 - 30 = 150 \\text{ N}' },
        { step: 'Apply a = F_net / m', latex: 'a = \\frac{150}{50} = 3.0 \\text{ m/s}^2' },
      ],
      finalAnswer: '3.0 m/s²',
      keyTakeaway: 'Always sum forces to find net force before applying F = ma.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'F', label: 'Net Force (F)', unit: 'N', defaultValue: 150 },
        { symbol: 'm', label: 'Mass (m)', unit: 'kg', defaultValue: 50, min: 0.001 },
        { symbol: 'a', label: 'Acceleration (a)', unit: 'm/s²', defaultValue: 3.0 },
      ],
      solvableVariables: ['F', 'm', 'a'],
      solve: (target, vals) => {
        const { F, m, a } = vals;
        if (target === 'F') {
          const res = m * a;
          return { result: res, steps: [`F = ma`, `F = ${m} × ${a}`, `F = ${res.toFixed(3)} N`], unit: 'N' };
        } else if (target === 'm') {
          if (a === 0) throw new Error('Acceleration cannot be 0.');
          const res = F / a;
          return { result: res, steps: [`m = F / a`, `m = ${F} / ${a}`, `m = ${res.toFixed(3)} kg`], unit: 'kg' };
        } else {
          if (m <= 0) throw new Error('Mass must be positive.');
          const res = F / m;
          return { result: res, steps: [`a = F / m`, `a = ${F} / ${m}`, `a = ${res.toFixed(3)} m/s²`], unit: 'm/s²' };
        }
      },
    },
  },
  {
    id: 'form-force-impulse',
    name: 'Impulse-Momentum Theorem',
    banglaName: 'বলের ঘাত ও ভরবেগের পরিবর্তন',
    category: 'forces_momentum',
    latex: 'J = F \\Delta t = \\Delta p = m(v - u)',
    textbookNotation: 'J = F \\Delta t = m(v - u)',
    textbookSection: 'অনুচ্ছেদ ৪.৬',
    isOfficialChapter3: false,
    plainEnglishExplanation: 'States that the impulse applied to a body (average force multiplied by duration) equals its resulting change in momentum.',
    banglaExplanation: 'কোনো বস্তুর উপর প্রযুক্ত বলের ঘাত তার রৈখিক ভরবেগের পরিবর্তনের সমান। বলের ঘাত J = F × Δt = m(v - u)।',
    variables: [
      { symbol: 'J', name: 'Impulse', banglaName: 'বলের ঘাত', unit: 'N·s', description: 'Force integrated over time' },
      { symbol: 'F', name: 'Average Force', banglaName: 'গড় বল', unit: 'N', description: 'Average impact force' },
      { symbol: 'dt', name: 'Contact Duration', banglaName: 'ক্রিয়াকাল (Δt)', unit: 's', description: 'Duration of collision' },
      { symbol: 'dp', name: 'Momentum Change', banglaName: 'ভরবেগের পরিবর্তন', unit: 'kg·m/s', description: 'Final p minus initial p' },
    ],
    conditions: ['Collision or impact where force acts over short interval Δt'],
    commonMistakes: ['Confusing Impulsive Force (huge force F) with Impulse of Force (product F Δt)'],
    workedExample: {
      id: 'ex-impulse',
      title: 'Catching a Fast Cricket Ball',
      problemStatement: 'A cricket ball of mass 0.16 kg traveling at 30 m/s is caught by a fielder. (a) If stopped in 0.02s without pulling hands, find average force. (b) If fielder pulls hands back, increasing time to 0.15s, what is the force?',
      givenData: [
        { symbol: 'm', value: '0.16', unit: 'kg', description: 'Ball mass' },
        { symbol: 'u', value: '30', unit: 'm/s', description: 'Incoming speed' },
        { symbol: 'v', value: '0', unit: 'm/s', description: 'Brought to rest' },
      ],
      targetVariable: { symbol: 'F', unit: 'N', description: 'Force felt on palms' },
      formulaUsed: 'F = m(v - u) / Δt',
      solutionSteps: [
        { step: 'Change in momentum Δp = 0.16 × (0 - 30) = -4.8 kg·m/s', latex: '\\Delta p = -4.8 \\text{ kg m/s}' },
        { step: 'Case (a): F = 4.8 / 0.02 = 240 N (painful shock!)', latex: 'F_1 = 240 \\text{ N}' },
        { step: 'Case (b): F = 4.8 / 0.15 = 32 N (cushioned catch)', latex: 'F_2 = 32 \\text{ N}' },
      ],
      finalAnswer: '240 N without follow-through vs 32 N with pulled hands',
      keyTakeaway: 'Increasing contact time Δt proportionally diminishes the impact force F.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'J', label: 'Impulse (J)', unit: 'N·s', defaultValue: 4.8 },
        { symbol: 'F', label: 'Average Force (F)', unit: 'N', defaultValue: 32 },
        { symbol: 'dt', label: 'Duration (Δt)', unit: 's', defaultValue: 0.15, min: 0.001 },
      ],
      solvableVariables: ['J', 'F', 'dt'],
      solve: (target, vals) => {
        const { J, F, dt } = vals;
        if (target === 'J') {
          const res = F * dt;
          return { result: res, steps: [`J = F × Δt`, `J = ${F} × ${dt}`, `J = ${res.toFixed(3)} N·s`], unit: 'N·s' };
        } else if (target === 'F') {
          if (dt <= 0) throw new Error('Time duration must be positive.');
          const res = J / dt;
          return { result: res, steps: [`F = J / Δt`, `F = ${J} / ${dt}`, `F = ${res.toFixed(3)} N`], unit: 'N' };
        } else {
          if (F === 0) throw new Error('Force cannot be 0.');
          const res = J / F;
          return { result: res, steps: [`Δt = J / F`, `Δt = ${J} / ${F}`, `Δt = ${res.toFixed(4)} s`], unit: 's' };
        }
      },
    },
  },
  {
    id: 'form-pulley-atwood',
    name: 'Atwood Machine Acceleration and Tension',
    banglaName: 'অ্যাটউড মেশিন ও কপিকলের ত্বরণ ও সুতার টান',
    category: 'friction_pulley',
    latex: 'a = \\frac{m_2 - m_1}{m_1 + m_2}g, \\quad T = \\frac{2m_1 m_2}{m_1 + m_2}g',
    textbookNotation: 'a = \\frac{m_2 - m_1}{m_1 + m_2}g, \\quad T = \\frac{2m_1 m_2}{m_1 + m_2}g',
    textbookSection: 'অনুচ্ছেদ ৪.৮',
    isOfficialChapter3: false,
    plainEnglishExplanation: 'Calculates the downward acceleration of the heavier mass m₂ and the resulting tension in the inextensible cord connecting both masses over a frictionless pulley.',
    banglaExplanation: 'হালকা ঘর্ষণহীন কপিকলের দুই পাশে ঝুলন্ত m₁ ও m₂ (m₂ > m₁) ভরের ক্ষেত্রে ব্যবস্থার ত্বরণ এবং সুতার টান নির্ণয়।',
    variables: [
      { symbol: 'a', name: 'System Acceleration', banglaName: 'ব্যবস্থার ত্বরণ', unit: 'm/s²', description: 'Acceleration of both masses' },
      { symbol: 'T', name: 'Rope Tension', banglaName: 'সুতার টান', unit: 'N', description: 'Internal tension along string' },
      { symbol: 'm1', name: 'Mass 1 (Lighter)', banglaName: 'ভর ১', unit: 'kg', description: 'Mass rising upwards' },
      { symbol: 'm2', name: 'Mass 2 (Heavier)', banglaName: 'ভর ২', unit: 'kg', description: 'Mass descending downwards' },
      { symbol: 'g', name: 'Gravity', banglaName: 'অভিকর্ষজ ত্বরণ', unit: 'm/s²', description: 'Standard: 9.8 m/s²' },
    ],
    conditions: ['Frictionless, massless pulley', 'Inextensible massless cord', 'm₂ > m₁ for downward motion of mass 2'],
    commonMistakes: ['Forgetting the factor of 2 in tension formula: T = 2 m1 m2 g / (m1 + m2)'],
    workedExample: {
      id: 'ex-pulley',
      title: 'Atwood Machine with 3 kg and 5 kg Masses',
      problemStatement: 'Two masses m1 = 3 kg and m2 = 5 kg are hung over an ideal pulley. Calculate the acceleration of the system and the tension in the cord (g = 9.8 m/s²).',
      givenData: [
        { symbol: 'm1', value: '3', unit: 'kg', description: 'Lighter mass' },
        { symbol: 'm2', value: '5', unit: 'kg', description: 'Heavier mass' },
        { symbol: 'g', value: '9.8', unit: 'm/s²', description: 'Gravity' },
      ],
      targetVariable: { symbol: 'a & T', unit: 'm/s² & N', description: 'Acceleration and Tension' },
      formulaUsed: 'a = ((m2 - m1)/(m1 + m2))g, T = (2 m1 m2 / (m1 + m2))g',
      solutionSteps: [
        { step: 'Sum of masses = 8 kg; Difference = 2 kg', latex: 'm_2 - m_1 = 2, \\quad m_1 + m_2 = 8' },
        { step: 'Acceleration a = (2/8) × 9.8 = 0.25 × 9.8', latex: 'a = 2.45 \\text{ m/s}^2' },
        { step: 'Tension T = (2 × 3 × 5 × 9.8) / 8 = 294 / 8', latex: 'T = 36.75 \\text{ N}' },
      ],
      finalAnswer: 'a = 2.45 m/s², T = 36.75 N',
      keyTakeaway: 'Tension is greater than m1 g (36.75 > 29.4) so m1 accelerates up; T is less than m2 g (36.75 < 49.0) so m2 accelerates down.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'm1', label: 'Mass 1 (m₁)', unit: 'kg', defaultValue: 3, min: 0.1 },
        { symbol: 'm2', label: 'Mass 2 (m₂)', unit: 'kg', defaultValue: 5, min: 0.1 },
        { symbol: 'g', label: 'Gravity (g)', unit: 'm/s²', defaultValue: 9.8, min: 0.1 },
      ],
      solvableVariables: ['a', 'T'],
      solve: (target, vals) => {
        const { m1, m2, g } = vals;
        const sum = m1 + m2;
        if (target === 'a') {
          const res = ((m2 - m1) / sum) * g;
          return { result: res, steps: [`a = ((m₂ - m₁) / (m₁ + m₂)) × g`, `a = ((${m2} - ${m1}) / ${sum}) × ${g}`, `a = ${res.toFixed(3)} m/s²`], unit: 'm/s²' };
        } else {
          const res = ((2 * m1 * m2) / sum) * g;
          return { result: res, steps: [`T = (2m₁m₂ / (m₁ + m₂)) × g`, `T = (2 × ${m1} × ${m2} / ${sum}) × ${g}`, `T = ${res.toFixed(3)} N`], unit: 'N' };
        }
      },
    },
  },
];
