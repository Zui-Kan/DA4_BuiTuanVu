import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { uploads } from "../constant/api";
function AsNavFor(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  return (
    <>
      <div className="slider-for">
        <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
          {JSON.parse(props.data?.modelXe.DSHinhAnhXe).map((hinhAnh, index) => (
            <div className="slider-anhto" key={index}>
              <img src={`${uploads()}${hinhAnh}`} style={{ width: "100%" }} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="slider-nav">
        <Slider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {JSON.parse(props.data?.modelXe.DSHinhAnhXe).map((hinhAnh, index) => (
            <div className="slider-anhnho" key={index}>
              <img src={`${uploads()}${hinhAnh}`} style={{ width: "100%" }} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default AsNavFor;
