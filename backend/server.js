/**
 * MyStudyPlanner Backend - Serveur Express
 * Projet L3 Informatique
 *
 * Ce serveur expose une API REST pour la gestion des utilisateurs,
 * des matières et des tâches (devoirs, TP, projets).
 */

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5000

// Chemin vers le fichier de données
const DB_PATH = path.join(__dirname, 'data', 'db.json')

// Middleware
app.use(cors())
app.use(express.json())

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Lit les données depuis le fichier JSON
 */
const readData = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Erreur lecture données:', error)
        return { users: [], matieres: [], taches: [] }
    }
}

/**
 * Écrit les données dans le fichier JSON
 */
const writeData = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
        return true
    } catch (error) {
        console.error('Erreur écriture données:', error)
        return false
    }
}

/**
 * Génère un nouvel ID unique
 */
const generateId = (items) => {
    if (items.length === 0) return 1
    return Math.max(...items.map((item) => item.id)) + 1
}

// ============================================
// ROUTES AUTHENTIFICATION
// ============================================

/**
 * POST /api/auth/login
 * Connexion d'un utilisateur
 */
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body
    const data = readData()

    const user = data.users.find(
        (u) => u.username === username && u.password === password,
    )

    if (user) {
        // Ne pas renvoyer le mot de passe
        const { password, ...userSansPassword } = user
        res.json({
            success: true,
            message: 'Connexion réussie',
            user: userSansPassword,
        })
    } else {
        res.status(401).json({
            success: false,
            message: 'Identifiants incorrects',

        })
        console.log(`Échec de connexion pour l'utilisateur: ${username}`)
    }
})

/**
 * POST /api/auth/register
 * Inscription d'un nouvel utilisateur
 */
app.post('/api/auth/register', (req, res) => {
    const { username, password, email, nom, prenom } = req.body
    const data = readData()

    // Vérifier si l'utilisateur existe déjà
    const existingUser = data.users.find(
        (u) => u.username === username || u.email === email,
    )

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Nom d'utilisateur ou email déjà utilisé",
        })
    }

    const newUser = {
        id: generateId(data.users),
        username,
        password,
        email,
        nom,
        prenom,
    }

    data.users.push(newUser)
    writeData(data)

    const { password: pwd, ...userSansPassword } = newUser
    res.status(201).json({
        success: true,
        message: 'Inscription réussie',
        user: userSansPassword,
    })
})

// ============================================
// ROUTES MATIÈRES
// ============================================

/**
 * GET /api/matieres
 * Récupère toutes les matières
 */
app.get('/api/matieres', (req, res) => {
    const data = readData()
    res.json(data.matieres)
})

/**
 * POST /api/matieres
 * Ajoute une nouvelle matière
 */
app.post('/api/matieres', (req, res) => {
    const { nom, couleur } = req.body
    const data = readData()

    const newMatiere = {
        id: generateId(data.matieres),
        nom,
        couleur: couleur || '#3498db',
    }

    data.matieres.push(newMatiere)
    writeData(data)

    res.status(201).json(newMatiere)
})

// ============================================
// ROUTES TÂCHES
// ============================================

/**
 * GET /api/taches
 * Récupère toutes les tâches (avec filtres optionnels)
 */
app.get('/api/taches', (req, res) => {
    const { userId, matiereId, statut, priorite, type } = req.query
    const data = readData()

    let taches = data.taches

    // Application des filtres
    if (userId) {
        taches = taches.filter((t) => t.userId === parseInt(userId))
    }
    if (matiereId) {
        taches = taches.filter((t) => t.matiereId === parseInt(matiereId))
    }
    if (statut) {
        taches = taches.filter((t) => t.statut === statut)
    }
    if (priorite) {
        taches = taches.filter((t) => t.priorite === priorite)
    }
    if (type) {
        taches = taches.filter((t) => t.type === type)
    }

    res.json(taches)
})

/**
 * GET /api/taches/:id
 * Récupère une tâche par son ID
 */
app.get('/api/taches/:id', (req, res) => {
    const data = readData()
    const tache = data.taches.find((t) => t.id === parseInt(req.params.id))

    if (tache) {
        res.json(tache)
    } else {
        res.status(404).json({ message: 'Tâche non trouvée' })
    }
})

/**
 * POST /api/taches
 * Crée une nouvelle tâche
 */
