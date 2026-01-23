import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Plus,
    Edit2,
    Trash2,
    X,
    Loader2,
    DollarSign,
    AlertCircle,
    Store,
} from 'lucide-react';
import type { Id } from '../../convex/_generated/dataModel';

type Tab = 'overview' | 'products' | 'orders';

export function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Id<"products"> | null>(null);

    // Get current user with profile - determines if they're an artisan
    const currentUser = useQuery(api.users.getCurrentUser);
    const myArtisan = useQuery(api.userProfiles.getMyArtisan);

    // Use the new secure queries that derive artisanId from auth
    const stats = useQuery(api.admin.getDashboardStats);
    const products = useQuery(api.admin.getMyProducts);
    const orders = useQuery(api.admin.getMyOrders);

    const updateOrderStatus = useMutation(api.admin.updateOrderStatus);
    const deleteProduct = useMutation(api.admin.deleteProduct);

    // Loading state
    if (currentUser === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Not logged in
    if (!currentUser) {
        return (
            <div className="min-h-screen bg-karu-cream py-12 px-4">
                <div className="max-w-lg mx-auto text-center bg-white rounded-karu p-8 shadow-sm">
                    <AlertCircle className="w-16 h-16 text-karu-terracotta mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        Sign In Required
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Please sign in to access your shop dashboard.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    // Not an artisan - show onboarding prompt
    if (!currentUser.profile?.artisanId) {
        return (
            <div className="min-h-screen bg-karu-cream py-12 px-4">
                <div className="max-w-lg mx-auto text-center bg-white rounded-karu p-8 shadow-sm">
                    <Store className="w-16 h-16 text-karu-terracotta mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        Become a Seller
                    </h1>
                    <p className="text-karu-stone mb-6">
                        You don't have a shop yet. Start selling your handcrafted items on Karu!
                    </p>
                    <Link
                        to="/sell"
                        className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                    >
                        Start Selling
                    </Link>
                    <p className="mt-4 text-sm text-karu-stone">
                        Or <Link to="/" className="text-karu-terracotta hover:underline">continue browsing</Link>
                    </p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview' as Tab, label: 'Overview', icon: LayoutDashboard },
        { id: 'products' as Tab, label: 'Products', icon: Package },
        { id: 'orders' as Tab, label: 'Orders', icon: ShoppingCart },
    ];

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    return (
        <div className="min-h-screen bg-karu-cream">
            {/* Header */}
            <div className="bg-white border-b border-karu-sand">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-heading text-2xl font-bold text-karu-charcoal">
                                Shop Manager
                            </h1>
                            <p className="text-karu-stone text-sm mt-1">
                                {myArtisan?.name || 'Your Shop'} — Manage your products and orders
                            </p>
                        </div>

                        {/* Artisan Profile Link */}
                        {myArtisan && (
                            <Link
                                to={`/artisans/${myArtisan.slug}`}
                                className="flex items-center gap-2 px-4 py-2 border border-karu-sand rounded-karu text-karu-charcoal hover:bg-karu-cream transition-colors"
                            >
                                <img
                                    src={myArtisan.avatar}
                                    alt={myArtisan.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium">View Public Profile</span>
                            </Link>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mt-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-karu font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-karu-terracotta text-white'
                                    : 'text-karu-stone hover:bg-karu-sand'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && stats && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white rounded-karu p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-karu-stone">Total Products</p>
                                    <p className="text-2xl font-bold text-karu-charcoal">
                                        {stats.productCount}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-karu p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-karu-stone">Total Sales</p>
                                    <p className="text-2xl font-bold text-karu-charcoal">
                                        ${stats.totalSales.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-karu p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-karu-stone">Total Orders</p>
                                    <p className="text-2xl font-bold text-karu-charcoal">
                                        {stats.orderCount}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-karu p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-karu-stone">Pending Orders</p>
                                    <p className="text-2xl font-bold text-karu-charcoal">
                                        {stats.pendingOrders}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-heading text-xl font-bold text-karu-charcoal">
                                Your Products
                            </h2>
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setShowProductModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Product
                            </button>
                        </div>

                        <div className="bg-white rounded-karu overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-karu-sand/30">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Product
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Category
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Price
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Stock
                                        </th>
                                        <th className="text-right px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-karu-sand">
                                    {products?.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <Link
                                                        to={`/products/${product._id}`}
                                                        className="font-medium text-karu-charcoal hover:text-karu-terracotta"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-karu-stone capitalize">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 text-karu-charcoal">
                                                ${product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`${product.stock < 5
                                                        ? 'text-red-600'
                                                        : 'text-karu-charcoal'
                                                        }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingProduct(product._id);
                                                            setShowProductModal(true);
                                                        }}
                                                        className="p-2 text-karu-stone hover:text-karu-terracotta transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Delete this product?')) {
                                                                deleteProduct({ productId: product._id });
                                                            }
                                                        }}
                                                        className="p-2 text-karu-stone hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {products?.length === 0 && (
                                <div className="text-center py-12 text-karu-stone">
                                    No products yet. Add your first product!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div>
                        <h2 className="font-heading text-xl font-bold text-karu-charcoal mb-6">
                            Orders
                        </h2>

                        <div className="bg-white rounded-karu overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-karu-sand/30">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Order ID
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Items
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Total
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-karu-charcoal">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-karu-sand">
                                    {orders?.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm text-karu-stone">
                                                    {order._id.slice(0, 12)}...
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    {order.relevantItems.map((item, i) => (
                                                        <div key={i} className="text-karu-charcoal">
                                                            {item.productName} × {item.quantity}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-karu-charcoal">
                                                ${order.relevantItems
                                                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                                                    .toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        updateOrderStatus({
                                                            orderId: order._id,
                                                            status: e.target.value as typeof order.status,
                                                        })
                                                    }
                                                    className="px-3 py-1.5 border border-karu-sand rounded-karu text-sm focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                                >
                                                    {statusOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {orders?.length === 0 && (
                                <div className="text-center py-12 text-karu-stone">
                                    No orders yet.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            {showProductModal && (
                <ProductModal
                    productId={editingProduct}
                    onClose={() => {
                        setShowProductModal(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </div>
    );
}

// Product Modal Component - no longer needs artisanId prop
function ProductModal({
    productId,
    onClose,
}: {
    productId: Id<"products"> | null;
    onClose: () => void;
}) {
    const existingProduct = useQuery(
        api.products.get,
        productId ? { id: productId } : "skip"
    );
    const addProduct = useMutation(api.admin.addProduct);
    const updateProduct = useMutation(api.admin.updateProduct);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'pottery',
        stock: '',
        images: '',
    });

    // Populate form with existing data
    useEffect(() => {
        if (existingProduct) {
            setFormData({
                name: existingProduct.name,
                description: existingProduct.description,
                price: existingProduct.price.toString(),
                category: existingProduct.category,
                stock: existingProduct.stock.toString(),
                images: existingProduct.images.join('\n'),
            });
        }
    }, [existingProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                stock: parseInt(formData.stock),
                images: formData.images.split('\n').filter((url) => url.trim()),
            };

            if (productId) {
                await updateProduct({
                    productId,
                    ...productData,
                });
            } else {
                // addProduct no longer needs artisanId - derived from auth
                await addProduct(productData);
            }

            onClose();
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('Failed to save product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-karu max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-karu-sand">
                    <h2 className="font-heading text-xl font-bold text-karu-charcoal">
                        {productId ? 'Edit Product' : 'Add Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-karu-stone hover:text-karu-charcoal transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-karu-charcoal mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-karu-charcoal mb-1">
                            Description
                        </label>
                        <textarea
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-karu-charcoal mb-1">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-karu-charcoal mb-1">
                                Stock
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-2 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-karu-charcoal mb-1">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                        >
                            <option value="pottery">Pottery</option>
                            <option value="textiles">Textiles</option>
                            <option value="woodwork">Woodwork</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="basketry">Basketry</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-karu-charcoal mb-1">
                            Image URLs (one per line)
                        </label>
                        <textarea
                            required
                            rows={3}
                            value={formData.images}
                            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                            placeholder="https://example.com/image1.jpg"
                            className="w-full px-4 py-2 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 font-mono text-sm"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 border border-karu-sand text-karu-charcoal rounded-karu font-medium hover:bg-karu-sand transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
