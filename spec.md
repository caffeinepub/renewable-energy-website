# Renewable Energy Website

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full-screen hero with Three.js/R3F animated background: rotating Earth, sunlight rays, wind turbines, water particles
- Navigation bar with smooth scroll section links
- Types of Renewable Energy: 5 glassmorphism 3D-hover cards (solar, wind, hydropower, geothermal, biomass)
- Benefits Section: scroll-triggered animated counters (CO2, energy savings, jobs, countries) + icon benefit cards
- Comparison Section: split-screen renewable vs non-renewable with interactive drag slider
- Renewable Energy in India: SVG map with clickable hotspots (Bhadla, Pavagada, Rewa solar; Tamil Nadu, Gujarat, Rajasthan wind)
- Daily Life Applications: R3F 3D house scene (solar panels, EV, smart devices) with click-triggered info panels
- Future of Renewable Energy: neon UI, animated smart grid, battery storage viz, energy flow lines
- How Solar Panels Work: scroll-driven 5-step animated diagram
- Case Studies: card grid (Hornsea, Bhadla, Three Gorges, etc.) with hover animations
- Interactive Quiz: energy scenario mini-game with scoring and certificate result card
- Footer with nav links and social icons

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Set up global styles: dark theme (#0a0a0f), Orbitron + Inter fonts, neon CSS variables, glassmorphism utilities
2. Build NavBar with smooth scroll links
3. HeroSection: R3F Canvas with Earth sphere, sunlight rays, wind turbines (geometry), water particles; overlay heading + CTA
4. EnergyTypesSection: 5 glassmorphism cards with CSS 3D hover rotate, icons, stats, descriptions
5. BenefitsSection: IntersectionObserver counter animation, reveal animations, icon cards
6. ComparisonSection: split layout with draggable divider slider
7. IndiaMapSection: SVG India outline with positioned hotspot markers, popup modals
8. DailyLifeSection: R3F scene with clickable house parts and info panels
9. FutureSection: animated neon grid lines, battery bar viz, pulsing AI node diagram
10. SolarPanelWorkSection: horizontal step diagram with scroll-linked highlight animation
11. CaseStudiesSection: responsive card grid with hover lift effects
12. QuizSection: state machine for questions, scoring, animated feedback, certificate card
13. Footer: links, social icons
