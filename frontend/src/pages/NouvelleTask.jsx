/**
 * NouvelleTask - Page de création/édition de tâche dark blue theme
 */

import {
    AlertCircle,
    ArrowLeft,
    BookOpen,
    Calendar,
    CheckCircle2,
    FileText,
    Flag,
    Lightbulb,
    Save,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTaches } from '../context/TachesContext'

const NouvelleTask = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { taches, matieres, addTache, updateTache } = useTaches()

    const isEdit = Boolean(id)

    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        matiereId: '',
        deadline: '',
        priorite: 'Moyenne',
        statut: 'À faire',
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isEdit && id) {
            const tache = taches.find((t) => t.id === parseInt(id))
            if (tache) {
                setFormData({
                    titre: tache.titre || '',
                    description: tache.description || '',
                    matiereId: tache.matiereId || '',
                    deadline: tache.deadline || '',
                    priorite: tache.priorite || 'Moyenne',
                    statut: tache.statut || 'À faire',
                })
            } else {
                setError('Tâche non trouvée')
            }
        }
    }, [id, isEdit, taches])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const validateForm = () => {
        if (!formData.titre.trim()) {
            setError('Le titre est obligatoire')
            return false
        }
        if (!formData.matiereId) {
            setError('Veuillez sélectionner une matière')
            return false
        }
        if (!formData.deadline) {
            setError('La date limite est obligatoire')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            if (isEdit) {
                await updateTache(parseInt(id), formData)
                setSuccess('Tâche mise à jour !')
            } else {
                await addTache(formData)
                setSuccess('Tâche créée !')
            }
            setTimeout(() => navigate('/taches'), 1200)
        } catch (err) {
            setError('Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    const priorites = [
        {
            value: 'Basse',
            color: 'text-slate-400',
            bg: 'bg-slate-500/20',
            ring: 'ring-slate-500/30',
        },
        {
            value: 'Moyenne',
            color: 'text-orange-400',
            bg: 'bg-orange-500/20',
            ring: 'ring-orange-500/30',
        },
        {
            value: 'Haute',
            color: 'text-red-400',
            bg: 'bg-red-500/20',
            ring: 'ring-red-500/30',
        },
    ]

    const statuts = [
        {
            value: 'À faire',
            color: 'text-slate-400',
            bg: 'bg-slate-500/20',
            ring: 'ring-slate-500/30',
        },
        {
            value: 'En cours',
            color: 'text-orange-400',
            bg: 'bg-orange-500/20',
            ring: 'ring-orange-500/30',
        },
        {
            value: 'Terminé',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/20',
            ring: 'ring-emerald-500/30',
        },
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    to="/taches"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-white">
                        {isEdit ? 'Modifier la tâche' : 'Nouvelle tâche'}
                    </h1>
                    <p className="text-slate-400 text-sm">
                        {isEdit
                            ? 'Mettez à jour les informations'
                            : 'Remplissez le formulaire'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="card p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Messages */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            <p>{success}</p>
                        </div>
                    )}

                    {/* Titre */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
                            <FileText className="w-4 h-4" />
                            Titre
                        </label>
                        <input
                            type="text"
                            name="titre"
                            value={formData.titre}
                            onChange={handleChange}
                            placeholder="Ex: TP de programmation Java"
                            disabled={loading}
                            className="input-dark"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description détaillée (optionnel)"
                            rows={3}
                            disabled={loading}
                            className="input-dark resize-none"
                        />
                    </div>

                    {/* Matière et Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
                                <BookOpen className="w-4 h-4" />
                                Matière
                            </label>
                            <select
                                name="matiereId"
                                value={formData.matiereId}
                                onChange={handleChange}
                                disabled={loading}
                                className="input-dark"
                            >
                                <option value="">Sélectionner</option>
                                {matieres.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
                                <Calendar className="w-4 h-4" />
                                Date limite
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                disabled={loading}
                                min={new Date().toISOString().split('T')[0]}
                                className="input-dark"
                            />
                        </div>
                    </div>

                    {/* Priorité */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <Flag className="w-4 h-4" />
                            Priorité
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {priorites.map((p) => (
                                <button
                                    key={p.value}
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            priorite: p.value,
                                        }))
                                    }
                                    disabled={loading}
                                    className={`p-2.5 rounded-lg border text-sm font-medium transition-all ${
                                        formData.priorite === p.value
                                            ? `${p.bg} ${p.color} border-current ring-1 ${p.ring}`
                                            : 'border-slate-700 text-slate-400 hover:border-slate-600'
                                    }`}
                                >
                                    {p.value}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Statut (edit mode only) */}
                    {isEdit && (
                        <div>
                            <label className="text-sm font-medium text-slate-300 mb-2 block">
                                Statut
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {statuts.map((s) => (
                                    <button
                                        key={s.value}
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                statut: s.value,
                                            }))
                                        }
                                        disabled={loading}
                                        className={`p-2.5 rounded-lg border text-sm font-medium transition-all ${
                                            formData.statut === s.value
                                                ? `${s.bg} ${s.color} border-current ring-1 ${s.ring}`
                                                : 'border-slate-700 text-slate-400 hover:border-slate-600'
                                        }`}
                                    >
                                        {s.value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 btn-primary py-3"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {isEdit ? 'Mise à jour...' : 'Création...'}
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    {isEdit ? 'Mettre à jour' : 'Créer'}
                                </>
                            )}
                        </button>
                        <Link to="/taches" className="btn-secondary py-3">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>

            {/* Tips */}
            <div className="card p-5">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-cyan-400" />
                    Conseils
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                    {[
                        'Titres clairs et descriptifs',
                        'Deadlines réalistes',
                        "Priorisez selon l'importance",
                    ].map((tip, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NouvelleTask
