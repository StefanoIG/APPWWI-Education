import React from 'react'
import './index.css'

import MateriasPage from './pages/admin/MateriasPage'
import AdminPanel from './pages/admin/admin'
import Login from './pages/login'
import DocentesPage from './pages/admin/DocentesPage'
import Navbar from './components/navbar'
import Register from './pages/register'
import Dashboard from './pages/admin/admin'
import AsignacionesPage from './pages/admin/AsignacionesPage'
import EstudiantesPage from './pages/admin/EstudiantePage'
import PeriodosPage from './pages/admin/PeriodosPage'

function App() {


  return (
    <>
      {/* <Navbar /> */}
      <PeriodosPage/>
    </>
  )
}

export default App
