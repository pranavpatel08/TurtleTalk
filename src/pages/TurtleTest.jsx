import Turtle, { COLOR_FILTERS } from '../components/Turtle'
import { useState } from 'react'

export default function TurtleTest() {
  const [state, setState] = useState('idle')
  const [colorKey, setColorKey] = useState('green')
  const [accessories, setAccessories] = useState([])

  const btnStyle = (active) => ({
    padding: '8px 16px',
    background: active ? '#4ECDC4' : '#eee',
    color: active ? '#fff' : '#333',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: 32 }}>
      <h2 style={{ margin: 0, color: '#333' }}>Turtle Animation Test</h2>

      <Turtle state={state} colorKey={colorKey} accessories={accessories} size={280} />

      <div>
        <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 14, color: '#666' }}>State</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {['idle', 'listening', 'talking', 'happy'].map(s => (
            <button key={s} onClick={() => setState(s)} style={btnStyle(state === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 14, color: '#666' }}>Color</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {Object.keys(COLOR_FILTERS).map(c => (
            <button key={c} onClick={() => setColorKey(c)} style={btnStyle(colorKey === c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 14, color: '#666' }}>Accessories</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {['hat', 'flower', 'star', 'bow'].map(a => (
            <button
              key={a}
              onClick={() => setAccessories(prev =>
                prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
              )}
              style={btnStyle(accessories.includes(a))}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
