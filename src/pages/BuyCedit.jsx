import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { Button } from '@/components/ui/button'
import { AppContext } from '@/context/AppContext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Buycredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt.substring(0, 40),
      handler: async (response) => {
        console.log(response)
        
        // Add payment verification here
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          }, { headers: { token } })

          if (data.success) {
            loadCreditsData()
            navigate('/result')
            toast.success('Credits Purchased Successfully')
          }
        } catch (error) {
          console.log(error)
          toast.error('Payment verification failed')
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }
      
      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', 
        { planId }, 
        { headers: { token } }
      )

      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10 px-4 sm:px-6 lg:px-8"
    >
      <Button 
        variant="ghost" 
        className="border border-gray-400 px-6 sm:px-10 py-2 rounded-full mb-6 text-sm sm:text-base"
      >
        Our Plans
      </Button>
      
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 font-semibold bg-black bg-clip-text text-transparent mb-6 sm:mb-8">
        Choose the plan
      </h1>

      {/* Responsive Grid */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-8 mt-8 sm:mt-12 max-w-7xl mx-auto">
        {plans.map((item, index) => (
          <div 
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-8 sm:py-12 px-6 sm:px-8 text-gray-600 
                       w-full max-w-sm mx-auto lg:flex-1 lg:max-w-none lg:w-80
                       hover:scale-105 transition-all duration-500 flex flex-col"
          >
            <div className="flex-grow">
              <img 
                className="w-12 sm:w-16 mb-4 mx-auto" 
                src={assets.logo_icon} 
                alt="Plan icon" 
              />
              
              <p className="mt-3 mb-1 font-semibold text-lg sm:text-xl">
                {item.id}
              </p>
              
              <p className="text-sm sm:text-base mb-4 px-2">
                {item.desc}
              </p>
              
              <p className="mt-6 mb-4">
                <span className="text-2xl sm:text-3xl font-medium">
                  ₹{item.price}
                </span> 
                <span className="text-sm sm:text-base"> / {item.credits} credits</span>
              </p>
            </div>
            
            <Button 
              onClick={() => paymentRazorpay(item.id)} 
              className="w-full mt-8 text-sm sm:text-base rounded-md py-2.5 min-w-52 
                         hover:scale-105 transition-all duration-300"
            >
              {user ? 'Purchase' : 'Get Started'}
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Buycredit