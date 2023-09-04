import React, { useState, useEffect } from "react";
import Star from "./Star.jsx";
import { BASE_API_URL } from "../config/config.js";
import { motion } from "framer-motion";

const Gallery = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [endOfPage, setEndOfPage] = useState(false);

  const loadMoreData = async () => {
    setIsLoading(true);

    try {
      // use cache first
      const cachedData = localStorage.getItem(`page${page + 1}`);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (parsedData.length < 10) {
          setEndOfPage(true);
        }
        setData([...data, ...parsedData]);
        setPage(page + 1);
        setIsLoading(false);
      } else {
        // Fetch the data from the API
        const response = await fetch(`${BASE_API_URL}/?page=${page + 1}`);
        const responseJson = await response.json();
        if (responseJson.length < 10) {
          setEndOfPage(true);
        }

        // Save the new data in localStorage for the next page
        localStorage.setItem(`page${page + 1}`, JSON.stringify(responseJson));

        setData([...data, ...responseJson]);
        setPage(page + 1);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error while fetching the image. Try again later.");
      setIsLoading(false);
    }
  };

  function getRandomSize() {
    const sizes = ["small", "medium", "large"];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  }
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  useEffect(() => {
    loadMoreData();
  }, []);

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
            <h1 className=" text-white m-10 text-4xl lg:text-left lg:ml-36 text-center">
              My Gallery
            </h1>
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
            {data.map((star, index) => (
              <Star
                key={star.id}
                data={star}
                index={index}
                size={getRandomSize()}
              />
            ))}
          </motion.div>
          <p
            onClick={endOfPage ? null : loadMoreData}
            className={`text-white ${endOfPage ? "" : "cursor-pointer"} pt-10`}
          >
            {endOfPage ? "No more data" : "Load more data"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    width: "100vw",
    backgroundColor: "#0B1320",
    position: "relative",
    left: "0%",
    transform: "translateX(-50%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 400px)",
    gridAutoRows: "20px",
    justifyContent: "center",
  },
};

export default Gallery;
