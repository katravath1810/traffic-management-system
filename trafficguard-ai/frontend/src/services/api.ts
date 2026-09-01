const ENV_BASE = import.meta.env.VITE_API_BASE
const USE_MOCK = !ENV_BASE || ENV_BASE === '' || ENV_BASE === 'MOCK'
const BASE = USE_MOCK ? null : ENV_BASE

const api = {
  async get(path: string){
    if(USE_MOCK){
      // Mock responses for frontend-only demo
      if(path.startsWith('/vehicles/')){
        const plate = decodeURIComponent(path.split('/').pop() || '')
        return { vehicle: plate, owner: 'Demo Owner', violations: [] }
      }
      if(path === '/health') return { ok:true }
      return {}
    }
    const res = await fetch(BASE+path)
    if(!res.ok) throw new Error('API error')
    return res.json()
  },

  async post(path:string, body: any){
    if(USE_MOCK){
      if(path === '/login'){
        return { vehicle: body.vehicle, name: 'Demo Owner', contact: '9999999999' }
      }
      return { ok:true }
    }

    const res = await fetch(BASE+path, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(body)
    })
    if(!res.ok){
      const txt = await res.text().catch(()=>null)
      throw new Error(txt || 'API error')
    }
    return res.json()
  }
}

export default api
