/**
 * TachesContext - Contexte de gestion des tâches
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import * as api from '../services/api'
import { useAuth } from './AuthContext'

const TachesContext = createContext(null)

export const TachesProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth()
    const [taches, setTaches] = useState([])
    const [matieres, setMatieres] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [filtres, setFiltres] = useState({
        matiere: '',
        statut: '',
        priorite: '',
        type: '',
    })

    const chargerTaches = useCallback(async () => {
        if (!user) return

        setLoading(true)
        try {
            const data = await api.getTaches(user.id, filtres)
            setTaches(data)
            setError(null)
        } catch (err) {
            setError('Erreur lors du chargement des tâches')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [user, filtres])

    const chargerMatieres = useCallback(async () => {
        try {
            const data = await api.getMatieres()
            setMatieres(data)
        } catch (err) {
            console.error('Erreur chargement matières:', err)
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            chargerMatieres()
            chargerTaches()
        }
    }, [isAuthenticated, chargerMatieres, chargerTaches])

    const ajouterTache = async (tacheData) => {
        setLoading(true)
        try {
            const nouvelleTache = await api.createTache({
                ...tacheData,
                userId: user.id,
            })
            setTaches((prev) => [...prev, nouvelleTache])
            setError(null)
            return { success: true, tache: nouvelleTache }
        } catch (err) {
            setError("Erreur lors de l'ajout de la tâche")
            return { success: false, message: err.message }
        } finally {
            setLoading(false)
        }
    }

    const modifierTache = async (id, tacheData) => {
        setLoading(true)
        try {
            const tacheModifiee = await api.updateTache(id, tacheData)
            setTaches((prev) =>
                prev.map((t) => (t.id === id ? tacheModifiee : t)),
            )
            setError(null)
            return { success: true, tache: tacheModifiee }
        } catch (err) {
            setError('Erreur lors de la modification de la tâche')
            return { success: false, message: err.message }
        } finally {
            setLoading(false)
        }
    }

    const changerStatut = async (id, nouveauStatut) => {
        try {
            const tacheModifiee = await api.updateStatutTache(id, nouveauStatut)
            setTaches((prev) =>
                prev.map((t) => (t.id === id ? tacheModifiee : t)),
            )
            return { success: true }
        } catch (err) {
            setError('Erreur lors du changement de statut')
            return { success: false }
        }
    }

    const supprimerTache = async (id) => {
        try {
            await api.deleteTache(id)
            setTaches((prev) => prev.filter((t) => t.id !== id))
            return { success: true }
        } catch (err) {
            setError('Erreur lors de la suppression de la tâche')
            return { success: false }
        }
    }

    const appliquerFiltres = (nouveauxFiltres) => {
        setFiltres((prev) => ({ ...prev, ...nouveauxFiltres }))
    }

    const reinitialiserFiltres = () => {
        setFiltres({
            matiere: '',
            statut: '',
            priorite: '',
            type: '',
        })
    }

    const getTacheById = (id) => {
        return taches.find((t) => t.id === parseInt(id))
    }

    const getNomMatiere = (matiereId) => {
        const matiere = matieres.find((m) => m.id === parseInt(matiereId))
        return matiere ? matiere.nom : 'Non définie'
    }

    const getCouleurMatiere = (matiereId) => {
        const matiere = matieres.find((m) => m.id === parseInt(matiereId))
        return matiere ? matiere.couleur : '#6b7280'
    }

    // Calcul des statistiques
    const stats = {
        total: taches.length,
        terminees: taches.filter((t) => t.statut === 'Terminé').length,
        enCours: taches.filter((t) => t.statut === 'En cours').length,
        aFaire: taches.filter((t) => t.statut === 'À faire').length,
        enRetard: taches.filter((t) => {
            if (t.statut === 'Terminé') return false
            const deadline = new Date(t.deadline)
            return deadline < new Date()
        }).length,
    }

    // Fonction pour filtrer les tâches avec des filtres personnalisés
    const getTachesFiltrees = (customFiltres = {}) => {
        return taches.filter((tache) => {
            if (
                customFiltres.matiere &&
                tache.matiereId !== parseInt(customFiltres.matiere)
            )
                return false
            if (customFiltres.statut && tache.statut !== customFiltres.statut)
                return false
            if (
                customFiltres.priorite &&
                tache.priorite !== customFiltres.priorite
            )
                return false
            if (customFiltres.recherche) {
                const search = customFiltres.recherche.toLowerCase()
                return (
                    tache.titre?.toLowerCase().includes(search) ||
                    tache.description?.toLowerCase().includes(search)
                )
            }
            return true
        })
    }

    const tachesFiltrees = taches.filter((tache) => {
        if (filtres.matiere && tache.matiereId !== parseInt(filtres.matiere))
            return false
        if (filtres.statut && tache.statut !== filtres.statut) return false
        if (filtres.priorite && tache.priorite !== filtres.priorite)
            return false
        if (filtres.type && tache.type !== filtres.type) return false
        return true
    })

    const value = {
        taches: tachesFiltrees,
        toutesLesTaches: taches,
        matieres,
        loading,
        error,
        filtres,
        stats,
        ajouterTache,
        modifierTache,
        changerStatut,
        supprimerTache,
        appliquerFiltres,
        reinitialiserFiltres,
        chargerTaches,
        getTacheById,
        getTachesFiltrees,
        getNomMatiere,
        getCouleurMatiere,
        // Aliases pour compatibilité
        addTache: ajouterTache,
        updateTache: modifierTache,
        deleteTache: supprimerTache,
    }

    return (
        <TachesContext.Provider value={value}>
            {children}
        </TachesContext.Provider>
    )
}

export const useTaches = () => {
    const context = useContext(TachesContext)
    if (!context) {
        throw new Error('useTaches doit être utilisé dans un TachesProvider')
    }
    return context
}

export default TachesContext
