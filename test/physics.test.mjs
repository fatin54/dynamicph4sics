/**
 * Mathematical Physics Unit Test Suite for HSC Dynamics Lab
 * Validates analytical equations against Bangladesh NCTB textbook standards
 * and Board Examination questions (Dhaka, Cumilla, Rajshahi).
 */

import assert from 'node:assert/strict';

console.log('🧪 Starting HSC Dynamics Lab Mathematical Unit Tests...\n');

const g = 9.8; // NCTB Standard gravitational acceleration (m/s²)
const EPSILON = 1e-4; // Numerical tolerance

function approxEqual(actual, expected, tolerance = 0.01, label = '') {
  const diff = Math.abs(actual - expected);
  assert.ok(
    diff <= tolerance,
    `[${label}] Expected ${expected} ± ${tolerance}, but received ${actual} (diff: ${diff.toFixed(5)})`
  );
}

// -------------------------------------------------------------
// 1. Rectilinear Kinematics Tests
// -------------------------------------------------------------
console.log('--- 1. Testing Rectilinear Kinematics ---');

{
  // Test 1.1: Final velocity v = u + at
  // Bus accelerates from rest at 1.8 m/s² for 12 s
  const u = 0;
  const a = 1.8;
  const t = 12;
  const v = u + a * t;
  approxEqual(v, 21.6, EPSILON, 'v = u + at');

  // Test 1.2: Displacement s = ut + 0.5 * a * t^2
  const s = u * t + 0.5 * a * t * t;
  approxEqual(s, 129.6, EPSILON, 's = ut + 0.5 a t^2');

  // Test 1.3: v^2 = u^2 + 2as consistency
  const v_squared = u * u + 2 * a * s;
  approxEqual(Math.sqrt(v_squared), v, EPSILON, 'v^2 = u^2 + 2as');

  // Test 1.4: Distance in t-th second: s_t = u + 0.5 * a * (2t - 1)
  // Displacement in 5th second: s(5) - s(4)
  const s5 = u * 5 + 0.5 * a * 25;
  const s4 = u * 4 + 0.5 * a * 16;
  const deltaS_5 = s5 - s4;
  const formula_s_t = u + 0.5 * a * (2 * 5 - 1);
  approxEqual(deltaS_5, formula_s_t, EPSILON, 's_t = u + 0.5 a (2t - 1)');
  console.log('✓ Rectilinear Kinematics passed.');
}

// -------------------------------------------------------------
// 2. Projectile Motion (Prass / প্রক্ষেপক) Tests
// -------------------------------------------------------------
console.log('\n--- 2. Testing Projectile Motion (Dhaka Board 2017 & Cumilla Board 2017) ---');

{
  // Question: A ball is kicked with u = 30 m/s at θ = 30°
  const u = 30;
  const thetaDeg = 30;
  const thetaRad = (thetaDeg * Math.PI) / 180;

  // Maximum Height: H = (u^2 * sin^2(θ)) / (2g)
  const u_y = u * Math.sin(thetaRad); // 15 m/s
  const H = (u_y * u_y) / (2 * g); // 225 / 19.6 = 11.4796 m
  approxEqual(H, 11.48, 0.01, 'Projectile Max Height H');

  // Time of Flight: T = (2 * u * sin(θ)) / g
  const T = (2 * u_y) / g; // 30 / 9.8 = 3.0612 s
  approxEqual(T, 3.06, 0.01, 'Projectile Time of Flight T');

  // Horizontal Range: R = (u^2 * sin(2θ)) / g
  const R = (u * u * Math.sin(2 * thetaRad)) / g; // (900 * sin(60°)) / 9.8 = 79.533 m
  approxEqual(R, 79.53, 0.02, 'Projectile Horizontal Range R');

  // Trajectory equation: y(x) = x * tan(θ) - (g * x^2) / (2 * u^2 * cos^2(θ))
  // At x = R, y must equal 0
  const y_at_R =
    R * Math.tan(thetaRad) - (g * R * R) / (2 * u * u * Math.pow(Math.cos(thetaRad), 2));
  approxEqual(y_at_R, 0, 0.01, 'Trajectory y(R) = 0');

  // At x = R/2, y must equal H
  const y_at_half_R =
    (R / 2) * Math.tan(thetaRad) -
    (g * Math.pow(R / 2, 2)) / (2 * u * u * Math.pow(Math.cos(thetaRad), 2));
  approxEqual(y_at_half_R, H, 0.01, 'Trajectory y(R/2) = H');

  // Complimentary angles property: Range at θ and (90° - θ) must be identical
  const thetaCompRad = ((90 - thetaDeg) * Math.PI) / 180;
  const R_comp = (u * u * Math.sin(2 * thetaCompRad)) / g;
  approxEqual(R, R_comp, EPSILON, 'Range symmetry R(θ) = R(90 - θ)');

  console.log('✓ Projectile Motion formulas passed.');
}

