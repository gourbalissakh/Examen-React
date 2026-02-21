/**
 * Dashboard - Tableau de bord Dark Blue
 */

import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    Flame,
    Plus,
    Target,
    TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import TacheCard from '../components/TacheCard'
import { useAuth } from '../context/AuthContext'
import { useTaches } from '../context/TachesContext'

const Dashboard = () => {
    const { taches, matieres, stats, loading } = useTaches()
    const { user } = useAuth()

    const tachesUrgentes = taches
        .filter((t) => {
            if (t.statut === 'Terminé') return false
            const deadline = new Date(t.deadline)
            const now = new Date()
            const diff = (deadline - now) / (1000 * 60 * 60 * 24)
            return diff <= 3 && diff >= 0
        })
        .slice(0, 3)

    const tachesRecentes = taches
        .filter((t) => t.statut !== 'Terminé')
        .slice(0, 4)

    const progressionPourcentage =
        stats.total > 0 ? Math.round((stats.terminees / stats.total) * 100) : 0

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Bonjour'
        if (hour < 18) return 'Bon après-midi'
        return 'Bonsoir'
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mx-auto mb-4" />
                    <p className="text-slate-400">Chargement...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {getGreeting()},{' '}
                        <span className="text-gradient">
                            {user?.prenom || user?.username}
                        </span>{' '}
                        👋
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Voici un aperçu de vos tâches
                    </p>
                </div>
                <Link to="/nouvelle-tache" className="btn-primary">
                    <Plus className="w-5 h-5" />
                    Nouvelle tâche
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total"
                    value={stats.total}
                    icon={BookOpen}
                    color="blue"
                />
                <StatCard
                    title="En cours"
                    value={stats.enCours}
                    icon={Clock}
                    color="cyan"
                />
                <StatCard
                    title="Terminées"
                    value={stats.terminees}
                    icon={CheckCircle2}
                    color="green"
                />
                <StatCard
                    title="En retard"
                    value={stats.enRetard}
                    icon={AlertTriangle}
                    color="red"
                />
            </div>

            {/* Progress */}
            <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Target className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">
                                Progression
                            </h3>
                            <p className="text-sm text-slate-400">
                                {stats.terminees}/{stats.total} tâches
                            </p>
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-gradient">
                        {progressionPourcentage}%
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressionPourcentage}%` }}
                    />
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Urgent Tasks */}
                <div className="lg:col-span-2 card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                <Flame className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">
                                    Urgent
                                </h3>
                                <p className="text-sm text-slate-400">
                                    À rendre bientôt
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/taches"
                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                            Tout voir <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {tachesUrgentes.length > 0 ? (
                        <div className="space-y-3">
                            {tachesUrgentes.map((tache) => (
                                <TacheCard
                                    key={tache.id}
                                    tache={tache}
                                    compact
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-slate-500">
                            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="font-medium">Aucune tâche urgente</p>
                            <p className="text-sm">Vous êtes à jour !</p>
                        </div>
                    )}
                </div>

                {/* By Subject */}
                <div className="card p-5">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">
                                Par matière
                            </h3>
                            <p className="text-sm text-slate-400">
                                Progression
                            </p>
                        </div>
                    </div>

                    {matieres.length > 0 ? (
                        <div className="space-y-4">
                            {matieres.slice(0, 5).map((matiere) => {
                                const tachesMatiere = taches.filter(
                                    (t) => t.matiereId === matiere.id,
                                )
                                const terminees = tachesMatiere.filter(
                                    (t) => t.statut === 'Terminé',
                                ).length
                                const total = tachesMatiere.length
                                const pourcentage =
                                    total > 0
                                        ? Math.round((terminees / total) * 100)
                                        : 0

                                return (
                                    <div key={matiere.id}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-2.5 h-2.5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            matiere.couleur,
                                                    }}
                                                />
                                                <span className="text-sm font-medium text-slate-300">
                                                    {matiere.nom}
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500">
                                                {terminees}/{total}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${pourcentage}%`,
                                                    backgroundColor:
                                                        matiere.couleur,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500">
                            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Aucune matière</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Tasks */}
            {tachesRecentes.length > 0 && (
                <div className="card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">
                                    En attente
                                </h3>
                                <p className="text-sm text-slate-400">
                                    Vos tâches à faire
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/taches"
                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                            Voir tout <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tachesRecentes.map((tache) => (
                            <TacheCard key={tache.id} tache={tache} />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {taches.length === 0 && (
                <div className="card p-12 text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                        Commencez à planifier
                    </h3>
                    <p className="text-slate-400 mb-6 max-w-sm mx-auto">
                        Créez votre première tâche
                    </p>
                    <Link to="/nouvelle-tache" className="btn-primary">
                        <Plus className="w-5 h-5" />
                        Créer une tâche
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Dashboard
