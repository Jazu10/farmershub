import React from "react";
import { Carousel } from "react-responsive-carousel";

function Banner() {
    return (
        <div className="relative -mt-2 md:-mt-10">
            <div className="absolute w-full h-20 md:h-32 bg-gradient-to-t from-gray-200 to-transparent bottom-0 z-10"></div>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={3000}
                className="lg:px-10">
                <div>
                    <img loading="lazy" src="./1.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="./3.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="./4.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="./6.jpg" alt="" />
                </div>
            </Carousel>
        </div>
    );
}

export default Banner;
