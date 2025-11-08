import React, { useState, createContext, useContext, useEffect } from 'react';
import { ShoppingCart, User, Heart, Menu, X, Search, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Star, Upload, Check, CreditCard, Truck, Package, Clock, XCircle, Eye, Trash2, Edit, ChevronRight, CheckCircle } from 'lucide-react';

// Context for global state
const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Initial sample products
const initialProducts = [
  {
    id: 1,
    name: "Elegant Evening Gown",
    price: 12999,
    category: "Western",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    rating: 4.8,
    description: "Stunning floor-length gown perfect for formal occasions",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Burgundy"],
    stock: 10,
    reviews: []
  },
  
  {
    id: 3,
    name: "Designer Saree",
    price: 15999,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
    rating: 4.7,
    description: "Elegant silk saree with intricate embroidery",
    sizes: ["Free Size"],
    colors: ["Blue", "Green", "Maroon"],
    stock: 12,
    reviews: []
  },
  {
    id: 4,
    name: "Cocktail Dress",
    price: 8999,
    category: "Western",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    rating: 4.6,
    description: "Chic cocktail dress perfect for parties",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Black", "Emerald"],
    stock: 15,
    reviews: []
  },
  {
    id: 5,
    name: "Anarkali Suit",
    price: 11999,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",
    rating: 4.8,
    description: "Graceful Anarkali suit with dupatta",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Peach", "Mint", "Lavender"],
    stock: 10,
    reviews: []
  },
  {
    id: 6,
    name: "Maxi Dress",
    price: 6999,
    category: "Western",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    rating: 4.5,
    description: "Flowy maxi dress for summer occasions",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Sky Blue", "Coral"],
    stock: 20,
    reviews: []
  },
  {
    id: 7,
    name: "Palazzo Suit Set",
    price: 9999,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
    rating: 4.7,
    description: "Comfortable palazzo suit with embroidered kurta",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Yellow", "Pink", "White"],
    stock: 14,
    reviews: []
  },
  {
    id: 8,
    name: "Little Black Dress",
    price: 7999,
    category: "Western",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    rating: 4.9,
    description: "Classic LBD perfect for any occasion",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 18,
    reviews: []
  },
  {
    id: 9,
    name: "Bridal Sharara Set",
    price: 22999,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1596783838001-90348b4ab989?w=500",
    rating: 5.0,
    description: "Luxurious bridal sharara with heavy work",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Maroon", "Gold"],
    stock: 5,
    reviews: []
  },
  {
    id: 10,
    name: "Bodycon Dress",
    price: 5999,
    category: "Western",
    image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=500",
    rating: 4.4,
    description: "Trendy bodycon dress for a night out",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Red", "Navy"],
    stock: 16,
    reviews: []
  },
  {
    id: 11,
    name: "Kurti with Jeans",
    price: 4999,
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1583391733971-3d6d8c9f9c2b?w=500",
    rating: 4.6,
    description: "Casual kurti perfect for everyday wear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Pink", "White", "Yellow"],
    stock: 25,
    reviews: []
  },
  {
    id: 12,
    name: "Prom Gown",
    price: 16999,
    category: "Western",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    rating: 4.8,
    description: "Stunning prom gown with sequin details",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rose Gold", "Silver", "Champagne"],
    stock: 9,
    reviews: []
  }
];