// -------------------------------------------------------------
// 3. Atwood Machine (Connected Bodies & Pulley) Tests
// -------------------------------------------------------------
console.log('\n--- 3. Testing Atwood Machine (Pulley & Tension) ---');

{
  // Masses m1 = 5 kg, m2 = 3 kg (m1 > m2)
  const m1 = 5;
  const m2 = 3;

  // Analytical acceleration: a = ((m1 - m2) / (m1 + m2)) * g
  const a = ((m1 - m2) / (m1 + m2)) * g; // (2 / 8) * 9.8 = 2.45 m/s²
  approxEqual(a, 2.45, EPSILON, 'Atwood Acceleration a');

  // Tension: T = (2 * m1 * m2 / (m1 + m2)) * g
  const T = ((2 * m1 * m2) / (m1 + m2)) * g; // (30 / 8) * 9.8 = 36.75 N
  approxEqual(T, 36.75, EPSILON, 'Atwood Tension T');

  // Free Body Diagram consistency checks:
  // For mass 1 (moving down): m1 * g - T = m1 * a
  const netF_1 = m1 * g - T;
  const expectedNetF_1 = m1 * a;
  approxEqual(netF_1, expectedNetF_1, EPSILON, 'FBD Mass 1: m1*g - T = m1*a');

  // For mass 2 (moving up): T - m2 * g = m2 * a
  const netF_2 = T - m2 * g;
  const expectedNetF_2 = m2 * a;
  approxEqual(netF_2, expectedNetF_2, EPSILON, 'FBD Mass 2: T - m2*g = m2*a');

  console.log('✓ Atwood Machine FBD and tension formulas passed.');
}

// -------------------------------------------------------------
// 4. Momentum Conservation & 1D Collisions (Elastic & Inelastic)
// -------------------------------------------------------------
console.log('\n--- 4. Testing 1D Collisions & Momentum Conservation ---');

{
  const m1 = 2; // kg
  const m2 = 3; // kg
  const u1 = 10; // m/s
  const u2 = -5; // m/s (approaching in opposite direction)

  // Total Initial Momentum
  const P_initial = m1 * u1 + m2 * u2; // 20 - 15 = 5 kg·m/s
  // Total Initial Kinetic Energy
  const KE_initial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2; // 100 + 37.5 = 137.5 J

  // Case 4.1: Perfectly Elastic Collision (e = 1)
  const e_elastic = 1.0;
  const v1_elastic =
    ((m1 - e_elastic * m2) / (m1 + m2)) * u1 + (((1 + e_elastic) * m2) / (m1 + m2)) * u2;
  const v2_elastic =
    (((1 + e_elastic) * m1) / (m1 + m2)) * u1 + ((m2 - e_elastic * m1) / (m1 + m2)) * u2;

  const P_elastic = m1 * v1_elastic + m2 * v2_elastic;
  const KE_elastic = 0.5 * m1 * Math.pow(v1_elastic, 2) + 0.5 * m2 * Math.pow(v2_elastic, 2);

  approxEqual(P_elastic, P_initial, EPSILON, 'Elastic Momentum Conservation');
  approxEqual(KE_elastic, KE_initial, EPSILON, 'Elastic Kinetic Energy Conservation');

  // Relative velocity of separation = relative velocity of approach
  const v_rel_sep = v2_elastic - v1_elastic;
  const v_rel_app = u1 - u2;
  approxEqual(v_rel_sep, v_rel_app, EPSILON, 'Elastic Relative Velocity e = 1');

  // Case 4.2: Perfectly Inelastic Collision (e = 0, bodies stick together)
  const e_inelastic = 0.0;
  const v_common = (m1 * u1 + m2 * u2) / (m1 + m2); // 5 / 5 = 1.0 m/s
  const v1_inelastic =
    ((m1 - e_inelastic * m2) / (m1 + m2)) * u1 + (((1 + e_inelastic) * m2) / (m1 + m2)) * u2;
  const v2_inelastic =
    (((1 + e_inelastic) * m1) / (m1 + m2)) * u1 + ((m2 - e_inelastic * m1) / (m1 + m2)) * u2;

  approxEqual(v1_inelastic, v_common, EPSILON, 'Inelastic Common Velocity Body 1');
  approxEqual(v2_inelastic, v_common, EPSILON, 'Inelastic Common Velocity Body 2');

  const P_inelastic = (m1 + m2) * v_common;
  const KE_inelastic = 0.5 * (m1 + m2) * Math.pow(v_common, 2); // 0.5 * 5 * 1 = 2.5 J

  approxEqual(P_inelastic, P_initial, EPSILON, 'Inelastic Momentum Conservation');
  assert.ok(
    KE_inelastic < KE_initial,
    `Inelastic KE (${KE_inelastic} J) must be strictly less than initial KE (${KE_initial} J)`
  );

  console.log('✓ Collision equations & energy dissipation passed.');
}

