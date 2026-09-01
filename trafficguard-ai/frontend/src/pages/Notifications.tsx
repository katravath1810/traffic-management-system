import React from 'react'
import Card from '../components/Card'
import Table from '../components/Table'

const sample = [
  { 'Date':'2026-06-01','Reason':'No Helmet','Escalated':'No' },
]

export default function Notifications(){
  return (
    <div>
      <Card>
        <h2>Pre-Violation Notifications</h2>
        <Table columns={[ 'Date','Reason','Escalated' ]} data={sample} />
      </Card>
    </div>
  )
}
