import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/slices/CartSlice";

const Product = (props) => {
  const path = 'http://127.0.0.1:8000'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = props._id;
  const productItem = props;

  const handleProductDetails = () => {
    navigate(`/products/${productId}`, {
      state: {
        item: productItem,
      },
    });
  };
  

  const handleAddToCart = () => {
    dispatch(
      addToCart(productId,1 )
    );
    toast.success("Item added to cart!", {
      duration: 2000,
      style: {
        backgroundColor: "#07bc0c",
        color: "white",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#07bc0c",
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group">
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={path + props.img}
          alt={props.productName}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          onClick={handleProductDetails}
        />

        {/* Hover Action Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
            title="Add to Cart"
          >
            <FaShoppingCart className="text-gray-700" />
          </button>

          <button
            onClick={() => {
              /* Implement wishlist functionality */
            }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
            title="Add to Wishlist"
          >
            <BsSuitHeartFill className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <h2
            className="text-md font-semibold text-gray-900 line-clamp-2 mr-2 flex-grow cursor-pointer hover:text-blue-600"
            onClick={handleProductDetails}
          >
            {props.productName}
          </h2>
          <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
            ${props.price}
          </span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex justify-between mt-auto space-x-2">
          <button
            onClick={handleProductDetails}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <MdOutlineLabelImportant className="mr-1" /> Details
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FaShoppingCart className="mr-1" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
