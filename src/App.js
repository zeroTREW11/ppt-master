import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, User, Menu, X, Star, Check, Phone, Mail, MapPin, 
  ArrowRight, Plus, Minus, Trash2, ExternalLink, LogIn, Lock, 
  AlertTriangle, Settings, DollarSign 
} from 'lucide-react';

// Supabase Client (pastikan sudah buat file terpisah)
import { supabase } from './lib/supabaseClient';

export default function AscendiaEcommerce() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loginMode, setLoginMode] = useState('login'); // 'login' or 'signup'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const categories = ['ALL', 'STANDARD', 'PREMIUM'];
  const materialFilters = ['ALL', 'WITH MATERIALS', 'WITHOUT MATERIALS'];

  const templates = [
    {
      id: 1,
      name: 'Corporate Business Pro',
      price: 10000,
      category: 'STANDARD',
      materials: true,
      rating: 4.8,
      slides: 10,
      description: 'Professional corporate presentation with clean layout.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Cover Page - Company Logo, Title",
        "Slide 2: Agenda - Key topics to be discussed",
        "Slide 3: Market Analysis - Charts and data",
        "Slide 4: Financial Highlights - Revenue, Profit"
      ]
    },
    {
      id: 2,
      name: 'Startup Pitch Essential',
      price: 10000,
      category: 'STANDARD',
      materials: true,
      rating: 4.7,
      slides: 10,
      description: 'Perfect for startup pitches to investors.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Problem Statement",
        "Slide 2: Solution Overview",
        "Slide 3: Market Size - TAM, SAM, SOM",
        "Slide 4: Business Model"
      ]
    },
    {
      id: 3,
      name: 'Education Plus',
      price: 10000,
      category: 'STANDARD',
      materials: true,
      rating: 4.9,
      slides: 10,
      description: 'Engaging educational content with visual aids.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Lesson Title",
        "Slide 2: Learning Objectives",
        "Slide 3: Content Delivery",
        "Slide 4: Assessment"
      ]
    },
    {
      id: 4,
      name: 'Marketing Basic',
      price: 10000,
      category: 'STANDARD',
      materials: true,
      rating: 4.6,
      slides: 10,
      description: 'Marketing presentations with clear call-to-action.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Campaign Overview",
        "Slide 2: Target Audience",
        "Slide 3: Marketing Channels",
        "Slide 4: Performance Metrics"
      ]
    },
    {
      id: 5,
      name: 'Business Classic',
      price: 15000,
      category: 'STANDARD',
      materials: false,
      rating: 4.8,
      slides: 10,
      description: 'Classic business template with professional tone.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Executive Summary",
        "Slide 2: Company History",
        "Slide 3: Organizational Structure",
        "Slide 4: Strategic Plan"
      ]
    },
    {
      id: 6,
      name: 'Minimal Professional',
      price: 15000,
      category: 'STANDARD',
      materials: false,
      rating: 4.7,
      slides: 10,
      description: 'Clean minimal design with ample white space.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Title Slide",
        "Slide 2: Content Slide",
        "Slide 3: Visual Slide",
        "Slide 4: Conclusion Slide"
      ]
    },
    {
      id: 7,
      name: 'Corporate Simple',
      price: 15000,
      category: 'STANDARD',
      materials: false,
      rating: 4.9,
      slides: 10,
      description: 'Simple corporate style with consistent branding.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Brand Guidelines",
        "Slide 2: Presentation Structure",
        "Slide 3: Data Visualization",
        "Slide 4: Contact Information"
      ]
    },
    {
      id: 8,
      name: 'Startup Lite',
      price: 15000,
      category: 'STANDARD',
      materials: false,
      rating: 4.6,
      slides: 10,
      description: 'Lightweight startup deck for quick pitches.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: One-Liner",
        "Slide 2: The Ask",
        "Slide 3: Traction",
        "Slide 4: Team"
      ]
    },
    {
      id: 9,
      name: 'Executive Suite Pro',
      price: 20000,
      category: 'PREMIUM',
      materials: true,
      rating: 5.0,
      slides: 10,
      description: 'Premium executive presentations with advanced animations.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Dynamic Cover",
        "Slide 2: Interactive Dashboard",
        "Slide 3: 3D Models",
        "Slide 4: Custom Icons"
      ]
    },
    {
      id: 10,
      name: 'Investor Deck Elite',
      price: 20000,
      category: 'PREMIUM',
      materials: true,
      rating: 5.0,
      slides: 10,
      description: 'Elite investor pitch deck with financial modeling tools.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Investment Thesis",
        "Slide 2: Financial Projections",
        "Slide 3: Exit Strategy",
        "Slide 4: Risk Mitigation"
      ]
    },
    {
      id: 11,
      name: 'Brand Master',
      price: 20000,
      category: 'PREMIUM',
      materials: true,
      rating: 4.9,
      slides: 10,
      description: 'Premium branding template with asset library.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Brand Story",
        "Slide 2: Visual Identity",
        "Slide 3: Voice and Tone",
        "Slide 4: Application Examples"
      ]
    },
    {
      id: 12,
      name: 'Creative Pro Plus',
      price: 20000,
      category: 'PREMIUM',
      materials: true,
      rating: 4.9,
      slides: 10,
      description: 'Creative professional design with bold typography.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Artistic Title",
        "Slide 2: Collage Layout",
        "Slide 3: Gradient Backgrounds",
        "Slide 4: Creative Transitions"
      ]
    },
    {
      id: 13,
      name: 'Executive Premium',
      price: 25000,
      category: 'PREMIUM',
      materials: false,
      rating: 5.0,
      slides: 10,
      description: 'Top-tier executive template with luxury aesthetics.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Luxury Cover",
        "Slide 2: Premium Graphics",
        "Slide 3: Elegant Typography",
        "Slide 4: Signature Page"
      ]
    },
    {
      id: 14,
      name: 'Luxury Business',
      price: 25000,
      category: 'PREMIUM',
      materials: false,
      rating: 5.0,
      slides: 10,
      description: 'Luxury business presentation with high-end visuals.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Exclusive Design",
        "Slide 2: VIP Client List",
        "Slide 3: Testimonials",
        "Slide 4: Contact"
      ]
    },
    {
      id: 15,
      name: 'Elite Corporate',
      price: 25000,
      category: 'PREMIUM',
      materials: false,
      rating: 4.9,
      slides: 10,
      description: 'Elite corporate design with sophisticated layouts.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Advanced Navigation",
        "Slide 2: Dynamic Charts",
        "Slide 3: Embedded Videos",
        "Slide 4: Custom Animations"
      ]
    },
    {
      id: 16,
      name: 'Premium Pitch Deck',
      price: 25000,
      category: 'PREMIUM',
      materials: false,
      rating: 5.0,
      slides: 10,
      description: 'Premium pitch presentation with cutting-edge technology.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Innovation Spotlight",
        "Slide 2: Market Disruption",
        "Slide 3: Future Roadmap",
        "Slide 4: Investor Benefits"
      ]
    },
  ];

  const filteredTemplates = templates.filter(t => {
    const categoryMatch = selectedCategory === 'ALL' || t.category === selectedCategory;
    const materialMatch = selectedMaterial === 'ALL' ||
      (selectedMaterial === 'WITH MATERIALS' && t.materials) ||
      (selectedMaterial === 'WITHOUT MATERIALS' && !t.materials);
    return categoryMatch && materialMatch;
  });

  // --- CART ---
  const addToCart = (template) => {
    const existing = cart.find(item => item.id === template.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === template.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...template, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- LOCAL STORAGE ---
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // --- AUTH ---
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_, session) => setUser(session?.user || null)
      );
      return () => subscription.unsubscribe();
    };
    initAuth();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (loginMode === 'signup') {
      const { error } = await supabase.auth.signUp({ email: loginEmail, password: loginPassword });
      if (error) alert(error.message);
      else alert('Akun berhasil dibuat! Silakan login.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (error) alert(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // --- REVIEWS ---
  const fetchReviews = async (templateId) => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('template_id', templateId)
      .order('created_at', { ascending: false });
    setReviews(data || []);
  };

  const submitReview = async () => {
    if (!user) return alert('Login dulu ya!');
    if (!rating || !comment.trim()) return alert('Lengkapi rating dan komentar!');
    const { error } = await supabase
      .from('reviews')
      .insert({ template_id: previewTemplate.id, user_id: user.id, rating, comment: comment.trim() });
    if (error) alert('Gagal kirim ulasan');
    else {
      alert('Ulasan berhasil dikirim!');
      setComment('');
      setRating(0);
      fetchReviews(previewTemplate.id);
    }
  };

  // --- CHECKOUT ---
  const handleCheckout = () => {
    if (cart.length === 0) return alert('Keranjang kosong!');
    if (!user) return alert('Login dulu untuk checkout!');
    const orderDetails = cart.map(item =>
      `- ${item.name} (${item.category}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    const message = `🛒 *ASCENDIA ORDER*\n\n${orderDetails}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*\n\n*Saya ingin melakukan pemesanan.*`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleQRIS = () => {
    if (cart.length === 0) return alert('Keranjang kosong!');
    if (!user) return alert('Login dulu untuk checkout!');
    alert('Fitur pembayaran QRIS akan segera tersedia. Untuk saat ini, silakan gunakan WhatsApp untuk konfirmasi pembayaran.');
  };

  // --- MODALS ---
  const renderLoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{loginMode === 'login' ? 'Login' : 'Daftar'}</h3>
          <button onClick={() => setLoginMode('login')} className="text-gray-400">✕</button>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 py-2 rounded font-bold">
            {loginMode === 'login' ? 'Login' : 'Daftar'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={() => setLoginMode(loginMode === 'login' ? 'signup' : 'login')}
            className="text-blue-400 hover:underline"
          >
            {loginMode === 'login' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
          </button>
        </div>
      </div>
    </div>
  );

  // --- COMPONENTS ---
  const TriangleLogo = ({ className = "w-10 h-10" }) => (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points="50,0 0,100 100,100" fill="url(#outerGradient)" />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
        <defs>
          <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon points="50,10 10,90 90,90" fill="url(#middleGradient)" />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
        <defs>
          <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <polygon points="50,20 20,80 80,80" fill="url(#innerGradient)" />
      </svg>
    </div>
  );

  const AscendiaText = ({ className = "text-2xl font-bold tracking-tight" }) => (
    <span className={`${className} relative`}>
      <span className="relative z-10">ASCENDIA</span>
      <span className="absolute top-0.5 left-0 text-gray-700 opacity-70">ASCENDIA</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3">
                <TriangleLogo />
                <AscendiaText className="text-2xl font-bold tracking-tight text-white" />
              </div>
              <nav className="hidden lg:flex space-x-8">
                <a href="/#" className="text-gray-300 hover:text-white">Home</a>
                <a href="#templates" className="text-gray-300 hover:text-white">Templates</a>
                <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
                <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-900 rounded-lg transition relative" onClick={() => setCartOpen(!cartOpen)}>
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              {user ? (
                <div className="relative group">
                  <button className="p-2 hover:bg-gray-900 rounded-lg transition flex items-center">
                    <User className="w-5 h-5 text-white mr-1" />
                    <span className="text-white">{user.email.split('@')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg hidden group-hover:block">
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setLoginMode('login')} className="p-2 hover:bg-gray-900 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </button>
              )}
              <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {loginMode && renderLoginModal()}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 lg:inset-auto lg:right-0 lg:top-20 lg:bottom-0 lg:w-96">
          <div className="absolute inset-0 bg-black/80 lg:hidden" onClick={() => setCartOpen(false)}></div>
          <div className="relative h-full bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Shopping Cart</h3>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Keranjang kosong</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{item.category} - {item.materials ? 'With Materials' : 'Without Materials'}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 bg-gray-700 rounded hover:bg-gray-600">
                            <Minus className="w-3 h-3 mx-auto" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 bg-gray-700 rounded hover:bg-gray-600">
                            <Plus className="w-3 h-3 mx-auto" />
                          </button>
                        </div>
                        <span className="font-bold text-white">Rp {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-gray-800">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-2xl text-white">Rp {cartTotal.toLocaleString()}</span>
                </div>
                <div className="space-y-2">
                  {!user ? (
                    <button
                      onClick={() => setLoginMode('login')}
                      className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-bold cursor-not-allowed"
                    >
                      Login untuk Checkout
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 flex items-center justify-center"
                      >
                        Checkout via WhatsApp
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </button>
                      <button
                        onClick={handleQRIS}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center"
                      >
                        <DollarSign className="mr-2 w-5 h-5" />
                        Bayar via QRIS
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => {
            setPreviewTemplate(null);
            setCurrentSlideIndex(0);
            setRating(0);
            setComment('');
          }}
        >
          <div 
            className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden border border-gray-700"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-800">
              <h3 className="font-bold text-white">{previewTemplate.name}</h3>
              <button 
                onClick={() => {
                  setPreviewTemplate(null);
                  setCurrentSlideIndex(0);
                  setRating(0);
                  setComment('');
                }}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {previewTemplate.previewSlides.length > 0 ? (
                <>
                  <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src={previewTemplate.previewSlides[currentSlideIndex]}
                      alt={`Slide ${currentSlideIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center text-gray-400 text-sm mb-4">
                    Slide {currentSlideIndex + 1} of {Math.min(previewTemplate.previewSlides.length, 7)}
                  </div>
                  <div className="flex justify-center gap-2 mb-4">
                    {previewTemplate.previewSlides.slice(0, 7).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`w-3 h-3 rounded-full ${currentSlideIndex === idx ? 'bg-white' : 'bg-gray-600'}`}
                      />
                    ))}
                  </div>
                  {previewTemplate.slideDescriptions && previewTemplate.slideDescriptions[currentSlideIndex] && (
                    <div className="bg-gray-800 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-white mb-2">Deskripsi Slide:</h4>
                      <p className="text-gray-300">{previewTemplate.slideDescriptions[currentSlideIndex]}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-center py-8">No preview available</p>
              )}
              {/* Reviews Section */}
              <div className="mt-6">
                <h4 className="font-bold mb-3">Ulasan ({reviews.length})</h4>
                {reviews.length === 0 ? (
                  <p className="text-gray-500">Belum ada ulasan.</p>
                ) : (
                  <div className="space-y-3">
                    {reviews.map(r => (
                      <div key={r.id} className="bg-gray-800 p-3 rounded">
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              {i < r.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Review Form */}
              {user ? (
                <div className="mt-6">
                  <div className="flex mb-2">
                    {[1,2,3,4,5].map(i => (
                      <button
                        key={i}
                        onClick={() => setRating(i)}
                        className="text-2xl"
                      >
                        {i <= rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tulis ulasanmu..."
                    className="w-full bg-gray-800 p-2 rounded mb-2"
                    rows="3"
                  />
                  <button
                    onClick={submitReview}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-4">Login untuk memberikan ulasan</p>
              )}
            </div>
            <div className="p-4 border-t border-gray-800 flex justify-end space-x-2">
              <button
                onClick={() => {
                  addToCart(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-full text-sm mb-6 text-white">
              ✨ Professional PowerPoint Templates
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">ASCENDIA</span><br />
              <span className="text-gray-300">Template</span> Solutions
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Professional presentation templates at affordable prices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#templates" className="group bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 flex items-center">
                Browse Templates
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Pricelist</h2>
            <p className="text-gray-400 text-lg">Simple, clear pricing for your first pro template</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Standard (10 Slide)</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span>Using Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 10.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Not Using Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 15.000</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm"><Check className="w-5 h-5 mr-2 text-white" /> Professional Design</li>
                <li className="flex items-center text-sm"><Check className="w-5 h-5 mr-2 text-white" /> 10 Unique Slides</li>
                <li className="flex items-center text-sm"><Check className="w-5 h-5 mr-2 text-white" /> Editable Content</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white rounded-3xl p-8 relative">
              <div className="absolute top-0 right-0 bg-white text-black px-4 py-1 text-sm font-bold rounded-bl-xl rounded-tr-xl">PREMIUM</div>
              <h3 className="text-2xl font-bold mb-6 text-white">Premium (10 Slide)</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span>Using Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 20.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Not Using Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 25.000</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm"><Check className="w-5 h-5 mr-2 text-white" /> Premium Design</li>
                <li className="flex items-center text-sm"><Check className="w-5 h-5 mr-2 text-white" /> 10 Advanced Slides</li>
                <li className="flex items-center text-sm"><Check className="w-5 h-5 mr-2 text-white" /> Priority Support</li>
                <li className="flex items-center text-sm"><Check className="w-5 h-5 mr-2 text-white" /> Advanced Features</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p className="text-sm">Additional slides: <span className="text-white font-bold">Rp 1.000</span> per slide</p>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Templates</h2>
            <p className="text-gray-400 text-lg">16 professional templates ready to use</p>
          </div>
          <div className="mb-12 space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Category:</p>
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
                      selectedCategory === cat ? 'bg-white text-black' : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Materials:</p>
              <div className="flex flex-wrap gap-3">
                {materialFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedMaterial(filter)}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
                      selectedMaterial === filter ? 'bg-white text-black' : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTemplates.map(template => (
              <div key={template.id} className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-white transition">
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <TriangleLogo className="w-20 h-20" />
                  {template.category === 'PREMIUM' && (
                    <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold ${template.materials ? 'text-white bg-gray-800' : 'text-gray-400 bg-gray-900'} px-2 py-1 rounded`}>
                      {template.materials ? 'WITH MATERIALS' : 'NO MATERIALS'}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      <span className="text-xs font-semibold text-white">{template.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold mb-1 text-sm text-white">{template.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-white">Rp {template.price.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        setPreviewTemplate(template);
                        fetchReviews(template.id);
                      }}
                      className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => addToCart(template)}
                      className="flex-1 bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm"
                    >
                      <ShoppingCart className="w-3 h-3 inline mr-1" />
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <TriangleLogo />
                <AscendiaText className="text-xl font-bold text-white" />
              </div>
              <p className="text-gray-400 mb-4">Professional PowerPoint templates for all your presentation needs.</p>
              <a href="https://linktr.ee/ASCENDIAA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white hover:text-gray-300">
                <ExternalLink className="w-4 h-4 mr-2" /> Visit Linktree
              </a>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button className="hover:text-white">Standard Templates</button></li>
                <li><button className="hover:text-white">Premium Templates</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5" />
                  info@ascendia.com
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5" />
                  +62 812-3456-7890
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Cara Pesan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>1. Pilih template</li>
                <li>2. Tambah ke keranjang</li>
                <li>3. Login & checkout via WhatsApp</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">© 2025 ASCENDIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}