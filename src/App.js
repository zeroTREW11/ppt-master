import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Search, Menu, X, Star, Check, Phone, Mail, MapPin, ArrowRight, Play, Download, Plus, Minus, Trash2, ExternalLink } from 'lucide-react';

export default function AscendiaEcommerce() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ['ALL', 'STANDARD', 'PREMIUM'];
  const materialFilters = ['ALL', 'WITH MATERIALS', 'WITHOUT MATERIALS'];

  const templates = [
    { id: 1, name: 'Corporate Business Pro', price: 10000, category: 'STANDARD', materials: true, rating: 4.8, sales: 150, slides: 10, description: 'Professional corporate presentation' },
    { id: 2, name: 'Startup Pitch Essential', price: 10000, category: 'STANDARD', materials: true, rating: 4.7, sales: 120, slides: 10, description: 'Perfect for startup pitches' },
    { id: 3, name: 'Education Plus', price: 10000, category: 'STANDARD', materials: true, rating: 4.9, sales: 200, slides: 10, description: 'Engaging educational content' },
    { id: 4, name: 'Marketing Basic', price: 10000, category: 'STANDARD', materials: true, rating: 4.6, sales: 95, slides: 10, description: 'Marketing presentations' },
    { id: 5, name: 'Business Classic', price: 15000, category: 'STANDARD', materials: false, rating: 4.8, sales: 180, slides: 10, description: 'Classic business template' },
    { id: 6, name: 'Minimal Professional', price: 15000, category: 'STANDARD', materials: false, rating: 4.7, sales: 140, slides: 10, description: 'Clean minimal design' },
    { id: 7, name: 'Corporate Simple', price: 15000, category: 'STANDARD', materials: false, rating: 4.9, sales: 160, slides: 10, description: 'Simple corporate style' },
    { id: 8, name: 'Startup Lite', price: 15000, category: 'STANDARD', materials: false, rating: 4.6, sales: 110, slides: 10, description: 'Lightweight startup deck' },
    { id: 9, name: 'Executive Suite Pro', price: 20000, category: 'PREMIUM', materials: true, rating: 5.0, sales: 300, slides: 10, description: 'Premium executive presentations' },
    { id: 10, name: 'Investor Deck Elite', price: 20000, category: 'PREMIUM', materials: true, rating: 5.0, sales: 250, slides: 10, description: 'Elite investor pitch deck' },
    { id: 11, name: 'Brand Master', price: 20000, category: 'PREMIUM', materials: true, rating: 4.9, sales: 280, slides: 10, description: 'Premium branding template' },
    { id: 12, name: 'Creative Pro Plus', price: 20000, category: 'PREMIUM', materials: true, rating: 4.9, sales: 220, slides: 10, description: 'Creative professional design' },
    { id: 13, name: 'Executive Premium', price: 25000, category: 'PREMIUM', materials: false, rating: 5.0, sales: 320, slides: 10, description: 'Top-tier executive template' },
    { id: 14, name: 'Luxury Business', price: 25000, category: 'PREMIUM', materials: false, rating: 5.0, sales: 290, slides: 10, description: 'Luxury business presentation' },
    { id: 15, name: 'Elite Corporate', price: 25000, category: 'PREMIUM', materials: false, rating: 4.9, sales: 310, slides: 10, description: 'Elite corporate design' },
    { id: 16, name: 'Premium Pitch Deck', price: 25000, category: 'PREMIUM', materials: false, rating: 5.0, sales: 270, slides: 10, description: 'Premium pitch presentation' },
  ];

  const filteredTemplates = templates.filter(t => {
    const categoryMatch = selectedCategory === 'ALL' || t.category === selectedCategory;
    const materialMatch = selectedMaterial === 'ALL' ||
      (selectedMaterial === 'WITH MATERIALS' && t.materials) ||
      (selectedMaterial === 'WITHOUT MATERIALS' && !t.materials);
    return categoryMatch && materialMatch;
  });

  const addToCart = (template) => {
    const existing = cart.find(item => item.id === template.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === template.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...template, quantity: 1 }]);
    }
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
      alert('Keranjang kosong!');
      return;
    }

    const orderDetails = cart.map(item =>
      `- ${item.name} (${item.category}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `🛒 *ASCENDIA ORDER*\n\n${orderDetails}\n\n*TOTAL: Rp ${cartTotal.toLocaleString()}*\n\nSaya ingin melakukan pemesanan.`;

    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Komponen Logo Segitiga 3D
  const TriangleLogo = ({ className = "w-10 h-10", fill = "white" }) => (
    <div className={`relative ${className}`}>
      {/* Lapisan terluar */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points="50,0 0,100 100,100" fill="url(#outerGradient)" />
      </svg>
      {/* Lapisan tengah */}
      <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
        <defs>
          <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon points="50,10 10,90 90,90" fill="url(#middleGradient)" />
      </svg>
      {/* Lapisan dalam */}
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

  // Komponen Teks ASCENDIA dengan efek 3D
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
                <a href="/#" className="text-gray-300 hover:text-white transition">Home</a>
                <a href="#templates" className="text-gray-300 hover:text-white transition">Templates</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
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
              <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Shopping Cart Sidebar */}
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
                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition flex items-center justify-center"
                >
                  Checkout via WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            )}
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
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Professional presentation templates at affordable prices. <br/>
              Standard and Premium quality with customizable options.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#templates" className="group bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center">
                Browse Templates
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </a>
              <a href="https://linktr.ee/ASCENDIAA" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-black transition flex items-center">
                <ExternalLink className="mr-2 w-5 h-5" />
                Visit Linktree
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section id="pricing" className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Pricelist</h2>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-white">Rp {template.price.toLocaleString()}</div>
                  {/* Baris "sold" dihapus */}
                </div>
            </div>
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
                <li className="flex items-center text-sm">
                  <Check className="w-5 h-5 mr-2 text-white" />
                  Professional Design
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-5 h-5 mr-2 text-white" />
                  10 Unique Slides
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-5 h-5 mr-2 text-white" />
                  Editable Content
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white rounded-3xl p-8 relative">
              <div className="absolute top-0 right-0 bg-white text-black px-4 py-1 text-sm font-bold rounded-bl-xl rounded-tr-xl">
                PREMIUM
              </div>
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
                <li className="flex items-center text-sm">
                  <Check className="w-5 h-5 mr-2 text-white" />
                  Premium Design
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-5 h-5 mr-2 text-white" />
                  10 Advanced Slides
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-5 h-5 mr-2 text-white" />
                  Priority Support
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-5 h-5 mr-2 text-white" />
                  Advanced Features
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-400">
            <p className="text-sm">Additional slides: <span className="text-white font-bold">Rp 1.000</span> per slide</p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Templates</h2>
            <p className="text-gray-400 text-lg">16 professional templates ready to use</p>
          </div>

          {/* Filters */}
          <div className="mb-12 space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Category:</p>
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
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
              <p className="text-sm text-gray-400 mb-2">Materials:</p>
              <div className="flex flex-wrap gap-3">
                {materialFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedMaterial(filter)}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
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

          {/* Template Grid */}
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
                    <div>
                      <div className="text-lg font-bold text-white">Rp {template.price.toLocaleString()}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(template)}
                    className="w-full bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center text-sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
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
              <p className="text-gray-400 leading-relaxed mb-4">
                Professional PowerPoint templates for all your presentation needs.
              </p>
              <a
                href="https://linktr.ee/ASCENDIAA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-gray-300 transition"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit our Linktree
              </a>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button className="hover:text-white transition text-left">Standard Templates</button></li>
                <li><button className="hover:text-white transition text-left">Premium Templates</button></li>
                <li><button className="hover:text-white transition text-left">Custom Service</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button className="hover:text-white transition text-left">About Us</button></li>
                <li><button className="hover:text-white transition text-left">Portfolio</button></li>
                <li><button className="hover:text-white transition text-left">Partnership</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-white" />
                  info@ascendia.com
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-white" />
                  +62 812-3456-7890
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-white" />
                  Surabaya, Indonesia
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 ASCENDIA. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition">Privacy Policy</button>
              <button className="hover:text-white transition">Terms of Service</button>
              <a
                href="https://linktr.ee/ASCENDIAA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Linktree
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}