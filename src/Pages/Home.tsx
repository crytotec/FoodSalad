import React, { useEffect, useState } from 'react'
import chicken from '../assets/image/chicken1.jpeg'
import { item, customer } from '../Data/Items'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Appdispatch, RootState } from '../app/store'
import { addMenu } from '../features/items/itemSlice'


export interface forms{
   name:string;
  email:string;
  message:string
}

function Home() {
  const [slide, setSlide]=useState<number>(3)
  const[inputform, setInputForm]=useState<forms>({
    name:'',
  email:'',
  message:''
  })
  const[displayForm, setDisplayForm]=useState<forms>({
     name:'',
  email:'',
  message:''
  })

  const dispatch=useDispatch<Appdispatch>();

  const nextSlide = () =>{
    setSlide((prev)=>(prev + 1)% item.length)
  }

  const prevSlide = () =>{
    setSlide((prev)=>(prev - 1 + item.length)% item.length)
  }
    
  const visibleImage = () =>{
    const visible=[];
    for(let i=0; i < 3; i++){
      visible.push(item[(slide + i)% item.length])
    }
    return visible
  }


  const updateFormInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
     const {name, value}=e.target
       setInputForm((prev)=>({...prev, [name]:value}))
  }

  const updateDisplayForm = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (inputform) {
      setDisplayForm(inputform)
      alert('input successful')
      setInputForm({name:'',
  email:'',
  message:''})
    }else{
      alert('fiil the form')
    }
  }
  return(
    <div className='w-full p-4 '>
      <div className='w-[80%] flex flex-col md:flex-row gap-10 justify-between mx-auto items-center'>
        <div className='flex  flex-col gap-5'>
        <h1>Delicious Starts Here</h1>
        <h3>Good food, good mood, every single time.</h3>
        <Link to='/Menu'>
        <button className='p-4 bg-red-600 text-white text-2xl hover:bg-red-300 duration-400'>Let’s Eat!</button>
         </Link>
        </div>
       <img src={chicken} className='object-cover w-[400px] h-[200px] md:h-[400px] rounded-2xl'/>
    </div>
    <div className='w-[80%] mt-10  flex flex-col justify-start mx-auto  gap-5 items-start'>
     <h1>The Flavor Behind the Name</h1> 
     <h3>🍽️ For a restaurant / premium vibe:</h3> 
     <p className='w-full'>We believe eating well should be simple and satisfying. 
      That’s why we focus on fresh ingredients, clean recipes, 
      and flavors that make you feel good. 
      Every dish is designed to nourish your body and please your taste buds.</p>
      <Link to='/About'>
      <button className='p-4 bg-red-600 text-white text-2xl hover:bg-red-300 duration-400'>Learn More </button>
      </Link>
    </div>
    <div className="relative w-[90%] lg:w-[60%] mx-auto mt-10">
  {/* Arrows */}
  <FaArrowAltCircleLeft
    onClick={prevSlide}
    className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer text-3xl md:text-4xl text-red-600 hover:text-red-400 z-10"
  />
  <FaArrowAltCircleRight
    onClick={nextSlide}
    className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-3xl md:text-4xl text-red-600 hover:text-red-400 z-10"
  />
    <h1>Our Special Dishes</h1>
  {/* Carousel Row */}
  <div className="flex flex-row gap-4 overflow-x-hidden">
    
    {visibleImage().map((item, index) => (
      <div
        key={index}
        className="flex-shrink-0 flex hover:scale-105 duration-300 flex-col bg-white p-2 sm:p-4 w-[80%] md:w-[400px]  lg:w-[40%] gap-2 rounded-md shadow-md"
      >
        <img
          src={item.img}
          className="object-cover w-full h-40 sm:h-48 md:h-52 rounded-md"
          alt={item.Title}
        />
        <p className="text-center text-sm sm:text-base md:text-lg font-medium">{item.Title}</p>
        <button className="bg-red-600 text-white text-xs sm:text-sm md:text-2xl p-2 sm:p-3 md:p-4 rounded-md w-full">
          {`₦ ${item.price}`}
        </button>
      </div>
    ))}
  </div>
</div>
<div className="relative flex flex-col w-[80%] mx-auto mt-10">
  <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Add to Cart</h1>


  <div className="relative flex items-center">
    <FaArrowRight className="absolute text-red-600 right-4 top-1/2 transform -translate-y-1/2 text-2xl z-10" />
    <div className="absolute right-0 top-0 bg-gradient-to-r from-transparent to-red-100 w-[60px] h-full pointer-events-none" />

    {/* Card container */}
    <div className="flex overflow-x-auto  gap-6 p-4 scrollbar-hide">
      {item.map((item, index) => (
        <div
          key={index}
          className="flex-none  bg-white shadow-lg rounded-xl p-4 w-[200px]  md:w-[40%]  hover:scale-105 transition-transform duration-300"
        >
          <img
            src={item.img}
            alt={item.Title}
            className="object-cover rounded-lg w-full h-[140px] md:h-[180px] mb-3"
          />
          <h3 className="text-lg font-semibold">{item.Title}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
          <p className="text-red-500 font-bold mt-2">{`₦${item.price}`}</p>
          <button onClick={()=> dispatch(addMenu(item))} className="p-2 mt-3 w-full bg-red-600 text-white text-sm md:text-base rounded-md hover:bg-red-500 transition-colors duration-300">
            {item.button}
          </button>
        </div>
      ))}
    </div>
  </div>
</div>
<div className="flex flex-col items-center w-[80%] mx-auto mt-10">
  <h1 className="text-2xl md:text-3xl font-bold mb-6">Testimony</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mx-auto">
    {customer.map((item, index) => (
      <div
        key={index}
        className="flex flex-col  items-center bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={item.img}
          alt={item.Name}
          className="object-cover rounded-full w-[100px] h-[100px] mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{item.Name}</h3>

        <div className="flex gap-2 items-center text-sm text-gray-600 mb-2">
          <p>{item.Rate}</p>
          <span>•</span>
          <h3>{item.location}</h3>
        </div>

        <p className=" bg-gray-100 p-3 rounded-lg text-sm text-gray-700 w-[200px] mt-4">
          {item.Testimony}
        </p>
      </div>
    ))}
  </div>
</div>
<div className="flex flex-col items-center w-[80%] mx-auto mt-16 mb-20">
  <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-800">
    We’d Love to Hear From You
  </h1>

  <div className="flex flex-col md:flex-row justify-between w-full gap-10">
    {/* Contact Details */}
    <div className="flex flex-col gap-4 text-center md:text-left md:w-1/2 text-gray-700">
      <p className="flex items-center justify-center md:justify-start gap-2">
        📍 <span className="font-medium">Address:</span> 23 Flavor Street, Lagos, Nigeria
      </p>
      <p className="flex items-center justify-center md:justify-start gap-2">
        📞 <span className="font-medium">Phone / WhatsApp:</span> +234 812 345 6789
      </p>
      <p className="flex items-center justify-center md:justify-start gap-2">
        📧 <span className="font-medium">Email:</span> hello@yourbrand.com
      </p>

      <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
        Have a question, feedback, or just want to say hello?  
        Fill out the form — we’ll get back to you as soon as possible. 💬
      </p>
    </div>

    {/* Contact Form */}
    <form onSubmit={updateDisplayForm} className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-2xl text-white w-full md:w-1/2">
      <input
        onChange={updateFormInput}
        value={inputform.name}
        name='name'
        type="text"
        placeholder="Your Name"
        className="w-full h-12 px-4 rounded-md bg-white text-gray-700 outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        onChange={updateFormInput}
        value={inputform.email}
        name='email'
        type="email"
        placeholder="Your Email"
        className="w-full h-12 px-4 rounded-md bg-white text-gray-700 outline-none focus:ring-2 focus:ring-red-300"
      />
      <textarea
       onChange={updateFormInput}
        value={inputform.message}
        name='message'
        placeholder="Your Message"
        className="w-full h-24 px-4 py-2 rounded-md bg-white text-gray-700 outline-none focus:ring-2 focus:ring-red-300 resize-none"
      />
      <button
        type="submit"
        className="bg-white text-red-600 font-semibold rounded-md py-3 hover:bg-red-100 transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  </div>
</div>

</div>
  )
}
export default Home