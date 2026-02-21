/**
 * TacheCard - Carte de tâche dark blue theme
 */

import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Circle,
    Clock,
    Code,
    Edit3,
    FileText,
    FolderOpen,
    Timer,
    Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaches } from '../context/TachesContext'

const TacheCard = ({ tache, compact = false }) => {
    const navigate = useNavigate()
    const { changerStatut, supprimerTache, getNomMatiere, getCouleurMatiere } =
        useTaches()
    const [isDeleting, setIsDeleting] = useState(false)
    const [showStatusMenu, setShowStatusMenu] = useState(false)

    const types = {
        devoir: {
            label: 'Devoir',
            icon: FileText,
            color: 'bg-blue-500/20 text-blue-400',
        },
        tp: {
            label: 'TP',
            icon: Code,
            color: 'bg-violet-500/20 text-violet-400',
        },
        projet: {
            label: 'Projet',
            icon: FolderOpen,
            color: 'bg-orange-500/20 text-orange-400',
        },
    }

    const priorites = {
        haute: { label: 'Haute', class: 'bg-red-500/20 text-red-400' },
        moyenne: {
            label: 'Moyenne',
            class: 'bg-orange-500/20 text-orange-400',
        },
        basse: { label: 'Basse', class: 'bg-slate-500/20 text-slate-400' },
    }

    const statuts = {
        a_faire: {
            label: 'À faire',
            icon: Circle,
            class: 'bg-slate-500/20 text-slate-400',
        },
        en_cours: {
            label: 'En cours',
            icon: Timer,
            class: 'bg-orange-500/20 text-orange-400',
        },
        termine: {
            label: 'Terminé',
            icon: CheckCircle2,
            class: 'bg-emerald-500/20 text-emerald-400',
        },
    }

    const handleStatutChange = async (nouveauStatut) => {
        await changerStatut(tache.id, nouveauStatut)
        setShowStatusMenu(false)
    }

    const handleDelete = async () => {
        if (window.confirm('Supprimer cette tâche ?')) {
            setIsDeleting(true)
            await supprimerTache(tache.id)
        }
    }

    const joursRestants = () => {
        const aujourdhui = new Date()
        aujourdhui.setHours(0, 0, 0, 0)
        const echeance = new Date(tache.dateEcheance)
        echeance.setHours(0, 0, 0, 0)
        return Math.ceil((echeance - aujourdhui) / (1000 * 60 * 60 * 24))
    }

    const jours = joursRestants()
    const estEnRetard = jours < 0 && tache.statut !== 'termine'
    const estUrgent = jours >= 0 && jours <= 2 && tache.statut !== 'termine'
    const TypeIcon = types[tache.type]?.icon || FileText
    const StatusIcon = statuts[tache.statut]?.icon || Circle

    // Version compact pour les listes urgentes
    if (compact) {
        return (
            <div
                className={`bg-slate-800/50 rounded-lg p-4 flex items-center justify-between gap-4 border border-slate-700/50 ${
                    isDeleting ? 'opacity-50' : ''
                }`}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className="w-1 h-10 rounded-full flex-shrink-0"
                        style={{
                            backgroundColor: getCouleurMatiere(tache.matiereId),
                        }}
                    />
                    <div className="min-w-0">
                        <h4
                            className={`font-medium text-white truncate ${
                                tache.statut === 'termine'
                                    ? 'line-through text-slate-500'
                                    : ''
                            }`}
                        >
                            {tache.titre}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{getNomMatiere(tache.matiereId)}</span>
                            <span>•</span>
                            <span
                                className={
                                    estEnRetard
                                        ? 'text-red-400 font-medium'
                                        : ''
                                }
                            >
                                {jours === 0
                                    ? "Aujourd'hui"
                                    : jours === 1
                                      ? 'Demain'
                                      : jours > 0
                                        ? `${jours}j`
                                        : `${Math.abs(jours)}j retard`}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    className={`px-2 py-1 rounded-md text-xs font-medium ${statuts[tache.statut]?.class}`}
                >
                    {statuts[tache.statut]?.label}
                </div>
            </div>
        )
    }

    return (
        <div
            className={`card overflow-hidden transition-all ${
                isDeleting ? 'opacity-50 scale-95' : 'hover:border-slate-600'
            } ${tache.statut === 'termine' ? 'opacity-75' : ''}`}
        >
            {/* Barre couleur matière */}
            <div
                className="h-1"
                style={{ backgroundColor: getCouleurMatiere(tache.matiereId) }}
            />

            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className="px-2.5 py-1 rounded-md text-xs font-medium text-white"
                            style={{
                                backgroundColor: getCouleurMatiere(
                                    tache.matiereId,
                                ),
                            }}
                        >
                            {getNomMatiere(tache.matiereId)}
                        </span>
                        <span
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${types[tache.type]?.color}`}
                        >
                            <TypeIcon className="w-3 h-3" />
                            {types[tache.type]?.label}
                        </span>
                    </div>

                    {(estEnRetard || estUrgent) && (
                        <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                                estEnRetard
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-orange-500/20 text-orange-400'
                            }`}
                        >
                            <AlertTriangle className="w-3 h-3" />
                            {estEnRetard ? 'Retard' : 'Urgent'}
                        </div>
                    )}
                </div>

                {/* Titre */}
                <h3
                    className={`font-semibold text-white mb-2 line-clamp-2 ${
                        tache.statut === 'termine'
                            ? 'line-through text-slate-500'
                            : ''
                    }`}
                >
                    {tache.titre}
                </h3>

                {/* Description */}
                {tache.description && (
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                        {tache.description}
                    </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 mb-4 text-sm">
                    <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${priorites[tache.priorite]?.class}`}
                    >
                        {priorites[tache.priorite]?.label}
                    </span>
                    <span
                        className={`flex items-center gap-1 ${estEnRetard ? 'text-red-400' : 'text-slate-400'}`}
                    >
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(tache.dateEcheance).toLocaleDateString(
                            'fr-FR',
                            { day: 'numeric', month: 'short' },
                        )}
                    </span>
                    {tache.statut !== 'termine' && (
                        <span
                            className={`flex items-center gap-1 text-xs ${
                                estEnRetard
                                    ? 'text-red-400'
                                    : estUrgent
                                      ? 'text-orange-400'
                                      : 'text-slate-500'
                            }`}
                        >
                            <Clock className="w-3 h-3" />
                            {jours === 0
                                ? "Aujourd'hui"
                                : jours === 1
                                  ? 'Demain'
                                  : jours > 0
                                    ? `${jours}j`
                                    : `${Math.abs(jours)}j retard`}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                    {/* Sélecteur de statut */}
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusMenu(!showStatusMenu)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statuts[tache.statut]?.class}`}
                        >
                            <StatusIcon className="w-4 h-4" />
                            {statuts[tache.statut]?.label}
                            <ChevronDown
                                className={`w-3 h-3 transition-transform ${showStatusMenu ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {showStatusMenu && (
                            <div className="absolute left-0 top-full mt-1 py-1 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-10 min-w-[130px]">
                                {Object.entries(statuts).map(
                                    ([key, { label, icon: Icon }]) => (
                                        <button
                                            key={key}
                                            onClick={() =>
                                                handleStatutChange(key)
                                            }
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 transition-colors ${
                                                tache.statut === key
                                                    ? 'text-blue-400 font-medium'
                                                    : 'text-slate-300'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {label}
                                        </button>
                                    ),
                                )}
                            </div>
                        )}
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => navigate(`/tache/${tache.id}`)}
                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                            title="Modifier"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Supprimer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TacheCard
