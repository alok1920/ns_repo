class CandleCustomizer {
    constructor() {
        this.cart = [];
        this.init();
    }

    init() {
        this.bindEventListeners();
        this.setupSmoothScrolling();
    }

    bindEventListeners() {
        // Add to cart buttons for candle cards
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.addCandleToCart(e));
        });

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.filterProducts(e));
        });

        // Sort dropdown
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => this.sortProducts(e.target.value));
        }

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleView(e));
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.showQuickView(e));
        });

        // Wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleWishlist(e));
        });

        // Cart functionality
        const cartBtn = document.getElementById('cart-btn');
        const closeCart = document.getElementById('close-cart');
        const continueShopping = document.getElementById('continue-shopping');
        const closeQuickView = document.getElementById('close-quick-view');

        if (cartBtn) cartBtn.addEventListener('click', () => this.showCart());
        if (closeCart) closeCart.addEventListener('click', () => this.hideCart());
        if (continueShopping) continueShopping.addEventListener('click', () => this.hideCart());
        if (closeQuickView) closeQuickView.addEventListener('click', () => this.hideQuickView());

        // Modal close on outside click
        const modal = document.getElementById('cart-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.hideCart();
            });
        }

        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    addCandleToCart(event) {
        const button = event.currentTarget;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const image = button.dataset.image;

        const candleItem = {
            id: Date.now(),
            name: name,
            price: price,
            image: image,
            quantity: 1
        };

        this.cart.push(candleItem);
        this.updateCartCount();
        this.showAddToCartAnimation(button);
    }

    showAddToCartAnimation(button) {
        const originalText = button.textContent;
        button.textContent = '✓ Added to Cart!';
        button.style.background = '#28a745';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#d32f2f';
            button.disabled = false;
        }, 2000);
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    filterProducts(event) {
        const filter = event.currentTarget.dataset.filter;
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        event.currentTarget.classList.add('active');
        
        // Filter products
        const cards = document.querySelectorAll('.candle-card');
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    sortProducts(sortBy) {
        const grid = document.getElementById('products-grid');
        const cards = Array.from(grid.children);
        
        cards.sort((a, b) => {
            switch(sortBy) {
                case 'price-low':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                case 'price-high':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                case 'name':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'bestselling':
                    // Simulate bestselling order
                    const bestsellers = ['Lavender Blossom', 'Rose Bouquet', 'Orchid Essence'];
                    return bestsellers.indexOf(a.dataset.name) - bestsellers.indexOf(b.dataset.name);
                default:
                    return 0;
            }
        });
        
        // Reorder cards
        cards.forEach(card => grid.appendChild(card));
    }

    toggleView(event) {
        const view = event.currentTarget.dataset.view;
        
        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
        
        const grid = document.getElementById('products-grid');
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }

    showQuickView(event) {
        const candleId = event.currentTarget.dataset.candle;
        const modal = document.getElementById('quick-view-modal');
        
        // Sample candle data - in a real app this would come from a database
        const candleData = {
            'rose-bouquet': {
                name: 'Rose Bouquet',
                price: '2,499',
                image: 'images/candles/rose bouquet.png',
                description: 'A beautiful blend of fresh roses with subtle floral undertones. Perfect for creating a romantic and elegant atmosphere.',
                notes: ['Rose', 'Floral', 'Fresh']
            }
        };
        
        const data = candleData[candleId] || candleData['rose-bouquet'];
        
        // Update modal content
        document.getElementById('quick-view-name').textContent = data.name;
        document.getElementById('quick-view-price').textContent = `₹${data.price}`;
        document.getElementById('quick-view-img').src = data.image;
        document.getElementById('quick-view-description').textContent = data.description;
        
        const notesContainer = document.getElementById('quick-view-notes');
        notesContainer.innerHTML = data.notes.map(note => 
            `<span class="scent-tag">${note}</span>`
        ).join('');
        
        // Setup quick add to cart
        const quickAddBtn = document.getElementById('quick-add-to-cart');
        quickAddBtn.onclick = () => {
            this.addCandleToCart({
                currentTarget: {
                    dataset: {
                        name: data.name,
                        price: data.price,
                        image: data.image
                    }
                }
            });
            this.hideQuickView();
        };
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hideQuickView() {
        const modal = document.getElementById('quick-view-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    toggleWishlist(event) {
        const icon = event.currentTarget.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            event.currentTarget.style.color = '#d32f2f';
            this.showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            event.currentTarget.style.color = '';
            this.showNotification('Removed from wishlist');
        }
    }

    showNotification(message) {
        // Create and show a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #d32f2f;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(211,47,47,0.3);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showCart() {
        const modal = document.getElementById('cart-modal');
        const cartItems = document.getElementById('cart-items');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>Your cart is empty</h3>
                    <p>Start customizing your perfect candle!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.cart.map(item => this.renderCartItem(item)).join('');
        }

        this.updateCartTotals();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    renderCartItem(item) {
        return `
            <div class="cart-item" style="display: flex; gap: 1rem; padding: 1.5rem; border-bottom: 1px solid #e0e0e0;">
                <div class="cart-item-image" style="width: 60px; height: 80px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 2px solid #e0e0e0; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div class="cart-item-details" style="flex: 1;">
                    <h4>${item.name}</h4>
                    <p style="color: #666; font-size: 0.9rem; margin: 0.5rem 0;">
                        Premium scented candle
                    </p>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem;">
                        <span style="font-weight: 600;">Qty: ${item.quantity}</span>
                        <button onclick="candleCustomizer.removeFromCart(${item.id})" style="background: #ff4757; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 15px; cursor: pointer; font-size: 0.8rem;">Remove</button>
                    </div>
                </div>
                <div class="cart-item-price" style="text-align: right;">
                    <span style="font-size: 1.2rem; font-weight: 700; color: #d32f2f;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
            </div>
        `;
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartCount();
        this.showCart(); // Refresh cart display
    }

    updateCartTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 499 : 0;
        const total = subtotal + shipping;

        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');

        if (cartSubtotal) cartSubtotal.textContent = subtotal.toLocaleString('en-IN');
        if (cartTotal) cartTotal.textContent = total.toLocaleString('en-IN');
    }

    hideCart() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty. Please add some items first.');
            return;
        }

        // Simulate checkout process
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 499;
        
        alert(`Thank you for your order! 🕯️\n\nOrder Total: ₹${total.toLocaleString('en-IN')}\n\nYour premium candles will be carefully packaged and shipped within 3-5 business days.\n\n(This is a demo - no actual purchase has been made)`);
        
        // Clear cart
        this.cart = [];
        this.updateCartCount();
        this.hideCart();
    }
}

// Initialize the customizer
let candleCustomizer;

document.addEventListener('DOMContentLoaded', function() {
    candleCustomizer = new CandleCustomizer();
    
    // Initialize intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step, .occasion-card, .testimonial, .hero-content > *');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Add hover effects to interactive elements
    document.querySelectorAll('.size-option, .fragrance-option').forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 8px 25px rgba(211,47,47,0.15)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            navMenu.style.padding = '2rem';
            navMenu.style.gap = '1.5rem';
        });
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .size-option, .fragrance-option {
        transition: all 0.3s ease;
    }
    
    .preview-container {
        transition: transform 0.3s ease;
    }
    
    .upload-area {
        transition: all 0.3s ease;
    }
    
    .upload-area.dragover {
        background: #f0f0f0 !important;
        border-color: #b71c1c !important;
        transform: scale(1.02);
    }
    
    .cart-item {
        transition: all 0.3s ease;
    }
    
    .cart-item:hover {
        background: #f9f9f9;
    }
    
    .hero-section {
        transition: transform 0.1s ease-out;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none !important;
        }
        
        .nav-menu.mobile-open {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);