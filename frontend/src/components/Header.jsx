import React from 'react';
import { FaSearch } from "react-icons/fa";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import "../../src/App.css";
import { MenuIcon } from 'lucide-react';
import { setCond } from '@/redux/conSlice';

const Header = () => {

  const dispatch = useDispatch()

  const { user } = useSelector(store => store.user);
  const {cart} = useSelector(store => store.cart)

  console.log(cart)

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/login");
  };

  const sidebarHandler = () => {
    dispatch(setCond(true))
  }

  return (
    <div className="sticky">
      {/* Marquee Section */}
      <div className="bg-green-950 w-screen text-white h-[4rem] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-lg font-medium py-2">
          <span className="mx-4">Welcome to our Plant Shop! 🌿</span>
          <span className="mx-4">Best Deals on Indoor Plants!</span>
          <span className="mx-4">Free Shipping on Orders Over $50!</span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="flex items-center justify-evenly sticky h-20">
        <Link to="/">
          <img src="/public/plant_orbit_copy-removebg-preview.webp" className="w-113px h-[80px]" alt="Plant Orbit" />
        </Link>
        <div className="flex items-center w-[40rem]">
          <input
            type="text"
            placeholder="Search plants..."
            className="w-full h-10 px-3 rounded-l outline-none bg-gray-300"
          />
          <div className="bg-green-900 p-2 rounded-r h-10 flex items-center">
            <FaSearch className="text-white text-lg cursor-pointer" />
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-[3rem] relative">
        <Link to="/new_plant" ><p className="font-serif text-xl hover:text-black cursor-pointer text-green-800">List Your Own Plant</p></Link>
          <p><CiUser onClick={navigateHandler} className="text-4xl cursor-pointer" /></p>
         
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <CiShoppingCart className="text-4xl cursor-pointer" />
                {/* Badge for cart item count */}
                {cart?.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            {cart?.length > 0 && (
              <PopoverContent>
                <div>
                  {cart.map((plant) => (
                    <div className="flex items-center gap-3" key={plant?._id}>
                      <Avatar>
                        <AvatarImage src={plant?.image} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">
                        <span className="font-bold">
                          {plant?.pname}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            )}
          </Popover>
          <MenuIcon className="cursor-pointer" onClick={sidebarHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
