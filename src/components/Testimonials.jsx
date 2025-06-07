import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
  
  // Updated testimonial descriptions
  const updatedTestimonials = testimonialsData.map((testimonial, index) => {
    const newDescriptions = [
      "This platform has completely transformed my workflow! The AI-generated images are incredibly detailed and save me hours of work. The quality is outstanding and the interface is so intuitive to use.",
      "I've been using this service for months now and I'm amazed by the consistent quality. The variety of styles and the speed of generation make it perfect for my creative projects. Highly recommended!",
      "As a professional designer, I was skeptical at first, but this tool has exceeded all my expectations. The results are professional-grade and the customer support is excellent. It's become an essential part of my toolkit."
    ];
    
    return {
      ...testimonial,
      text: newDescriptions[index] || testimonial.text
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-12 sm:my-16 md:my-20 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8'
    >
      {/* Header Section */}
      <div className='text-center mb-8 sm:mb-10 md:mb-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 px-2'>Customer Testimonials</h1>
        <p className='text-gray-500 text-sm sm:text-base'>What Our Users Are Saying</p>
      </div>

      {/* Testimonials Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl w-full'>
        {updatedTestimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className='bg-white/20 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-md border w-full cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-lg'
          >
            {/* Profile Image */}
            <div className='flex justify-center sm:justify-start mb-4'>
              <img 
                src={testimonial.image} 
                alt={`${testimonial.name} profile`} 
                className='rounded-full w-12 h-12 sm:w-14 sm:h-14 object-cover' 
              />
            </div>

            {/* Name and Role */}
            <div className='text-center sm:text-left mb-4'>
              <h2 className='text-lg sm:text-xl font-semibold mb-1'>{testimonial.name}</h2>
              <p className='text-gray-500 text-sm sm:text-base'>{testimonial.role}</p>
            </div>

            {/* Star Rating */}
            <div className='flex justify-center sm:justify-start mb-4'>
              {Array(testimonial.stars).fill().map((item, starIndex) => (
                <img 
                  key={starIndex} 
                  src={assets.rating_star} 
                  alt="star" 
                  className='w-4 h-4 sm:w-5 sm:h-5'
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className='text-center sm:text-left text-sm sm:text-sm md:text-base text-gray-600 leading-relaxed'>
              {testimonial.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials