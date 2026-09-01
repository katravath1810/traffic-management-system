import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home({ user }: { user?: any }){
  const nav = useNavigate()
  return (
    <div style={{position:'relative'}}>
      {user && (
        <div className="home-user card">
          Signed in as <strong>{user.name}</strong>
        </div>
      )}

      <section className="card hero">
        <div className="viewfinder">
          <div className="scan-line" aria-hidden="true"></div>
          <h1 className="title">TrafficGuard AI</h1>
          <p className="lead">Camera-assisted detection and vehicle challan management</p>
          <div style={{marginTop:14}}>
            <button className="cta" onClick={()=>nav('/vehicle')}>Check My Vehicle</button>
            <button className="button" style={{marginLeft:10}} onClick={()=>nav('/dashboard')}>Dashboard</button>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="card">
        <h3 style={{marginTop:0}}>How It Works</h3>
        <div className="steps">
          <div className="step">
            <div className="icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
            </div>
            <div>
              <h4>Capture</h4>
              <div style={{color:'var(--text-body)'}}>Camera captures live traffic footage</div>
            </div>
          </div>

          <div className="step">
            <div className="icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a8 8 0 10-14.8 0"/></svg>
            </div>
            <div>
              <h4>Detect</h4>
              <div style={{color:'var(--text-body)'}}>AI identifies violations and reads plates</div>
            </div>
          </div>

          <div className="step">
            <div className="icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
            </div>
            <div>
              <h4>Store</h4>
              <div style={{color:'var(--text-body)'}}>Violation evidence and records saved for review</div>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>Features</h3>
        <ul style={{color:'var(--text-body)'}}>
          <li>Red light & speed violation detection</li>
          <li>Vehicle lookup by registration number</li>
          <li>Notifications, history, and payment tracking</li>
        </ul>
      </section>
    </div>
  )
}
