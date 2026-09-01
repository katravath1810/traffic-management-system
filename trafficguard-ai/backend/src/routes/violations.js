const express = require('express')
const router = express.Router()

// mock data
const MOCK = [
  {
    id:'V-1001',
    type:'Red Light Violation',
    vehicle:'WB 01 AB 1234',
    timestamp:'2026-08-20T14:12:00Z',
    location:'Shibpur Junction',
    confidence:96,
    status:'Pending',
    fine:1000,
    evidence_image:'/evidence/V-1001.jpg'
  }
]

router.get('/', (req,res)=>{
  res.json(MOCK)
})

router.get('/:id',(req,res)=>{
  const v = MOCK.find(x=>x.id===req.params.id)
  if(!v) return res.status(404).json({error:'Not found'})
  res.json(v)
})

module.exports = router
