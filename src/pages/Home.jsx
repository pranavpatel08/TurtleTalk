import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Turtle from '../components/Turtle'

const FLOATING_EMOJIS = ['⭐', '🌿', '💫', '🌸']

export default function Home() {
  const [name, setName] = useState('')
  const [savedName, setSavedName] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const n = localStorage.getItem('tt_name')
    if (n) setSavedName(n)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    localStorage.setItem('tt_name', name.trim())
    navigate('/talk')
  }

  const handleChangeName = () => {
    setSavedName(null)
    localStorage.removeItem('tt_name')
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 32px',
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {FLOATING_EMOJIS.map((emoji, i) => (
        <span key={i} style={{
          position: 'absolute',
          fontSize: 28,
          opacity: 0.5,
          pointerEvents: 'none',
          animation: `floatEmoji ${3 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`,
          top: `${15 + i * 20}%`,
          left: `${10 + i * 22}%`,
        }}>{emoji}</span>
      ))}

      <h1 style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: 42,
        color: '#2d7a6f',
        margin: '0 0 8px 0',
      }}>TurtleTalk 🐢</h1>

      <Turtle state="idle" size={220} />

      {savedName ? (
        <>
          <p style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 22,
            color: '#2d7a6f',
            margin: '8px 0 24px',
          }}>
            Welcome back, {savedName}!
          </p>

          <button onClick={() => navigate('/talk')} style={{
            width: '100%',
            height: 56,
            fontSize: 20,
            fontFamily: "'Fredoka One', cursive",
            background: '#4ECDC4',
            color: 'white',
            border: 'none',
            borderRadius: 16,
            cursor: 'pointer',
            marginBottom: 12,
          }}>Talk again 🎙️</button>

          <button onClick={handleChangeName} style={{
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: 14,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}>Not {savedName}? Change name</button>
        </>
      ) : (
        <>
          <p style={{ fontSize: 16, color: '#666', margin: '8px 0 24px' }}>
            Your friendly shell-mate
          </p>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What's your name?"
              style={{
                width: '100%',
                fontSize: 18,
                padding: '14px 18px',
                borderRadius: 16,
                border: '2px solid #e0e0e0',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: 14,
                textAlign: 'center',
              }}
            />
            <button type="submit" style={{
              width: '100%',
              height: 56,
              fontSize: 20,
              fontFamily: "'Fredoka One', cursive",
              background: '#4ECDC4',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              cursor: 'pointer',
            }}>Let's go! ✨</button>
          </form>
        </>
      )}
    </div>
  )
}
