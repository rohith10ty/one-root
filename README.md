# 🌿 One Root | Modern Nature Nursery & Botanical Sanctuary

A modern, responsive, and visually stunning Botanical Nursery & Houseplant Website built with **React 19**, **Vite**, **Tailwind CSS**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, **Lucide Icons**, and custom **64-layer HTML5 Canvas Particle Disintegration & Materialization**.

- **GitHub Repository**: [https://github.com/rohith10ty/one-root](https://github.com/rohith10ty/one-root)

---

## ✨ Features & Architecture

### 1. 🎬 Cinematic Sanctuary Hero & Scroll Experience
- **Preloader Screen**: Editorial opening with `LIVING BOTANICAL SANCTUARY`, `CURATED FLORA COLLECTION`, `100% ORGANICALLY RAISED`, and `ROOTED SINCE 2014`.
- **Morphing Typography**: As the user scrolls, "ONE ROOT" transforms:
  - "O" seamlessly transitions into "1".
  - Surrounding letters dissolve away.
  - "1" and "R" glide together into the center to form the iconic **1R monogram**.
- **Split-Curtain Reveal**: The preloader splits into top and bottom curtains, smoothly sliding open to reveal the living botanical greenhouse sanctuary and sticky glassmorphic navbar.
- **64-Layer Sand Disintegration & Materialization Engine**:
  - The Bonsai tree card dynamically materializes from swirling sand dust particles as the beside content card slides in from the left.
  - Holds crisp and stable for 2 full scrolls to ensure readability.
  - Disintegrates into blowing fine sand particles drifting right upon exit.
- **Buttery-Smooth Navigation (Lenis)**: Integrated with **Lenis Smooth Scroll** and synchronized with GSAP's ticker and ScrollTrigger updates for luxurious scroll physics on desktop and mobile.

### 2. 🌿 Sticky Glassmorphic Navbar
- Hidden on initial preloader mount and slides in gracefully upon sanctuary reveal.
- **Desktop & Mobile Navigation**: Smooth scroll links to Home, Categories, Plants, About Us, Why Us, Care Tips, Reviews, and Contact.
- **Instant Search Modal**: Global `Ctrl+K` / `⌘K` keyboard shortcut with live autocomplete for plants, botanical names, and traits.
- **Wishlist & Cart Badges**: Live item count badges with animated state updates.
- **Responsive Mobile Drawer**: Fluid animated hamburger menu.

### 3. 🍃 6 Curated Botanical Categories
- High-resolution cards with image zoom on hover and custom botanical gradients:
  1. **Indoor Plants** (Air-purifying bedroom & desk plants)
  2. **Outdoor Plants** (Resilient patio perennials & flowering garden flora)
  3. **Flowering Plants** (Year-round blossoms & sweet aromas)
  4. **Succulents** (Drought-hardy architectural specimens)
  5. **Medicinal Plants** (Healing herbs, Aloe Vera, and sacred Tulsi)
  6. **Decorative Plants** (Giant statement foliage like Fiddle Leaf Fig & Bird of Paradise)
- Clicking any category instantly activates the catalog filter and smoothly scrolls down to the products.

### 4. 🪴 Filterable Botanical Catalog & Product Cards
- **Live Search**: Filter plants in real time by name, botanical species, or air-purifying traits.
- **Category Filter Pills**: Quick toggle across all categories.
- **Pet-Friendly Filter Toggle**: One-click filter for 100% non-toxic plants.
- **Multi-Factor Sorting**: Sort by Featured, Price (Low to High), Price (High to Low), or Highest Rated.
- **Authentic Botanical Photography**: Locally bundled, genuine photography for every specimen:
  - **Monstera Deliciosa** (*Monstera deliciosa Liebm.*)
  - **Snake Plant Laurentii** (*Sansevieria trifasciata*)
  - **Medicinal Aloe Vera** (*Aloe barbadensis Miller*)
  - **Peace Lily Sensation** (*Spathiphyllum floribundum*)
  - **Fiddle Leaf Fig** (*Ficus lyrata*)
- **Interactive Plant Cards**:
  - Direct Wishlist toggle with animated heart feedback.
  - Direct "Add to Cart" button with instant quantity tracking.
  - Light & watering micro-badges.
  - Star ratings with verified review counts.

### 5. 🔬 Quick View Botanical Modal
- Deep botanical classification with Latin taxonomy.
- Planter size selector (Small 4" Pot, Medium 6" Pot, Large 10" Ceramic) with dynamic price calculation.
- Care metrics dashboard: Sunlight, Watering, Soil composition, and Care Difficulty.
- Quantity selector and direct checkout flow.

### 6. 🎨 Wire Art Testimonials Carousel
- Minimalist **continuous line wire art portraits** (SVG) for reviewer avatars instead of conventional photo portraits.
- Real testimonials from verified plant parents with ratings and adopted botanical species.
- Autoplay carousel with smooth transitions and pause-on-hover.

### 7. 🏡 About Nursery & Sustainability Heritage
- Permaculture story and commitment to zero synthetic sprays.
- Animated statistics counters: **45,000+ Happy Plant Parents**, **180+ Botanical Varieties**, **99.4% Survival Guarantee**, and **120,000 Trees Planted**.
- Master Botanist quote card with greenhouse imagery.

### 8. 🛡️ Why Choose Us
- 5 comprehensive value propositions:
  - Nursery-Grown & Healthy
  - Climate-Controlled Delivery
  - 100% Eco-Friendly & Zero-Plastic Packaging
  - Lifetime Plant Care Support
  - 100% Secure Checkout

### 9. 🩺 Plant Care Guides & Interactive "Doctor Plant" Clinic
- 4 comprehensive care articles covering **Watering Techniques**, **Sunlight Levels**, **Soil Drainage Formulas**, and **Seasonal Pruning**.
- **Interactive Plant Symptom Checker**: Select real-world plant symptoms (Yellowing lower leaves, Crispy brown tips, Limp drooping stems, Leggy pale stems) for instant botanical diagnosis and recovery prescriptions.

### 10. 💌 Newsletter & 15% Discount Engine
- Nature-themed card with real-time regex email validation.
- Auto-applies promo code `PLANTLOVE15` to the shopping cart upon subscribing.
- Triggers celebratory botanical leaf confetti animation.

### 11. 📞 Greenhouse Visit & Working Contact Form
- Physical address, visiting hours, direct phone, and botanist email.
- Real-time validated contact form with subject selectors and instant feedback.

### 12. 🛒 Slide-Out Cart & Wishlist Drawers + Checkout Simulator
- **Slide-out Cart**:
  - Live quantity adjustment stepper (`-` / `+`).
  - Free delivery progress bar ($75 threshold).
  - Promo code field with support for `PLANTLOVE15` (15% OFF) and `EARTH20` (20% OFF).
- **Wishlist Drawer**: Saved plants with one-click "Move to Cart".
- **Simulated 3-Step Checkout Modal**:
  - Step 1: Eco-Shipping address with special delivery instructions.
  - Step 2: Encrypted payment simulation.
  - Step 3: Order confirmation with celebratory confetti and tree-planting certificate.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Smooth Scrolling**: Lenis (`lenis`)
- **Animation & Timelines**: GSAP 3 + ScrollTrigger
- **Styling**: Tailwind CSS (custom botanical palette: `#001524`, `#445D48`, `#D6CC99`, `#FDE5D4`)
- **Typography**: Google Fonts Outfit
- **Icons**: Lucide React
- **Particle Engine**: HTML5 Multi-layer Canvas (`html2canvas`)
- **State Management**: React Context API (`ShopContext`) with `localStorage` persistence

---

## 🚀 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rohith10ty/one-root.git
   cd "nature website"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 📦 Deployment Instructions

### Deploy to Netlify
1. Log in to [Netlify](https://www.netlify.com).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Link your GitHub repository.
4. The included `netlify.toml` automatically specifies:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"** — your live URL will be ready in seconds!
