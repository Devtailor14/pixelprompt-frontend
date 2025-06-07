import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Descriptionn = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-12 sm:my-16 md:my-24 px-4 sm:px-6 md:px-28'
    >
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 px-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base text-center'>Turn your imagination into visuals</p>
      
      <div className='flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-14 lg:flex-row items-center max-w-6xl w-full'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg'/>
        
        <div className='text-center lg:text-left max-w-lg lg:max-w-none'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight px-2 lg:px-0'>Introducing the AI-Powered Text to Image Generator</h2>
          
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