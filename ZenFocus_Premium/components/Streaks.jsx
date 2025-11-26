'use client';
import {useEffect,useState} from 'react';
export default function Streaks(){
  const [streak,setStreak]=useState(0);
  useEffect(()=>{ const s = localStorage.getItem('zen_streak'); if(s) setStreak(Number(s)); },[]);
  return (
    <div className="card">
      <h4 style={{margin:0}}>Daily Streak</h4>
      <div style={{marginTop:8,fontWeight:700,fontSize:20}}>{streak} 🔥</div>
    </div>
  );
}
