'use client';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'John Doe',
    image: 'https://images.pexels.com/photos/19607428/pexels-photo-19607428.jpeg',
    role: 'CEO, Tech Corp',
    quote: 'This AI agent has revolutionized our workflow. The seamless integration and intelligent responses have significantly improved our customer satisfaction metrics.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    image: 'https://images.pexels.com/photos/15361048/pexels-photo-15361048.jpeg',
    role: 'Developer, Innovate Ltd',
    quote: 'Incredible performance and ease of use. The natural language processing capabilities are truly impressive and have transformed how we handle customer interactions.',
    rating: 5,
  },
  {
    name: 'Alex Johnson',
    image: 'https://images.pexels.com/photos/15014092/pexels-photo-15014092.jpeg',
    role: 'Manager, Future AI',
    quote: 'The best AI solution we\'ve implemented. The support team is exceptional and the continuous improvements keep us ahead of the competition.',
    rating: 4,
  },
  {
    name: 'Sarah Wilson',
    image: 'https://images.pexels.com/photos/15460313/pexels-photo-15460313.jpeg',
    role: 'CTO, Digital Solutions',
    quote: 'A game-changing platform that has reduced our response time by 70%. The analytics dashboard provides invaluable insights into customer behavior.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    image: 'https://images.pexels.com/photos/15004155/pexels-photo-15004155.jpeg',
    role: 'Product Lead, TechVision',
    quote: 'The multilingual support is flawless. We\'ve expanded to three new markets thanks to this AI agent\'s capabilities.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    image: 'https://images.pexels.com/photos/6264083/pexels-photo-6264083.jpeg',
    role: 'Customer Success Director',
    quote: 'Our team loves working with this platform. The customization options allow us to tailor the experience perfectly for each client.',
    rating: 4,
  },
];

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium mb-6 shadow-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Client Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why businesses worldwide trust our AI calling agent to transform their customer communication.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
      <Swiper
     modules={[Navigation, Autoplay]}
     spaceBetween={30}
     slidesPerView={3}
     navigation
     autoplay={{ delay: 3000 }}
     loop={true}
     breakpoints={{
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
       }}
>
  {testimonials.map((testimonial, index) => (
    <SwiperSlide key={index}>
      <div className="bg-white rounded-3xl overflow-hidden  hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-3 border border-gray-100">

        {/* Image */}
        <div className="flex justify-center mt-6">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-30 h-30 rounded-full object-cover border-4 border-cyan-500 shadow-md hover:scale-110 transition-transform duration-300"
                    />
        </div>

        {/* Content */}
        <div className="p-6 text-center flex flex-col items-center">

          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {testimonial.name}
          </h3>

          <p className="text-cyan-600 font-medium mb-4">
            {testimonial.role}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {testimonial.quote}
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 "
        >
          {[
            { number: '95%', label: 'Client Satisfaction' },
            { number: '500+', label: 'Happy Clients' },
            { number: '24/7', label: 'Support Available' },
            { number: '99.9%', label: 'Uptime Guarantee' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-2 hover:border-cyan-300 transition-all duration-300">
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;