// -------------------------------------------------------------
// 5. Friction & Inclined Plane Mechanics
// -------------------------------------------------------------
console.log('\n--- 5. Testing Static & Kinetic Friction on Incline ---');

{
  const m = 10; // kg
  const mu_s = 0.5;
  const mu_k = 0.4;

  // On flat surface (theta = 0)
  const N_flat = m * g;
  const f_s_max_flat = mu_s * N_flat; // 0.5 * 98 = 49 N
  const f_k_flat = mu_k * N_flat; // 0.4 * 98 = 39.2 N

  approxEqual(f_s_max_flat, 49.0, EPSILON, 'Flat Static Friction Max');
  approxEqual(f_k_flat, 39.2, EPSILON, 'Flat Kinetic Friction');

  // Angle of Repose (নতি কোণ / নিশ্চল কোণ): θ_s = arctan(mu_s)
  const theta_repose_rad = Math.atan(mu_s);
  const theta_repose_deg = (theta_repose_rad * 180) / Math.PI; // ~26.565°
  approxEqual(theta_repose_deg, 26.565, 0.01, 'Angle of Repose');

  // Below repose angle: down-plane gravity component < static friction max -> static equilibrium
  const testThetaRad = (20 * Math.PI) / 180;
  const F_down = m * g * Math.sin(testThetaRad);
  const F_s_max_test = mu_s * m * g * Math.cos(testThetaRad);
  assert.ok(
    F_down < F_s_max_test,
    'Block remains static when angle is strictly below repose angle'
  );

  console.log('✓ Friction & inclined plane mechanics passed.');
}

// -------------------------------------------------------------
// 6. Uniform Circular Motion
// -------------------------------------------------------------
console.log('\n--- 6. Testing Uniform Circular Motion & Centripetal Acceleration ---');

{
  const r = 2.5; // m radius
  const v = 5.0; // m/s speed

  // Angular speed: ω = v / r
  const omega = v / r; // 2.0 rad/s
  approxEqual(omega, 2.0, EPSILON, 'Angular Velocity ω = v / r');

  // Centripetal acceleration: a_c = v^2 / r = ω^2 * r
  const a_c1 = (v * v) / r; // 25 / 2.5 = 10 m/s²
  const a_c2 = omega * omega * r; // 4 * 2.5 = 10 m/s²
  approxEqual(a_c1, 10.0, EPSILON, 'Centripetal Acceleration a_c = v²/r');
  approxEqual(a_c2, 10.0, EPSILON, 'Centripetal Acceleration a_c = ω²r');

  // Period of rotation: T_rev = 2π / ω
  const T_rev = (2 * Math.PI) / omega;
  approxEqual(T_rev, Math.PI, EPSILON, 'Period T = 2π / ω');

  console.log('✓ Circular Motion relationships passed.');
}

// -------------------------------------------------------------
// 7. Testing Ishak Sir Dynamics Curriculum Benchmarks
// -------------------------------------------------------------
console.log('\n--- 7. Testing Ishak Sir Dynamics Curriculum Benchmarks ---');

