const MISSIONS = [
  "Tell someone one thing you're proud of today.",
  "Draw your favorite place and show it to someone.",
  "Say something kind to a person in your family.",
  "Do one nice thing for someone without being asked.",
  "Make someone laugh today.",
  "Take three deep breaths the next time something feels hard.",
  "Find one thing you're grateful for and tell someone.",
]

const SUMMARIES = [
  (n) => `${n} seemed happy and curious today! 😊`,
  (n) => `${n} was thoughtful and shared some things on their mind. 💭`,
  (n) => `${n} had great energy and loved chatting! ✨`,
  (n) => `${n} seemed a little quiet today — worth a gentle check-in. 🤍`,
  (n) => `${n} was in a great mood and learned something new! 🌟`,
]

const TIPS = [
  "Ask about their Brave Mission at dinner tonight.",
  "A 5-minute chat before bed goes a long way.",
  "Ask what made them laugh today.",
  "Let them lead the conversation — just listen.",
  "Tell them one thing YOU are proud of.",
]

const pick = arr => arr[Math.floor(Math.random() * arr.length)]
export const getRandomMission = () => pick(MISSIONS)
export const getSummary = (name) => pick(SUMMARIES)(name)
export const getTip = () => pick(TIPS)
