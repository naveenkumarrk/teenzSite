import React from 'react'
import HeroSection from './../components/Home/HeroSection';
import StickyText from './../components/Footer/StickyText';
import RelatedProducts from './../components/Products/RelatedProducts/RelatedProducts';

const HomePage = () => {
  return (
    <>
    <div className="">
    <HeroSection/>
    <div className="h-[100vh] mt-36">
    <RelatedProducts/>
    </div>
    <StickyText/>
    </div>  
    </>
  )
}

export default HomePage