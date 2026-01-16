import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import axios from 'axios'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY

export function initFirebaseMessaging() {
  const app = initializeApp(firebaseConfig)
  const messaging = getMessaging(app)

  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
        })
        if (currentToken) {
          await axios.post('/fcm/token', { token: currentToken })
          console.log('FCM token registrado')
        }
      } catch (err) {
        console.error('Erro ao obter token FCM', err)
      }
    }
  })

  onMessage(messaging, (payload) => {
    console.log('Mensagem em primeiro plano:', payload)
  })
}
