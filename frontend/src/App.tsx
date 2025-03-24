import { LoginPage } from './pages/login'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { login } from './redux/slicers/auth.slicer'

function App() {

  return (
    <>
        <Routes>
            <Route
              path="/login"
              element={<LoginPage />}    
            /> 
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </>
  )
}

export default App
