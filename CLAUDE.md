# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

To run the website locally:
```bash
python3 -m http.server 8080
```
Then visit http://localhost:8080

Alternative ports if 8080 is busy:
```bash
python3 -m http.server 8000  # Then visit http://localhost:8000
python3 -m http.server 8081  # Then visit http://localhost:8081
```

Note: Direct file opening (double-clicking index.html) has limitations with image loading and some JavaScript features due to CORS restrictions.

## Architecture Overview

This is a **single-page application (SPA)** built with vanilla HTML, CSS, and JavaScript - no frameworks or build tools required. The architecture follows a **component-based pattern** using CSS classes and a single JavaScript class for state management.

### Core Architecture Components

**CandleCustomizer Class** (`script.js`): 
- Central state management for the entire application
- Manages shopping cart, product filtering, modals, and all user interactions
- Initialized on DOM load and handles all event binding

**Section-Based Layout** (`index.html`):
- `hero-section`: Landing area with promotional content and featured products
- `bestsellers-section`: Customer favorites with social proof (ratings/reviews)
- `candles-section`: Main product catalog with filtering/sorting controls
- `occasions-section`: Special occasion marketing
- Modals: `quick-view-modal` and `cart-modal` for enhanced UX

**CSS Architecture** (`styles.css`):
- Mobile-first responsive design using CSS Grid and Flexbox
- Component-based styling with BEM-like naming conventions
- CSS custom properties for theming (brand color: `#d32f2f`)
- No CSS preprocessors - uses modern CSS features

### Key Data Structures

**Product Data**: Stored in HTML `data-*` attributes on product cards:
- `data-price`: Price in paise (multiply by 100 for INR display)
- `data-name`: Product name
- `data-image`: Image path
- `data-category`: For filtering (floral, fresh, exotic)

**Cart State**: JavaScript array of objects with `{id, name, price, image, quantity}`

**Pricing**: All prices in Indian Rupees (₹). Standard pricing tiers:
- Standard: ₹2,499
- Premium: ₹2,749  
- Luxury: ₹2,899
- Shipping: ₹499 (free over ₹4,000)

## Key Implementation Patterns

### Product Filtering System
Products are filtered by toggling CSS `display` property based on `data-category` attributes. Active filter tab gets `.active` class for styling.

### Modal Management
All modals use the same base `.modal` class with specific content classes. JavaScript manages show/hide with `display: block/none` and body scroll locking.

### Price Calculations
JavaScript uses `toLocaleString('en-IN')` for Indian number formatting with proper comma placement.

### Responsive Breakpoints
- Desktop: 1200px+ (default)
- Tablet: 768px-1023px 
- Mobile: <768px
- Mobile small: <480px

## Image Management

All product images are in `/images/candles/` with spaces in filenames (e.g., "rose bouquet.png"). When referencing in HTML/JS, use exact filenames with spaces - the browser handles URL encoding.

25 product images total, named after their fragrance (e.g., "lavender blossom.png", "orchid essence.png").

## State Management

**No external state management** - all state lives in the `CandleCustomizer` class instance. Cart persistence could be added via localStorage but currently resets on page refresh.

**Event-Driven Architecture**: All user interactions flow through event listeners bound in `bindEventListeners()` method.

## Styling Conventions

- **Brand colors**: Primary `#d32f2f` (red), hover `#b71c1c`
- **Typography**: Open Sans (body), Playfair Display (headings)  
- **Icons**: Font Awesome 6.0 CDN
- **Spacing**: CSS Grid with `gap` properties, rem units for consistent scaling
- **Animations**: CSS transitions for hover effects, JavaScript for modal transitions

## Common Modification Patterns

**Adding New Products**:
1. Add image to `/images/candles/`
2. Add product card HTML in `#products-grid`
3. Set correct `data-*` attributes for price, category, etc.

**Price Updates**: 
- HTML: Update `data-price` attributes 
- JavaScript: Update price calculation constants if needed

**New Product Categories**:
1. Add filter tab in `.filter-tabs`
2. Set `data-filter` attribute
3. Update product cards with matching `data-category`

**Styling Updates**: Modify CSS custom properties at top of `styles.css` for global theme changes.