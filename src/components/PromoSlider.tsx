// import React, { useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Container from "./Container";

// const promos = [
//   {
//     title: "Get Rs 100 OFF",
//     subtitle: "On Doctor Consultation",
//     buttonText: "GRAB NOW",
//     bgColor: "bg-purple-100",
//     image:
//       "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=400&fit=crop",
//   },
//   {
//     title: "FLAT 30% OFF",
//     subtitle: "ON VIDEO CONSULTATION",
//     code: "USE CODE : FIRST30",
//     brand: "zoutons",
//     bgColor: "bg-gray-900",
//     textColor: "text-white",
//     image:
//       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
//   },
//   {
//     title: "Get Rs 100 OFF",
//     subtitle: "On Doctor Consultation",
//     buttonText: "GRAB NOW",
//     bgColor: "bg-purple-100",
//     image:
//       "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=400&fit=crop",
//   },
//   {
//     title: "Get Rs 100 OFF",
//     subtitle: "On Doctor Consultation",
//     buttonText: "GRAB NOW",
//     bgColor: "bg-purple-100",
//     image:
//       "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=400&fit=crop",
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
//         className={`w-4 h-4 flex items-center justify-center rounded-full ${
//           i === current ? "bg-transparent" : "bg-amber-200"
//         }`}
//         aria-hidden
//       >
//         <div
//           className={`w-2 h-2 rounded-full ${
//             i === current ? "bg-amber-500" : "bg-amber-400/80"
//           }`}
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
//               <div key={idx} className="px-3">
//                 <div
//                   className={`${p.bgColor} ${
//                     p.textColor || "text-gray-800"
//                   } rounded-[18px] overflow-hidden transition-transform duration-300`}
//                   style={{ height: 220 }}
//                 >
//                   <div className="relative h-full flex items-center p-6">
//                     {/* Left text */}
//                     <div className="flex-1 space-y-2">
//                       <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
//                         {p.title}
//                       </h3>
//                       <p className="text-sm md:text-base font-medium">
//                         {p.subtitle}
//                       </p>

//                       {p.code && (
//                         <p className="mt-1 font-semibold text-amber-400">
//                           {p.code}
//                         </p>
//                       )}
//                       {p.brand && (
//                         <p className="mt-1 font-bold uppercase">{p.brand}</p>
//                       )}

//                       {p.buttonText && (
//                         <button className="mt-3 inline-block bg-amber-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
//                           {p.buttonText}
//                         </button>
//                       )}
//                     </div>

//                     {/* Right image circular */}
//                     <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ml-4 flex-shrink-0 border-4 border-white">
//                       <img
//                         src={p.image}
//                         alt={p.title}
//                         className="w-full h-full object-cover"
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
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";

const API_URL = "http://127.0.0.1:5001/api/promo-sliders";

interface PromoAPI {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  discount_text: string | null;
  code_text: string | null;
  image_url: string;
  button_text: string | null;
  status: string;
}

const PromoSlider: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [promos, setPromos] = useState<PromoAPI[]>([]);
  const [current, setCurrent] = useState(0);

  // Fetch from API
  useEffect(() => {
    async function getPromos() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          // only active ones
          const activePromos = json.data.filter(
            (p: PromoAPI) => p.status === "active"
          );
          setPromos(activePromos);
        }
      } catch (err) {
        console.log("Error fetching promos:", err);
      }
    }

    getPromos();
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: Math.min(3, promos.length || 1),
    slidesToScroll: 1,
    infinite: promos.length > 1,
    speed: 450,
    dots: true,
    arrows: false,
    autoplay: true,
    afterChange: (i: number) => setCurrent(i),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, centerPadding: "30px" },
      },
    ],
    appendDots: (dots: any) => (
      <div>
        <ul className="flex justify-center gap-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`w-3 h-3 rounded-full ${
          i === current ? "bg-amber-500" : "bg-gray-300"
        }`}
      />
    ),
  };

  return (
    <section className="bg-white">
      <Container className="py-10 lg:py-12">
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {promos.map((p) => (
              <div key={p.id} className="px-3">
                <div
                  className="bg-purple-100 text-gray-900 rounded-2xl overflow-hidden"
                  style={{ height: 220 }}
                >
                  <div className="flex items-center h-full p-6">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-extrabold">{p.title}</h3>

                      {p.subtitle && (
                        <p className="text-sm font-medium">{p.subtitle}</p>
                      )}

                      {p.code_text && (
                        <p className="text-amber-500 font-semibold">
                          {p.code_text}
                        </p>
                      )}

                      {p.button_text && (
                        <button className="mt-3 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {p.button_text}
                        </button>
                      )}
                    </div>

                    {/* Right circular image */}
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white ml-4 flex-shrink-0">
                      <img
                        src={`http://127.0.0.1:5001${p.image_url}`}
                        alt={p.title}
                        className="w-full h-full object-cover"
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
