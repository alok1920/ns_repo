NS CANDLES WEBSITE - SETUP AND RUN INSTRUCTIONS
===============================================

OVERVIEW
--------
NS Candles is a professional e-commerce website for premium scented candles.
Built with HTML, CSS, and JavaScript - no frameworks required.

FEATURES
--------
- Professional e-commerce design similar to Yankee Candle
- 25 premium candle products with Indian Rupee (₹) pricing
- Product filtering and sorting functionality
- Quick view modals for products
- Shopping cart with add/remove functionality
- Wishlist feature
- Customer favorites/bestsellers section
- Responsive mobile-friendly design
- Professional promotional banners and trust indicators

REQUIREMENTS
------------
- Python 3.x (pre-installed on most systems)
- Web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

HOW TO RUN THE WEBSITE
----------------------

METHOD 1: Using Python HTTP Server (Recommended)
1. Open Terminal/Command Prompt
2. Navigate to the project directory:
   cd "/Users/aloknagargoje/Documents/project"

3. Start the Python HTTP server:
   python3 -m http.server 8080

4. Open your web browser and go to:
   http://localhost:8080

5. To stop the server, press Ctrl+C in the terminal

METHOD 2: Alternative Port (if 8080 is busy)
If port 8080 is already in use, try a different port:
python3 -m http.server 8000
Then visit: http://localhost:8000

METHOD 3: Direct File Opening (Limited functionality)
You can also double-click index.html to open it directly in your browser,
but this method has limitations with loading images and some features.

TROUBLESHOOTING
---------------

Problem: "This site can't be reached"
Solution: Make sure the Python server is running. Restart with:
python3 -m http.server 8080

Problem: Port already in use
Solution: Use a different port number:
python3 -m http.server 8081
Then visit http://localhost:8081

Problem: Images not loading
Solution: Make sure you're accessing via http://localhost:8080 
(not file:// protocol)

Problem: Python command not found
Solution: Try using 'python' instead of 'python3':
python -m http.server 8080

FILE STRUCTURE
--------------
project/
├── index.html          # Main website page
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
├── README.txt          # This instruction file
└── images/
    └── candles/        # 25 candle product images
        ├── rose bouquet.png
        ├── lavender blossom.png
        ├── orchid essence.png
        └── ... (22 more candles)

WEBSITE FEATURES GUIDE
----------------------

NAVIGATION:
- Home: Main landing page with hero section
- Bestsellers: Customer favorite products
- Shop All: Complete product catalog with filtering
- Occasions: Special occasion candles
- About: Company information

PRODUCT FEATURES:
- Filter by category: All Candles, Floral, Fresh, Exotic
- Sort by: Featured, Price (Low to High), Price (High to Low), Name A-Z, Best Selling
- View toggle: Grid view or List view
- Quick View: Click the eye icon on products for detailed preview
- Wishlist: Click the heart icon to add/remove from wishlist
- Add to Cart: Add products to shopping cart

SHOPPING CART:
- View cart items and quantities
- Remove items from cart
- See subtotal, shipping (₹499), and total
- Proceed to checkout (demo only)

PRICING INFORMATION
-------------------
- Standard Candles: ₹2,499
- Premium Candles: ₹2,749  
- Luxury Candles: ₹2,899
- Shipping: ₹499
- Free shipping on orders over ₹4,000

TECHNICAL DETAILS
-----------------
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- No backend database (static website)
- Uses Font Awesome for icons
- Google Fonts: Open Sans & Playfair Display
- Responsive design with CSS Grid and Flexbox
- Local storage for cart persistence
- Modern browser features (CSS custom properties, etc.)

CUSTOMIZATION
-------------
To modify prices:
- Edit the data-price attributes in index.html
- Update JavaScript price calculations in script.js

To add new products:
1. Add product image to images/candles/
2. Add new candle card HTML in index.html
3. Update JavaScript data if needed

To change colors/branding:
- Modify CSS custom properties in styles.css
- Main brand color: #d32f2f (red)

BROWSER COMPATIBILITY
--------------------
- Chrome 60+ ✓
- Firefox 55+ ✓  
- Safari 12+ ✓
- Edge 79+ ✓
- Mobile browsers ✓

SUPPORT
-------
If you encounter any issues:
1. Check that Python server is running
2. Verify you're using the correct localhost URL
3. Clear browser cache if needed
4. Try a different port number
5. Ensure all files are in the correct directory structure

DEVELOPMENT NOTES
-----------------
- All prices are in Indian Rupees (₹)
- Professional e-commerce design similar to major candle retailers
- Fully responsive and mobile-optimized
- No external dependencies beyond web fonts and icons
- Clean, maintainable code structure
- SEO-friendly HTML structure

Last Updated: August 2025
Version: 2.0 (Professional E-commerce Design)