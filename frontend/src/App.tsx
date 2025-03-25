import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { login } from './redux/slicers/auth.slicer'
import { ListPage } from './pages/list.page'

function App() {

  return (
    <>
        <Routes>
            <Route
              path="/login"
              element={<LoginPage />}    
            />
            <Route path='/lists' element={<ListPage></ListPage>}/>
            <Route
              path="/signup"
              element={<SignupPage />} />
            
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </>
  )
}

export default App
