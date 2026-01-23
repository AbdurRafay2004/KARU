import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Package, ChevronDown, ChevronUp, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import type { Id } from '../../convex/_generated/dataModel';

const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: 'Pending' },
    processing: { icon: Package, color: 'text-blue-600 bg-blue-50', label: 'Processing' },
    shipped: { icon: Truck, color: 'text-purple-600 bg-purple-50', label: 'Shipped' },
    delivered: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Delivered' },
    cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Cancelled' },
};

export function OrdersPage() {
    const orders = useQuery(api.orders.getOrders);
    const [expandedOrder, setExpandedOrder] = useState<Id<"orders"> | null>(null);

    // Loading state
    if (orders === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading orders...</p>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (orders === null) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center px-4">
                <div className="text-center">
                    <Package className="w-16 h-16 text-karu-sand mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        Sign in to view your orders
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Please log in to access your order history.
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

    // No orders
    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-karu-cream py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <Package className="w-16 h-16 text-karu-sand mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        No orders yet
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Start exploring our handcrafted collection.
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

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-karu-cream py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-8">
                    Your Orders
                </h1>

                <div className="space-y-4">
                    {orders.map((order) => {
                        const status = statusConfig[order.status];
                        const StatusIcon = status.icon;
                        const isExpanded = expandedOrder === order._id;

                        return (
                            <div key={order._id} className="bg-white rounded-karu overflow-hidden">
                                {/* Order Header */}
                                <button
                                    onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-sm text-karu-stone mb-1">
                                                Order placed {formatDate(order._creationTime)}
                                            </p>
                                            <p className="text-xs font-mono text-karu-stone">
                                                ID: {order._id}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}>
                                            <StatusIcon className="w-4 h-4" />
                                            {status.label}
                                        </span>
                                        <span className="font-semibold text-karu-charcoal">
                                            ৳{order.total.toFixed(2)}
                                        </span>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-karu-stone" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-karu-stone" />
                                        )}
                                    </div>
                                </button>

                                {/* Order Details (Expandable) */}
                                {isExpanded && (
                                    <div className="border-t border-karu-sand px-6 pb-6">
                                        {/* Items */}
                                        <div className="py-4">
                                            <h3 className="text-sm font-semibold text-karu-charcoal mb-3">
                                                Items ({order.items.length})
                                            </h3>
                                            <div className="space-y-3">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <div>
                                                            <span className="text-karu-charcoal">
                                                                {item.productName}
                                                            </span>
                                                            <span className="text-karu-stone ml-2">
                                                                × {item.quantity}
                                                            </span>
                                                        </div>
                                                        <span className="text-karu-charcoal">
                                                            ৳{(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Shipping Address */}
                                        <div className="py-4 border-t border-karu-sand">
                                            <h3 className="text-sm font-semibold text-karu-charcoal mb-2">
                                                Shipping Address
                                            </h3>
                                            <div className="text-sm text-karu-stone">
                                                <p>{order.shippingAddress.name}</p>
                                                <p>{order.shippingAddress.street}</p>
                                                <p>
                                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                                                </p>
                                                <p>{order.shippingAddress.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
