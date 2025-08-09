import React from 'react'
import './AppDowload.css'
import { assets } from '../../assets/assets'

const AppDowload = () => {
  return (
    <div className='app-dowload' id='app-dowload'>
        <p>For Better Experience Download <br /> Tomato App </p>
        <div className="app-dowload-platforms"></div>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />

    </div>
  )
}

export default AppDowload