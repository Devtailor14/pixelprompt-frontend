import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '@/context/AppContext'

const Result = () => {
 const [image, setImage] = useState(assets.resultpage)
 const[IsImageLoaded, setIsImageLoaded] = useState(false)
 const[loading, setLoading] = useState(false)
 const[input, setInput] = useState('')

const { generateImage } = useContext(AppContext) 

 const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
 }
 


  return (
    <motion.form 
      initial = {{opacity:0.2, y:100}}
      transition = {{duration:1}}
      whileInView = {{opacity: 1, y:0}}
      viewport = {{once: true}}
    
    onSubmit={onSubmitHandler}
     className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className='relative'>
      <img src={image} alt="" className='max-w-sm rounded'/>
      <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 $ {loading ? 'w-full transition-all duration-[10s]': 'w-0'}`}/>
      
      {/* Enhanced Loading Overlay */}
      {loading && (
        <div className='absolute inset-0 bg-black/50 rounded flex flex-col items-center justify-center'>
          {/* Spinning Loader */}
          <div className='w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4'></div>
          
          {/* Loading Text with Animation */}
          <div className='text-white text-lg font-medium mb-2'>
            Generating...
          </div>
          
          {/* Animated Dots */}
          <div className='flex space-x-1'>
            <div className='w-2 h-2 bg-white rounded-full animate-bounce'></div>
            <div className='w-2 h-2 bg-white rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
            <div className='w-2 h-2 bg-white rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
          </div>
          
          {/* Progress Text */}
          <p className='text-white/80 text-sm mt-4 text-center px-4'>
            Creating your AI masterpiece...
          </p>
        </div>
      )}
      </div>

      <p className={!loading ? 'hidden' : 'text-center mt-4 text-gray-600 font-medium'}>Processing your request...</p>
    </div>
{!IsImageLoaded &&
    <div className='flex w-full max-w-xl bg-neutral-500 text-white p-0.5 mt-10 rounded-full '>
      <input
      onChange={e => setInput(e.target.value)} value={input}
       type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>
        Generate
      </button>
    </div>}

{IsImageLoaded &&
<div className='flex gap-2 flex-wrap justify-center
 text-white text-sm p-0.5 mt-10 rounded-full'>
  <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-size-900 text-black px-8 py-3 rounded-full cursor-pointer'>
    Generate Another
  </p>
  <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
</div>

}
    </motion.form>
  )
}

export default Result
