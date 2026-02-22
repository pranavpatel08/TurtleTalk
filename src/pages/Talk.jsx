import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Turtle from '../components/Turtle'
import vapi from '../lib/vapi'

export default function Talk() {
  const navigate = useNavigate()
  const kidName = localStorage.getItem('tt_name') || 'friend'

  const [turtleState, setTurtleState] = useState('idle')
  const [isActive, setIsActive] = useState(false)
  const [statusText, setStatusText] = useState('Tap the button to start talking')
  const [callStarted, setCallStarted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!vapi) return
    vapi.on('call-start', () => {
      setTurtleState('idle')
      setStatusText("Tammy is ready!")
    })

    vapi.on('message', (msg) => {
      if (msg.type !== 'speech-update') return
      if (msg.role === 'assistant' && msg.status === 'started') {
        setTurtleState('talking')
        setIsActive(true)
        setStatusText("Tammy is talking... 🐢")
      }
      if (msg.role === 'user' && msg.status === 'started') {
        setTurtleState('listening')
        setIsActive(true)
        setStatusText("Listening... 👂")
      }
      if (msg.status === 'stopped') {
        setTurtleState('idle')
        setIsActive(false)
        setStatusText("Tap end when you're done")
      }
    })

    vapi.on('call-end', () => navigate('/done'))
    vapi.on('error', () => setHasError(true))

    return () => {
      vapi.stop()
      vapi.removeAllListeners()
    }
  }, [navigate])

  const startVapi = () => {
    if (!vapi) { setHasError(true); return }
    vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID, {
      variableValues: { kidName: localStorage.getItem('tt_name') || 'friend' }
    })
    setCallStarted(true)
  }

  const endChat = () => {
    if (vapi) vapi.stop()
    navigate('/done')
  }

  if (hasError) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        maxWidth: 420,
        margin: '0 auto',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        <Turtle state="idle" size={200} />
        <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#2d7a6f', textAlign: 'center', margin: '20px 0' }}>
          Hmm, Tammy can't hear you right now! 🐢
        </p>
        <button onClick={() => { setHasError(false); setCallStarted(false) }} style={{
          padding: '14px 32px',
          fontSize: 18,
          fontFamily: "'Fredoka One', cursive",
          background: '#4ECDC4',
          color: 'white',
          border: 'none',
          borderRadius: 16,
          cursor: 'pointer',
        }}>Try Again</button>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      maxWidth: 420,
      margin: '0 auto',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <h2 style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: 24,
        color: '#2d7a6f',
        margin: '0 0 8px',
      }}>Hi {kidName}! 👋</h2>

      <Turtle state={turtleState} size={240} />

      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: '6px 18px',
        fontSize: 16,
        fontFamily: "'Fredoka One', cursive",
        color: '#2d7a6f',
        marginTop: 8,
      }}>Tammy 🐢</div>

      <div style={{
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        margin: '12px 0',
      }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{
            width: 5,
            height: isActive ? undefined : 4,
            background: '#4ECDC4',
            borderRadius: 3,
            animation: isActive ? `waveBar 0.5s ease-in-out ${i * 0.08}s infinite alternate` : 'none',
          }} />
        ))}
      </div>

      <p style={{ fontSize: 14, color: '#888', textAlign: 'center', margin: '0 0 16px' }}>
        {statusText}
      </p>

      {!callStarted ? (
        <button onClick={startVapi} style={{
          width: '100%',
          height: 56,
          fontSize: 20,
          fontFamily: "'Fredoka One', cursive",
          background: '#4ECDC4',
          color: 'white',
          border: 'none',
          borderRadius: 16,
          cursor: 'pointer',
        }}>Talk to Tammy 🎙️</button>
      ) : (
        <button onClick={endChat} style={{
          width: '100%',
          height: 56,
          fontSize: 18,
          fontFamily: "'Fredoka One', cursive",
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: 16,
          cursor: 'pointer',
        }}>End Chat ✕</button>
      )}
    </div>
  )
}