{
  // Test 7.1: Rain and Umbrella Relative Velocity
  // Cyclist v_c = 5 m/s East, Rain vertical = 5√3 m/s, Wind = 2 m/s East
  const v_cx = 5.0;
  const v_rx = 2.0;
  const v_ry = -5.0 * Math.sqrt(3);
  const v_rel_x = v_rx - v_cx; // -3.0 m/s
  const v_rel_y = v_ry; // -8.660 m/s
  const v_rel_mag = Math.sqrt(v_rel_x * v_rel_x + v_rel_y * v_rel_y); // √84 ≈ 9.165 m/s
  const tan_theta = Math.abs(v_rel_x) / Math.abs(v_rel_y); // 3 / (5√3) ≈ 0.34641
  const theta_deg = (Math.atan(tan_theta) * 180) / Math.PI; // 19.1066°
  approxEqual(v_rel_mag, 9.165, 0.01, 'Ishak Sir Rain-Cyclist Relative Speed');
  approxEqual(theta_deg, 19.11, 0.02, 'Ishak Sir Umbrella Tilt Angle');

  // Test 7.2: Horizontal Projectile Drop from Altitude (Airplane Relief)
  // h = 490 m, u = 75 m/s
  const h_drop = 490;
  const u_plane = 75;
  const t_fall = Math.sqrt((2 * h_drop) / g); // √(980 / 9.8) = 10.0 s
  const x_lead = u_plane * t_fall; // 750 m
  const v_impact = Math.sqrt(u_plane * u_plane + Math.pow(g * t_fall, 2)); // √(75² + 98²) = 123.41 m/s
  approxEqual(t_fall, 10.0, EPSILON, 'Aircraft Package Fall Time');
  approxEqual(x_lead, 750.0, EPSILON, 'Aircraft Package Release Distance');
  approxEqual(v_impact, 123.41, 0.02, 'Aircraft Package Impact Speed');

  // Test 7.3: Range = Height condition
  // R = H => tan θ = 4
  const theta_R_equals_H = (Math.atan(4) * 180) / Math.PI; // 75.9637°
  approxEqual(theta_R_equals_H, 75.96, 0.01, 'R = H Angle tan(θ) = 4');

  // Test 7.4: Complementary Angles Height Product Theorem: R = 4√(H1 H2)
  // For H1 = 20 m, H2 = 45 m => R = 4 * 30 = 120 m
  const H1 = 20;
  const H2 = 45;
  const R_product = 4 * Math.sqrt(H1 * H2);
  approxEqual(R_product, 120.0, EPSILON, 'Complementary Heights Theorem R = 4√(H1 H2)');

  // Test 7.5: Ascending Balloon Stone Drop
  // Balloon ascending at 12 m/s, drops stone from 65 m: 4.9 t² - 12 t - 65 = 0
  const a_quad = 4.9;
  const b_quad = -12;
  const c_quad = -65;
  const disc = Math.sqrt(b_quad * b_quad - 4 * a_quad * c_quad);
  const t_balloon = (-b_quad + disc) / (2 * a_quad); // (12 + 37.656) / 9.8 = 5.067 s
  const v_balloon_impact = Math.sqrt(12 * 12 + 2 * g * 65); // 37.656 m/s
  approxEqual(t_balloon, 5.07, 0.01, 'Ascending Balloon Drop Time');
  approxEqual(v_balloon_impact, 37.66, 0.02, 'Ascending Balloon Impact Speed');

  // Test 7.6: Calculus Motion when a(t) = 0
  // x(t) = 2t³ - 9t² + 12t + 4 => v(t) = 6t² - 18t + 12 => a(t) = 12t - 18
  const t_zero_accel = 18 / 12; // 1.5 s
  const v_at_zero_accel = 6 * Math.pow(t_zero_accel, 2) - 18 * t_zero_accel + 12; // -1.5 m/s
  const x_at_zero_accel = 2 * Math.pow(t_zero_accel, 3) - 9 * Math.pow(t_zero_accel, 2) + 12 * t_zero_accel + 4; // 8.5 m
  approxEqual(t_zero_accel, 1.5, EPSILON, 'Calculus Time for Zero Acceleration');
  approxEqual(v_at_zero_accel, -1.5, EPSILON, 'Calculus Velocity at Zero Acceleration');
  approxEqual(x_at_zero_accel, 8.5, EPSILON, 'Calculus Position at Zero Acceleration');

  // Test 7.7: Earth Equator Centripetal Acceleration
  const R_earth = 6.4e6;
  const omega_earth = (2 * Math.PI) / 86400; // 7.2722e-5
  const a_c_earth = Math.pow(omega_earth, 2) * R_earth;
  approxEqual(a_c_earth, 0.0338, 0.0005, 'Equatorial Centripetal Acceleration');

  // Test 7.8: Tri-Phase Metro Train Motion
  // alpha = 1.2 m/s², beta = 1.8 m/s², total time = 60 s
  const alpha = 1.2;
  const beta = 1.8;
  const total_t = 60;
  const v_max_metro = ((alpha * beta) / (alpha + beta)) * total_t; // 43.2 m/s
  const dist_metro = 0.5 * total_t * v_max_metro; // 1296 m
  approxEqual(v_max_metro, 43.2, EPSILON, 'Tri-Phase Maximum Speed');
  approxEqual(dist_metro, 1296.0, EPSILON, 'Tri-Phase Total Distance');

  console.log('✓ All Ishak Sir Benchmark calculations verified.');
}

console.log('\n🎉 ALL MATHEMATICAL PHYSICS UNIT TESTS PASSED SUCCESSFULLY! 🌟\n');
