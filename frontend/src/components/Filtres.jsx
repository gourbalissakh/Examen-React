/**
 * Filtres - Composant de filtrage dark blue theme
 */

import { useTaches } from '../context/TachesContext'

const Filtres = ({ filtres, onFiltreChange, vertical = false }) => {
    const { matieres } = useTaches()

    const handleChange = (e) => {
        const { name, value } = e.target
        onFiltreChange({ [name]: value })
    }

    const selectClass = (isActive) =>
        `w-full px-3 py-2 bg-slate-800 border rounded-lg text-sm transition-all cursor-pointer text-slate-200 ${
            isActive
                ? 'border-blue-500 ring-1 ring-blue-500/20'
                : 'border-slate-700 hover:border-slate-600'
        }`

    return (
        <div
            className={
                vertical ? 'space-y-4' : 'grid grid-cols-2 sm:grid-cols-4 gap-3'
            }
        >
            {/* Matière */}
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Matière
                </label>
                <select
                    name="matiere"
                    value={filtres?.matiere || ''}
                    onChange={handleChange}
                    className={selectClass(filtres?.matiere)}
                >
                    <option value="">Toutes</option>
                    {matieres.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.nom}
                        </option>
                    ))}
                </select>
            </div>

            {/* Statut */}
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Statut
                </label>
                <select
                    name="statut"
                    value={filtres?.statut || ''}
                    onChange={handleChange}
                    className={selectClass(filtres?.statut)}
                >
                    <option value="">Tous</option>
                    <option value="a_faire">À faire</option>
                    <option value="en_cours">En cours</option>
                    <option value="termine">Terminé</option>
                </select>
            </div>

            {/* Priorité */}
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Priorité
                </label>
                <select
                    name="priorite"
                    value={filtres?.priorite || ''}
                    onChange={handleChange}
                    className={selectClass(filtres?.priorite)}
                >
                    <option value="">Toutes</option>
                    <option value="haute">Haute</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="basse">Basse</option>
                </select>
            </div>

            {/* Type */}
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Type
                </label>
                <select
                    name="type"
                    value={filtres?.type || ''}
                    onChange={handleChange}
                    className={selectClass(filtres?.type)}
                >
                    <option value="">Tous</option>
                    <option value="devoir">Devoir</option>
                    <option value="tp">TP</option>
                    <option value="projet">Projet</option>
                </select>
            </div>
        </div>
    )
}

export default Filtres
