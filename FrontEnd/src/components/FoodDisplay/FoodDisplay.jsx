import React, { useEffect, useState } from 'react';
import './FoodDisplay.css';
import Fooditem from '../Fooditem/Fooditem.jsx';
import axios from "../../axios.jsx";

const FoodDisplay = ({ category }) => {
  const [menu_list, setmenu_list] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("/pages/menu");
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
        {menu_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={`${axios.defaults.baseURL}${item.image}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
