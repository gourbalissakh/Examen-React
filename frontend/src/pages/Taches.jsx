/**
 * Taches - Page de liste des tâches dark blue theme
 */

import {
    BookOpen,
    Filter,
    LayoutGrid,
    List,
    Plus,
    Search,
    SlidersHorizontal,
    X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Filtres from '../components/Filtres'
import TacheCard from '../components/TacheCard'
import { useTaches } from '../context/TachesContext'

const Taches = () => {
    const { getTachesFiltrees, loading } = useTaches()
    const [filtres, setFiltres] = useState({
        matiere: '',
        statut: '',
        priorite: '',
        recherche: '',
    })
    const [viewMode, setViewMode] = useState('grid')
    const [showFiltres, setShowFiltres] = useState(false)

    const tachesFiltrees = getTachesFiltrees(filtres)

    const handleFiltreChange = (newFiltres) => {
        setFiltres((prev) => ({ ...prev, ...newFiltres }))
    }

    const handleSearchChange = (e) => {
        setFiltres((prev) => ({ ...prev, recherche: e.target.value }))
    }

    const clearFiltres = () => {
        setFiltres({ matiere: '', statut: '', priorite: '', recherche: '' })
    }

    const hasActiveFiltres =
        filtres.matiere ||
        filtres.statut ||
        filtres.priorite ||
        filtres.recherche

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
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Mes tâches
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {tachesFiltrees.length} tâche
                        {tachesFiltrees.length !== 1 ? 's' : ''}
                        {hasActiveFiltres ? ' (filtrées)' : ''}
                    </p>
                </div>
                <Link to="/nouvelle-tache" className="btn-primary">
                    <Plus className="w-5 h-5" />
                    Nouvelle tâche
                </Link>
            </div>

            {/* Search & Controls */}
            <div className="card p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            value={filtres.recherche}
                            onChange={handleSearchChange}
                            placeholder="Rechercher..."
                            className="input-dark pl-10"
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFiltres(!showFiltres)}
                            className={`md:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                                showFiltres
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filtres
                            {hasActiveFiltres && (
                                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            )}
                        </button>

                        {/* View mode */}
                        <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${
                                    viewMode === 'grid'
                                        ? 'bg-blue-500 shadow-sm text-white'
                                        : 'text-slate-400'
                                }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${
                                    viewMode === 'list'
                                        ? 'bg-blue-500 shadow-sm text-white'
                                        : 'text-slate-400'
                                }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                        {hasActiveFiltres && (
                            <button
                                onClick={clearFiltres}
                                className="flex items-center gap-1 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                            >
                                <X className="w-4 h-4" />
                                Effacer
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile filters */}
                <div
                    className={`md:hidden overflow-hidden transition-all ${showFiltres ? 'max-h-96 mt-4' : 'max-h-0'}`}
                >
                    <Filtres
                        filtres={filtres}
                        onFiltreChange={handleFiltreChange}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-5">
                {/* Desktop sidebar */}
                <div className="hidden md:block w-56 flex-shrink-0">
                    <div className="card p-4 sticky top-20">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-4 h-4 text-blue-400" />
                            <h3 className="font-semibold text-white text-sm">
                                Filtres
                            </h3>
                        </div>
                        <Filtres
                            filtres={filtres}
                            onFiltreChange={handleFiltreChange}
                            vertical
                        />
                    </div>
                </div>

                {/* Tasks list */}
                <div className="flex-1">
                    {tachesFiltrees.length > 0 ? (
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 lg:grid-cols-2 gap-4'
                                    : 'space-y-3'
                            }
                        >
                            {tachesFiltrees.map((tache) => (
                                <TacheCard
                                    key={tache.id}
                                    tache={tache}
                                    compact={viewMode === 'list'}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="card p-12 text-center">
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-500" />
                            </div>
                            {hasActiveFiltres ? (
                                <>
                                    <h3 className="font-semibold text-white mb-2">
                                        Aucune tâche trouvée
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Essayez de modifier vos filtres
                                    </p>
                                    <button
                                        onClick={clearFiltres}
                                        className="text-blue-400 hover:underline text-sm"
                                    >
                                        Effacer les filtres
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-semibold text-white mb-2">
                                        Aucune tâche
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6">
                                        Créez votre première tâche
                                    </p>
                                    <Link
                                        to="/nouvelle-tache"
                                        className="btn-primary"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Créer une tâche
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Taches
