import React from 'react'
import Card from '../components/Card'
import Table from '../components/Table'

const sample = [
  { 'Violation':'Red Light', 'Date':'2026-08-20 10:12', 'Amount':'₹1000', 'Due':'2026-09-20' },
]

export default function Pending(){
  return (
    <div>
      <Card>
        <h2>Pending Challans</h2>
        <Table columns={[ 'Violation','Date','Amount','Due' ]} data={sample} />
      </Card>
    </div>
  )
}
