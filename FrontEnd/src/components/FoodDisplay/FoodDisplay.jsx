import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Fooditem from '../Fooditem/Fooditem.jsx'
import axios from "../../axios.jsx";


const FoodDisplay = ({category}) => {

    // const {food_list} = useContext(StoreContext)
    const [menu_list,setmenu_list]=useState([])
  useEffect(() => {
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/pages/menu");
      setmenu_list(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchMenu();
}, []);

 

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {menu_list.map((item,index)=>{
            
             if(category==="All" || category===item.category)
                 return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={`http://localhost:3000${item.image}`} />
          })}

        </div>
    </div>
  )
}

export default FoodDisplay