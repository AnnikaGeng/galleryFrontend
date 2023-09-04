import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../config/config.js";
import { Nav } from "../components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();

  const getData = async (e) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_API_URL}/${id}`);
      setData(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error while fetching the image. Try again later.");
      toast.error("Error while fetching the image. Try again later.");
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (e) => {
    try {
      const { data } = await axios.delete(`${BASE_API_URL}/delete/${id}`);
      console.log(data);
      toast.success("Image deleted successfully.");
      navigateTo("/");
    } catch (error) {
      console.error("Error while deleting the image:", error);
      toast.error("Error while deleting the image. Try again later.");
    }
  };

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.5 },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col min-h-screen">
          <div className="placeholder"></div>
        </div>
      ) : (
        <motion.div
          className="w-screen h-screen flex flex-col justify-start content-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <div className="flex lg:flex-row flex-col">
            <motion.div
              className=" w-screen lg:w-[75%] lg:max-h-[100vh] object-contain object-fit relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Nav />
              <img
                src={`${BASE_API_URL}/${data.path}`}
                alt={data?.title}
                className="w-full h-full object-fit lg:max-w-[75vw] lg:max-h-screen"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="flex flex-col text-left w-screen lg:max-w-[25vw] pl-5 pr-5 overflow-scroll no-scrollbar"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {/* <div className='flex flex-col text-left max-w-[25vw] p-5 overflow-scroll no-scrollbar'> */}
              <p className=" text-white pt-2 text-2xl font-extrabold">
                {data?.title}
              </p>
              <p className=" text-white pt-5">{data?.date}</p>
              <div className=" text-white pt-5  lg:max-h-[70vh] overflow-y-auto text-xl">
                {data?.description}
              </div>
              <a
                className=" text-center pt-10 text-red-500 cursor-pointer hover:text-red-200"
                onClick={handleDeleteClick}
              >
                Delete This Collection
              </a>
              {/* </div> */}
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Detail;
