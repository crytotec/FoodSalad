import { useEffect, useRef, useState } from "react"
import {  FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom";




function Navbar (){
    const [menu, setMenu]=useState(false)
    const MenuRef=useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
    function HandleClick(e:MouseEvent) {
        if(MenuRef.current && !MenuRef.current.contains(e.target as Node)){
         setMenu(false)
        }
    }
    document.addEventListener('mousedown', HandleClick)
    return () => document.removeEventListener('mousedown', HandleClick)
    },[])

    const HandleLinkClick = () =>{
      setMenu(false)
    }
  return(
    <div className="w-full p-4">
        <div className="hidden md:flex   items-center justify-between w-[80%] mx-auto p-4">
        <h1 className="text-red-600 font-bold text-xl">Food Salad</h1>
         <ul className="flex text-gray-600 font-bold items-center gap-10">
          <Link to='/'>
            <li className="cursor-pointer hover:text-red-400 duration-500">Home</li>
            </Link>
            <Link to='/About'>
            <li className="cursor-pointer hover:text-red-400 duration-500">About</li>
            </Link>
            <Link to='/Contact'>
            <li className="cursor-pointer hover:text-red-400 duration-500">Contact</li>
            </Link>
         </ul>
        <Link to='/signup'>
             <button className="bg-red-600 p-4 rounded-full text-white font-bold">Sign up</button>
           </Link>
         </div>
         
           {/* <mobile> */}
         <div ref={MenuRef} className="relative z-10 sm:hidden flex justify-between ">
            <h1>Logo</h1>
            <button onClick={() =>setMenu(!menu)}>{menu ?<FaTimes/> :<FaBars/>}</button>
         {menu && (
            <ul className="absolute top-10  bg-red-600 w-full text-white p-4 flex flex-col items-center gap-10">
           <Link to='/' onClick={HandleLinkClick}>
            <li>Home</li>
            </Link>
            <Link to='/About' onClick={HandleLinkClick}>
            <li>About</li>
            </Link>
             <Link to='/Contact' onClick={HandleLinkClick}>
            <li>Contact</li>
            </Link>
            <Link to='/signup'>
            <button className="bg-yellow-600 hover:bg-yellow-400 duration-500 p-4 rounded-full text-white font-bold">Sign up</button>
           </Link>
         </ul>
         )}
         </div>
    </div>
  )
}
export default Navbar