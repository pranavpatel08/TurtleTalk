import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Turtle from '../components/Turtle'
import { getRandomMission, getSummary, getTip } from '../lib/missions'

const sendSMS = async (kidName, mission) => {
  const summary = getSummary(kidName)
  const tip = getTip()

  await fetch('/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kidName, mission, summary, tip }),
  }).catch(console.error)
}

export default function Done() {
  const navigate = useNavigate()
  const kidName = localStorage.getItem('tt_name') || 'friend'
  const [mission, setMission] = useState('')

  useEffect(() => {
    const m = getRandomMission()
    setMission(m)
    sendSMS(kidName, m)
  }, [])

  return (
    <div style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 24,
      maxWidth: 420,
      margin: '0 auto',
    }}>
      <div style={{ marginTop: 24 }}>
        <Turtle state="happy" size={180} />
      </div>

      <div style={{
        background: 'white',
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: 28,
        margin: '16px 16px 0',
        textAlign: 'center',
        width: '100%',
        maxWidth: 388,
        boxSizing: 'border-box',
      }}>
        <div style={{ fontSize: 36 }}>⭐</div>
        <h2 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: 26,
          color: '#2d7a6f',
          margin: '12px 0 16px',
        }}>Great talk today, {kidName}!</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 16px' }} />

        <p style={{
          fontSize: 12,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: 1,
          margin: '0 0 8px',
        }}>Your Brave Mission 🌟</p>

        <p style={{ fontSize: 18, color: '#333', margin: '0 0 12px', lineHeight: 1.5 }}>
          {mission}
        </p>

        <p style={{ fontSize: 13, color: '#999' }}>
          Can you try this before we talk again?
        </p>
      </div>

      <button onClick={() => navigate('/')} style={{
        width: 'calc(100% - 32px)',
        maxWidth: 388,
        height: 56,
        fontSize: 20,
        fontFamily: "'Fredoka One', cursive",
        background: '#4ECDC4',
        color: 'white',
        border: 'none',
        borderRadius: 16,
        cursor: 'pointer',
        marginTop: 20,
      }}>Got it, Tammy! 🐢</button>

      <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 16 }}>
        Your grown-up will hear about your adventure 📱
      </p>
    </div>
  )
}
