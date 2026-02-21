/**
 * Navbar - Barre de navigation dark blue theme
 */

import {
    GraduationCap,
    LayoutDashboard,
    ListTodo,
    LogOut,
    Menu,
    PlusCircle,
    User,
    X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
        setMenuOpen(false)
    }

    const isActive = (path) => location.pathname === path

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/taches', label: 'Mes tâches', icon: ListTodo },
        { path: '/nouvelle-tache', label: 'Ajouter', icon: PlusCircle },
    ]

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-lg font-bold text-white">
                                Study
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    Planner
                                </span>
                            </span>
                        </div>
                    </Link>

                    {/* Menu mobile toggle */}
                    <button
                        className="lg:hidden p-2 hover:bg-slate-800 rounded-xl transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        {menuOpen ? (
                            <X className="w-6 h-6 text-slate-300" />
                        ) : (
                            <Menu className="w-6 h-6 text-slate-300" />
                        )}
                    </button>

                    {/* Navigation desktop */}
                    <div className="hidden lg:flex items-center gap-1">
                        {isAuthenticated ? (
                            <>
                                {navLinks.map(({ path, label, icon: Icon }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                            isActive(path)
                                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/25'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{label}</span>
                                    </Link>
                                ))}

                                <div className="w-px h-6 bg-slate-700 mx-3" />

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700">
                                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                            <User className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="font-medium text-sm text-slate-200">
                                            {user?.prenom}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Déconnexion"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm text-slate-300 hover:text-white font-medium transition-colors"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary text-sm"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            <div
                className={`lg:hidden absolute inset-x-0 top-16 transition-all duration-200 ${
                    menuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className="mx-4 mt-2 bg-slate-900 rounded-xl border border-slate-700 shadow-lg shadow-black/20 p-3 space-y-1">
                    {isAuthenticated ? (
                        <>
                            {navLinks.map(({ path, label, icon: Icon }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    onClick={() => setMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                        isActive(path)
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                            : 'text-slate-300 hover:bg-slate-800'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{label}</span>
                                </Link>
                            ))}

                            <div className="h-px bg-slate-700 my-2" />

                            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-lg">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">
                                        {user?.prenom} {user?.nom}
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Déconnexion</span>
                            </button>
                        </>
                    ) : (
                        <div className="space-y-2">
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-3 text-center text-slate-300 hover:bg-slate-800 rounded-lg font-medium"
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="block btn-primary w-full text-center"
                            >
                                S'inscrire
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
