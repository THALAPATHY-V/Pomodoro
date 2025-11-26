'use client';
import Timer from '../components/Timer';
import Scene from '../components/Scene';
import Streaks from '../components/Streaks';
import Purchase from '../components/Purchase';
export default function Home(){
  return (
    <main className="container">
      <div className="card">
        <div className="header">
          <div>
            <h1 className="title">ZenFocus</h1>
            <div className="small">A calm, original productivity app — not a clone.</div>
          </div>
          <Purchase />
        </div>

        <div style={{marginTop:18,display:'grid',gridTemplateColumns:'1fr 320px',gap:20}}>
          <div>
            <Scene />
            <div style={{marginTop:18}}><Timer /></div>
          </div>
          <aside>
            <Streaks />
            <div style={{marginTop:12}} className="card">
              <h4 style={{margin:0}}>Session details</h4>
              <p className="small" style={{marginTop:8}}>25 min focus • 5 min short break • 15 min long break</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
