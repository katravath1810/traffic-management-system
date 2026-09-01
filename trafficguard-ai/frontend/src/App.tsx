import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VehicleCheck from './pages/VehicleCheck'
import Dashboard from './pages/Dashboard'
import Pending from './pages/Pending'
import Paid from './pages/Paid'
import Notifications from './pages/Notifications'
import VehicleHistory from './pages/VehicleHistory'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'

export default function App(){
  const [user, setUser] = useState<any>(null)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('tg_user')
      if(raw) setUser(JSON.parse(raw))
    }catch(e){/* ignore */}
  },[])

  function handleLogout(){
    setUser(null)
    localStorage.removeItem('tg_user')
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container layout">
        {user && <Sidebar />}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home user={user}/> } />
            <Route path="/login" element={<Login onLogin={(u:any)=>{setUser(u); localStorage.setItem('tg_user',JSON.stringify(u))}}/>} />
            <Route path="/vehicle" element={<ProtectedRoute><VehicleCheck/></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/pending" element={<ProtectedRoute><Pending/></ProtectedRoute>} />
            <Route path="/paid" element={<ProtectedRoute><Paid/></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><VehicleHistory/></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
