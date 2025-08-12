'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [grade, setGrade] = useState(7)
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      if (isSignUp) {
        // Registar novo utilizador
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              grade: grade,
              name: email.split('@')[0]
            }
          }
        })

        if (error) throw error
        
        console.log('Utilizador registado:', data.user)
        alert('Conta criada com sucesso! Podes fazer login.')
        setIsSignUp(false)
        
      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error
        
        console.log('Login realizado:', data.user)
        router.push('/chat')
      }
    } catch (error) {
      console.error('Erro de autenticação:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🧮</div>
          <h1 className="text-2xl font-bold text-gray-900">Math Lab</h1>
          <p className="text-gray-600">{isSignUp ? 'Criar conta nova' : 'Entrar'}</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={loading}
          />
          
          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={loading}
            minLength={6}
          />
          
          {isSignUp && (
            <select
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value={7}>7º Ano (12-13 anos)</option>
              <option value={8}>8º Ano (13-14 anos)</option>
              <option value={9}>9º Ano (14-15 anos)</option>
            </select>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isSignUp ? 'Já tens conta?' : 'Não tens conta?'}
          </p>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
            disabled={loading}
          >
            {isSignUp ? 'Entrar' : 'Criar conta nova'}
          </button>
        </div>
      </div>
    </div>
  )
}