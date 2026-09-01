import React from 'react'
import Card from '../components/Card'
import Table from '../components/Table'

const sample = [
  { 'Violation':'Overspeed', 'Issued':'2026-07-10', 'Paid':'2026-07-12', 'Amount':'₹500' },
]

export default function Paid(){
  return (
    <div>
      <Card>
        <h2>Paid Challans</h2>
        <Table columns={[ 'Violation','Issued','Paid','Amount' ]} data={sample} />
      </Card>
    </div>
  )
}
