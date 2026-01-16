import React from 'react'
import { usePage, Link } from '@inertiajs/react'

export default function Home() {
  const { props } = usePage()
  const user = props.auth?.user

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white rounded-lg shadow w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Bem-vindo</h1>
        {user ? (
          <div className="space-y-2">
            <p className="text-gray-700">Olá, {user.name}!</p>
            <a href="/logout" className="text-blue-600 hover:underline">Sair</a>
          </div>
        ) : (
          <a
            href="/auth/google/redirect"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.9 0-12.5-5.6-12.5-12.5S17.1 11 24 11c3.2 0 6.2 1.2 8.4 3.3l5.7-5.7C34.6 5.1 29.5 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.9 0 20-8.1 21-18.5 0-.9.1-1.8.1-2.8 0-1.1-.1-2.1-.3-3.1z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 13 24 13c3.2 0 6.2 1.2 8.4 3.3l5.7-5.7C34.6 5.1 29.5 3 24 3 15.6 3 8.4 7.8 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.3l-6.2-5.1C29.6 36.6 26.9 37.8 24 37.8c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C8.4 40.2 15.6 45 24 45z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.9 0-12.5-5.6-12.5-12.5S17.1 11 24 11c3.2 0 6.2 1.2 8.4 3.3l5.7-5.7C34.6 5.1 29.5 3 24 3c-8.4 0-15.6 4.8-17.7 11.7l6.6 4.8C14.6 16.1 18.9 13 24 13c3.2 0 6.2 1.2 8.4 3.3l5.7-5.7C34.6 5.1 29.5 3 24 3c-8.4 0-15.6 4.8-17.7 11.7l6.6 4.8C14.6 16.1 18.9 13 24 13c3.2 0 6.2 1.2 8.4 3.3l5.7-5.7C34.6 5.1 29.5 3 24 3c-8.4 0-15.6 4.8-17.7 11.7l6.6 4.8C14.6 16.1 18.9 13 24 13c3.2 0 6.2 1.2 8.4 3.3l5.7-5.7C34.6 5.1 29.5 3 24 3c-8.4 0-15.6 4.8-17.7 11.7l6.6 4.8z"/>
            </svg>
            Entrar com Google
          </a>
        )}
      </div>
    </div>
  )
}
