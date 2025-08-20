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

This is a **multi-page application** built with vanilla HTML, CSS, and JavaScript - no frameworks or build tools required. The architecture follows a **component-based pattern** using CSS classes and a single JavaScript class for state management across pages.

### Core Architecture Components

**CandleCustomizer Class** (`script.js`): 
- Central state management across multiple pages using localStorage for cart persistence
- Manages shopping cart, product filtering, modals, and all user interactions
- Page detection system (`detectCurrentPage()`) initializes appropriate functionality per page
- Shared cart state persists across page navigation via `nsCandles_cart` localStorage key

### Page Structure

**Home Page** (`index.html`):
- `hero-section`: Landing area with floating animated featured candles and promotional content
- `bestsellers-section`: Customer favorites with social proof (ratings/reviews)
- `occasions-section`: Festival special collection preview (links to occasions.html)
- `testimonials-section`: Customer reviews and feedback
- Modals: `cart-modal` for shopping cart functionality

**Shop Page** (`shop.html`):
- `page-header`: Breadcrumb navigation and page title
- `candles-section`: Complete 25-product catalog with filtering/sorting controls
- Filter categories: All Candles (25), Floral (14), Fresh (7), Exotic (4)
- Modals: `quick-view-modal` and `cart-modal` for enhanced UX

**Occasions Page** (`occasions.html`):
- `festival-collection-section`: 6 Indian festivals with 3 candles each (18 total products)
- Festival structure: Diwali, Ganesh Chaturthi, Holi, Navratri, Raksha Bandhan, Makar Sankranti
- Uses actual festival images with fallback to candle images via `onerror` attributes

**About Page** (`about.html`):
- `about-story-section`: Company story with statistics
- `about-mission-section`: Mission statement with feature list
- `about-values-section`: 4 value cards (Quality, Sustainability, Craftsmanship, Community)
- `about-process-section`: 4-step process explanation
- `about-team-section`: Team member profiles
- `about-contact-section`: Contact CTA with gradient background

**CSS Architecture** (`styles.css`):
- Mobile-first responsive design using CSS Grid and Flexbox
- Component-based styling with BEM-like naming conventions
- CSS custom properties for theming (brand color: `#d32f2f`)
- Enhanced hero section with floating animations and 3D effects
- About page specific styles with hover effects and gradient backgrounds

### Key Data Structures

**Product Data**: Stored in HTML `data-*` attributes on product cards:
- `data-price`: Price as integer (e.g., "249" for ₹249)
- `data-name`: Product name
- `data-image`: Image path (candles or festival images)
- `data-category`: For filtering (floral, fresh, exotic)

**Cart State**: JavaScript array stored in localStorage with objects: `{id, name, price, image, quantity}`

**Current Pricing Structure**: All prices in Indian Rupees (₹):
- Regular candles: ₹249-₹289
- Festival candles: ₹259-₹319  
- Shipping: ₹149 (free over ₹999)

## Key Implementation Patterns

### Multi-Page State Management
Cart persistence across pages using localStorage with error handling. Page detection determines which functionality to initialize:
- Shop page: Full filtering, sorting, quick view
- Other pages: Basic cart functionality only

### Product Filtering System
Products are filtered by toggling CSS `display` property based on `data-category` attributes. Active filter tab gets `.active` class for styling. Filter counts are manually maintained in HTML.

### Modal Management
All modals use the same base `.modal` class with specific content classes. JavaScript manages show/hide with `display: block/none` and body scroll locking. Quick view modal is shop-page specific.

### Enhanced Cart Calculations
JavaScript cart system includes:
- Dynamic shipping calculation (₹149 for orders under ₹999, free above)
- Real-time subtotal, shipping, and total updates via DOM element IDs
- Indian number formatting with `toLocaleString('en-IN')`

### Image Management Strategy
- **Candle Images**: `/images/candles/` with spaces in filenames (25 products)
- **Festival Images**: `/images/festival/[festival-name]/` with clean names (18 products across 6 festivals)
- **Logo**: `/images/logo.svg` used across all pages
- **Fallback System**: Festival images use `onerror` to fallback to candle images

## Responsive Breakpoints
- Desktop: 1200px+ (default)
- Tablet: 768px-1023px 
- Mobile: <768px
- Mobile small: <480px

## Common Modification Patterns

**Adding New Regular Candles**:
1. Add image to `/images/candles/`
2. Add product card HTML in shop.html `#products-grid`
3. Set correct `data-*` attributes for price, category
4. Update filter counts in filter tabs if needed

**Adding Festival Products**:
1. Add festival images to `/images/festival/[festival-name]/`
2. Add product section to occasions.html
3. Include fallback images with `onerror` attribute
4. Use clean, URL-safe filenames

**Price Updates**: 
- HTML: Update `data-price` attributes across all product pages
- JavaScript: Shipping thresholds in `updateCartTotals()` method
- Update free shipping threshold in promotional banners

**New Product Categories**:
1. Add filter tab in shop.html `.filter-tabs`
2. Set `data-filter` attribute
3. Update product cards with matching `data-category`
4. Manually update count in filter tab

**Festival Management**:
Each festival follows the pattern: 3 products per festival section in occasions.html, with festival-specific theming and pricing.