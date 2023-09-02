import React, {useState, useEffect} from 'react'
import Star from './Star.jsx'
import {BASE_API_URL} from '../config/config.js'
import { motion } from "framer-motion";

const Gallery = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllImages = async () => {
    setIsLoading(true)
    try {
        const response = await fetch(`${BASE_API_URL}/`);
        const responseJson = await response.json();
        setData(responseJson);
        setIsLoading(false);
    } catch (error) {
        console.error("Error while fetching the image. Try again later.");
        setIsLoading(false);
    }
  };

  function getRandomSize() {
    const sizes = ['small', 'medium', 'large'];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  }
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }, // Adjust the stagger duration as needed
    },
  };


  useEffect(() => {
    getAllImages();
}, [data.length]);

  return (
    <div>
        {isLoading ? null : (
          <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
          }}
          >
            <h1 className=' text-white m-10 text-4xl lg:text-left lg:ml-36 text-center'>My Gallery</h1>
          </motion.div>
                
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
          }}
            style={styles.container}
          >
          {data?.sort((a, b) => b.id - a.id).map((star, index) => (
              <Star 
              key={star.id}
              data={star} 
              index={index} 
              size={getRandomSize()}
              />
          ))}
          </motion.div>
            </motion.div>
        )}

    </div>
  )
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
    width: '100vw',
    backgroundColor: '#0B1320',
    position: 'relative',
    left: '0%',
    transform: 'translateX(-50%)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    gridAutoRows: '20px',
    justifyContent: 'center',
  }
}

export default Gallery