import React from 'react'
import Card from '../components/Card'

export default function VehicleHistory(){
  const history = [ {owner:'Alice',date:'2020-05-01'}, {owner:'Bob',date:'2023-02-15'} ]
  const vehicle = { regDate:'2019-12-01', make:'Honda', model:'Activa', rcStatus:'Valid', insurance:'2027-01-01', puc:'2026-11-01' }
  return (
    <div>
      <Card>
        <h2>Vehicle Details</h2>
        <div>Registered: {vehicle.regDate}</div>
        <div>Make: {vehicle.make} {vehicle.model}</div>
        <div>RC: {vehicle.rcStatus}</div>
        <div>Insurance valid until: {vehicle.insurance}</div>
        <div>PUC valid until: {vehicle.puc}</div>
      </Card>

      <Card>
        <h3>Previous Owners</h3>
        <ul>
          {history.map((h,idx)=>(<li key={idx}>{h.owner} — transferred on {h.date}</li>))}
        </ul>
      </Card>
    </div>
  )
}
