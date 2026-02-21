/**
 * Register - Page d'inscription Dark Blue
 */

import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Eye,
    EyeOff,
    GraduationCap,
    Lock,
    Mail,
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

    const validateForm = () => {
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.nom ||
            !formData.prenom
        ) {
            setError('Veuillez remplir tous les champs')
            return false
        }
        if (formData.username.length < 3) {
            setError("Nom d'utilisateur: min 3 caractères")
            return false
        }
        if (!formData.email.includes('@')) {
            setError('Email invalide')
            return false
        }
        if (formData.password.length < 6) {
            setError('Mot de passe: min 6 caractères')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

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
        if (!pwd) return 0
        let strength = 0
        if (pwd.length >= 6) strength++
        if (pwd.length >= 8) strength++
        if (/[A-Z]/.test(pwd)) strength++
        if (/[0-9]/.test(pwd)) strength++
        if (/[^A-Za-z0-9]/.test(pwd)) strength++
        return strength
    }

    const strength = passwordStrength()

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-cyan-600/20" />
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 flex flex-col justify-center p-12 text-white">
                    <div className="mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <GraduationCap className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl font-bold mb-3 text-gradient">
                            Rejoignez-nous
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Créez votre compte et organisez vos études
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            'Gérez vos devoirs',
                            'Suivez votre progression',
                            'Restez organisé',
                        ].map((text, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-400" />
                                <span className="text-slate-300">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
                <div className="w-full max-w-md py-8">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-6 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                    </Link>

                    <div className="card p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white mb-1">
                                Créer un compte
                            </h2>
                            <p className="text-slate-400 text-sm">
                                Remplissez les informations
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        placeholder="Jean"
                                        disabled={loading}
                                        className="input-dark"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        placeholder="Dupont"
                                        disabled={loading}
                                        className="input-dark"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Nom d'utilisateur
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="jean_dupont"
                                        disabled={loading}
                                        className="input-dark pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="jean@exemple.com"
                                        disabled={loading}
                                        className="input-dark pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Min 6 caractères"
                                        disabled={loading}
                                        className="input-dark pl-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 h-1 rounded-full overflow-hidden bg-slate-800">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex-1 transition-all ${i < strength ? (strength <= 2 ? 'bg-red-500' : strength <= 3 ? 'bg-yellow-500' : 'bg-green-500') : ''}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Confirmer
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirmez"
                                        disabled={loading}
                                        className="input-dark pl-10"
                                    />
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
                                        Inscription...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        Créer mon compte
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
