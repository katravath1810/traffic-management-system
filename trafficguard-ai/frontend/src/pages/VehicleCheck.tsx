import React, { useState } from 'react'
import api from '../services/api'

export default function VehicleCheck(){
  const [plate, setPlate] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function check(){
    setLoading(true)
    try{
      const res = await api.get(`/vehicles/${encodeURIComponent(plate)}`)
      setResult(res)
    }catch(e){
      setResult({error:'Not found'})
    }finally{setLoading(false)}
  }

  return (
    <div>
      <section className="card">
        <h2>Check My Vehicle</h2>
        <input placeholder="WB 01 AB 1234" value={plate} onChange={e=>setPlate(e.target.value)} />
        <button className="button" onClick={check} style={{marginLeft:8}}>Search</button>
      </section>

      {loading && <div className="card">Loading...</div>}

      {result && (
        <div className="card">
          <h3>Vehicle Info</h3>
          <pre>{JSON.stringify(result,null,2)}</pre>
        </div>
      )}
    </div>
  )
}
