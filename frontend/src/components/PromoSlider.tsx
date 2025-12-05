// import React, { useRef, useState } from "react";
// import Slider from "react-slick";
// import img1 from '../assets/slider1/1.png';
// import img2 from '../assets/slider1/2.png';
// import img3 from '../assets/slider1/3.png';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Container from "./Container";

// const promos = [
//   {
//     image: img1,
//   },
//   {
//     image: img2,
//   },
//   {
//     image: img3,
//   },
//   {
//     image: img2,
//   },
// ];

// const PromoSlider: React.FC = () => {
//   const ref = useRef<Slider | null>(null);
//   const [current, setCurrent] = useState(0);

//   const settings = {
//     centerMode: true,
//     centerPadding: "0px",
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     infinite: true,
//     speed: 520,
//     dots: true,
//     arrows: false,
//     autoplay: true,
//     afterChange: (index: number) => setCurrent(index),
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: Math.min(3, promos.length),
//           centerPadding: "0px",
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(2, promos.length),
//           centerPadding: "0px",
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 1, centerPadding: "40px", arrows: false },
//       },
//       {
//         breakpoint: 640,
//         settings: { slidesToShow: 1, centerPadding: "24px", arrows: false },
//       },
//     ],
//     appendDots: (dots: React.ReactNode) => (
//       <div>
//         <ul className="flex items-center justify-center gap-2 mt-4">{dots}</ul>
//       </div>
//     ),
//     customPaging: (i: number) => (
//       <div
//         className={`w-4 h-4 flex items-center justify-center rounded-full ${i === current ? "bg-transparent" : "bg-amber-200"
//           }`}
//         aria-hidden
//       >
//         <div
//           className={`w-2 h-2 rounded-full ${i === current ? "bg-amber-500" : "bg-amber-400/80"
//             }`}
//         />
//       </div>
//     ),
//   };

//   return (
//     <section className="bg-white promoslider-sections">
//       <Container className="py-10 lg:py-12">
//         <div className="relative">
//           <Slider ref={ref} {...(settings as any)}>
//             {promos.map((p, idx) => (
//               <div key={idx} className="images">
//                 <div
//                 >
//                   <div className="relative flex items-center">
//                     <div className="overflow-hidden flex-shrink-0 border-4 border-white rounded p-0">
//                       <img
//                         src={p.image}
//                         alt="slider"
//                         style={{
//                           width: '398.3px',
//                           height: '199.15px',
//                           borderRadius: '20px',
//                           objectFit: 'cover'
//                         }}
//                         className="rounded object-cover"
//                       />
//                     </div>


//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </Container>


//     </section>
//   );
// };

// export default PromoSlider;

import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";

const PromoSlider: React.FC = () => {
  const ref = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);
  const [promos, setPromos] = useState([]);

  // -------------------- FETCH API --------------------
  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/promo-sliders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const activePromos = data.data
            .filter((item) => item.status === "active")
            .map((item) => ({
              image: "http://127.0.0.1:5001" + item.image_url,
            }));

          setPromos(activePromos);
        }
      })
      .catch((err) => console.log("Error fetching promos:", err));
  }, []);

  // If no data yet, show nothing (prevents empty slider error)
  if (promos.length === 0) return null;

  // -------------------- SLIDER SETTINGS --------------------
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    speed: 520,
    dots: true,
    arrows: false,
    autoplay: true,
    afterChange: (index: number) => setCurrent(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(3, promos.length),
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, promos.length),
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, centerPadding: "40px", arrows: false },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerPadding: "24px", arrows: false },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex items-center justify-center gap-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`w-4 h-4 flex items-center justify-center rounded-full ${
          i === current ? "bg-transparent" : "bg-amber-200"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            i === current ? "bg-amber-500" : "bg-amber-400/80"
          }`}
        />
      </div>
    ),
  };

  return (
    <section className="bg-white promoslider-sections">
      <Container className="py-10 lg:py-12">
        <div className="relative">
          <Slider ref={ref} {...settings}>
            {promos.map((p, idx) => (
              <div key={idx} className="images">
                <div>
                  <div className="relative flex items-center">
                    <div className="overflow-hidden flex-shrink-0 border-4 border-white rounded p-0">
                      <img
                        src={p.image}
                        alt="slider"
                        style={{
                          width: "398.3px",
                          height: "199.15px",
                          borderRadius: "20px",
                          objectFit: "cover",
                        }}
                        className="rounded object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default PromoSlider;
