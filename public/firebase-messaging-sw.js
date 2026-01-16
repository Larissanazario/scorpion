importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: self?.ENV?.VITE_FIREBASE_API_KEY,
  authDomain: self?.ENV?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: self?.ENV?.VITE_FIREBASE_PROJECT_ID,
  storageBucket: self?.ENV?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: self?.ENV?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: self?.ENV?.VITE_FIREBASE_APP_ID,
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const { notification } = payload
  const title = notification?.title || 'Nova mensagem'
  const options = {
    body: notification?.body,
    icon: '/favicon.ico',
  }
  self.registration.showNotification(title, options)
})
