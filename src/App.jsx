import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginRegister from './components/LoginRegister/LoginRegister.jsx'
import UserForm from './components/userlist/UserForm.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<LoginRegister/>}/>
       <Route path='/users' element={<UserForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
