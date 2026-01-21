import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-karu-charcoal text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-karu-terracotta rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9C14.8 19 12 16 12 12s2.8-7 6.3-9.1C16.9 2.3 14.6 2 12 2z" fill="currentColor" />
                                </svg>
                            </div>
                            <span className="font-heading font-semibold text-xl">KARU</span>
                        </div>
                        <p className="text-karu-sand/80 text-sm max-w-xs mb-6">
                            Connecting discerning buyers with authentic
                            artisans. Every purchase supports a maker's
                            dream.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-karu-sand/60 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-karu-sand/60 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-karu-sand/60 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-karu-sand/80">
                            <li><Link to="/products?filter=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link to="/products?category=home" className="hover:text-white transition-colors">Home Decor</Link></li>
                            <li><Link to="/products?category=jewelry" className="hover:text-white transition-colors">Jewelry</Link></li>
                            <li><Link to="/products?category=textiles" className="hover:text-white transition-colors">Textiles</Link></li>
                            <li><Link to="/gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">About</h4>
                        <ul className="space-y-2 text-sm text-karu-sand/80">
                            <li><Link to="/story" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link to="/artisans" className="hover:text-white transition-colors">Artisans</Link></li>
                            <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
                            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">Help</h4>
                        <ul className="space-y-2 text-sm text-karu-sand/80">
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/orders" className="hover:text-white transition-colors">Order Status</Link></li>
                            <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-karu-sand/60">
                        <p>© 2026 KARU. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
