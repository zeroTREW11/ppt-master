import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Search, Menu, X, Star, Check, Phone, Mail, MapPin, ArrowRight, Play, Download } from 'lucide-react';

export default function PPTTemplateEcommerce() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'BUSINESS', 'EDUCATION', 'CREATIVE', 'PITCH DECK'];
  
  const templates = [
    { id: 1, name: 'Professional Business', price: 150000, category: 'BUSINESS', rating: 4.9, sales: 234, slides: 45 },
    { id: 2, name: 'Modern Pitch Deck', price: 200000, category: 'PITCH DECK', rating: 5.0, sales: 189, slides: 32 },
    { id: 3, name: 'Educational Slides', price: 120000, category: 'EDUCATION', rating: 4.8, sales: 156, slides: 50 },
    { id: 4, name: 'Creative Portfolio', price: 180000, category: 'CREATIVE', rating: 4.9, sales: 201, slides: 38 },
    { id: 5, name: 'Startup Pitch', price: 250000, category: 'PITCH DECK', rating: 5.0, sales: 178, slides: 28 },
    { id: 6, name: 'Corporate Report', price: 175000, category: 'BUSINESS', rating: 4.7, sales: 143, slides: 42 }
  ];

  const filteredTemplates = selectedCategory === 'ALL' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3">
                {/* Logo Triangle */}
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 border-2 border-gray-500" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                  <div className="absolute inset-2 bg-gray-700" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">ASCENDIA</h1>
              </div>
              <nav className="hidden lg:flex space-x-8">
                <a href="/#" className="text-gray-300 hover:text-white transition">Home</a>
                <a href="#templates" className="text-gray-300 hover:text-white transition">Templates</a>
                <a href="#services" className="text-gray-300 hover:text-white transition">Services</a>
                <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="hidden md:block p-2 hover:bg-gray-800 rounded-lg transition">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gray-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
              </button>
              <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 border border-gray-700" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 border border-gray-700" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(180deg)'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-gray-800 rounded-full text-sm mb-6">
                ✨ Premium PowerPoint Templates
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Create<br />
                <span className="text-gray-500">Stunning</span><br />
                Presentations
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Professional PowerPoint templates designed by experts. 
                Ready to use, easy to customize, and guaranteed to impress.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center">
                  Explore Templates
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 rounded-lg font-semibold border-2 border-gray-700 hover:border-gray-500 transition flex items-center">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-4xl font-bold mb-1">500+</div>
                  <div className="text-gray-500 text-sm">Templates</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">10K+</div>
                  <div className="text-gray-500 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">4.9</div>
                  <div className="text-gray-500 text-sm">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
                {/* Slide Preview */}
                <div className="bg-white rounded-xl p-8 mb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-3 w-32 bg-gray-300 rounded"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-6 flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-gray-400" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-gray-300 rounded"></div>
                    <div className="h-2 w-4/5 bg-gray-300 rounded"></div>
                    <div className="h-2 w-3/5 bg-gray-300 rounded"></div>
                  </div>
                </div>
                
                {/* Slide Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-gray-700 rounded h-16"></div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <div>
                    <div className="text-sm font-bold">4.9/5.0</div>
                    <div className="text-xs text-gray-400">2,345 reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-400 text-lg">Everything you need for perfect presentations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition">
              <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-700 transition">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Design</h3>
              <p className="text-gray-400">Created by experienced designers with international standards and modern aesthetics.</p>
            </div>

            <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition">
              <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-700 transition">
                <Download className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Download</h3>
              <p className="text-gray-400">Get immediate access to your templates after purchase. No waiting time required.</p>
            </div>

            <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition">
              <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-700 transition">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lifetime Updates</h3>
              <p className="text-gray-400">Free updates and new templates forever. One-time payment, lifetime access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Templates</h2>
            <p className="text-gray-400 text-lg">Handpicked collection for every presentation need</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
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

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map(template => (
              <div key={template.id} className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition">
                <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                  {/* Template Preview */}
                  <div className="w-full h-full flex items-center justify-center opacity-50 group-hover:opacity-70 transition">
                    <div className="w-32 h-32 border-4 border-gray-500" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                  </div>
                  
                  <button className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition">
                    <Heart className="w-5 h-5" />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-6">
                    <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                      Quick View
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                      {template.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{template.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{template.slides} Slides</span>
                    <span>{template.sales} sold</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <div className="text-2xl font-bold">Rp {(template.price/1000).toFixed(0)}K</div>
                    </div>
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-400 text-lg">Choose the perfect solution for your needs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ready-Made Templates */}
            <div className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-10 hover:border-gray-600 transition">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-8 h-8" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Ready-Made Templates</h3>
              <p className="text-gray-400 text-lg mb-8">
                Instant access to our complete collection of professional PowerPoint templates. 
                Perfect for business, education, and creative presentations.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">500+ Premium Templates</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">Fully Editable Elements</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">Lifetime Free Updates</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">Instant Download Access</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-gray-400">Starting from</span>
                <div className="text-4xl font-bold mt-2">Rp 100K</div>
              </div>

              <button className="w-full bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition">
                Browse Templates
              </button>
            </div>

            {/* Custom Templates */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-3xl p-10 hover:border-gray-500 transition relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white text-black px-4 py-2 text-sm font-bold rounded-bl-xl">
                POPULAR
              </div>

              <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Custom Templates</h3>
              <p className="text-gray-400 text-lg mb-8">
                Need something unique? We'll create a custom PowerPoint template 
                tailored to your brand identity and specific requirements.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">100% Custom Design</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">Brand Identity Match</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">Unlimited Revisions</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-gray-300">Priority Support 24/7</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-gray-400">Starting from</span>
                <div className="text-4xl font-bold mt-2">Rp 500K</div>
              </div>

              <button className="w-full bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition">
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-gray-400 text-lg">Trusted by thousands of professionals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Budi Santoso', role: 'CEO, Tech Startup', text: 'Outstanding templates! Helped us secure funding with professional presentations.' },
              { name: 'Siti Nurhaliza', role: 'University Lecturer', text: 'Excellent quality and design. My students love using these templates for their projects.' },
              { name: 'Andi Wijaya', role: 'Marketing Director', text: 'Fast service and impressive results. Highly recommended for business presentations!' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-white" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Create Amazing<br />Presentations?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Get 30% off on your first purchase. Limited time offer!
          </p>
          <button className="bg-white text-black px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-200 transition inline-flex items-center">
            Get Started Now
            <ArrowRight className="ml-3 w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 border-t border-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 border-2 border-gray-500" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                  <div className="absolute inset-2 bg-gray-600" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                </div>
                <h3 className="text-xl font-bold">ASCENDIA</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional PowerPoint templates for all your presentation needs.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button className="hover:text-white transition text-left">Business Templates</button></li>
                <li><button className="hover:text-white transition text-left">Education Templates</button></li>
                <li><button className="hover:text-white transition text-left">Creative Templates</button></li>
                <li><button className="hover:text-white transition text-left">Custom Service</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button className="hover:text-white transition text-left">About Us</button></li>
                <li><button className="hover:text-white transition text-left">Blog</button></li>
                <li><button className="hover:text-white transition text-left">Careers</button></li>
                <li><button className="hover:text-white transition text-left">Partnership</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  info@ASCENDIA.com
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  +62 812-3456-7890
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  Surabaya, Indonesia
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 ASCENDIA. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition
              ">Privacy Policy</button>
              <button className="hover:text-white transition">Terms of Service</button>
              <button className="hover:text-white transition">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}