'use client';
import {useEffect,useRef,useState} from 'react';
export default function Timer(){
  const FOCUS = 25*60;
  const SHORT = 5*60;
  const LONG = 15*60;
  const [seconds,setSeconds]=useState(FOCUS);
  const [running,setRunning]=useState(false);
  const [mode,setMode]=useState('focus');
  const [cycles,setCycles]=useState(0);
  const [penalties,setPenalties]=useState(0);
  const timerRef=useRef(null);

  useEffect(()=>{ if(running){ timerRef.current = setInterval(()=>{ setSeconds(s => { if(s<=1){ clearInterval(timerRef.current); onFinish(); return 0;} return s-1; }); },1000); } else clearInterval(timerRef.current); return ()=>clearInterval(timerRef.current); },[running]);

  useEffect(()=>{ function onVis(){ if(document.hidden && running){ setPenalties(p=>p+1); setRunning(false); alert('Focus interrupted — session paused.'); }} function onBlur(){ if(running){ setPenalties(p=>p+1); setRunning(false); alert('Window lost focus — session paused.'); }} document.addEventListener('visibilitychange', onVis); window.addEventListener('blur', onBlur); return ()=>{ document.removeEventListener('visibilitychange', onVis); window.removeEventListener('blur', onBlur); }; },[running]);

  function fmt(s){ const mm=Math.floor(s/60).toString().padStart(2,'0'); const ss=(s%60).toString().padStart(2,'0'); return `${mm}:${ss}`; }
  async function onFinish(){ setCycles(c=>c+1);
    if(mode==='focus'){ if((cycles+1)%4===0){ setMode('long'); setSeconds(LONG); } else { setMode('short'); setSeconds(SHORT); } }
    else { setMode('focus'); setSeconds(FOCUS); }
    setRunning(false);
  }

  return (
    <div className="card">
      <div style={{fontSize:48,fontWeight:800,color:'var(--accent)',textAlign:'center'}}>{fmt(seconds)}</div>
      <div style={{display:'flex',justifyContent:'center',gap:12,marginTop:12}}>
        {!running ? <button className="btn btn-primary" onClick={()=>{ setRunning(true); }}>Start</button> : <button className="btn" onClick={()=>setRunning(false)}>Pause</button>}
        <button className="btn" onClick={()=>{ setRunning(false); setSeconds(FOCUS); setMode('focus'); setPenalties(0); }}>Reset</button>
      </div>
      <div style={{textAlign:'center',marginTop:10,color:'#375a3a'}}>Cycles: {cycles} • Penalties: {penalties}</div>
    </div>
  );
}
