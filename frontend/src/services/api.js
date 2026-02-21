/**
 * API Service - Communication avec le backend
 *
 * Ce module centralise tous les appels API vers le serveur Express.
 * Utilise fetch pour les requêtes HTTP.
 */

const API_URL = 'http://localhost:5000/api'

/**
 * Fonction utilitaire pour les appels API
 */
const fetchApi = async (endpoint, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
    })

    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: 'Erreur serveur' }))
        throw new Error(error.message || 'Une erreur est survenue')
    }

    return response.json()
}

// ============================================
// AUTHENTIFICATION
// ============================================

/**
 * Connexion utilisateur
 */
export const login = async (username, password) => {
    try {
        return await fetchApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        })
    } catch (error) {
        return { success: false, message: error.message }
    }
}

/**
 * Inscription utilisateur
 */
export const register = async (userData) => {
    try {
        return await fetchApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        })
    } catch (error) {
        return { success: false, message: error.message }
    }
}

// ============================================
// MATIÈRES
// ============================================

/**
 * Récupère toutes les matières
 */
export const getMatieres = async () => {
    return fetchApi('/matieres')
}

/**
 * Ajoute une nouvelle matière
 */
export const createMatiere = async (matiereData) => {
    return fetchApi('/matieres', {
        method: 'POST',
        body: JSON.stringify(matiereData),
    })
}

// ============================================
// TÂCHES
// ============================================

/**
 * Récupère les tâches avec filtres optionnels
 */
export const getTaches = async (userId, filtres = {}) => {
    const params = new URLSearchParams()

    if (userId) params.append('userId', userId)
    if (filtres.matiereId) params.append('matiereId', filtres.matiereId)
    if (filtres.statut) params.append('statut', filtres.statut)
    if (filtres.priorite) params.append('priorite', filtres.priorite)
    if (filtres.type) params.append('type', filtres.type)

    const queryString = params.toString()
    return fetchApi(`/taches${queryString ? '?' + queryString : ''}`)
}

/**
 * Récupère une tâche par son ID
 */
export const getTacheById = async (id) => {
    return fetchApi(`/taches/${id}`)
}

/**
 * Crée une nouvelle tâche
 */
export const createTache = async (tacheData) => {
    return fetchApi('/taches', {
        method: 'POST',
        body: JSON.stringify(tacheData),
    })
}

/**
 * Met à jour une tâche
 */
export const updateTache = async (id, tacheData) => {
    return fetchApi(`/taches/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tacheData),
    })
}

/**
 * Change le statut d'une tâche
 */
export const updateStatutTache = async (id, statut) => {
    return fetchApi(`/taches/${id}/statut`, {
        method: 'PATCH',
        body: JSON.stringify({ statut }),
    })
}

/**
 * Supprime une tâche
 */
export const deleteTache = async (id) => {
    return fetchApi(`/taches/${id}`, {
        method: 'DELETE',
    })
}

// ============================================
// STATISTIQUES
// ============================================

/**
 * Récupère les statistiques du tableau de bord
 */
export const getStats = async (userId) => {
    return fetchApi(`/stats/${userId}`)
}
