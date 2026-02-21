/**
 * MyStudyPlanner - Application principale
 * Point d'entrée de l'application avec routage et contextes
 */

import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { TachesProvider } from './context/TachesContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NouvelleTask from './pages/NouvelleTask'
import Register from './pages/Register'
import Taches from './pages/Taches'
import './styles/index.css'

// Layout pour les pages authentifiées avec Navbar
const AuthenticatedLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <main className="container mx-auto px-4 py-6 md:py-8">
                {children}
            </main>
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <TachesProvider>
                <Router>
                    <Routes>
                        {/* Routes publiques */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Routes protégées avec layout */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <AuthenticatedLayout>
                                        <Dashboard />
                                    </AuthenticatedLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/taches"
                            element={
                                <ProtectedRoute>
                                    <AuthenticatedLayout>
                                        <Taches />
                                    </AuthenticatedLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nouvelle-tache"
                            element={
                                <ProtectedRoute>
                                    <AuthenticatedLayout>
                                        <NouvelleTask />
                                    </AuthenticatedLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tache/:id"
                            element={
                                <ProtectedRoute>
                                    <AuthenticatedLayout>
                                        <NouvelleTask />
                                    </AuthenticatedLayout>
                                </ProtectedRoute>
                            }
                        />

                        {/* Redirection par défaut */}
                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" replace />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/dashboard" replace />}
                        />
                    </Routes>
                </Router>
            </TachesProvider>
        </AuthProvider>
    )
}

export default App
