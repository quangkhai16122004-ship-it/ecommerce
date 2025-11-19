import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick';

const SliderComponent = ({arrImages}) => {
  var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
    };
    return (
      <Slider {...settings}>
        {arrImages.map((images)=>{
          return(
            <Image src={images} alt="slider" key={images} preview={false} width="100%" height="300px"/>
          )
        })}
      </Slider>
    )
}
export default SliderComponent