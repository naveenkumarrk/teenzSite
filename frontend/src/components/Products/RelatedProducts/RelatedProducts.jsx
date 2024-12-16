import React, { useState } from "react";
import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useFetchData from "../useFetchData";

const RelatedProducts = () => {
  const [wishList, setWishList] = useState({});

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { 
    data: items, 
    isLoading, 
    error 
  } = useFetchData('https://fakestoreapi.com/products');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p className="text-xl">Error loading products: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="relatedProductSection">
      <div className="relatedProducts">
        <h2>
          RELATED <span>PRODUCTS</span>
        </h2>
      </div>
      <div className="relatedProductSlider">
        <div className="swiper-button image-swiper-button-next">
          <IoIosArrowForward />
        </div>
        <div className="swiper-button image-swiper-button-prev">
          <IoIosArrowBack />
        </div>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={30}
          loop={true}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
          }}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 30,
            },
          }}
        >
          {items && items.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="rpContainer">
                <div className="rpImages" onClick={scrollToTop}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rpFrontImg object-cover"
                  />
                  <img
                    src={product.image} // Replaced backImg with image as original code used product.backImg which likely doesn't exist
                    className="object-contain rpBackImg"
                    alt={`${product.title} back view`}
                  />
                  <h4>Add to Cart</h4>
                </div>

                <div className="relatedProductInfo">
                  <div className="rpCategoryWishlist">
                    <p>Dresses</p>
                    <FiHeart
                      onClick={() => handleWishlistClick(product.id)}
                      style={{
                        color: wishList[product.id]
                          ? "red"
                          : "#767676",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div className="productNameInfo">
                    <h5 onClick={scrollToTop}>{product.title}</h5>
                    <p>${product.price}</p>
                    <div className="productRatingReviews">
                      <div className="productRatingStar">
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                      </div>

                      <span>{product.rating?.rate || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;