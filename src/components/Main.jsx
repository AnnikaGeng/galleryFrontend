import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../config/config.js";
import { toast } from "react-toastify";
import axios from "axios";
import "../App.css";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Main = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getTodaysImage = async () => {
    setIsLoading(true);

    try {
      const cachedData = localStorage.getItem("todaysImage");
      const cachedTimestamp = localStorage.getItem("todaysImageTimestamp");

      const currentDate = new Date().toDateString();
      //  check if the image is valid for today
      if (cachedData && cachedTimestamp === currentDate) {
        const parsedData = JSON.parse(cachedData);
        setData(parsedData);
        setIsLoading(false);
      } else {
        const response = await fetch(`${BASE_API_URL}/today`);
        const responseJson = await response.json();

        localStorage.setItem(
          "todaysImage",
          JSON.stringify(responseJson.information)
        );
        localStorage.setItem("todaysImageTimestamp", currentDate);

        setData(responseJson.information);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Error while fetching the image. Try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodaysImage();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }, // Adjust the stagger duration as needed
    },
  };

  const downloadImage = async (e) => {
    console.log("Download button clicked");
    try {
      const response = await axios.post(`${BASE_API_URL}/download/today`);
      toast.success("Image downloaded to gallery.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error while downloading the image:", error);
      toast.error("Error while downloading the image. Try again later.");
    }
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <div className="flex flex-col min-h-screen">
            <div className="placeholder"></div>
          </div>
        ) : (
          <motion.div
            className="flex lg:flex-row flex-col"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="w-screen lg:w-[75%] lg:max-h-[100vh] object-contain object-fit relative">
              <div
                className=" text-white absolute bottom-5 lg:text-xl 
                            left-1/2 translate-x-[-50%] 
                            md:left-1/2 md:translate-x-[-50%]
                            lg:left-10 lg:translate-x-0
                            z-10
                            "
              >
                Astronomy Picture of Today
              </div>

              <img
                effect="blur"
                src={data?.url}
                alt={data?.title}
                className="w-screen lg:h-screen z-0 h-[20%] object-cover object-center"
              />
            </div>

            <motion.div
              className="text-white text-left lg:w-[25%] p-5 w-screen flex flex-col lg:max-h-screen
                            justify-center content-center
                            lg:justify-start lg:content-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h1 className="text-4xl font-bold">{data?.title}</h1>
              <p className="mt-2">{data?.date}</p>
              <p className="mt-4 lg:max-h-[60vh] lg:overflow-y-auto">
                {data?.message}
              </p>

              <button
                className="mt-4 bg-white text-black p-2 rounded-md hover:bg-gray-200 hover:border-none border-none"
                onClick={downloadImage}
              >
                Download Image
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Main;
