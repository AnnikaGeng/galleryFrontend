import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
      };

  return (
    <div className=' w-full h-20 top-0 flex justify-left bg-transparent absolute'>
        <button onClick={handleClick} className=' bg-transparent flex items-center hover:border-transparent focus:outline-none selection:border-transparent lg:ml-10'>
            <FontAwesomeIcon icon={faAngleLeft} className=' text-white text-2xl' loading="lazy"/>
            <span className=' text-white text-xl pl-2'>Back</span>
        </button>
    </div>
  )
}

export default Nav