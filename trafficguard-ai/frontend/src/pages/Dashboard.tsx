import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const stats = {
    paid: 12,
    pending: 3,
    notifications: 5
  }

  return (
    <div>
      <section className="card">
        <h2>Dashboard</h2>
        <div style={{display:'flex',gap:12,marginTop:12}}>
          <Link to="/paid" className="card" style={{flex:1,textDecoration:'none',color:'inherit'}}>
            <div style={{fontSize:18,fontWeight:700,color:'var(--text-head)'}}>Paid Challans</div>
            <div style={{marginTop:8,fontSize:24,color:'var(--success)'}}>{stats.paid}</div>
          </Link>

          <Link to="/pending" className="card" style={{flex:1,textDecoration:'none',color:'inherit'}}>
            <div style={{fontSize:18,fontWeight:700,color:'var(--text-head)'}}>Pending Challans</div>
            <div style={{marginTop:8,fontSize:24,color:'var(--danger)'}}>{stats.pending}</div>
          </Link>

          <Link to="/notifications" className="card" style={{flex:1,textDecoration:'none',color:'inherit'}}>
            <div style={{fontSize:18,fontWeight:700,color:'var(--text-head)'}}>Pre-Notifications Sent</div>
            <div style={{marginTop:8,fontSize:24,color:'var(--accent)'}}>{stats.notifications}</div>
          </Link>
        </div>
      </section>

      <section className="card">
        <h3>Recent Violations</h3>
        <ul>
          <li>WB 01 AB 1234 — Red Light — Aug 20, 2026 — Pending — ₹1000</li>
          <li>WB 02 XY 9999 — Overspeed — Jul 10, 2026 — Resolved — ₹500</li>
        </ul>
      </section>
    </div>
  )
}
