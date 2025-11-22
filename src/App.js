import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, User, Menu, X, Star, Check, Phone, Mail,  
  ArrowRight, Plus, Minus, Trash2, ExternalLink, DollarSign,
  CreditCard, Shield, FileText, Settings, Package, BarChart3,
  LogOut, Edit3
} from 'lucide-react';
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
  const [userRole, setUserRole] = useState('member');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loginMode, setLoginMode] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [customDescriptions, setCustomDescriptions] = useState({});
  const [currentView, setCurrentView] = useState('customer');
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    price: '',
    category: 'STANDARD',
    materials: true,
    slides: 10,
    description: '',
    slideDescriptions: ['', '', '', '']
  });
  const [orders, setOrders] = useState([]);
  const [websiteMaintenance, setWebsiteMaintenance] = useState(false);
  const [adminStats, setAdminStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalTemplates: 16
  });

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
      description: 'Professional corporate presentation with clean layout. Perfect for business meetings and corporate reports.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Cover Page - Professional company branding with logo and title",
        "Slide 2: Agenda - Structured overview of presentation topics",
        "Slide 3: Market Analysis - Data-driven insights with charts and graphs",
        "Slide 4: Financial Highlights - Revenue and profit analysis"
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
      description: 'Perfect for startup pitches to investors with compelling storytelling.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Problem Statement - Clear identification of market gap",
        "Slide 2: Solution Overview - Innovative solution presentation",
        "Slide 3: Market Size - TAM, SAM, SOM analysis with visuals",
        "Slide 4: Business Model - Revenue streams and monetization strategy"
      ]
    },
    // ... (templates lainnya dengan deskripsi yang lebih detail)
  ];

  // Filter templates
  const filteredTemplates = templates.filter(t => {
    const categoryMatch = selectedCategory === 'ALL' || t.category === selectedCategory;
    const materialMatch = selectedMaterial === 'ALL' ||
      (selectedMaterial === 'WITH MATERIALS' && t.materials) ||
      (selectedMaterial === 'WITHOUT MATERIALS' && !t.materials);
    return categoryMatch && materialMatch;
  });

  // Cart functions
  const addToCart = (template) => {
    const existing = cart.find(item => item.id === template.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === template.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { 
        ...template, 
        quantity: 1,
        customDescription: customDescriptions[template.id] || ''
      }]);
    }
    alert(`${template.name} ditambahkan ke keranjang!`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const updateCustomDescription = (id, description) => {
    setCustomDescriptions(prev => ({
      ...prev,
      [id]: description
    }));
    setCart(cart.map(item => 
      item.id === id ? { ...item, customDescription: description } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Local Storage
  useEffect(() => {
    const savedCart = localStorage.getItem('ascendia_cart');
    const savedCustomDesc = localStorage.getItem('ascendia_custom_desc');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart:', e);
      }
    }
    
    if (savedCustomDesc) {
      try {
        setCustomDescriptions(JSON.parse(savedCustomDesc));
      } catch (e) {
        console.error('Error parsing custom descriptions:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ascendia_cart', JSON.stringify(cart));
    localStorage.setItem('ascendia_custom_desc', JSON.stringify(customDescriptions));
  }, [cart, customDescriptions]);

  // Authentication
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Check user role - sederhana berdasarkan email
          const isAdmin = session.user.email === 'admin@ascendia.com' || session.user.email.includes('admin');
          setUserRole(isAdmin ? 'admin' : 'member');
          if (isAdmin) {
            setCurrentView('admin');
            fetchOrders();
          }
        }
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user || null);
            if (session?.user) {
              const isAdmin = session.user.email === 'admin@ascendia.com' || session.user.email.includes('admin');
              setUserRole(isAdmin ? 'admin' : 'member');
              if (isAdmin) {
                setCurrentView('admin');
                fetchOrders();
              } else {
                setCurrentView('customer');
              }
            } else {
              setUserRole('member');
              setCurrentView('customer');
            }
          }
        );
        
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };
    initAuth();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (loginMode === 'signup') {
        const { error } = await supabase.auth.signUp({ 
          email: loginEmail, 
          password: loginPassword 
        });
        if (error) throw error;
        alert('Akun berhasil dibuat! Silakan login.');
        setLoginMode('login');
        setLoginEmail('');
        setLoginPassword('');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ 
          email: loginEmail, 
          password: loginPassword 
        });
        if (error) throw error;
        setShowAuthModal(false);
        setLoginEmail('');
        setLoginPassword('');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserRole('member');
      setCurrentView('customer');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Reviews
  const fetchReviews = async (templateId) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*, profiles(username)')
        .eq('template_id', templateId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback ke data dummy jika error
      setReviews([
        {
          id: 1,
          rating: 5,
          comment: "Template sangat bagus dan profesional!",
          profiles: { username: "User123" }
        },
        {
          id: 2,
          rating: 4,
          comment: "Desainnya modern dan mudah diedit.",
          profiles: { username: "BusinessOwner" }
        }
      ]);
    }
  };

  const submitReview = async () => {
    if (!user) {
      alert('Silakan login terlebih dahulu untuk memberikan ulasan!');
      setShowAuthModal(true);
      return;
    }
    
    if (!rating) {
      alert('Silakan beri rating terlebih dahulu!');
      return;
    }
    
    if (!comment.trim()) {
      alert('Silakan tulis komentar untuk ulasan!');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({ 
          template_id: previewTemplate.id, 
          user_id: user.id, 
          rating, 
          comment: comment.trim() 
        });
      
      if (error) throw error;
      
      alert('Ulasan berhasil dikirim! Terima kasih atas feedbacknya.');
      setComment('');
      setRating(0);
      fetchReviews(previewTemplate.id);
    } catch (error) {
      alert('Gagal mengirim ulasan: ' + error.message);
    }
  };

  // Orders & Admin Functions
  const fetchOrders = async () => {
    try {
      // Simulasi data orders untuk demo
      const mockOrders = [
        {
          id: 1,
          user_id: '1',
          items: [{ name: 'Corporate Business Pro', quantity: 1, price: 10000 }],
          total: 10000,
          status: 'completed',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          user_id: '2',
          items: [{ name: 'Startup Pitch Essential', quantity: 2, price: 10000 }],
          total: 20000,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ];
      setOrders(mockOrders);
      
      // Update stats
      setAdminStats({
        totalOrders: mockOrders.length,
        totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
        totalTemplates: templates.length
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Keranjang belanja Anda kosong!');
      return;
    }
    
    if (!user) {
      alert('Silakan login terlebih dahulu untuk melakukan checkout!');
      setShowAuthModal(true);
      return;
    }
    
    const orderDetails = cart.map(item =>
      `- ${item.name} (${item.category}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}\n  Deskripsi: ${item.customDescription || 'Tidak ada deskripsi khusus'}`
    ).join('\n');
    
    const customerInfo = user ? `\n*Customer:* ${user.email}` : '';
    
    const message = `🛒 *ORDER ASCENDIA TEMPLATE*\n\n${orderDetails}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*${customerInfo}\n\nSaya ingin memesan template di atas. Mohon info untuk proses selanjutnya.`;
    
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
    
    // Clear cart setelah checkout
    setCart([]);
    setCustomDescriptions({});
    setCartOpen(false);
  };

  const handleQRIS = () => {
    if (cart.length === 0) {
      alert('Keranjang belanja Anda kosong!');
      return;
    }
    
    if (!user) {
      alert('Silakan login terlebih dahulu untuk pembayaran!');
      setShowAuthModal(true);
      return;
    }
    
    alert('🚀 *FITUR QRIS AKAN SEGERA HADIR!*\n\nUntuk saat ini, silakan gunakan metode checkout via WhatsApp untuk pemesanan. Terima kasih!');
    
    // Simulasi: Clear cart setelah klik QRIS
    setCart([]);
    setCustomDescriptions({});
    setCartOpen(false);
  };

  // Admin Functions
  const addNewTemplate = async () => {
    if (!newTemplate.name.trim()) {
      alert('Nama template harus diisi!');
      return;
    }
    
    if (!newTemplate.price || newTemplate.price < 0) {
      alert('Harga template harus diisi dengan angka yang valid!');
      return;
    }
    
    try {
      // Simulasi penambahan template
      const newTemplateData = {
        id: templates.length + 1,
        name: newTemplate.name,
        price: parseInt(newTemplate.price),
        category: newTemplate.category,
        materials: newTemplate.materials,
        slides: newTemplate.slides,
        description: newTemplate.description,
        rating: 0,
        previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
        slideDescriptions: newTemplate.slideDescriptions.filter(desc => desc.trim() !== '')
      };
      
      alert(`Template "${newTemplate.name}" berhasil ditambahkan!`);
      
      // Reset form
      setNewTemplate({
        name: '',
        price: '',
        category: 'STANDARD',
        materials: true,
        slides: 10,
        description: '',
        slideDescriptions: ['', '', '', '']
      });
      
      // Update stats
      setAdminStats(prev => ({
        ...prev,
        totalTemplates: prev.totalTemplates + 1
      }));
    } catch (error) {
      alert('Error menambahkan template: ' + error.message);
    }
  };

  const toggleMaintenance = () => {
    setWebsiteMaintenance(!websiteMaintenance);
    alert(`Website maintenance mode ${!websiteMaintenance ? 'diaktifkan' : 'dinonaktifkan'}`);
  };

  // Components
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

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Kelola template, pesanan, dan website</p>
          </div>
          <button
            onClick={() => setCurrentView('customer')}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Kembali ke Toko
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Pesanan</p>
                <p className="text-2xl font-bold text-white">{adminStats.totalOrders}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Pendapatan</p>
                <p className="text-2xl font-bold text-white">Rp {adminStats.totalRevenue.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Template Tersedia</p>
                <p className="text-2xl font-bold text-white">{adminStats.totalTemplates}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tambah Template Form */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Tambah Template Baru
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nama Template</label>
                <input
                  type="text"
                  placeholder="Contoh: Business Professional"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Harga (Rp)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={newTemplate.price}
                    onChange={(e) => setNewTemplate({...newTemplate, price: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="STANDARD">Standard</option>
                    <option value="PREMIUM">Premium</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newTemplate.materials}
                  onChange={(e) => setNewTemplate({...newTemplate, materials: e.target.checked})}
                  className="w-4 h-4"
                  id="materials"
                />
                <label htmlFor="materials" className="text-white text-sm">
                  Include Materials (konten lengkap)
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi Template</label>
                <textarea
                  placeholder="Jelaskan fitur dan keunggulan template..."
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                  rows="3"
                />
              </div>
              
              <button
                onClick={addNewTemplate}
                className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Tambah Template
              </button>
            </div>
          </div>

          {/* Website Management */}
          <div className="space-y-6">
            {/* Maintenance Toggle */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Kelola Website
              </h3>
              <button
                onClick={toggleMaintenance}
                className={`w-full py-3 rounded font-bold ${
                  websiteMaintenance 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } text-white transition-colors`}
              >
                {websiteMaintenance ? '✅ Nonaktifkan Maintenance' : '🚧 Aktifkan Maintenance'}
              </button>
              <p className="text-gray-400 text-sm mt-2">
                {websiteMaintenance 
                  ? 'Website sedang dalam mode maintenance' 
                  : 'Website aktif untuk pengunjung'}
              </p>
            </div>
            
            {/* Orders List */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Daftar Pesanan Terbaru
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {orders.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">Belum ada pesanan</p>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="bg-gray-700 p-3 rounded border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white text-sm font-semibold">Order #{order.id}</p>
                          <p className="text-gray-300 text-xs">
                            {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        } text-white`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold">Rp {order.total.toLocaleString()}</span>
                        <span className="text-gray-400 text-xs">
                          {new Date(order.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Auth Modal Component
  const renderAuthModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            {loginMode === 'login' ? 'Login ke ASCENDIA' : 'Daftar Akun Baru'}
          </h3>
          <button 
            onClick={() => setShowAuthModal(false)} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            {loginMode === 'login' ? 'Login' : 'Daftar'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setLoginMode(loginMode === 'login' ? 'signup' : 'login')}
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            {loginMode === 'login' 
              ? 'Belum punya akun? Daftar di sini' 
              : 'Sudah punya akun? Login di sini'}
          </button>
        </div>

        {/* Info Cara Memesan */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-bold text-white text-sm mb-3 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Cara Memesan Template:
          </h4>
          <ol className="text-gray-300 text-sm space-y-2">
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
              <span>Login/Daftar akun terlebih dahulu</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
              <span>Pilih template yang diinginkan</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
              <span>Tambahkan ke keranjang belanja</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
              <span>Checkout dan pilih metode pembayaran</span>
            </li>
          </ol>
        </div>

        {/* Demo Accounts */}
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-400 text-xs text-center">
            💡 <strong>Demo Admin:</strong> admin@ascendia.com / password123
          </p>
        </div>
      </div>
    </div>
  );

  // Jika dalam mode maintenance
  if (websiteMaintenance && userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <TriangleLogo className="w-32 h-32 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">🚧 Sedang Maintenance</h1>
          <p className="text-gray-400 text-lg mb-6">
            Website sedang dalam perbaikan untuk pengalaman yang lebih baik. Silakan kembali lagi nanti.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-300 text-sm">
              Untuk pertanyaan darurat, hubungi:<br />
              <strong>info@ascendia.com</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan admin dashboard jika user adalah admin
  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  // Tampilan utama untuk customer
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('customer')}>
                <TriangleLogo />
                <AscendiaText className="text-2xl font-bold tracking-tight text-white" />
              </div>
              <nav className="hidden lg:flex space-x-8">
                <a href="#templates" className="text-gray-300 hover:text-white transition-colors">Templates</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Admin Switch Button */}
              {userRole === 'admin' && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hidden lg:flex items-center space-x-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
              )}

              {/* Cart Button */}
              <button 
                className="p-2 hover:bg-gray-900 rounded-lg transition relative" 
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <button className="p-2 hover:bg-gray-900 rounded-lg transition flex items-center space-x-2">
                    <User className="w-5 h-5 text-white" />
                    <span className="text-white hidden sm:block">{user.email.split('@')[0]}</span>
                    <span className="text-blue-400 text-xs hidden md:block capitalize">({userRole})</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg hidden group-hover:block border border-gray-700 z-50">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-sm text-white truncate">{user.email}</p>
                      <p className="text-xs text-blue-400 capitalize">{userRole}</p>
                    </div>
                    {userRole === 'admin' && (
                      <button 
                        onClick={() => setCurrentView('admin')}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                      >
                        <Settings className="w-4 h-4 inline mr-2" />
                        Admin Dashboard
                      </button>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="p-2 hover:bg-gray-900 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white hidden sm:block">Login</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && renderAuthModal()}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 lg:inset-auto lg:right-0 lg:top-20 lg:bottom-0 lg:w-96">
          <div className="absolute inset-0 bg-black/80 lg:hidden" onClick={() => setCartOpen(false)}></div>
          <div className="relative h-full bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">🛒 Keranjang Belanja</h3>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2">Keranjang kosong</p>
                  <p className="text-sm">Silakan tambahkan template ke keranjang</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-white leading-tight">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-400 mb-3">
                        {item.category} • {item.materials ? 'With Materials' : 'Without Materials'}
                      </p>

                      {/* Custom Description Input untuk template dengan materials */}
                      {item.materials && (
                        <div className="mb-3">
                          <label className="block text-xs text-gray-400 mb-1">
                            📝 Deskripsi Kustom (isi konten per slide):
                          </label>
                          <textarea
                            value={item.customDescription || ''}
                            onChange={(e) => updateCustomDescription(item.id, e.target.value)}
                            placeholder="Contoh: 
Slide 1: Company overview...
Slide 2: Market analysis...
Slide 3: Financial data..."
                            className="w-full p-2 bg-gray-700 text-white text-xs rounded border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                            rows="3"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Isi konten untuk setiap slide yang Anda inginkan
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-white text-lg">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-white text-lg">Total:</span>
                  <span className="font-bold text-2xl text-white">Rp {cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  {!user ? (
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setCartOpen(false);
                      }}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <User className="w-5 h-5 mr-2" />
                      Login untuk Checkout
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Checkout via WhatsApp
                      </button>
                      
                      <button
                        onClick={handleQRIS}
                        className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <DollarSign className="w-5 h-5 mr-2" />
                        Bayar via QRIS
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400">
                    * Pesanan akan diproses dalam 1x24 jam
                  </p>
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
            className="relative w-full max-w-6xl bg-gray-900 rounded-xl overflow-hidden border border-gray-700 max-h-[95vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-800 bg-gray-800 sticky top-0 z-10">
              <div>
                <h3 className="font-bold text-white text-xl">{previewTemplate.name}</h3>
                <p className="text-gray-400 text-sm">{previewTemplate.description}</p>
              </div>
              <button 
                onClick={() => {
                  setPreviewTemplate(null);
                  setCurrentSlideIndex(0);
                  setRating(0);
                  setComment('');
                }}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Preview Slides Section */}
                <div>
                  <h4 className="font-bold text-white mb-4 text-lg">Preview Template</h4>
                  
                  {previewTemplate.previewSlides.length > 0 ? (
                    <div className="space-y-4">
                      <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700">
                        <img
                          src={previewTemplate.previewSlides[currentSlideIndex]}
                          alt={`Slide ${currentSlideIndex + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="text-center text-gray-400 text-sm">
                        Slide {currentSlideIndex + 1} of {Math.min(previewTemplate.previewSlides.length, 7)}
                      </div>
                      
                      <div className="flex justify-center gap-2 mb-4">
                        {previewTemplate.previewSlides.slice(0, 7).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlideIndex(idx)}
                            className={`w-3 h-3 rounded-full transition ${
                              currentSlideIndex === idx ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {previewTemplate.slideDescriptions && previewTemplate.slideDescriptions[currentSlideIndex] && (
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <h4 className="font-semibold text-white mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Deskripsi Slide {currentSlideIndex + 1}:
                          </h4>
                          <p className="text-gray-300 text-sm">{previewTemplate.slideDescriptions[currentSlideIndex]}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No preview available</p>
                  )}
                </div>

                {/* Reviews Section */}
                <div>
                  <h4 className="font-bold text-white mb-4 text-lg">Ulasan Produk ({reviews.length})</h4>
                  
                  {reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500">Belum ada ulasan untuk template ini.</p>
                      <p className="text-gray-400 text-sm mt-1">Jadilah yang pertama memberikan ulasan!</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {reviews.map(review => (
                        <div key={review.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-sm">
                                  {i < review.rating ? '★' : '☆'}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              {review.profiles?.username || 'Anonymous'}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Review Form */}
                  <div className="mt-6 border-t border-gray-800 pt-6">
                    <h4 className="font-bold text-white mb-4 flex items-center">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Beri Ulasan
                    </h4>
                    
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map(star => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className="text-2xl transition transform hover:scale-110"
                            >
                              {star <= rating ? '★' : '☆'}
                            </button>
                          ))}
                          <span className="ml-2 text-gray-400 text-sm">{rating}/5 Bintang</span>
                        </div>
                        
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Bagikan pengalaman Anda menggunakan template ini. Apa yang Anda sukai? Apakah mudah digunakan?"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                          rows="4"
                        />
                        
                        <button
                          onClick={submitReview}
                          disabled={!rating || !comment.trim()}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                          Kirim Ulasan
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-gray-800 rounded-lg border border-gray-700">
                        <User className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400 mb-3">Login untuk memberikan ulasan</p>
                        <button
                          onClick={() => {
                            setPreviewTemplate(null);
                            setShowAuthModal(true);
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Login Sekarang
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-800 sticky bottom-0">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                <div>
                  <span className="text-2xl font-bold text-white">
                    Rp {previewTemplate.price.toLocaleString()}
                  </span>
                  <p className="text-gray-400 text-sm">
                    {previewTemplate.category} • {previewTemplate.slides} Slides • 
                    {previewTemplate.materials ? ' With Materials' : ' Without Materials'}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setPreviewTemplate(null);
                      setCurrentSlideIndex(0);
                    }}
                    className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      addToCart(previewTemplate);
                      setPreviewTemplate(null);
                    }}
                    className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
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
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Template presentasi profesional dengan harga terjangkau. Dapatkan desain berkualitas tinggi untuk kebutuhan bisnis, pendidikan, dan presentasi profesional lainnya.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#templates" className="group bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 flex items-center transition-all duration-300">
                Jelajahi Template
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button 
                onClick={() => setShowAuthModal(true)}
                className="group border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Pricelist</h2>
            <p className="text-gray-400 text-lg">Harga sederhana dan jelas untuk template profesional pertama Anda</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-8 hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-6 text-white">Standard (10 Slide)</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-300">Dengan Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 10.000</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Tanpa Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 15.000</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  Desain Profesional
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  10 Slide Unik
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  Konten Dapat Diedit
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  Format PowerPoint
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white rounded-3xl p-8 relative hover:border-yellow-400 transition-colors duration-300">
              <div className="absolute top-0 right-0 bg-white text-black px-4 py-1 text-sm font-bold rounded-bl-xl rounded-tr-xl">
                PREMIUM
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">Premium (10 Slide)</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Dengan Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 20.000</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Tanpa Materials</span>
                  <span className="text-2xl font-bold text-white">Rp 25.000</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  Desain Premium Eksklusif
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  10 Slide Advanced
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  Priority Support
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  Customization Available
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 
                  Free Revisions
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-400">
            <p className="text-sm">
              💡 <strong>Slide tambahan:</strong> <span className="text-white font-bold">Rp 1.000</span> per slide
            </p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Template Kami</h2>
            <p className="text-gray-400 text-lg">{templates.length} template profesional siap digunakan</p>
          </div>
          
          <div className="mb-12 space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-3">Kategori:</p>
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      selectedCategory === cat 
                        ? 'bg-white text-black' 
                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-3">Materials:</p>
              <div className="flex flex-wrap gap-3">
                {materialFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedMaterial(filter)}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      selectedMaterial === filter 
                        ? 'bg-white text-black' 
                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
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
              <div 
                key={template.id} 
                className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-white transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <TriangleLogo className="w-20 h-20 opacity-80" />
                  {template.category === 'PREMIUM' && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-full">
                      PREMIUM
                    </div>
                  )}
                  {template.materials && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                      +Materials
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      template.materials 
                        ? 'text-blue-300 bg-blue-900/30' 
                        : 'text-gray-400 bg-gray-800'
                    }`}>
                      {template.materials ? 'WITH MATERIALS' : 'NO MATERIALS'}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      <span className="text-xs font-semibold text-white">{template.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold mb-2 text-white text-sm leading-tight">
                    {template.name}
                  </h3>
                  
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-white">
                      Rp {template.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {template.slides} slides
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPreviewTemplate(template);
                        fetchReviews(template.id);
                      }}
                      className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => addToCart(template)}
                      className="flex-1 bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm transition-colors flex items-center justify-center"
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
              <p className="text-gray-400 mb-4 leading-relaxed">
                Template PowerPoint profesional untuk semua kebutuhan presentasi Anda. 
                Dapatkan desain berkualitas dengan harga terjangkau.
              </p>
              <a 
                href="https://linktr.ee/ASCENDIAA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" /> 
                Visit Linktree
              </a>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Produk</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    Template Standard
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Template Premium
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Custom Design
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>info@ascendia.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>+62 812-3456-7890</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Cara Memesan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                  <span>Login/Daftar akun terlebih dahulu</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                  <span>Pilih template yang diinginkan</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                  <span>Tambahkan ke keranjang & checkout</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                  <span>Pilih metode pembayaran</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2025 ASCENDIA. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Terms
                </a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}