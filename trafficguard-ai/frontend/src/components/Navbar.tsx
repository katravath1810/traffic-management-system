import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ user, onLogout }: { user?: any, onLogout?: ()=>void }){
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <Link to="/" style={{textDecoration:'none'}}>
          <div style={{fontFamily:'Space Grotesk, Inter, sans-serif',color:'var(--text-head)',fontSize:18,letterSpacing:1}}>TrafficGuard AI</div>
        </Link>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
      </nav>

      <div style={{position:'relative'}}>
        {user ? (
          <div className="user">
            <button className="button" onClick={()=>setOpen(o=>!o)}>{user.name}</button>
            {open && (
              <div className="user-menu card">
                <div style={{marginBottom:8}}>Signed in as <strong>{user.name}</strong></div>
                <div style={{display:'flex',gap:8}}>
                  <Link to="/dashboard" onClick={()=>setOpen(false)}>Dashboard</Link>
                  <button className="button" onClick={()=>{ setOpen(false); onLogout && onLogout() }}>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="cta">Login</Link>
        )}
      </div>
    </header>
  )
}
