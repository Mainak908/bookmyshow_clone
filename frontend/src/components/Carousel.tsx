"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FlipkartBanner = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, // Enable center mode
    centerPadding: "20%",
  };

  return (
    <div className="carousel-container w-full ">
      <div className="carousel">
        <Slider {...settings}>
          <div className="slider ">
            <img src="banner1.webp" alt="Banner 1" className="" />
          </div>
          <div className="slider ">
            <img src="banner2.webp" alt="Banner 2" className="" />
          </div>
          <div className="slider">
            <img src="banner3.webp" alt="Banner 2" className="" />
          </div>
          <div className="slider ">
            <img src="banner4.webp" alt="Banner 2" className="" />
          </div>
          <div className="slider">
            <img src="banner5.webp" alt="Banner 2" className="" />
          </div>
          <div className="slider ">
            <img src="banner6.webp" alt="Banner 2" className="" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default FlipkartBanner;
