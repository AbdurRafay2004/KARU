import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthActions } from '@convex-dev/auth/react';

export function SignupPage() {
    const { signIn } = useAuthActions();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn('password', { email, password, name, flow: 'signUp' });
            navigate('/');
        } catch (err) {
            setError('Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-karu-cream flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-karu-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-2">
                            Join KARU
                        </h1>
                        <p className="text-karu-stone">
                            Create an account to start shopping
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-karu text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-karu-charcoal mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta focus:border-transparent"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-karu-charcoal mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-karu-charcoal mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta focus:border-transparent"
                                placeholder="Create a password (min. 8 characters)"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-karu-terracotta text-white rounded-karu font-semibold hover:bg-karu-clay transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-karu-stone">
                            Already have an account?{' '}
                            <Link to="/login" className="text-karu-terracotta font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
