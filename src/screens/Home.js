import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
function Home() {

  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const {state } = useContext(AppContext) ; 

  useEffect(() => {
    getCategories();
    getItems();
  }, [])


  const getCategories = async () => {
    await axios.get('http://localhost:4000/getcategory')
      .then(response => { setFoodCategories(response.data.data); })
      .catch(e => alert(e.message));

  }

  const getItems = async () => {
    await axios.get('http://localhost:4000/getitems')
      .then(response => { setFoodItems(response.data.data);  })
      .catch(e => alert(e.message));

  }
  return (
    <div className='overflow-x-hidden min-h-[100vh] overflow-y-auto'>


      <Navbar />
      <Carousel />
      {
        foodCategories != [] ? (foodCategories.map((category, i) => <div key={i} className='fs-3 m-3 flex flex-wrap mb-10 flex-col'> <p className='text-white text-[2rem] ml-[70px]'>{category.CategoryName}</p>
          <hr />
          <div className=' w-[95%] mx-auto  flex flex-wrap mt-10'>
          {foodItems?.filter(item => (category.CategoryName === item.CategoryName)&& item.name.toLowerCase().includes(state))
            .map((filtered) => <div key={filtered._id}><Card name={filtered.name} img={filtered.img} options={filtered.options} /></div>)}
          </div>
        </div>

        )) : (<div>Loading</div>)
      }

     <Footer />
    </div>
  )
}

export default Home