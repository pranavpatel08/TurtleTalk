import turtleImg from '../assets/turtle.png'

export default function Turtle({ state = 'idle', size = 250 }) {
  const animations = {
    idle:      'turtleFloat 3.5s ease-in-out infinite',
    listening: 'turtleListen 1.8s ease-in-out infinite',
    talking:   'turtleTalk 0.55s ease-in-out infinite',
    happy:     'turtleHappy 1.2s ease-in-out',
  }

  const glowStyle = state === 'talking'
    ? 'drop-shadow(0 0 20px rgba(78,205,196,0.8)) drop-shadow(0 0 40px rgba(78,205,196,0.4))'
    : 'none'

  const ringStyle = state === 'listening' ? {
    content: '',
    position: 'absolute',
    inset: '5%',
    borderRadius: '50%',
    border: '3px solid #4ECDC4',
    animation: 'listenRing 1.5s ease-out infinite',
    pointerEvents: 'none',
  } : null

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {ringStyle && <div style={{ position: 'absolute', ...ringStyle }} />}
      <img
        src={turtleImg}
        alt="Turtle"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          animation: animations[state] || animations.idle,
          filter: glowStyle !== 'none' ? glowStyle : undefined,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
      {state === 'talking' && (
        <div style={{
          position: 'absolute',
          bottom: '26%',
          left: '50%',
          width: 12,
          height: 9,
          background: '#2d5a3d',
          borderRadius: '50%',
          animation: 'mouthPulse 0.35s ease-in-out infinite',
        }} />
      )}
    </div>
  )
}
