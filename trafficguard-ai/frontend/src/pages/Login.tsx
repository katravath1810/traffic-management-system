import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login({ onLogin }: { onLogin: (user:any)=>void }){
  const nav = useNavigate()
  const [vehicle, setVehicle] = useState('')
  const [a] = useState(() => Math.floor(Math.random()*10)+1)
  const [b] = useState(() => Math.floor(Math.random()*10)+1)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const vehicleRegex = /^[A-Z]{2}-?\d{1,2}-?[A-Z]{1,2}-?\d{1,4}$/i

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError('')
    if(!vehicle) return setError('Please enter your vehicle registration number')
    if(!vehicleRegex.test(vehicle)) return setError('Invalid vehicle format (e.g. WB-06-AB-1234)')
    if((parseInt(answer||'0')) !== (a+b)) return setError('Captcha incorrect')

    try{
      setLoading(true)
      const res = await api.post('/login', { vehicle })
      onLogin(res)
      nav('/dashboard')
    }catch(err:any){
      setError(err.message || 'Login failed')
    }finally{setLoading(false)}
  }

  return (
    <div style={{maxWidth:480,margin:'0 auto'}}>
      <section className="card">
        <h2>Login by Vehicle Number</h2>
        <form onSubmit={submit}>
          <div style={{marginBottom:8}}>
            <input placeholder="WB-06-AB-1234" value={vehicle} onChange={e=>setVehicle(e.target.value)} />
          </div>

          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
            <div style={{padding:8,background:'#071027',borderRadius:6}}>What is <strong>{a}</strong> + <strong>{b}</strong> ?</div>
            <input placeholder="Answer" value={answer} onChange={e=>setAnswer(e.target.value)} style={{width:100}} />
          </div>

          {error && <div style={{color:'#ffb4b4',marginBottom:8}}>{error}</div>}

          <div>
            <button className="button" type="submit" disabled={loading}>{loading? 'Signing in...':'Login'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
