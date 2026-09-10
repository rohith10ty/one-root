# 🌿 One Root | Modern Nature Nursery & Living Botanicals

A modern, responsive, and visually stunning Nature Nursery & Houseplant Website built with **React**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and custom **HTML5 Canvas Particle Animations** (featuring **Real Botanical Falling Leaves** and a signature **Botanical Particle Disintegration Effect**).

- **GitHub Repository**: [https://github.com/rohith10ty/one-root](https://github.com/rohith10ty/one-root)

---

## ✨ Features & Architecture

### 1. 🌿 Sticky Glassmorphic Navbar & Announcement Bar
- **Announcement Banner**: Real-time ticker with spring promo code (`PLANTLOVE15`), 30-day survival guarantee, and direct greenhouse support hotline.
- **Desktop & Mobile Navigation**: Smooth scroll links to Home, Categories, Plants, About Us, Why Us, Care Tips, Reviews, and Contact.
- **Instant Search Modal**: Global `Ctrl+K` / `⌘K` keyboard shortcut with live autocomplete for plants, botanical names, and traits.
- **Wishlist & Cart Badges**: Live item count badges with animated transitions.
- **Responsive Mobile Drawer**: Fluid animated hamburger menu.

### 2. 🌱 Hero Sanctuary & Ambient Floating Leaf Canvas
- Nature-inspired typography with dynamic gradient text and badge highlights.
- **Interactive Floating Leaves & Spores Canvas**: Ambient HTML5 canvas rendering floating leaves that respond with organic drift physics.
- **Floating 3D-Tilt Stat Badges**: Carbon-negative guarantee and 30-day survival replacement guarantee.
- Dual call-to-action buttons ("Shop All Plants" & "Explore Care Guides").

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
- **Interactive Plant Cards**:
  - Image hover scale with smooth cubic-bezier transitions.
  - Category badges (Best Seller, Healing Herb, Rare Exotic, Indestructible, etc.).
  - Direct Wishlist toggle with animated heart feedback.
  - Direct "Add to Cart" button with instant quantity tracking.
  - Light & watering micro-badges.
  - Star ratings with verified review counts.

### 5. 🔬 Quick View Botanical Modal
- Deep botanical classification with Latin taxonomy.
- Planter size selector (Small 4" Pot, Medium 6" Pot, Large 10" Ceramic) with dynamic price calculation.
- Care metrics dashboard: Sunlight, Watering, Soil composition, and Care Difficulty.
- Quantity selector and direct checkout flow.

### 6. ✨ Signature "Disintegration Effect" Studio
- **The Botanical Pruner & Disintegration Studio**: An interactive showcase demonstrating natural biodegradation.
- Powered by custom HTML5 Canvas particle dispersal physics (`src/utils/disintegrate.js`):
  - Slices elements into hundreds of organic leaf fragments, dust, and golden pollen particles.
  - Features wind turbulence, gravity decay, and angular rotation.
  - Includes a "Regrow All" interactive loop.
- **Integrated into Cart & Wishlist**: Removing any plant from the cart or wishlist activates the same real-time particle disintegration effect before removing the item!

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
- Feature breakdown on 100% compostable coconut coir and cornstarch packaging.

### 9. 🩺 Plant Care Guides & Interactive "Doctor Plant" Clinic
- 4 comprehensive care articles covering **Watering Techniques**, **Sunlight Levels**, **Soil Drainage Formulas**, and **Seasonal Pruning**.
- **Interactive Plant Symptom Checker**: Select real-world plant symptoms (Yellowing lower leaves, Crispy brown tips, Limp drooping stems, Leggy pale stems) for instant botanical diagnosis and recovery prescriptions.

### 10. 💬 Verified Customer Reviews Carousel
- Real testimonials from verified plant parents with photos, star ratings, and specific plants adopted.
- Autoplay carousel with pause on hover and previous/next slide navigation.

### 11. 💌 Newsletter & 15% Discount Engine
- Nature-themed card with real-time regex email validation.
- Auto-applies promo code `PLANTLOVE15` to the shopping cart upon subscribing.
- Triggers celebratory botanical leaf confetti animation.

### 12. 📞 Greenhouse Visit & Working Contact Form
- Physical address, visiting hours, direct phone, and botanist email.
- Real-time validated contact form with subject selectors and instant feedback.

### 13. 🛒 Slide-Out Cart & Wishlist Drawers + Checkout Simulator
- **Slide-out Cart**:
  - Live quantity adjustment stepper (`-` / `+`).
  - Free delivery progress bar ($75 threshold).
  - Promo code field with support for `PLANTLOVE15` (15% OFF) and `EARTH20` (20% OFF).
  - Item removal with **Particle Disintegration Effect**.
- **Wishlist Drawer**: Saved plants with one-click "Move to Cart" or disintegrate removal.
- **Simulated 3-Step Checkout Modal**:
  - Step 1: Eco-Shipping address with special delivery instructions.
  - Step 2: Encrypted payment simulation.
  - Step 3: Order confirmation with celebratory confetti and tree-planting certificate.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS (custom botanical palette: Forest, Sage, Moss, Earth, Cream)
- **Icons**: Lucide React
- **Animations & Effects**: HTML5 Canvas Particle Engine, Canvas Confetti, CSS keyframes
- **State Management**: React Context API (`ShopContext`) with `localStorage` persistence

---

## 🚀 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone <your-github-repo-url>
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
