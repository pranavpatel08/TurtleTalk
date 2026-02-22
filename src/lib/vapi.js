import VapiModule from '@vapi-ai/web'

let VapiClass = VapiModule
if (typeof VapiClass !== 'function' && VapiClass?.default) {
  VapiClass = VapiClass.default
}

let vapi = null
try {
  const key = import.meta.env.VITE_VAPI_PUBLIC_KEY
  if (key && typeof VapiClass === 'function') {
    vapi = new VapiClass(key)
  }
} catch (e) {
  console.warn('VAPI failed to initialize:', e)
}

export default vapi
