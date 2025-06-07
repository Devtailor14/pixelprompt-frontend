import { assets } from '@/assets/assets'
import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('Login successful!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('Registration successful!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [])

  return (
    <div className='fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form
        onSubmit={onsubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md mx-4'>
        
        <h1 className='text-center text-2xl text-neutral-700 font-medium mb-2'>
          {state}
        </h1>
        <p className='text-sm text-center mb-6'>
          {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create your account to get started'}
        </p>

        {state !== 'Login' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.profile_icon} alt="" className='w-5 h-5' />
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              className='outline-none text-sm flex-1'
              placeholder='Full Name'
              required
              disabled={loading}
            />
          </div>
        )}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" className='w-5 h-5' />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            className='outline-none text-sm flex-1'
            placeholder='Email id'
            required
            disabled={loading}
          />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" className='w-5 h-5' />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            className='outline-none text-sm flex-1'
            placeholder='Password'
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        {state === 'Login' && (
          <p className='text-sm text-blue-600 my-4 cursor-pointer hover:underline'>
            Forgot Password?
          </p>
        )}

        <button 
          type="submit"
          disabled={loading}
          className='bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Please wait...' : (state === 'Login' ? 'Login' : 'Sign up')}
        </button>

        {state === 'Login' ? (
          <p className='mt-5 text-center'>
            Don't have an account?{' '}
            <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => setState('Sign up')}>
              Sign up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account?{' '}
            <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => setState('Login')}>
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close"
          className='absolute top-5 right-5 cursor-pointer hover:opacity-70 transition-opacity'
        />
      </motion.form>
    </div>
  )
}

export default Login