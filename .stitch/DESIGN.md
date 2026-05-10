# Design System: Sarhadi Real Estate

## 1. Visual Theme & Atmosphere
A restrained, high-end gallery-airy interface with confident asymmetric layouts and fluid spring-physics motion. The atmosphere is luxurious, minimalist, and deeply professional — like stepping into a modern, multi-million dollar Canadian estate.

## 2. Color Palette & Roles
- **Canvas White** (#FFFFFF) — Primary background surface
- **Pure Surface** (#F9FAFB) — Card and secondary container fill
- **Zinc-950** (#09090b) — Primary text, depth elements, deep contrasts
- **Muted Steel** (#71717A) — Secondary text, descriptions, property metadata
- **Whisper Border** (rgba(226,232,240,0.5)) — Card borders, 1px structural lines
- **Luxury Gold** (#D4AF37) — Single accent for CTAs, active states, focus rings, and high-value highlights

## 3. Typography Rules
- **Display:** `Outfit` — Clean, geometric, track-tight, controlled scale, weight-driven hierarchy. Used for primary headlines and property prices.
- **Body:** `Geist` — Relaxed leading, 65ch max-width, neutral secondary color. Highly readable.
- **Mono:** `JetBrains Mono` — For property specs (sqft, MLS numbers), timestamps, high-density numbers.
- **Banned:** Inter, generic system fonts for premium contexts.

## 4. Component Stylings
* **Buttons:** Flat, no outer glow. Tactile -1px translate on active. Gold (#D4AF37) fill for primary, ghost/outline with Zinc-950 border for secondary.
* **Cards:** Sharp or very subtly rounded corners (0.25rem). Diffused whisper shadow. Used to display property listings. High-density grids use 1px borders instead of heavy shadows.
* **Inputs:** Label above, error below. Focus ring in Gold. No floating labels. Minimalist borders.
* **Loaders:** Skeletal shimmer matching exact layout dimensions. No circular spinners.
* **Images:** Full-bleed, high-contrast imagery with subtle scale-on-hover effects.

## 5. Layout Principles
Grid-first responsive architecture. Asymmetric splits for Hero sections to feature grand property photography. Strict single-column collapse below 768px. Max-width containment (1440px). No flexbox percentage math. Generous internal padding.

## 6. Motion & Interaction
Spring physics for all interactive elements (stiffness: 100, damping: 20). Staggered cascade reveals for property grids. Perpetual subtle scale loops on hero images.

## 7. Anti-Patterns (Banned)
No emojis, no Inter font, no generic serif fonts (Times New Roman, Georgia), no pure black (#000000), no neon glows, no 3-column equal grids for the hero, no AI copywriting clichés ("Elevate", "Next-Gen"), no fake generic names, no broken image links.
