import React from 'react'

export default function Table({ columns, data }:{columns:string[], data:any[]}){
  return (
    <table style={{width:'100%',borderCollapse:'collapse'}}>
      <thead>
        <tr>
          {columns.map(c=> <th key={c} style={{textAlign:'left',padding:8,borderBottom:'1px solid #132033'}}>{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row,idx)=> (
          <tr key={idx} style={{borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
            {columns.map((c,i)=> <td key={i} style={{padding:8}}>{String(row[c] ?? '')}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
