/**
 * Login - Page de connexion Premium Dark Blue
 */

import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    Eye,
    EyeOff,
    GraduationCap,
    LineChart,
    Lock,
    LogIn,
    Mail,
    Target,
    Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

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

    const features = [
        {
            icon: Target,
            title: 'Objectifs clairs',
            desc: 'Définissez vos priorités',
        },
        {
            icon: LineChart,
            title: 'Suivi en temps réel',
            desc: 'Visualisez votre progression',
        },
        {
            icon: Zap,
            title: 'Ultra rapide',
            desc: 'Interface fluide et réactive',
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10" />

                    {/* Floating orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                    <div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse"
                        style={{ animationDelay: '1s' }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[60px]" />

                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center p-16 w-full">
                    {/* Logo & Brand */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 transform rotate-3 hover:rotate-0 transition-transform">
                                    <GraduationCap className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                                    <BookOpen className="w-3 h-3 text-slate-900" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    Study
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                        Planner
                                    </span>
                                </h1>
                                <p className="text-slate-500 text-sm">
                                    Votre assistant d'études
                                </p>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                            Organisez vos études
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                                comme un pro
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-md">
                            Gérez vos devoirs, projets et TPs avec une
                            plateforme moderne conçue pour les étudiants.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.05] transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-12 flex gap-8">
                        {[
                            { value: '10k+', label: 'Étudiants' },
                            { value: '50k+', label: 'Tâches créées' },
                            { value: '98%', label: 'Satisfaction' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            Study
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                Planner
                            </span>
                        </span>
                    </div>

                    {/* Form Card */}
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800/50 p-8 shadow-2xl shadow-black/20">
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                                <LogIn className="w-7 h-7 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Bon retour !
                            </h2>
                            <p className="text-slate-400">
                                Connectez-vous pour accéder à vos tâches
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-shake">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">
                                    Adresse email
                                </label>
                                <div
                                    className={`relative transition-all ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 transition-opacity ${focusedField === 'email' ? 'opacity-20' : ''}`}
                                    />
                                    <div className="relative">
                                        <Mail
                                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-blue-400' : 'text-slate-500'}`}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusedField('email')
                                            }
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="vous@exemple.com"
                                            disabled={loading}
                                            className="w-full px-4 py-3.5 pl-12 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">
                                    Mot de passe
                                </label>
                                <div
                                    className={`relative transition-all ${focusedField === 'password' ? 'transform scale-[1.02]' : ''}`}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 transition-opacity ${focusedField === 'password' ? 'opacity-20' : ''}`}
                                    />
                                    <div className="relative">
                                        <Lock
                                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-blue-400' : 'text-slate-500'}`}
                                        />
                                        <input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusedField('password')
                                            }
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="••••••••"
                                            disabled={loading}
                                            className="w-full px-4 py-3.5 pl-12 pr-12 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full relative group overflow-hidden"
                                disabled={loading}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                                <div className="relative flex items-center justify-center gap-2 py-3.5 font-semibold text-white">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Connexion en cours...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5" />
                                            Se connecter
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-slate-900/50 text-slate-500 text-sm">
                                    Nouveau sur StudyPlanner ?
                                </span>
                            </div>
                        </div>

                        <Link
                            to="/register"
                            className="flex items-center justify-center gap-2 w-full py-3 border border-slate-700 hover:border-blue-500/50 rounded-xl text-slate-300 hover:text-white font-medium transition-all hover:bg-slate-800/50"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Créer un compte gratuitement
                        </Link>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-slate-600 text-sm mt-6">
                        © 2026 StudyPlanner - Projet L3 Informatique
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
