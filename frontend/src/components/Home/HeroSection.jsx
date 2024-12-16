import React, {useState, useEffect, useRef} from 'react';
// import TextSplit from './../TextSplit';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { View } from '@react-three/drei';
// import Scene from './../Canvas/Scene';
import ViewCanvas from './../Canvas/ViewCanvas';
import { WavyCircles } from './WavyCircles';

import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {


  const products = [
    {
      name: 'IPA',
      image: '/api/placeholder/400/500',
      alcohol: '5.5%',
      volume: '330 ML',
      description: 'This craft beer classic is brewed without fuss. With excellent quality water, grain, yeast and (a lot of) hops, we return to the essence of this icon. Our subtle flavours are meant to last, so have a seat, settle down and enjoy the moment.',
      ingredients: 'WATER, YEAST, ALCOHOL 5.5%',
      storage: '4°C - 6°C',
      color: '6 EBC',
      calories: '160',
      bitterness: '38 IBU',
      contains: 'CONTAINS GLUTEN'
    }
  ];
  
  const DESIGN = [
    {
      design: 'design1',
      name: 'Casual Black TShirt',
      image: '/labels/hawk.png',
      description: 'A comfortable and stylish black T-shirt made from 100% cotton. Perfect for casual outings or lounging at home.',
      color: '#710523',
      fabric: '100% Cotton',
      fit: 'Regular Fit',
      care: 'Machine wash cold, tumble dry low',
      size: 'S, M, L, XL',
      price: '$25.00',
      brand: 'Brand A',
      style: 'Casual',
    },
    {
      design: 'design2',
      name: 'Stylish White Hoodie',
      image: '/labels/social.png',
      description: 'A trendy white hoodie featuring a relaxed fit and soft fleece lining, ideal for chilly evenings and casual wear.',
      color: '#572981',
      fabric: '80% Cotton, 20% Polyester',
      fit: 'Loose Fit',
      care: 'Machine wash cold, do not iron print',
      size: 'S, M, L, XL',
      price: '$45.00',
      brand: 'Brand B',
      style: 'Casual',
    },
    {
      design: 'design3',
      name: 'Denim Blue Jeans',
      image: '/labels/travis.png',
      description: 'Classic denim jeans with a modern fit, crafted from high-quality cotton denim. A staple for any wardrobe.',
      color: '#164405',
      fabric: '98% Cotton, 2% Spandex',
      fit: 'Slim Fit',
      care: 'Machine wash cold, tumble dry medium',
      size: '28, 30, 32, 34',
      price: '$50.00',
      brand: 'Brand C',
      style: 'Casual',
    },];
  

    const [currentDesignIndex, setCurrentDesignIndex] = useState(0);

    function changeFlavour(direction) {
      const nextIndex =
        (currentDesignIndex + direction + DESIGN.length) % DESIGN.length;
      setCurrentDesignIndex(nextIndex);
    }
    
  gsap.registerPlugin(ScrollTrigger);

  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
     <div className="relative h-[200vh] overflow-hidden">
     <div
        className="background pointer-events-none absolute inset-0 opacity-50"
        style={{ backgroundColor: DESIGN[currentDesignIndex].color }}
      />
       
       <ViewCanvas currentDesign={DESIGN[currentDesignIndex]} />
      {/* First Section - Hero */}
      <div className='hero'>
      <div className='w-full h-[100vh]  flex items-center justify-center flex-col'>
      {/* <TextSplit text='Hard Punk' />
      <TextSplit text='Beats the sh*t out of '/>
      <TextSplit text='the fuss'/> */}

      <h1>This is a sample</h1>
    </div>

      {/* Second Section - Product Display */}
      <div className='z-[-100] w-full h-[100vh] pb-60 px-8 md:px-16 lg:px-30 grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
        
        {/* Left Column - Product Info */}
        <div className='space-y-44 text-center md:text-right z-50' >
          
          <div>
            <h1 className='text-[1rem] md:text-[2.5rem] font-bostonAngel leading-none'>{DESIGN[currentDesignIndex].name}</h1>
            <h1 className='text-[25px] md:text-[2rem] font-bostonAngel leading-none'>Leading product</h1>
            <p className='hidden md:block text-xl'>{DESIGN[currentDesignIndex].fit}</p>
          </div>
          
          <div className='hidden md:block mt-12'>
            <h2 className='text-2xl font-impact mb-2'>MATERIALS</h2>
            <p className='text-sm leading-relaxed'>
              {DESIGN[currentDesignIndex].fabric}
            </p>
          </div>
        </div>

        {/* Middle Column - Product Image */}
        <div className='relative h-[32rem] flex items-center justify-center'>
          <div className='h-[30rem] w-[23rem] rounded-3xl bg-white/20 backdrop-blur-sm p-8 border-dashed border-2 border-white-500'>
          </div>
          <WavyCircles
                className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 z-[-10]"
                fill={DESIGN[currentDesignIndex].color} // Pass the current design color as a prop
              />
          
          {/* Navigation */}
          <div className='absolute top-[35rem] bottom-[-5rem] left-1/2 transform -translate-x-1/2 flex items-center gap-8'>
            <button  onClick={() => changeFlavour(-1)}className='p-4 rounded-full hover:bg-white/10'>
              <ChevronLeft className='w-6 h-6' />
            </button>
            <div className='text-center'>
              <p>{DESIGN.length}</p>
              <p className='text-xl font-bold mt-2'>{DESIGN[currentDesignIndex].name}</p>
            </div>
            <button onClick={() => changeFlavour(1)} className='p-4 rounded-full hover:bg-white/10'>
              <ChevronRight className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className=' hidden md:block space-y-8'>
          <h2 className='text-2xl font-impact mb-[-2rem]'>SAVOUR THE PRODUCT DETAILS</h2>
          <p className='text-sm leading-relaxed'>
            {DESIGN[currentDesignIndex].description}
          </p>

          <div className='grid grid-cols-2 gap-4 mt-8 '>
            <div>
              <h3 className='text-sm font-bold mb-2 border-r-8'>SIZES</h3>
              <p>{DESIGN[currentDesignIndex].size}</p>
            </div>
            <div>
              <h3 className='text-sm font-bold mb-2'>CARE</h3>
              <p>{DESIGN[currentDesignIndex].care}</p>
            </div>
            <div>
              <h3 className='text-sm font-bold mb-2'>STYLE</h3>
              <p>{DESIGN[currentDesignIndex].style}</p>
            </div>
            <div>
              <h3 className='text-sm font-bold mb-2'>PRICE</h3>
              <p>{DESIGN[currentDesignIndex].price}</p>
            </div>
          </div>
          <button className='z-[10] px-4 py-2 bg-red-400 rounded-full hover:scale-3 text-black'>Shop Now</button>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
