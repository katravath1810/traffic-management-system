import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(){
  return (
    <aside className="sidebar card">
      <nav style={{display:'flex',flexDirection:'column',gap:8}}>
        <Link to="/history">Vehicle History</Link>
        <Link to="/pending">Pending Challans</Link>
        <Link to="/paid">Paid Challans</Link>
        <Link to="/notifications">Pre-Violation Notifications</Link>
      </nav>
    </aside>
  )
}
