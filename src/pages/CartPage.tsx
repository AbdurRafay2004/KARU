import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export function CartPage() {
    const cart = useQuery(api.users.getCart);
    const updateQuantity = useMutation(api.users.updateCartQuantity);
    const removeFromCart = useMutation(api.users.removeFromCart);

    // Loading state
    if (cart === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading cart...</p>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (cart === null) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center px-4">
                <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-karu-sand mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        Sign in to view your cart
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Please log in to access your shopping cart.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-semibold hover:bg-karu-clay transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    // Empty cart
    if (cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-karu-cream py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ShoppingBag className="w-16 h-16 text-karu-sand mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        Your cart is empty
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Discover our handcrafted treasures and add them to your cart.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-semibold hover:bg-karu-clay transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    return (
        <div className="min-h-screen bg-karu-cream py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-8">
                    Your Cart
                </h1>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <div key={item.productId} className="bg-white rounded-karu p-4 flex gap-4">
                                <div className="w-24 h-24 rounded-karu overflow-hidden bg-karu-sand flex-shrink-0">
                                    {item.product && (
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-karu-charcoal">
                                        {item.product?.name || 'Unknown Product'}
                                    </h3>
                                    <p className="text-karu-terracotta font-semibold">
                                        ${item.product?.price || 0}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => updateQuantity({
                                                productId: item.productId,
                                                quantity: Math.max(1, item.quantity - 1)
                                            })}
                                            className="p-1 border border-karu-sand rounded hover:bg-karu-sand transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity({
                                                productId: item.productId,
                                                quantity: item.quantity + 1
                                            })}
                                            className="p-1 border border-karu-sand rounded hover:bg-karu-sand transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart({ productId: item.productId })}
                                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-karu p-6 h-fit">
                        <h2 className="font-heading text-xl font-bold text-karu-charcoal mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-karu-stone">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-karu-stone">
                                <span>Shipping</span>
                                <span>{total >= 150 ? 'Free' : '$10.00'}</span>
                            </div>
                        </div>
                        <div className="border-t border-karu-sand pt-4 mb-6">
                            <div className="flex justify-between font-semibold text-karu-charcoal">
                                <span>Total</span>
                                <span>${(total + (total >= 150 ? 0 : 10)).toFixed(2)}</span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="block w-full py-3 bg-karu-terracotta text-white rounded-karu font-semibold hover:bg-karu-clay transition-colors text-center"
                        >
                            Proceed to Checkout
                        </Link>
                        <p className="text-xs text-karu-stone text-center mt-4">
                            Free shipping on orders over $150
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
