import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useplantData } from "../hook/usePlantDetails";
import Header from "./Header";
import { useBuyPlant } from "@/hook/useBuyPlant";
import { useAddToCart } from "@/hook/useAddToCart";
import { useRemoveFromCart } from "@/hook/useRemoveFromCart";

const ProductDetails = () => {
  const navigate = useNavigate()
  const [img, setImg] = useState("");
  const params = useParams();
  const {cart} = useSelector(store => store.cart)
  
 

  // Plant data fetch karne ke liye hook use kar rahe hain
  useplantData(params.id);
  const plant = useSelector((store) => store.plantInfo.plant);
  const isCarta = cart.some(item => item?._id === plant._id)

  console.log(isCarta)
  const {buyPlant} = useBuyPlant(plant._id)
  const { addToCart } = useAddToCart(plant._id);
  const {removeFromCart} = useRemoveFromCart(plant._id)

  const buyHandler = () => {
   
    navigate("/payment")
  }

  const addToCartHandler = () => {
    addToCart()
  }

  const removeCartHandler = () => {
    removeFromCart()
  }

  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-lg shadow-lg">
        
        {/* Left: Plant Image */}
        <div className="flex justify-center items-center">
          <img
            src={plant?.image || "https://via.placeholder.com/360x300"}
            alt={plant?.pname || "Plant Image"}
            className="w-[400px] h-[350px] object-cover rounded-xl shadow-md border border-gray-200"
          />
        </div>

        {/* Center: Product Information */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-extrabold text-green-700">{plant?.pname || "Plant Name"}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {plant?.description ||
              "Yeh ek beautiful plant hai jo aapke ghar ya office ko natural aur fresh look deta hai. Iska maintenance bohot easy hai aur yeh air purification ke liye bhi perfect hai."}
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>🌱 <b>Type:</b> Indoor/Outdoor</li>
            <li>☀️ <b>Light:</b> Indirect sunlight preferred</li>
            <li>💧 <b>Watering:</b> Once a week</li>
            <li>🎍 <b>Benefits:</b> Air purification, stress relief</li>
          </ul>
        </div>

        {/* Right: Price & Actions */}
        <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <p className="text-xl font-semibold text-green-600 mb-2">✅ In Stock</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">₹{plant?.price || "N/A"}</p>
          <div className="flex flex-col space-y-3">
           {isCarta ?  <button
                        className="w-full mt-4 bg-gray-400 text-black font-bold py-2 rounded"
                        onClick={removeCartHandler}
                    >
                        Remove from cart
                    </button> : <button onClick={addToCartHandler} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-200 ease-in-out shadow-sm">
              🛒 Add to Cart
            </button>}
            <button
             onClick={buyHandler}
             className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-200 ease-in-out shadow-sm">
              💳 Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
