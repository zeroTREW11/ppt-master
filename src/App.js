import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Menu, X, Star, Check, Phone, Mail,  
  ArrowRight, Plus, Minus, Trash2, ExternalLink, DollarSign,
  FileText, Shield, Download, Clock, Eye, Calendar, User,
  MessageCircle, Heart, Send, Instagram, Smartphone
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
  const [showQRISModal, setShowQRISModal] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productComments, setProductComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [productLikes, setProductLikes] = useState({});

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
      description: 'Template profesional untuk presentasi bisnis korporat dengan layout bersih dan modern.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Cover Slide", "Company Profile", "Market Analysis", "Financial Report",
        "Team Structure", "Project Timeline", "Achievements", "SWOT Analysis", 
        "Conclusion", "Thank You"
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
      description: 'Sempurna untuk pitch startup ke investor dengan storytelling yang menarik.',
      previewSlides: Array(4).fill(null).map((_, i) => `/images/slide-${i+1}.jpg`),
      includedSlides: [
        "Problem Statement", "Solution Overview", "Market Size", "Business Model",
        "Product Demo", "Traction", "Team", "Competitive Analysis", "Funding Needs", "Contact"
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
        "Learning Objectives", "Course Outline", "Main Content 1", "Main Content 2",
        "Examples", "Case Studies", "Exercises", "Summary", "Q&A", "References"
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
        "Campaign Overview", "Target Audience", "Marketing Channels", "Performance Metrics",
        "Creative Assets", "Budget Allocation", "Timeline", "KPI Dashboard", "Success Stories", "Next Steps"
      ]
    },
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
        "Luxury Cover", "Executive Summary", "Strategic Vision", "Financial Dashboard",
        "Market Position", "Innovation Roadmap", "Partnerships", "Risk Management", "Future Outlook", "Board Presentation"
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
        "Investment Thesis", "Market Opportunity", "Business Model", "Financial Projections",
        "Traction Metrics", "Competitive Advantage", "Team Expertise", "Use of Funds", "Exit Strategy", "Valuation"
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
        "Brand Story", "Heritage Timeline", "Product Portfolio", "Client Testimonials",
        "Awards & Recognition", "Global Presence", "Sustainability", "Future Collections", "Press Coverage", "Brand Experience"
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
        "Creative Cover", "Portfolio Showcase", "Process Breakdown", "Case Study 1",
        "Case Study 2", "Client List", "Services Overview", "Testimonials", "Awards & Features", "Contact Creative"
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

  // Fungsi untuk komentar produk
  const addComment = (templateId) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      text: newComment,
      date: new Date().toLocaleString('id-ID'),
      user: 'Customer'
    };
    
    setProductComments(prev => ({
      ...prev,
      [templateId]: [...(prev[templateId] || []), comment]
    }));
    
    setNewComment('');
  };

  // Fungsi untuk like produk
  const toggleLike = (templateId) => {
    setProductLikes(prev => ({
      ...prev,
      [templateId]: !prev[templateId]
    }));
  };

  // Load data dari localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ascendia_cart');
    const savedOrders = localStorage.getItem('ascendia_orders');
    const savedComments = localStorage.getItem('ascendia_comments');
    const savedLikes = localStorage.getItem('ascendia_likes');
    
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
    
    if (savedComments) {
      try {
        setProductComments(JSON.parse(savedComments));
      } catch (e) {
        console.error('Error parsing comments:', e);
      }
    }
    
    if (savedLikes) {
      try {
        setProductLikes(JSON.parse(savedLikes));
      } catch (e) {
        console.error('Error parsing likes:', e);
      }
    }
  }, []);

  // Save data ke localStorage
  useEffect(() => {
    localStorage.setItem('ascendia_cart', JSON.stringify(cart));
    localStorage.setItem('ascendia_orders', JSON.stringify(orders));
    localStorage.setItem('ascendia_comments', JSON.stringify(productComments));
    localStorage.setItem('ascendia_likes', JSON.stringify(productLikes));
  }, [cart, orders, productComments, productLikes]);

  // Fungsi untuk update status pesanan otomatis
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Simulasi admin mengupdate status
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setOrders(prev => prev.map(order => {
        const orderTime = new Date(order.date);
        const diffMinutes = (now - orderTime) / (1000 * 60);
        
        if (order.status === 'pending' && diffMinutes > 1) {
          return { ...order, status: 'completed' };
        }
        return order;
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('🛒 Keranjang belanja Anda kosong!');
      return;
    }
    
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
      status: 'pending',
      paymentMethod: 'whatsapp'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    const orderDetails = cart.map(item =>
      `- ${item.name} (${item.category}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}\n  ${item.slides} Slide • ${item.materials ? 'Dengan Materials' : 'Tanpa Materials'}`
    ).join('\n');
    
    const message = `🛒 *ORDER ASCENDIA TEMPLATE*\n\n${orderDetails}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*\n\nSaya ingin memesan template di atas. Mohon info untuk proses selanjutnya.`;
    
    window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(message)}`, '_blank');
    
    setCart([]);
    setCartOpen(false);
  };

  const handleQRIS = () => {
    if (cart.length === 0) {
      alert('🛒 Keranjang belanja Anda kosong!');
      return;
    }
    
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
      status: 'pending',
      paymentMethod: 'qris'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setShowQRISModal(true);
  };

  // QRIS Modal Design Baru yang Lebih Bagus
  const QRISModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 0),
                              radial-gradient(circle at 75% 75%, white 2px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1">Bayar dengan QRIS</h3>
              <p className="text-blue-100 opacity-90">Cepat • Aman • Praktis</p>
            </div>
            <button 
              onClick={() => setShowQRISModal(false)}
              className="text-white hover:text-gray-200 transition-colors flex-shrink-0 ml-4 bg-white/20 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm relative z-10">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="font-semibold">{new Date().toLocaleDateString('id-ID')}</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="font-semibold">#{Date.now().toString().slice(-6)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
              Ringkasan Pesanan
            </h4>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity}x • {item.slides} slide
                    </p>
                  </div>
                  <p className="font-bold text-gray-800 text-sm ml-3 flex-shrink-0">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-4 border-y border-gray-200 mb-6">
            <div>
              <span className="font-bold text-gray-800 text-lg">Total</span>
              <p className="text-xs text-gray-500">Termasuk semua biaya</p>
            </div>
            <span className="font-bold text-2xl text-green-600">Rp {cartTotal.toLocaleString()}</span>
          </div>

          {/* QRIS Section - Design Improved */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <h5 className="font-bold text-gray-800 text-lg mb-2">Scan QR Code</h5>
            <p className="text-gray-600 text-sm mb-4">Buka aplikasi e-wallet dan scan kode berikut</p>
            
            {/* QR Container dengan design lebih modern */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-dashed border-blue-200 mb-4">
              <div className="bg-white p-4 rounded-xl shadow-inner mx-auto max-w-xs">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* QR Pattern Simulation */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 gap-1 w-full h-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`rounded-sm ${Math.random() > 0.5 ? 'bg-blue-600' : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center relative z-10 p-4">
                    <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <div className="text-blue-600 font-semibold text-sm">ASCENDIA STORE</div>
                    <div className="text-blue-800 font-bold text-lg mt-1">Rp {cartTotal.toLocaleString()}</div>
                    <div className="text-blue-400 text-xs mt-2">QRIS • Payment Gateway</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-center text-yellow-800 text-sm">
                <Smartphone className="w-4 h-4 mr-2" />
                <span>Gunakan smartphone untuk scan QR code</span>
              </div>
            </div>
          </div>

          {/* Payment Steps */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h6 className="font-semibold text-gray-800 mb-3 text-sm">Cara Bayar:</h6>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold">1</div>
                <div className="text-gray-600">Buka E-wallet</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold">2</div>
                <div className="text-gray-600">Scan QR</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold">3</div>
                <div className="text-gray-600">Bayar</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                const message = `💳 *KONFIRMASI PEMBAYARAN QRIS - ASCENDIA*\n\nSaya sudah melakukan pembayaran QRIS untuk order:\n${cart.map(item => `- ${item.name} x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}`).join('\n')}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*\n\nMohon konfirmasi dan kirim template ke email saya. Terima kasih!`;
                window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(message)}`, '_blank');
                
                const latestOrder = orders[0];
                if (latestOrder) {
                  updateOrderStatus(latestOrder.id, 'paid');
                }
                
                setShowQRISModal(false);
                setCart([]);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/25 flex items-center justify-center text-lg"
            >
              <Check className="w-5 h-5 mr-2" />
              Sudah Bayar & Konfirmasi
            </button>
            
            <button
              onClick={() => setShowQRISModal(false)}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Bayar Nanti
            </button>
          </div>

          {/* Support Info */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Butuh bantuan? WhatsApp: <span className="text-green-600 font-semibold">+62 838-3795-8816</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Komponen Detail Order
  const OrderDetailModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
        <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-800 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-800 sticky top-0 bg-gray-900">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">📋 Detail Pesanan</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-gray-400 text-sm">Tanggal Order</span>
                </div>
                <p className="text-white font-semibold">{selectedOrder.date}</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-gray-400 text-sm">Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedOrder.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : selectedOrder.status === 'paid'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {selectedOrder.status === 'completed' ? 'Selesai' : 
                   selectedOrder.status === 'paid' ? 'Sudah Bayar' : 'Menunggu Pembayaran'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-white mb-4 text-lg">Item Pesanan</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-white">{item.name}</h5>
                      <span className="text-white font-bold">Rp {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                      <div>Kategori: {item.category}</div>
                      <div>Quantity: {item.quantity}x</div>
                      <div>Slide: {item.slides}</div>
                      <div>Materials: {item.materials ? 'Ya' : 'Tidak'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h4 className="font-bold text-white mb-3">Informasi Pembayaran</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total:</span>
                  <p className="text-white font-bold text-lg">Rp {selectedOrder.total.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Metode:</span>
                  <p className="text-white font-semibold">
                    {selectedOrder.paymentMethod === 'qris' ? 'QRIS' : 'WhatsApp'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedOrder.status === 'pending' && (
                <button
                  onClick={() => {
                    const message = `💬 *KONFIRMASI ORDER* - #${selectedOrder.id}\n\nSaya ingin konfirmasi status order dan melakukan pembayaran.`;
                    window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Konfirmasi via WhatsApp
                </button>
              )}
              
              {selectedOrder.status === 'completed' && (
                <button
                  onClick={() => {
                    const message = `📦 *REQUEST TEMPLATE* - #${selectedOrder.id}\n\nHalo, saya sudah melakukan pembayaran dan order saya status completed. Mohon template dikirim ke email saya.`;
                    window.open(`https://wa.me/6283837958816?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Minta Template
                </button>
              )}

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 border border-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Komponen Order History
  const OrderHistory = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-800 max-h-[80vh] overflow-y-auto">
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
                <div 
                  key={order.id} 
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-bold text-white">Order #{order.id.toString().slice(-6)}</h4>
                        <p className="text-gray-400 text-sm">{order.date}</p>
                      </div>
                      <button 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : order.status === 'paid'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status === 'completed' ? 'Selesai' : 
                       order.status === 'paid' ? 'Sudah Bayar' : 'Menunggu'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-white font-semibold">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="text-gray-400 text-sm">
                        +{order.items.length - 2} item lainnya...
                      </div>
                    )}
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

  // Komponen Social Media Links
  const SocialMediaLinks = () => (
    <div className="flex space-x-4 mt-4">
      <a 
        href="https://www.instagram.com/asc3ndia_?igsh=MWN6eG4yNWVjcGM4bA==" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
      >
        <Instagram className="w-5 h-5" />
        <span>@asc3ndia_</span>
      </a>
      
      <a 
        href="https://www.tiktok.com/@ascendia95?_r=1&_t=ZS-91TPdUVJFnF" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span>@ascendia95</span>
      </a>
    </div>
  );

  // Komponen Product Comments
  const ProductCommentsSection = ({ templateId }) => {
    const comments = productComments[templateId] || [];
    
    return (
      <div className="mt-6 border-t border-gray-700 pt-6">
        <h4 className="font-bold text-white mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Komentar ({comments.length})
        </h4>
        
        {/* Input komentar baru */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar..."
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && addComment(templateId)}
          />
          <button
            onClick={() => addComment(templateId)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Daftar komentar */}
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {comments.map(comment => (
            <div key={comment.id} className="bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-white text-sm">{comment.user}</span>
                <span className="text-gray-400 text-xs">{comment.date}</span>
              </div>
              <p className="text-gray-300 text-sm">{comment.text}</p>
            </div>
          ))}
          
          {comments.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

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
                <button onClick={() => setShowOrderHistory(true)} className="text-gray-300 hover:text-white transition-colors">
                  Order Saya
                </button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
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

      {/* Order Detail Modal */}
      {selectedOrder && <OrderDetailModal />}

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
            
            {/* Social Media Links di Hero */}
            <div className="flex justify-center space-x-6 mb-8">
              <a 
                href="https://www.instagram.com/asc3ndia_?igsh=MWN6eG4yNWVjcGM4bA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors bg-pink-500/10 px-4 py-2 rounded-lg"
              >
                <Instagram className="w-5 h-5" />
                <span>@asc3ndia_</span>
              </a>
              
              <a 
                href="https://www.tiktok.com/@ascendia95?_r=1&_t=ZS-91TPdUVJFnF" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 px-4 py-2 rounded-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>@ascendia95</span>
              </a>
            </div>
            
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

      {/* Templates Section dengan Komentar */}
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
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleLike(template.id)}
                        className={`transition-colors ${
                          productLikes[template.id] ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${productLikes[template.id] ? 'fill-current' : ''}`} />
                      </button>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-xs font-semibold text-white">{template.rating}</span>
                      </div>
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

                  {/* Komentar Section di Card */}
                  <ProductCommentsSection templateId={template.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer dengan Social Media */}
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
              
              {/* Social Media di Footer */}
              <SocialMediaLinks />
              
              <a 
                href="https://linktr.ee/ASCENDIAA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors mt-4"
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