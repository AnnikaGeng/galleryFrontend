import React from 'react'
import {BASE_API_URL} from '../config/config.js'
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Star = ({data, size}) => {

    const styles = {
        stars: {
            margin: '15px 10px',
            padding: 0,
            borderRadius: '16px',
            backgroundColor: '#0B1320',
        },
        small: {
            gridRowEnd: 'span 25',
        },
        medium: {
            gridRowEnd: 'span 30',
        },
        large: {
            gridRowEnd: 'span 35',
        }
    }

  return (
    <NavLink className='cursor-pointer relative overflow-hidden' style={{
        ...styles.stars,
        ...styles[size],
        }} to={`/${data.id}`}>
        <LazyLoadImage
            src={`${BASE_API_URL}/${data.path}`}
            className="object-cover w-screen h-screen" 
            alt={data.title}
            effect='black-and-white'
        />
        <div className="absolute bottom-0 left-0 w-full lg:h-full h-20 mb-2 lg:mb-0 lg:bg-gradient-to-t
         from-black to-transparent text-white p-4 text-left lg:opacity-0 transition
          ease-in-out duration-300 lg:hover:opacity-100 lg:max-h-[50vh] lg:overflow-scroll lg:no-scrollbar">
            <div className="text-2xl font-bold">{data.title}</div>
            <div className="mt-2  lg:overflow-y-auto invisible lg:visible">{data.description}</div>
        </div>
    </NavLink>
  )
}



export default Star