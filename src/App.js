import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Menu, X, Star, Check, Phone, Mail,  
  ArrowRight, Plus, Minus, Trash2, ExternalLink, DollarSign,
  FileText, Shield, Download, Clock
} from 'lucide-react';

export default function AscendiaEcommerce() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [orders, setOrders] = useState([]);

  const categories = ['ALL', 'STANDARD', 'PREMIUM'];
  const materialFilters = ['ALL', 'WITH MATERIALS', 'WITHOUT MATERIALS'];

  const templates = [
    // STANDARD TEMPLATES (4 produk)
    {
      id: 1,
      name: 'Corporate Business Pro',
      price: 10000,
      category: 'STANDARD',
      materials: true,
      rating: 4.8,
      slides: 10,
      description: 'Template profesional untuk presentasi bisnis korporat dengan layout bersih dan modern.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Cover Slide",
        "Company Profile", 
        "Market Analysis",
        "Financial Report",
        "Team Structure",
        "Project Timeline",
        "Achievements",
        "SWOT Analysis", 
        "Conclusion",
        "Thank You"
      ]
    },
    // ... (template lainnya tetap sama)
    {
      id: 2,
      name: 'Startup Pitch Deck',
      price: 10000,
      category: 'STANDARD',
      materials: true,
      rating: 4.7,
      slides: 10,
      description: 'Sempurna untuk pitch startup ke investor dengan storytelling yang menarik.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Problem Statement",
        "Solution Overview", 
        "Market Size",
        "Business Model",
        "Product Demo",
        "Traction",
        "Team",
        "Competitive Analysis",
        "Funding Needs",
        "Contact"
      ]
    },
    {
      id: 3,
      name: 'Education Master',
      price: 15000,
      category: 'STANDARD',
      materials: false,
      rating: 4.9,
      slides: 10,
      description: 'Template edukasi dengan desain engaging untuk materi pembelajaran.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Learning Objectives",
        "Course Outline", 
        "Main Content 1",
        "Main Content 2",
        "Examples",
        "Case Studies",
        "Exercises",
        "Summary",
        "Q&A",
        "References"
      ]
    },
    {
      id: 4,
      name: 'Marketing Campaign',
      price: 15000,
      category: 'STANDARD',
      materials: false,
      rating: 4.6,
      slides: 10,
      description: 'Template marketing dengan call-to-action yang jelas dan persuasif.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Campaign Overview",
        "Target Audience", 
        "Marketing Channels",
        "Performance Metrics",
        "Creative Assets",
        "Budget Allocation",
        "Timeline",
        "KPI Dashboard",
        "Success Stories",
        "Next Steps"
      ]
    },
    // PREMIUM TEMPLATES (4 produk)
    {
      id: 5,
      name: 'Executive Premium Suite',
      price: 20000,
      category: 'PREMIUM',
      materials: true,
      rating: 5.0,
      slides: 10,
      description: 'Template premium untuk eksekutif dengan animasi advanced dan layout mewah.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Luxury Cover",
        "Executive Summary", 
        "Strategic Vision",
        "Financial Dashboard",
        "Market Position",
        "Innovation Roadmap",
        "Partnerships",
        "Risk Management",
        "Future Outlook",
        "Board Presentation"
      ]
    },
    {
      id: 6,
      name: 'Investor Deck Elite',
      price: 20000,
      category: 'PREMIUM',
      materials: true,
      rating: 5.0,
      slides: 10,
      description: 'Deck investor elite dengan financial modeling tools yang sophisticated.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Investment Thesis",
        "Market Opportunity", 
        "Business Model",
        "Financial Projections",
        "Traction Metrics",
        "Competitive Advantage",
        "Team Expertise",
        "Use of Funds",
        "Exit Strategy",
        "Valuation"
      ]
    },
    {
      id: 7,
      name: 'Luxury Brand Package',
      price: 25000,
      category: 'PREMIUM',
      materials: false,
      rating: 4.9,
      slides: 10,
      description: 'Template luxury brand dengan estetika high-end dan premium typography.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Brand Story",
        "Heritage Timeline", 
        "Product Portfolio",
        "Client Testimonials",
        "Awards & Recognition",
        "Global Presence",
        "Sustainability",
        "Future Collections",
        "Press Coverage",
        "Brand Experience"
      ]
    },
    {
      id: 8,
      name: 'Creative Pro Max',
      price: 25000,
      category: 'PREMIUM',
      materials: false,
      rating: 4.9,
      slides: 10,
      description: 'Template kreatif profesional dengan bold typography dan artistic layouts.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Creative Cover",
        "Portfolio Showcase", 
        "Process Breakdown",
        "Case Study 1",
        "Case Study 2",
        "Client List",
        "Services Overview",
        "Testimonials",
        "Awards & Features",
        "Contact Creative"
      ]
    }
  ];

  const filteredTemplates = templates.filter(t => {
    const categoryMatch = selectedCategory === 'ALL' || t.category === selectedCategory;
    const materialMatch = selectedMaterial === 'ALL' ||
      (selectedMaterial === 'WITH MATERIALS' && t.materials) ||
      (selectedMaterial === 'WITHOUT MATERIALS' && !t.materials);
    return categoryMatch && materialMatch;
  });

  // Cart functions - DIREVISI: Hapus custom description
  const addToCart = (template) => {
    const existing = cart.find(item => item.id === template.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === template.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { 
        ...template, 
        quantity: 1
      }]);
    }
    alert(`✅ ${template.name} ditambahkan ke keranjang!`);
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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Local Storage untuk cart dan orders
  useEffect(() => {
    const savedCart = localStorage.getItem('ascendia_cart');
    const savedOrders = localStorage.getItem('ascendia_orders');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart:', e);
      }
    }
    
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Error parsing orders:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ascendia_cart', JSON.stringify(cart));
    localStorage.setItem('ascendia_orders', JSON.stringify(orders));
  }, [cart, orders]);

  // Checkout functions - DIREVISI: Simpan data order
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('🛒 Keranjang belanja Anda kosong!');
      return;
    }
    
    // Simpan data pesanan
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString('id-ID'),
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        materials: item.materials,
        price: item.price,
        quantity: item.quantity,
        slides: item.slides
      })),
      total: cartTotal,
      status: 'pending'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    const orderDetails = cart.map(item =>
      `- ${item.name} (${item.category}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}\n  ${item.slides} Slide • ${item.materials ? 'Dengan Materials' : 'Tanpa Materials'}`
    ).join('\n');
    
    const message = `🛒 *ORDER ASCENDIA TEMPLATE*\n\n${orderDetails}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*\n\nSaya ingin memesan template di atas. Mohon info untuk proses selanjutnya.`;
    
    window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(message)}`, '_blank');
    
    // Clear cart setelah checkout
    setCart([]);
    setCartOpen(false);
  };

  const handleQRIS = () => {
    if (cart.length === 0) {
      alert('🛒 Keranjang belanja Anda kosong!');
      return;
    }
    
    // Simpan data pesanan
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString('id-ID'),
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        materials: item.materials,
        price: item.price,
        quantity: item.quantity,
        slides: item.slides
      })),
      total: cartTotal,
      status: 'pending'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // Tampilkan modal QRIS
    setShowQRISModal(true);
  };

  const [showQRISModal, setShowQRISModal] = useState(false);

  // Komponen QRIS Modal
  const QRISModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold">Selesaikan Pembayaran</h3>
              <p className="text-blue-100">Sebelum Waktu Habis</p>
            </div>
            <button 
              onClick={() => setShowQRISModal(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div>
              <div className="text-blue-100">Tanggal Pembayaran</div>
              <div className="font-semibold">{new Date().toLocaleDateString('id-ID')}</div>
            </div>
            <div className="text-right">
              <div className="text-blue-100">Kode Transaksi</div>
              <div className="font-semibold">WDP-{Date.now().toString().slice(-8)}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Order Details */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-3">Detail Pesanan:</h4>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity}x • {item.slides} Slide • {item.materials ? 'With Materials' : 'No Materials'}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-3 border-t border-gray-200">
            <span className="font-bold text-lg text-gray-800">Total Pembayaran</span>
            <span className="font-bold text-2xl text-green-600">Rp {cartTotal.toLocaleString()}</span>
          </div>

          {/* QRIS Placeholder */}
          <div className="bg-gray-50 rounded-xl p-6 text-center mb-4 border-2 border-dashed border-gray-300">
            <div className="text-gray-500 mb-2">
              <DollarSign className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">Metode Pembayaran QRIS</p>
            </div>
            <div className="bg-white p-4 rounded-lg inline-block">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">QR Code akan muncul</div>
                  <div className="text-xs text-gray-400">di aplikasi e-wallet</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Scan QRIS di atas menggunakan aplikasi e-wallet favorit Anda
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Cara Pembayaran:
            </h5>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Buka aplikasi e-wallet (GoPay, OVO, Dana, dll)</li>
              <li>2. Pilih fitur Bayar/Scan QRIS</li>
              <li>3. Arahkan kamera ke QR code di atas</li>
              <li>4. Konfirmasi pembayaran</li>
              <li>5. Simpan bukti pembayaran</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                const message = `💳 *KONFIRMASI PEMBAYARAN QRIS*\n\nSaya sudah melakukan pembayaran QRIS untuk order:\n${cart.map(item => `- ${item.name} x${item.quantity}`).join('\n')}\n\nTotal: Rp ${cartTotal.toLocaleString()}\n\nMohon konfirmasi dan kirim template ke email saya.`;
                window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(message)}`, '_blank');
                setShowQRISModal(false);
                setCart([]);
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Sudah Bayar & Konfirmasi
            </button>
            
            <button
              onClick={() => setShowQRISModal(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Komponen Order History
  const OrderHistory = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-800 max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800 sticky top-0 bg-gray-900">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">📦 Riwayat Pesanan</h3>
            <button 
              onClick={() => setShowOrderHistory(false)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Belum ada pesanan</p>
              <p className="text-sm">Pesanan Anda akan muncul di sini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white">Order #{order.id.toString().slice(-6)}</h4>
                      <p className="text-gray-400 text-sm">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status === 'completed' ? 'Selesai' : 'Menunggu'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-white font-semibold">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-lg text-white">Rp {order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const [showOrderHistory, setShowOrderHistory] = useState(false);

  // Komponen lainnya tetap sama...
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
      {/* Header - Tambahkan Order History Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3">
                <TriangleLogo />
                <AscendiaText className="text-2xl font-bold tracking-tight text-white" />
              </div>
              <nav className="hidden lg:flex space-x-8">
                <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">
                  Templates
                </button>
                <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </button>
                <button onClick={() => setShowOrderHistory(true)} className="text-gray-300 hover:text-white transition-colors">
                  Order Saya
                </button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Order History Button */}
              <button 
                className="p-2 hover:bg-gray-900 rounded-lg transition relative" 
                onClick={() => setShowOrderHistory(true)}
                title="Order History"
              >
                <Download className="w-5 h-5 text-white" />
                {orders.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {orders.length}
                  </span>
                )}
              </button>

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

              <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar - DIREVISI: Hapus input custom description */}
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
                        {item.category} • {item.materials ? 'With Materials' : 'Without Materials'} • {item.slides} Slide
                      </p>

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
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Pesan via WhatsApp
                  </button>
                  
                  <button
                    onClick={handleQRIS}
                    className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Bayar via QRIS
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-bold text-blue-400 text-sm mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Cara Pembayaran:
                  </h4>
                  <ol className="text-blue-300 text-xs space-y-1">
                    <li>1. Pilih metode pembayaran</li>
                    <li>2. Lakukan pembayaran</li>
                    <li>3. Kirim bukti ke WhatsApp: +62 838-3795-8816</li>
                    <li>4. Template dikirim via email dalam 1x24 jam</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QRIS Modal */}
      {showQRISModal && <QRISModal />}

      {/* Order History Modal */}
      {showOrderHistory && <OrderHistory />}

      {/* Preview Modal - DIREVISI: Tampilkan daftar slide included */}
      {previewTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => {
            setPreviewTemplate(null);
            setCurrentSlideIndex(0);
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
                        <div className="text-center text-gray-400 p-8">
                          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>Preview Slide {currentSlideIndex + 1}</p>
                          <p className="text-sm text-gray-500">Gambar preview akan ditampilkan di sini</p>
                        </div>
                      </div>
                      
                      <div className="text-center text-gray-400 text-sm">
                        Slide {currentSlideIndex + 1} of {Math.min(previewTemplate.previewSlides.length, 4)}
                      </div>
                      
                      <div className="flex justify-center gap-2 mb-4">
                        {previewTemplate.previewSlides.slice(0, 4).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlideIndex(idx)}
                            className={`w-3 h-3 rounded-full transition ${
                              currentSlideIndex === idx ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No preview available</p>
                  )}
                </div>

                {/* Template Details */}
                <div>
                  <h4 className="font-bold text-white mb-4 text-lg">Detail Template</h4>
                  
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Kategori</p>
                        <p className="text-white font-semibold">{previewTemplate.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Jumlah Slide</p>
                        <p className="text-white font-semibold">{previewTemplate.slides} Slides</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Materials</p>
                        <p className="text-white font-semibold">
                          {previewTemplate.materials ? 'Dengan Materials' : 'Tanpa Materials'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Rating</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-white font-semibold">{previewTemplate.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Daftar Slide Included */}
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">Slide Included:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {previewTemplate.includedSlides.map((slide, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-300">
                            <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">{slide}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">Fitur:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Desain {previewTemplate.category === 'PREMIUM' ? 'Premium' : 'Profesional'}
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          {previewTemplate.slides} Slide Unik
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Format PowerPoint (.pptx)
                        </li>
                        {previewTemplate.materials && (
                          <li className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            Konten Materials Lengkap
                          </li>
                        )}
                        {previewTemplate.category === 'PREMIUM' && (
                          <li className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            Priority Support 24/7
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h5 className="font-bold text-white mb-3">Testimoni Pelanggan</h5>
                    <div className="space-y-3">
                      <div className="bg-gray-700 p-3 rounded">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-300 text-sm">"Template sangat profesional dan mudah diedit. Hasil presentasi jadi lebih menarik!"</p>
                        <p className="text-gray-400 text-xs mt-2">- Business Owner</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-300 text-sm">"Desainnya modern dan sesuai kebutuhan startup saya. Highly recommended!"</p>
                        <p className="text-gray-400 text-xs mt-2">- Startup Founder</p>
                      </div>
                    </div>
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

      {/* Hero Section dan lainnya tetap sama... */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* ... (hero section code tetap sama) */}
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-950/50">
        {/* ... (pricing section code tetap sama) */}
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-black">
        {/* ... (templates section code tetap sama) */}
      </section>

      {/* Footer - Update navigation */}
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
                  <span>+62 838-3795-8816</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Cara Memesan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                  <span>Pilih template yang diinginkan</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                  <span>Tambahkan ke keranjang belanja</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                  <span>Checkout dan pilih metode pembayaran</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                  <span>Kirim bukti pembayaran ke WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">5</span>
                  <span>Template dikirim via email</span>
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
                <button className="text-gray-500 hover:text-white text-sm transition-colors">
                  Terms
                </button>
                <button className="text-gray-500 hover:text-white text-sm transition-colors">
                  Privacy
                </button>
                <button className="text-gray-500 hover:text-white text-sm transition-colors">
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}