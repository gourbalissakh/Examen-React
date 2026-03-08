/**
 * Register - Page d'inscription Premium Dark Blue
 */

import {
    AlertCircle,
    ArrowLeft,
    BookOpen,
    CheckCircle,
    Eye,
    EyeOff,
    GraduationCap,
    Lock,
    Mail,
    Shield,
    Sparkles,
    User,
    UserPlus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        nom: '',
        prenom: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [focusedField, setFocusedField] = useState(null)
    const [step, setStep] = useState(1)

    const { register, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard', { replace: true })
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const validateStep1 = () => {
        if (!formData.prenom.trim() || !formData.nom.trim()) {
            setError('Veuillez entrer votre nom complet')
            return false
        }
        if (!formData.username || formData.username.length < 3) {
            setError("Nom d'utilisateur: minimum 3 caractères")
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (!formData.email.includes('@')) {
            setError('Veuillez entrer un email valide')
            return false
        }
        if (formData.password.length < 6) {
            setError('Mot de passe: minimum 6 caractères')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return false
        }
        return true
    }

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(2)
            setError('')
        }
    }

    const prevStep = () => {
        setStep(1)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateStep2()) return

        setLoading(true)
        setError('')
        const { confirmPassword, ...userData } = formData
        const result = await register(userData)
        if (!result.success) {
            setError(result.message || "Erreur lors de l'inscription")
        }
        setLoading(false)
    }

    const passwordStrength = () => {
        const pwd = formData.password
        if (!pwd) return { score: 0, label: '', color: '' }
        let score = 0
        if (pwd.length >= 6) score++
        if (pwd.length >= 8) score++
        if (/[A-Z]/.test(pwd)) score++
        if (/[0-9]/.test(pwd)) score++
        if (/[^A-Za-z0-9]/.test(pwd)) score++

        if (score <= 2)
            return { score, label: 'Faible', color: 'from-red-500 to-red-400' }
        if (score <= 3)
            return {
                score,
                label: 'Moyen',
                color: 'from-yellow-500 to-orange-400',
            }
        return { score, label: 'Fort', color: 'from-green-500 to-emerald-400' }
    }

    const strength = passwordStrength()

    const InputField = ({
        icon: Icon,
        label,
        name,
        type = 'text',
        placeholder,
        value,
        showToggle = false,
    }) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
                {label}
            </label>
            <div
                className={`relative transition-all duration-200 ${focusedField === name ? 'transform scale-[1.01]' : ''}`}
            >
                <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 transition-opacity ${focusedField === name ? 'opacity-15' : ''}`}
                />
                <div className="relative">
                    <Icon
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === name ? 'text-blue-400' : 'text-slate-500'}`}
                    />
                    <input
                        type={
                            showToggle
                                ? showPassword
                                    ? 'text'
                                    : 'password'
                                : type
                        }
                        name={name}
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={placeholder}
                        disabled={loading}
                        className="w-full px-4 py-3 pl-12 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all"
                    />
                    {showToggle && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-blue-600/10" />
                    <div className="absolute top-1/3 -left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-[80px] animate-pulse" />
                    <div
                        className="absolute bottom-1/3 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-[80px] animate-pulse"
                        style={{ animationDelay: '1.5s' }}
                    />

                    {/* Dot pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                            backgroundSize: '32px 32px',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center p-12 w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 transform -rotate-3 hover:rotate-0 transition-transform">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Study
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    Planner
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white leading-tight mb-3">
                            Créez votre compte
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                en quelques clics
                            </span>
                        </h2>
                        <p className="text-slate-400">
                            Rejoignez des milliers d'étudiants qui utilisent
                            StudyPlanner
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                        {[
                            { icon: CheckCircle, text: 'Compte 100% gratuit' },
                            { icon: Shield, text: 'Données sécurisées' },
                            {
                                icon: Sparkles,
                                text: 'Accès à toutes les fonctionnalités',
                            },
                            { icon: BookOpen, text: 'Support personnalisé' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-all"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                    <item.icon className="w-4 h-4 text-cyan-400" />
                                </div>
                                <span className="text-slate-300 text-sm">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div className="mt-10 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <p className="text-slate-300 italic mb-3">
                            "StudyPlanner m'a aidé à mieux organiser mes
                            révisions. Je le recommande à tous !"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                M
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">
                                    Marie L.
                                </p>
                                <p className="text-slate-500 text-xs">
                                    Étudiante L3 Informatique
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
                <div className="w-full max-w-md py-8">
                    {/* Back link */}
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour à la connexion
                    </Link>

                    {/* Form Card */}
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800/50 p-8 shadow-2xl shadow-black/20">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                                <UserPlus className="w-7 h-7 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                Inscription
                            </h2>
                            <p className="text-slate-400 text-sm">
                                Étape {step} sur 2
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="flex gap-2 mb-8">
                            <div
                                className={`flex-1 h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-slate-800'}`}
                            />
                            <div
                                className={`flex-1 h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-slate-800'}`}
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            {step === 1 ? (
                                <>
                                    {/* Step 1: Personal Info */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-300">
                                                Prénom
                                            </label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                value={formData.prenom}
                                                onChange={handleChange}
                                                onFocus={() =>
                                                    setFocusedField('prenom')
                                                }
                                                onBlur={() =>
                                                    setFocusedField(null)
                                                }
                                                placeholder="Jean"
                                                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all ${focusedField === 'prenom' ? 'border-blue-500/50 bg-slate-800' : 'border-slate-700/50'}`}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-300">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                name="nom"
                                                value={formData.nom}
                                                onChange={handleChange}
                                                onFocus={() =>
                                                    setFocusedField('nom')
                                                }
                                                onBlur={() =>
                                                    setFocusedField(null)
                                                }
                                                placeholder="Dupont"
                                                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all ${focusedField === 'nom' ? 'border-blue-500/50 bg-slate-800' : 'border-slate-700/50'}`}
                                            />
                                        </div>
                                    </div>

                                    <InputField
                                        icon={User}
                                        label="Nom d'utilisateur"
                                        name="username"
                                        placeholder="jean_dupont"
                                        value={formData.username}
                                    />

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full relative group overflow-hidden rounded-xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 transition-transform group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                                        <div className="relative flex items-center justify-center gap-2 py-3.5 font-semibold text-white">
                                            Continuer
                                            <ArrowLeft className="w-5 h-5 rotate-180" />
                                        </div>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Step 2: Account Info */}
                                    <InputField
                                        icon={Mail}
                                        label="Adresse email"
                                        name="email"
                                        type="email"
                                        placeholder="jean@exemple.com"
                                        value={formData.email}
                                    />

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-300">
                                            Mot de passe
                                        </label>
                                        <div
                                            className={`relative transition-all duration-200 ${focusedField === 'password' ? 'transform scale-[1.01]' : ''}`}
                                        >
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 transition-opacity ${focusedField === 'password' ? 'opacity-15' : ''}`}
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
                                                        setFocusedField(
                                                            'password',
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        setFocusedField(null)
                                                    }
                                                    placeholder="Min 6 caractères"
                                                    disabled={loading}
                                                    className="w-full px-4 py-3 pl-12 pr-12 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
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

                                        {/* Password strength */}
                                        {formData.password && (
                                            <div className="mt-3">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-xs text-slate-500">
                                                        Force du mot de passe
                                                    </span>
                                                    <span
                                                        className={`text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r ${strength.color}`}
                                                    >
                                                        {strength.label}
                                                    </span>
                                                </div>
                                                <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-slate-800">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`flex-1 rounded-full transition-all duration-300 ${i < strength.score ? `bg-gradient-to-r ${strength.color}` : ''}`}
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <InputField
                                        icon={Lock}
                                        label="Confirmer le mot de passe"
                                        name="confirmPassword"
                                        placeholder="Confirmez votre mot de passe"
                                        value={formData.confirmPassword}
                                        showToggle
                                    />

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 py-3 border border-slate-700 hover:border-slate-600 rounded-xl text-slate-300 hover:text-white font-medium transition-all flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                            Retour
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] relative group overflow-hidden rounded-xl"
                                            disabled={loading}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 transition-transform group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                                            <div className="relative flex items-center justify-center gap-2 py-3.5 font-semibold text-white">
                                                {loading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Création...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="w-5 h-5" />
                                                        Créer mon compte
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>

                        {/* Already have account */}
                        <p className="text-center text-slate-400 text-sm mt-6">
                            Déjà inscrit ?{' '}
                            <Link
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Se connecter
                            </Link>
                        </p>
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

export default Register