// Utility functions for localStorage
const getFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Main App Component
function BoutiqueStore() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState(() => getFromLocalStorage('cart', []));
  const [wishlist, setWishlist] = useState(() => getFromLocalStorage('wishlist', []));
  const [user, setUser] = useState(() => getFromLocalStorage('user', null));
  const [orders, setOrders] = useState(() => getFromLocalStorage('orders', []));
  const [measurements, setMeasurements] = useState(() => getFromLocalStorage('measurements', []));
  const [products, setProducts] = useState(() => getFromLocalStorage('products', initialProducts));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [lastOrder, setLastOrder] = useState(null);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage('cart', cart);
  }, [cart]);

  useEffect(() => {
    saveToLocalStorage('wishlist', wishlist);
  }, [wishlist]);

  useEffect(() => {
    saveToLocalStorage('user', user);
  }, [user]);

  useEffect(() => {
    saveToLocalStorage('orders', orders);
  }, [orders]);

  useEffect(() => {
    saveToLocalStorage('measurements', measurements);
  }, [measurements]);

  useEffect(() => {
    saveToLocalStorage('products', products);
  }, [products]);

  const addToCart = (product, size = 'M', color = null, quantity = 1) => {
    const existingItem = cart.find(
      item => item.id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, color, quantity, cartItemId: Date.now() }]);
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
    } else {
      setCart(cart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(6, '0')}`,
      ...orderData,
      date: new Date().toISOString(),
      status: orderData.paymentMethod === 'cod' ? 'Confirmed' : 'Payment Pending'
    };
    setOrders([newOrder, ...orders]);
    setLastOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status, statusHistory: [...(order.statusHistory || []), { status, date: new Date().toISOString() }] } : order
    ));
  };

  const cancelOrder = (orderId, reason) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'Cancelled', cancelReason: reason } : order
    ));
  };

  const addMeasurement = (measurement) => {
    const newMeasurement = {
      id: Date.now(),
      ...measurement,
      createdAt: new Date().toISOString()
    };
    setMeasurements([newMeasurement, ...measurements]);
    return newMeasurement;
  };

  const updateMeasurement = (id, updatedData) => {
    setMeasurements(measurements.map(m =>
      m.id === id ? { ...m, ...updatedData } : m
    ));
  };

  const deleteMeasurement = (id) => {
    setMeasurements(measurements.filter(m => m.id !== id));
  };

  const addReview = (productId, review) => {
    setProducts(products.map(p =>
      p.id === productId
        ? {
            ...p,
            reviews: [...(p.reviews || []), { ...review, id: Date.now(), date: new Date().toISOString() }],
            rating: calculateAverageRating([...(p.reviews || []), review])
          }
        : p
    ));
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentPage,
    setCurrentPage,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    wishlist,
    toggleWishlist,
    user,
    setUser,
    logout,
    orders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    measurements,
    addMeasurement,
    updateMeasurement,
    deleteMeasurement,
    products,
    addReview,
    selectedProduct,
    setSelectedProduct,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    showCartSidebar,
    setShowCartSidebar,
    showAuthModal,
    setShowAuthModal,
    authMode,
    setAuthMode,
    lastOrder,
    setLastOrder
  };

  return (
    <AppContext.Provider value={value}>
      <div className="min-h-screen bg-rose-50">
        <Navbar />
        <main>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'shop' && <ShopPage />}
          {currentPage === 'product' && <ProductDetailsPage />}
          {currentPage === 'custom-order' && <CustomOrderPage />}
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'checkout' && <CheckoutPage />}
          {currentPage === 'order-confirmation' && <OrderConfirmationPage />}
        </main>
        <Footer />
        {showCartSidebar && <CartSidebar />}
        {showAuthModal && <AuthModal />}
      </div>
    </AppContext.Provider>
  );
}

// Auth Modal Component
function AuthModal() {
  const { setShowAuthModal, authMode, setAuthMode, setUser } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (authMode === 'register' && !formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (authMode === 'login') {
      const existingUsers = getFromLocalStorage('users', []);
      const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        setUser(user);
        setShowAuthModal(false);
        alert('Login successful!');
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    } else {
      const existingUsers = getFromLocalStorage('users', []);
      
      if (existingUsers.find(u => u.email === formData.email)) {
        setErrors({ email: 'Email already exists' });
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...existingUsers, newUser];
      saveToLocalStorage('users', updatedUsers);
      
      setUser(newUser);
      setShowAuthModal(false);
      alert('Registration successful!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">
          {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-gray-700 mb-2">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition font-semibold"
          >
            {authMode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-rose-600 hover:underline"
          >
            {authMode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Cart Sidebar Component
function CartSidebar() {
  const { cart, setShowCartSidebar, removeFromCart, updateCartQuantity, setCurrentPage } = useApp();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setShowCartSidebar(false);
    setCurrentPage('checkout');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setShowCartSidebar(false)}>
      <div className="bg-white w-full max-w-md h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
            <button onClick={() => setShowCartSidebar(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} {item.color && `| Color: ${item.color}`}
                      </p>
                      <p className="text-rose-600 font-bold">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  const { currentPage, setCurrentPage, cart, wishlist, user, logout, mobileMenuOpen, setMobileMenuOpen, setShowCartSidebar, setShowAuthModal, setAuthMode } = useApp();

  const handleAuthClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')} className="text-2xl font-serif text-rose-600 font-bold">
              Élégance Boutique
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-rose-600' : 'text-gray-700'} hover:text-rose-600 transition`}>
              Home
            </button>
            <button onClick={() => setCurrentPage('shop')} className={`${currentPage === 'shop' ? 'text-rose-600' : 'text-gray-700'} hover:text-rose-600 transition`}>
              Shop
            </button>
            <button onClick={() => setCurrentPage('custom-order')} className={`${currentPage === 'custom-order' ? 'text-rose-600' : 'text-gray-700'} hover:text-rose-600 transition`}>
              Custom Order
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-rose-600 transition relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setShowCartSidebar(true)} className="text-gray-700 hover:text-rose-600 transition relative">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage('dashboard')} className="text-gray-700 hover:text-rose-600 transition flex items-center gap-1">
                  <User size={20} />
                  <span className="text-sm">{user.name}</span>
                </button>
                <button onClick={logout} className="text-gray-500 hover:text-rose-600 text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={handleAuthClick} className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition">
                Login
              </button>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-rose-600">
              Home
            </button>
            <button onClick={() => { setCurrentPage('shop'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-rose-600">
              Shop
            </button>
            <button onClick={() => { setCurrentPage('custom-order'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-rose-600">
              Custom Order
            </button>
            {user ? (
              <>
                <button onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-rose-600">
                  Dashboard
                </button>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-rose-600">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => { handleAuthClick(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-rose-600">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Home Page
function HomePage() {
  const { setCurrentPage, products } = useApp();

  return (
    <div>
      <section className="relative h-96 bg-gradient-to-r from-rose-400 to-pink-300 flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Your Perfect Fit, Your Perfect Style</h1>
          <p className="text-xl mb-8">Handcrafted with your measurements</p>
          <button onClick={() => setCurrentPage('custom-order')} className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-rose-50 transition">
            Get Custom Made
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Ethnic', 'Western', 'Bridal', 'Partywear'].map((category) => (
            <button key={category} onClick={() => setCurrentPage('shop')} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => setCurrentPage('shop')} className="bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition">
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Priya Sharma", text: "Amazing quality and perfect fit! The custom measurement option made all the difference." },
            { name: "Anita Desai", text: "Beautiful designs and excellent customer service. Highly recommend!" },
            { name: "Meera Patel", text: "The bridal collection is stunning. Got my dream wedding outfit here!" }
          ].map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{review.text}"</p>
              <p className="font-semibold text-gray-800">- {review.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Shop Page
function ShopPage() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, products } = useApp();

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8 text-gray-800">Our Collection</h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {['All', 'Ethnic', 'Western', 'Bridal', 'Partywear'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-rose-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-rose-600 w-full md:w-64"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-xl">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const { setCurrentPage, setSelectedProduct, addToCart, toggleWishlist, wishlist } = useApp();
  const isInWishlist = wishlist.find(item => item.id === product.id);

  const handleViewDetails = () => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-rose-50 transition"
        >
          <Heart size={20} className={isInWishlist ? 'text-rose-600 fill-current' : 'text-gray-600'} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-sm text-rose-600 font-semibold">{product.category}</span>
        <h3 className="text-xl font-semibold text-gray-800 mt-1 mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-4">₹{product.price.toLocaleString()}</p>
        <div className="flex gap-2">
          <button onClick={handleViewDetails} className="flex-1 bg-rose-600 text-white py-2 rounded-full hover:bg-rose-700 transition">
            View Details
          </button>
          <button onClick={() => addToCart(product)} className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full hover:bg-rose-200 transition">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Details Page
function ProductDetailsPage() {
  const { selectedProduct, setCurrentPage, addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (selectedProduct && selectedProduct.colors && selectedProduct.colors.length > 0) {
      setSelectedColor(selectedProduct.colors[0]);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button onClick={() => setCurrentPage('shop')} className="text-rose-600 mb-6 hover:underline flex items-center gap-1">
        ← Back to Shop
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <span className="text-sm text-rose-600 font-semibold">{selectedProduct.category}</span>
          <h1 className="text-4xl font-serif font-bold text-gray-800 mt-2 mb-4">{selectedProduct.name}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-gray-600">({selectedProduct.rating} rating)</span>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-6">₹{selectedProduct.price.toLocaleString()}</p>
          <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select Size</label>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border-2 rounded-lg transition ${
                    selectedSize === size
                      ? 'border-rose-600 bg-rose-50 text-rose-600'
                      : 'border-gray-300 text-gray-700 hover:border-rose-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Select Color</label>
              <div className="flex gap-2 flex-wrap">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded-lg transition ${
                      selectedColor === color
                        ? 'border-rose-600 bg-rose-50 text-rose-600'
                        : 'border-gray-300 text-gray-700 hover:border-rose-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => {
                addToCart(selectedProduct, selectedSize, selectedColor);
                alert('Added to cart!');
              }} 
              className="flex-1 bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition font-semibold"
            >
              Add to Cart
            </button>
            <button onClick={() => setCurrentPage('custom-order')} className="flex-1 bg-amber-500 text-white py-3 rounded-full hover:bg-amber-600 transition font-semibold">
              Custom Order
            </button>
          </div>

          <div className="bg-rose-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Want a perfect fit?</h3>
            <p className="text-gray-600 text-sm">Get this dress tailored to your exact measurements with our custom order service!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Order Page - Will continue in next message due to length limit

// Checkout Page
function CheckoutPage() {
  const { cart, user, setShowAuthModal, createOrder, clearCart, setCurrentPage } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [bankProof, setBankProof] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const codFee = paymentMethod === 'cod' ? 50 : 0;
  const shipping = subtotal > 2000 ? 0 : 100;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax + codFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const orderData = {
      items: cart,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      codFee,
      total,
      bankProof: bankProof ? URL.createObjectURL(bankProof) : null
    };

    const order = createOrder(orderData);
    clearCart();
    setCurrentPage('order-confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <button onClick={() => setCurrentPage('shop')} className="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8 text-gray-800">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Address *</label>
                <textarea
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Pincode *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.pincode}
                  onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-rose-600 transition">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Package size={20} className="text-rose-600" />
                    <span className="font-semibold">Cash on Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Pay when you receive your order (+₹50 fee)</p>
                </div>
              </label>

              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-rose-600 transition">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard size={20} className="text-rose-600" />
                    <span className="font-semibold">Bank Transfer</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Transfer to our bank account</p>
                </div>
              </label>

              {paymentMethod === 'bank' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Bank Details:</h3>
                  <p className="text-sm">Bank: State Bank of India</p>
                  <p className="text-sm">Account: 1234567890</p>
                  <p className="text-sm">IFSC: SBIN0001234</p>
                  <p className="text-sm">UPI: eleganceboutique@sbi</p>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-2">Upload Payment Proof</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBankProof(e.target.files[0])}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between">
                  <span>COD Fee</span>
                  <span>₹{codFee}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition font-semibold mt-6"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Order Confirmation Page
function OrderConfirmationPage() {
  const { lastOrder, setCurrentPage } = useApp();

  if (!lastOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p>No order found</p>
        <button onClick={() => setCurrentPage('home')} className="mt-4 bg-rose-600 text-white px-6 py-3 rounded-full">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your order</p>
        
        <div className="bg-rose-50 p-6 rounded-lg mb-6 text-left">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <p><strong>Order ID:</strong> {lastOrder.id}</p>
          <p><strong>Status:</strong> {lastOrder.status}</p>
          <p><strong>Payment Method:</strong> {lastOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
          <p><strong>Total:</strong> ₹{lastOrder.total.toLocaleString()}</p>
        </div>

        {lastOrder.paymentMethod === 'cod' && (
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <p className="text-sm">Please keep ₹{lastOrder.total.toLocaleString()} ready for payment on delivery</p>
          </div>
        )}

        {lastOrder.paymentMethod === 'bank' && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm">Your order will be processed after payment verification</p>
          </div>
        )}

        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentPage('dashboard')} 
            className="flex-1 bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition"
          >
            View Orders
          </button>
          <button 
            onClick={() => setCurrentPage('shop')} 
            className="flex-1 border-2 border-rose-600 text-rose-600 py-3 rounded-full hover:bg-rose-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// Custom Order Page
function CustomOrderPage() {
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState('size');
  const [selectedSize, setSelectedSize] = useState('M');
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    shoulder: '',
    length: '',
    sleeve: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products } = useApp();

  const handleMeasurementChange = (field, value) => {
    setMeasurements({ ...measurements, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8 text-gray-800">Custom Order</h1>

      <div className="flex justify-center mb-12">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= num ? 'bg-rose-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {num}
            </div>
            {num < 4 && <div className={`w-16 h-1 ${step > num ? 'bg-rose-600' : 'bg-gray-300'}`}></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 1: Choose Your Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.slice(0, 4).map((product) => (
              <button
                key={product.id}
                onClick={() => { setSelectedProduct(product); setStep(2); }}
                className={`border-2 rounded-lg p-4 hover:border-rose-600 transition ${
                  selectedProduct?.id === product.id ? 'border-rose-600' : 'border-gray-300'
                }`}
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-rose-600 font-bold">₹{product.price.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 2: Choose Order Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setOrderType('size')}
              className={`p-6 border-2 rounded-lg transition ${
                orderType === 'size' ? 'border-rose-600 bg-rose-50' : 'border-gray-300 hover:border-rose-600'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">Standard Size</h3>
              <p className="text-gray-600">Choose from our standard sizes</p>
            </button>
            <button
              onClick={() => setOrderType('custom')}
              className={`p-6 border-2 rounded-lg transition ${
                orderType === 'custom' ? 'border-rose-600 bg-rose-50' : 'border-gray-300 hover:border-rose-600'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">Custom Measurements</h3>
              <p className="text-gray-600">Enter your exact measurements</p>
            </button>
          </div>

          {orderType === 'size' && (
            <div>
              <label className="block text-gray-700 font-semibold mb-4">Select Size</label>
              <div className="flex gap-3 flex-wrap">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg transition ${
                      selectedSize === size
                        ? 'border-rose-600 bg-rose-50 text-rose-600'
                        : 'border-gray-300 text-gray-700 hover:border-rose-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {orderType === 'custom' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Enter Your Measurements (in inches)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(measurements).map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 mb-2 capitalize">{field}</label>
                    <input
                      type="number"
                      value={measurements[field]}
                      onChange={(e) => handleMeasurementChange(field, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Tip:</strong> For best results, have someone help you take measurements.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
              Back
            </button>
            <button onClick={() => setStep(3)} className="flex-1 bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition font-semibold">
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 3: Upload Reference Image (Optional)</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-rose-600 transition">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Upload a photo for reference</p>
            <p className="text-sm text-gray-500">You can upload body measurements or inspiration images</p>
            <button className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition">
              Choose File
            </button>
          </div>
          <div className="flex gap-4 mt-8">
            <button onClick={() => setStep(2)} className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
              Back
            </button>
            <button onClick={() => setStep(4)} className="flex-1 bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition font-semibold">
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Summary</h2>
            <p className="text-gray-600">Review your custom order details</p>
          </div>

          <div className="bg-rose-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Product:</strong> {selectedProduct?.name}</p>
              <p><strong>Price:</strong> ₹{selectedProduct?.price.toLocaleString()}</p>
              <p><strong>Order Type:</strong> {orderType === 'size' ? 'Standard Size' : 'Custom Measurements'}</p>
              {orderType === 'size' && <p><strong>Size:</strong> {selectedSize}</p>}
              {orderType === 'custom' && (
                <div>
                  <p><strong>Measurements:</strong></p>
                  <ul className="ml-4 mt-2">
                    {Object.entries(measurements).map(([key, value]) => (
                      <li key={key} className="capitalize">{key}: {value} inches</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Delivery Information</h3>
            <p className="text-gray-600">Expected delivery: 10-15 business days</p>
            <p className="text-gray-600">We'll send you tracking details via email</p>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(3)} className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
              Back
            </button>
            <button onClick={() => alert('Custom order placed successfully! 🎉')} className="flex-1 bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition font-semibold">
              Place Order - ₹{selectedProduct?.price.toLocaleString()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard Page
function DashboardPage() {
  const { user, orders, measurements, addMeasurement, deleteMeasurement, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState('orders');
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState({
    name: 'Profile 1',
    bust: '',
    waist: '',
    hips: '',
    shoulder: '',
    length: '',
    sleeve: ''
  });

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <User size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view dashboard</h2>
        <button onClick={() => setCurrentPage('home')} className="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition">
          Go to Home
        </button>
      </div>
    );
  }

  const handleAddMeasurement = (e) => {
    e.preventDefault();
    addMeasurement(newMeasurement);
    setShowMeasurementForm(false);
    setNewMeasurement({
      name: 'Profile ' + (measurements.length + 2),
      bust: '',
      waist: '',
      hips: '',
      shoulder: '',
      length: '',
      sleeve: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold mb-8 text-gray-800">My Dashboard</h1>

      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'orders'
              ? 'text-rose-600 border-b-2 border-rose-600'
              : 'text-gray-600 hover:text-rose-600'
          }`}
        >
          My Orders
        </button>
        <button
          onClick={() => setActiveTab('measurements')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'measurements'
              ? 'text-rose-600 border-b-2 border-rose-600'
              : 'text-gray-600 hover:text-rose-600'
          }`}
        >
          Saved Measurements
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No orders yet</p>
              <button onClick={() => setCurrentPage('shop')} className="mt-4 bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition">
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Order #{order.id}</h3>
                    <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                    order.status === 'Payment Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800 mb-2">Items:</p>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-gray-600">• {item.name} x{item.quantity}</p>
                  ))}
                  <p className="text-xl font-bold text-rose-600 mt-4">Total: ₹{order.total.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'measurements' && (
        <div className="space-y-4">
          {measurements.map((profile) => (
            <div key={profile.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
                <button onClick={() => deleteMeasurement(profile.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">Bust</p>
                  <p className="font-semibold">{profile.bust}"</p>
                </div>
                <div>
                  <p className="text-gray-600">Waist</p>
                  <p className="font-semibold">{profile.waist}"</p>
                </div>
                <div>
                  <p className="text-gray-600">Hips</p>
                  <p className="font-semibold">{profile.hips}"</p>
                </div>
                <div>
                  <p className="text-gray-600">Shoulder</p>
                  <p className="font-semibold">{profile.shoulder}"</p>
                </div>
                <div>
                  <p className="text-gray-600">Length</p>
                  <p className="font-semibold">{profile.length}"</p>
                </div>
                <div>
                  <p className="text-gray-600">Sleeve</p>
                  <p className="font-semibold">{profile.sleeve}"</p>
                </div>
              </div>
            </div>
          ))}
          
          {showMeasurementForm ? (
            <form onSubmit={handleAddMeasurement} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Add New Measurement Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Profile Name</label>
                  <input
                    type="text"
                    required
                    value={newMeasurement.name}
                    onChange={(e) => setNewMeasurement({...newMeasurement, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                  />
                </div>
                {Object.keys(newMeasurement).filter(k => k !== 'name').map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 mb-2 capitalize">{field} (inches)</label>
                    <input
                      type="number"
                      required
                      value={newMeasurement[field]}
                      onChange={(e) => setNewMeasurement({...newMeasurement, [field]: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition">
                  Save
                </button>
                <button type="button" onClick={() => setShowMeasurementForm(false)} className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button 
              onClick={() => setShowMeasurementForm(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-rose-600 hover:text-rose-600 transition"
            >
              + Add New Measurement Profile
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Élégance Boutique</h3>
            <p className="text-gray-400">Your perfect fit, your perfect style</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Shop</a></li>
              <li><a href="#" className="hover:text-white transition">Custom Orders</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</p>
              <p className="flex items-center gap-2"><Mail size={16} /> info@eleganceboutique.com</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> Mumbai, India</p>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-rose-400 transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-rose-400 transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-rose-400 transition"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Élégance Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default BoutiqueStore;
