// import React, { useEffect, useState } from "react";
// import Slider, { Settings } from "react-slick";
// import axios from "axios";
// import { API_BASE } from "../config/api";
// import "../css/responsive.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Link } from "react-router-dom";

// /* -------------------- Types -------------------- */

// interface Hospital {
//   id: number;
//   name: string;
//   slug: string;
//   city: string;
//   country: string;
//   image_url: string;
// }

// interface ArrowProps {
//   onClick?: () => void;
// }

// /* -------------------- Constants -------------------- */

// const API = `${API_BASE}/api/hospitals`;

// /* -------------------- Arrow Components -------------------- */

// const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
//   <div
//     onClick={onClick}
//     className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center cursor-pointer z-10"
//   >
//     <svg
//       width="34"
//       height="18"
//       viewBox="0 0 34 18"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M26.95 10.4811L22.65 15.0054L25 17.4685L33.3333 8.73424L25 0L22.65 2.46305L26.95 6.98739H0V10.4811H26.95Z"
//         fill="#F0A324"
//       />
//     </svg>
//   </div>
// );

// const PrevArrow: React.FC<ArrowProps> = () => <span />;

// /* -------------------- Component -------------------- */

// const TopPartnerHospitals: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);

//   const fetchHospitals = async (): Promise<void> => {
//     try {
//       const res = await axios.get<{ data: Hospital[] }>(API);
//       setHospitals(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching hospitals:", err);
//     }
//   };

//   useEffect(() => {
//     fetchHospitals();
//   }, []);
//   const settings: Settings = {
//     dots: true,
//     infinite: true,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     speed: 500,

//     slidesToShow: 3,
//     slidesToScroll: 1,

//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           centerMode: true,
//           centerPadding: "16px",
//         },
//       }

//     ],
//   };


//   return (
//     <section className="mb-14">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="text-center partner-hos-pital">
//           <h2 className="text-[32px] font-bold" style={{ fontFamily: "Ubuntu" }}>
//             Top Partner Hospitals
//           </h2>
//           <p
//             className="mt-3 text-gray-600 max-w-md mx-auto"
//             style={{ fontFamily: "Ubuntu", fontSize: "16px" }}
//           >
//             Explore our trusted partner hospitals across India.
//           </p>
//         </div>

//         <div className="relative">
//           <Slider {...settings}>
//             {hospitals.map((h) => (
//               <div key={h.id} className="top-partner-hospitals-sections">
//                 <Link to={`/hospitals/${h.slug}`}>
//                   <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition hover:shadow-xl hover:-translate-y-1.5 cursor-pointer">
//                     <div className="overflow-hidden rounded-xl">
//                       <img
//                         src={`${API_BASE}${h.image_url}`}
//                         alt={h.name}
//                         title={h.name}
//                         className="w-full h-[280px] object-cover rounded-lg"
//                       />
//                     </div>

//                     <div className="p-4">
//                       <h3
//                         className="font-semibold text-[15px]"
//                         style={{ fontFamily: "Ubuntu" }}
//                       >
//                         {h.name}
//                       </h3>
//                       <p
//                         className="text-gray-500 text-[13px]"
//                         style={{ fontFamily: "Ubuntu" }}
//                       >
//                         {h.city}, {h.country}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>


//     </section>
//   );
// };

// export default TopPartnerHospitals;
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import axios from "axios";
import { API_BASE } from "../config/api";
import "../css/responsive.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


interface Hospital {
  id: number;
  name: string;
  slug: string;
  city: string;
  country: string;
  image_url: string;
}

interface ArrowProps {
  onClick?: () => void;
}


const API = `${API_BASE}/api/hospitals`;


const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center cursor-pointer z-10"
  >
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.95 10.4811L22.65 15.0054L25 17.4685L33.3333 8.73424L25 0L22.65 2.46305L26.95 6.98739H0V10.4811H26.95Z"
        fill="#F0A324"
      />
    </svg>
  </div>
);

const PrevArrow: React.FC<ArrowProps> = () => <span />;


const TopPartnerHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchHospitals = async (): Promise<void> => {
    try {
      const res = await axios.get<{ data: Hospital[] }>(API);
      setHospitals(res.data.data || []);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // const settings: Settings = {
  //   dots: true,
  //   infinite: true,
  //   arrows: true,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   speed: 500,

  //   slidesToShow: 3,
  //   slidesToScroll: 1,

  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: false,
  //       },
  //     },
  //   ],
  // };


  const settings: Settings = {
  dots: true,
  infinite: hospitals.length > 3,
  arrows: !isMobile,
  speed: 500,

  slidesToShow: isMobile ? 1 : 3,
  slidesToScroll: 1,

  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,

  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

  return (
    <section className="mb-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center partner-hos-pital">
          <h2 className="text-[32px] font-bold" style={{ fontFamily: "Ubuntu" }}>
            Top Partner Hospitals
          </h2>
          <p
            className="mt-3 text-gray-600 max-w-md mx-auto"
            style={{ fontFamily: "Ubuntu", fontSize: "16px" }}
          >
            Explore our trusted partner hospitals across India.
          </p>
        </div>

        <div className="relative">
          <Slider  {...settings}  key={`${hospitals.length}-${isMobile}`} >
            {hospitals.map((h) => (
              <div key={h.id} className="px-3">
                <Link to={`/hospitals/${h.slug}`}>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition hover:-translate-y-1.5 cursor-pointer h-full">
                    <div className="overflow-hidden rounded-t-xl">
                      <img
                        src={`${API_BASE}${h.image_url}`}
                        alt={h.name}
                        title={h.name}
                        className="w-full h-[280px] object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3
                        className="font-semibold text-[15px]"
                        style={{ fontFamily: "Ubuntu" }}
                      >
                        {h.name}
                      </h3>
                      <p
                        className="text-gray-500 text-[13px]"
                        style={{ fontFamily: "Ubuntu" }}
                      >
                        {h.city}, {h.country}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

        <style>{`
        .slick-slide > div {
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .slick-dots li button { display: none; }
        .slick-dots li { margin: 0 4px; }

        .dot-outer {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          // background: #fbbf24;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot-inner {
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #f59e0b;
        }

        .slick-dots li.slick-active .dot-outer {
          width: 14px;
          height: 14px;
          background: transparent;
          border: 1px solid #be7c0bff;
        }

        .slick-dots li.slick-active .dot-inner {
          width: 6px;
          height: 6px;
        }
      `}</style>
    </section>
  );
};

export default TopPartnerHospitals;
