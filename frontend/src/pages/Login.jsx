/**
 * Login - Page de connexion Dark Blue
 */

import {
    AlertCircle,
    Eye,
    EyeOff,
    GraduationCap,
    Lock,
    Mail,
    Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard', { replace: true })
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs')
            return
        }
        setLoading(true)
        setError('')
        const result = await login(formData.email, formData.password)
        if (!result.success) {
            setError(result.message || 'Identifiants incorrects')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-cyan-600/20" />

                {/* Animated circles */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />

                <div className="relative z-10 flex flex-col justify-center p-16 text-white">
                    <div className="mb-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="text-gradient">StudyPlanner</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-md">
                            Organisez vos études efficacement avec notre
                            plateforme moderne et intuitive.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                icon: Sparkles,
                                text: 'Interface moderne et épurée',
                            },
                            {
                                icon: Sparkles,
                                text: 'Suivi de progression en temps réel',
                            },
                            {
                                icon: Sparkles,
                                text: 'Gestion intelligente des tâches',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 text-slate-300"
                            >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <item.icon className="w-4 h-4 text-blue-400" />
                                </div>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gradient">
                            StudyPlanner
                        </span>
                    </div>

                    <div className="card p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Connexion
                            </h2>
                            <p className="text-slate-400">
                                Accédez à votre espace personnel
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="vous@exemple.com"
                                        disabled={loading}
                                        className="input-dark pl-11"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        disabled={loading}
                                        className="input-dark pl-11 pr-11"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-3"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Connexion...
                                    </>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-slate-400 text-sm">
                                Pas encore de compte ?{' '}
                                <Link
                                    to="/register"
                                    className="text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    S'inscrire
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
