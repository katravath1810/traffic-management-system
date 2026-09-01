const express = require('express')
const router = express.Router()

const MOCK_VEHICLES = {
  'WB 01 AB 1234':{
    number:'WB 01 AB 1234',
    type:'Car',
    model:'Toyota Corolla',
    owner:'Amit Roy',
    total_violations:2,
    pending_fines:1500,
    safety_score:82
  }
}

router.get('/:plate',(req,res)=>{
  const plate = req.params.plate
  const v = MOCK_VEHICLES[plate]
  if(!v) return res.status(404).json({error:'Vehicle not found'})
  res.json(v)
})

module.exports = router
