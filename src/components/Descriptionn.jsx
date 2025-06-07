import React from 'react'
import { motion } from 'framer-motion'

// Mock assets for demo
const assets = {
  sample_img_1: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
}

const Descriptionn = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-12 sm:my-16 md:my-24 px-4 sm:px-6 md:px-28'
    >
      {/* Header Section */}
      <div className='text-center mb-8 sm:mb-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 px-2'>
          Create AI Images
        </h1>
        <p className='text-gray-500 text-sm sm:text-base'>
          Turn your imagination into visuals
        </p>
      </div>

      {/* Main Content Section */}
      <div className='flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-14 max-w-7xl w-full'>
        
        {/* Image Section */}
        <div className='w-full lg:w-1/2 flex justify-center'>
          <img 
            src={assets.sample_img_1} 
            alt="AI Generated Sample" 
            className='w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none lg:w-80 xl:w-96 rounded-lg shadow-lg object-cover'
          />
        </div>
        
        {/* Text Content Section */}
        <div className='w-full lg:w-1/2 text-center lg:text-left'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight px-2 lg:px-0'>
            Introducing the AI-Powered Text to Image Generator
          </h2>
          
          <div className='space-y-4 text-sm sm:text-base px-2 lg:px-0'>
            <p className='text-gray-600 leading-relaxed'>
              Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
            </p>
            
            <p className='text-gray-600 leading-relaxed'>
              Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Descriptionn