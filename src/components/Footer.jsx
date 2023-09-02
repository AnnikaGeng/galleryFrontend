import React from 'react'
import { motion } from "framer-motion";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 }, 
        },
      };
  
    return (
        <div>
        <motion.div
                    className='bg-gray-700 text-white p-10 text-center mt-40'
                    initial="hidden"
                    animate="visible"
                    variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                    }}
                    >
        <p>&copy; {currentYear} Star Gallery. All Rights Reserved.</p>
        <p>Data provided by NASA.</p>

        </motion.div>
    </div>
  )
}

export default Footer