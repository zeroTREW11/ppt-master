import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Menu, X, Star, Check, Phone, Mail,  
  ArrowRight, Plus, Minus, Trash2, ExternalLink, DollarSign,
  FileText, Shield
} from 'lucide-react';

export default function AscendiaEcommerce() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [customDescriptions, setCustomDescriptions] = useState({});

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
      description: 'Template profesional untuk presentasi bisnis korporat dengan layout bersih dan modern. Perfect untuk meeting bisnis dan laporan perusahaan.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Halaman Cover - Logo perusahaan dan judul presentasi yang profesional",
        "Slide 2: Agenda - Overview terstruktur topik presentasi",
        "Slide 3: Analisis Pasar - Insight data-driven dengan chart dan grafik terkini",
        "Slide 4: Highlight Keuangan - Analisis revenue, profit, dan growth metrics"
      ]
    },
    {
      id: 2,
      name: 'Startup Pitch Deck',
      price: 10000,
      category: 'STANDARD',
      materials: true,
      rating: 4.7,
      slides: 10,
      description: 'Sempurna untuk pitch startup ke investor dengan storytelling yang menarik dan data yang compelling.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Problem Statement - Identifikasi jelas masalah pasar yang dipecahkan",
        "Slide 2: Solution Overview - Presentasi solusi inovatif dan unique value proposition",
        "Slide 3: Market Size - Analisis TAM, SAM, SOM dengan visual yang engaging",
        "Slide 4: Business Model - Strategi monetisasi dan revenue streams"
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
      description: 'Template edukasi dengan desain engaging untuk materi pembelajaran yang interaktif dan mudah dipahami.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Judul Pembelajaran - Layout clean dengan learning objectives",
        "Slide 2: Tujuan Pembelajaran - Learning outcomes yang terstruktur",
        "Slide 3: Konten Utama - Materi pembelajaran dengan visual aids",
        "Slide 4: Evaluasi - Quiz dan assessment interaktif"
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
      description: 'Template marketing dengan call-to-action yang jelas dan persuasif untuk campaign yang efektif.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Overview Kampanye - Big idea dan campaign theme",
        "Slide 2: Target Audience - Customer persona dan segmentation",
        "Slide 3: Marketing Channels - Multi-channel strategy breakdown",
        "Slide 4: Performance Metrics - KPI dan measurement framework"
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
      description: 'Template premium untuk eksekutif dengan animasi advanced, design system yang konsisten, dan layout mewah.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Cover Mewah - Desain eksklusif dengan luxury aesthetics",
        "Slide 2: Dashboard Interaktif - Data visualization real-time dengan advanced charts",
        "Slide 3: Visual 3D - Model dan grafik advanced dengan depth perception",
        "Slide 4: Ikon Kustom - Custom iconography dan branding elements premium"
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
      description: 'Deck investor elite dengan financial modeling tools yang sophisticated dan data room integration.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Investment Thesis - Value proposition dan market opportunity",
        "Slide 2: Financial Projections - Revenue modeling dan unit economics",
        "Slide 3: Exit Strategy - Multiple exit scenarios dan valuation analysis",
        "Slide 4: Risk Mitigation - Risk assessment dan contingency planning"
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
      description: 'Template luxury brand dengan estetika high-end, premium typography, dan visual storytelling yang sophisticated.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Desain Eksklusif - Luxury aesthetics dengan premium textures",
        "Slide 2: Portfolio Klien VIP - Case studies dan client testimonials",
        "Slide 3: Brand Heritage - Storytelling dan brand legacy presentation",
        "Slide 4: Experience Design - Customer journey dan touchpoints mapping"
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
      description: 'Template kreatif profesional dengan bold typography, artistic layouts, dan dynamic animations untuk presentasi yang memorable.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      slideDescriptions: [
        "Slide 1: Judul Artistik - Creative typography dengan visual hierarchy",
        "Slide 2: Layout Kreatif - Modern collage dan asymmetric design",
        "Slide 3: Background Gradient - Dynamic color transitions dan depth effects",
        "Slide 4: Transisi Kreatif - Smooth animations dan micro-interactions"
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

  // Checkout functions
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('🛒 Keranjang belanja Anda kosong!');
      return;
    }
    
    const orderDetails = cart.map(item =>
      `- ${item.name} (${item.category}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}\n  Deskripsi: ${item.customDescription || 'Tidak ada deskripsi khusus'}`
    ).join('\n');
    
    const message = `🛒 *ORDER ASCENDIA TEMPLATE*\n\n${orderDetails}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*\n\nSaya ingin memesan template di atas. Mohon info untuk proses selanjutnya.`;
    
    window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(message)}`, '_blank');
    
    // Clear cart setelah checkout
    setCart([]);
    setCustomDescriptions({});
    setCartOpen(false);
  };

  const handleQRIS = () => {
    if (cart.length === 0) {
      alert('🛒 Keranjang belanja Anda kosong!');
      return;
    }
    
    const orderDetails = cart.map(item =>
      `- ${item.name} (${item.category}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}\n  Deskripsi: ${item.customDescription || 'Tidak ada deskripsi khusus'}`
    ).join('\n');
    
    const qrisMessage = `💳 *PEMBAYARAN VIA QRIS - ASCENDIA TEMPLATE*\n\n${orderDetails}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*\n\nSilakan lakukan pembayaran via QRIS, kemudian kirim bukti transfer ke WhatsApp ini: +62 838-3795-8816\n\nTemplate akan dikirim via email setelah pembayaran dikonfirmasi.`;
    
    alert('🚀 Fitur QRIS akan segera hadir! Untuk saat ini, silakan gunakan metode WhatsApp untuk pemesanan.');
    
    // Untuk simulasi, tetap buka WhatsApp
    window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(qrisMessage)}`, '_blank');
    
    // Clear cart setelah klik QRIS
    setCart([]);
    setCustomDescriptions({});
    setCartOpen(false);
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
                <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">
                  Templates
                </button>
                <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
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
Slide 1: Lorem ipsum dolor sit amet...
Slide 2: Consectetur adipiscing elit...
Slide 3: Sed do eiusmod tempor incididunt...
Slide 4: Ut labore et dolore magna aliqua..."
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

      {/* Preview Modal */}
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
              <button 
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 flex items-center transition-all duration-300"
              >
                Jelajahi Template
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
            <p className="text-gray-400 text-lg">Harga sederhana dan jelas untuk template profesional</p>
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
                        setCurrentSlideIndex(0);
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