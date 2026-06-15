'use client';

import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: 'Expert Manufacturing',
      description: 'High-quality production with cutting-edge technology.',
      image: '/images1/expert.jpg',
    },
    {
      title: 'Custom Solutions',
      description: 'Bespoke services to meet your specific project needs.',
      image: '/images1/custom.jpg',
    },
    {
      title: 'AI Integration',
      description:
        'Seamlessly integrate artificial intelligence into your workflows.',
      image: '/images1/ai-integration.jpg',
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your needs.',
      image: '/images1/24-support.jpg',
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 overflow-hidden relative"
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium mb-6 shadow-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Our Services
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Services
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a world of excellence with our tailored, high-quality
            services designed to elevate your projects.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden group h-80 border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${service.image})`,
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-200 group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-500"></div>
              </div>

              {/* Floating Circle */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;