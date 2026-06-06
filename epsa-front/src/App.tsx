import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
// import Login from './components/Login'
import Dashboard from './components/Dashboard'


//Protects routes that require authentication.
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <div className="min-h-screen flex items-center justify-center">
              {/* <Login /> */}
               <Dashboard />
            </div>
          } />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <p>Hello</p>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}