app.post('/api/taches', (req, res) => {
    const {
        titre,
        description,
        type,
        matiereId,
        userId,
        priorite,
        dateEcheance,
    } = req.body
    const data = readData()

    const newTache = {
        id: generateId(data.taches),
        titre,
        description: description || '',
        type: type || 'devoir',
        matiereId: parseInt(matiereId),
        userId: parseInt(userId),
        priorite: priorite || 'moyenne',
        statut: 'a_faire',
        dateEcheance,
        dateCreation: new Date().toISOString().split('T')[0],
    }

    data.taches.push(newTache)
    writeData(data)

    res.status(201).json(newTache)
})

/**
 * PUT /api/taches/:id
 * Met à jour une tâche existante
 */
app.put('/api/taches/:id', (req, res) => {
    const data = readData()
    const index = data.taches.findIndex((t) => t.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).json({ message: 'Tâche non trouvée' })
    }

    // Mise à jour des champs fournis
    data.taches[index] = {
        ...data.taches[index],
        ...req.body,
        id: data.taches[index].id, // Préserver l'ID original
    }

    writeData(data)
    res.json(data.taches[index])
})

/**
 * PATCH /api/taches/:id/statut
 * Change le statut d'une tâche
 */
app.patch('/api/taches/:id/statut', (req, res) => {
    const { statut } = req.body
    const data = readData()
    const index = data.taches.findIndex((t) => t.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).json({ message: 'Tâche non trouvée' })
    }

    const statutsValides = ['a_faire', 'en_cours', 'termine']
    if (!statutsValides.includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' })
    }

    data.taches[index].statut = statut
    writeData(data)

    res.json(data.taches[index])
})

/**
 * DELETE /api/taches/:id
 * Supprime une tâche
 */
app.delete('/api/taches/:id', (req, res) => {
    const data = readData()
    const index = data.taches.findIndex((t) => t.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).json({ message: 'Tâche non trouvée' })
    }

    data.taches.splice(index, 1)
    writeData(data)

    res.json({ message: 'Tâche supprimée avec succès' })
})

// ============================================
// ROUTES STATISTIQUES (Dashboard)
// ============================================

/**
 * GET /api/stats/:userId
 * Récupère les statistiques pour le tableau de bord
 */
app.get('/api/stats/:userId', (req, res) => {
    const data = readData()
    const userId = parseInt(req.params.userId)
    const tachesUser = data.taches.filter((t) => t.userId === userId)

    const stats = {
        total: tachesUser.length,
        aFaire: tachesUser.filter((t) => t.statut === 'a_faire').length,
        enCours: tachesUser.filter((t) => t.statut === 'en_cours').length,
        terminees: tachesUser.filter((t) => t.statut === 'termine').length,
        parMatiere: {},
        parType: {
            devoir: tachesUser.filter((t) => t.type === 'devoir').length,
            tp: tachesUser.filter((t) => t.type === 'tp').length,
            projet: tachesUser.filter((t) => t.type === 'projet').length,
        },
        parPriorite: {
            haute: tachesUser.filter((t) => t.priorite === 'haute').length,
            moyenne: tachesUser.filter((t) => t.priorite === 'moyenne').length,
            basse: tachesUser.filter((t) => t.priorite === 'basse').length,
        },
        prochaines: tachesUser
            .filter((t) => t.statut !== 'termine')
            .sort((a, b) => new Date(a.dateEcheance) - new Date(b.dateEcheance))
            .slice(0, 5),
    }

    // Calcul par matière
    data.matieres.forEach((m) => {
        stats.parMatiere[m.nom] = tachesUser.filter(
            (t) => t.matiereId === m.id,
        ).length
    })

    res.json(stats)
})

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════════╗
  ║     MyStudyPlanner Backend - API REST      ║
  ║────────────────────────────────────────────║
  ║  Serveur démarré sur: http://localhost:${PORT} ║
  ║                                            ║
  ║  Routes disponibles:                       ║
  ║  - POST /api/auth/login                    ║
  ║  - POST /api/auth/register                 ║
  ║  - GET  /api/matieres                      ║
  ║  - POST /api/matieres                      ║
  ║  - GET  /api/taches                        ║
  ║  - POST /api/taches                        ║
  ║  - PUT  /api/taches/:id                    ║
  ║  - PATCH /api/taches/:id/statut            ║
  ║  - DELETE /api/taches/:id                  ║
  ║  - GET  /api/stats/:userId                 ║
  ╚════════════════════════════════════════════╝
  `)
})
