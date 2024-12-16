import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Footer.css';
import Footer from './Footer';


const StickyText = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const stickyBar = document.querySelector(".sticky-bar");
        const footerTrigger = document.querySelector(".trigger-footer");

        if (!stickyBar || !footerTrigger) {
            console.error("StickyBar or FooterTrigger not found in the DOM.");
            return;
        }

        const footerTriggerHeight = footerTrigger.offsetHeight;

        // Sticky bar font size change on scroll
        ScrollTrigger.create({
            trigger: footerTrigger,
            start: () => `top+=${footerTriggerHeight - (window.innerHeight + 100)}`,
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const fontSizeStart = window.innerWidth < 900 ? 2.5 : 1.25;
                const fontSizeEnd = 9;
                const newFontSize = fontSizeStart + (fontSizeEnd - fontSizeStart) * self.progress;
                
                stickyBar.querySelectorAll("p").forEach((p) => {
                    p.style.fontSize = `${newFontSize}vw`;
                });
                console.log("Font size updated:", newFontSize); // Debugging log
            }
        });

        // Sticky bar position change on scroll
        ScrollTrigger.create({
            trigger: footerTrigger,
            start: "top bottom",
            end: () => `top+=${footerTriggerHeight - window.innerHeight} center`,
            scrub: true,
            onUpdate: (self) => {
                const startTop = 50;
                const endTop = 92;
                const newTop = startTop + (endTop - startTop) * self.progress;
                stickyBar.style.top = `${newTop}%`;
                console.log("Position updated:", newTop); // Debugging log
            }
        });

        // Clean up function to remove ScrollTriggers on component unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className='st_container'>
            <div className="sticky-bar">
                <div className="item  pb-24 px-10"><p>Fashion</p></div>
                <div className="item pb-24 px-10"><p></p></div>
                <div className="item pb-24 px-10"><p>Love</p></div>
            </div>
            <div className="trigger-footer" >
            <Footer/></div>     

        </div>
    );
};

export default StickyText;
