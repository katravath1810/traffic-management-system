import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }:{ children: React.ReactElement }){
  const loc = useLocation()
  try{
    const raw = localStorage.getItem('tg_user')
    if(!raw) return <Navigate to="/login" state={{ from: loc }} replace />
    const user = JSON.parse(raw)
    if(!user) return <Navigate to="/login" state={{ from: loc }} replace />
  }catch(e){
    return <Navigate to="/login" state={{ from: loc }} replace />
  }
  return children
}
