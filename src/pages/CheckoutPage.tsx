import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { ShoppingBag, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

export function CheckoutPage() {
    const cart = useQuery(api.users.getCart);
    const createOrder = useMutation(api.orders.createOrder);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'Bangladesh',
    });

    // Loading state
    if (cart === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading checkout...</p>
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
                        Sign in to checkout
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Please log in to complete your purchase.
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
    if (cart.items.length === 0 && !orderComplete) {
        return (
            <div className="min-h-screen bg-karu-cream py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ShoppingBag className="w-16 h-16 text-karu-sand mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        Your cart is empty
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Add some items to your cart before checking out.
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

    // Order complete
    if (orderComplete) {
        return (
            <div className="min-h-screen bg-karu-cream py-12 px-4">
                <div className="max-w-lg mx-auto text-center">
                    <div className="bg-white rounded-karu p-8 shadow-sm">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-2">
                            Order Placed!
                        </h1>
                        <p className="text-karu-stone mb-6">
                            Thank you for your order. We'll send you a confirmation email shortly.
                        </p>
                        <p className="text-sm text-karu-stone mb-8">
                            Order ID: <span className="font-mono font-medium">{orderId}</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/orders"
                                className="px-6 py-3 bg-karu-terracotta text-white rounded-karu font-semibold hover:bg-karu-clay transition-colors"
                            >
                                View Orders
                            </Link>
                            <Link
                                to="/products"
                                className="px-6 py-3 border border-karu-sand text-karu-charcoal rounded-karu font-semibold hover:bg-karu-sand transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = cart.items.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
    const shipping = subtotal >= 150 ? 0 : 10;
    const total = subtotal + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const id = await createOrder({
                shippingAddress: formData
            });
            setOrderId(id);
            setOrderComplete(true);
        } catch (error) {
            console.error('Order failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-karu-cream py-12">
            <div className="max-w-5xl mx-auto px-4">
                {/* Back to Cart */}
                <Link
                    to="/cart"
                    className="inline-flex items-center gap-2 text-karu-stone hover:text-karu-terracotta transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </Link>

                <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-8">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 lg:grid-cols-5">
                        {/* Shipping Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-karu p-6">
                                <h2 className="font-heading text-xl font-bold text-karu-charcoal mb-6">
                                    Shipping Address
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-karu-charcoal mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 focus:border-karu-terracotta"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="street" className="block text-sm font-medium text-karu-charcoal mb-1">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            id="street"
                                            name="street"
                                            required
                                            value={formData.street}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 focus:border-karu-terracotta"
                                            placeholder="House No, Road, Area"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-karu-charcoal mb-1">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 focus:border-karu-terracotta"
                                                placeholder="City"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium text-karu-charcoal mb-1">
                                                Division/State
                                            </label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                required
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 focus:border-karu-terracotta"
                                                placeholder="Division"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="zip" className="block text-sm font-medium text-karu-charcoal mb-1">
                                                Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                id="zip"
                                                name="zip"
                                                required
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 focus:border-karu-terracotta"
                                                placeholder="Postal Code"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-karu-charcoal mb-1">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                id="country"
                                                name="country"
                                                required
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 focus:border-karu-terracotta bg-gray-50"
                                                placeholder="Country"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-karu p-6 sticky top-24">
                                <h2 className="font-heading text-xl font-bold text-karu-charcoal mb-6">
                                    Order Summary
                                </h2>

                                {/* Items */}
                                <div className="space-y-3 mb-6">
                                    {cart.items.map((item) => (
                                        <div key={item.productId} className="flex gap-3">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-karu-sand flex-shrink-0">
                                                {item.product && (
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-karu-charcoal truncate">
                                                    {item.product?.name}
                                                </p>
                                                <p className="text-sm text-karu-stone">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-karu-charcoal">
                                                ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 border-t border-karu-sand pt-4 mb-6">
                                    <div className="flex justify-between text-karu-stone">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-karu-stone">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-karu-charcoal text-lg pt-2 border-t border-karu-sand">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-karu-terracotta text-white rounded-karu font-semibold hover:bg-karu-clay transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>

                                <p className="text-xs text-karu-stone text-center mt-4">
                                    Free shipping on orders over $150
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
