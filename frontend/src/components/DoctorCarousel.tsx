import Slider from "react-slick";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

const doctors = [
  {
    name: "Chris Taylor",
    specialty: "General Medicine",
    image: doctor1,
  },
  {
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    image: doctor2,
  },
  {
    name: "Dr. Michael Ross",
    specialty: "Orthopedics",
    image: doctor3,
  },
  {
    name: "Dr. Emily Zhang",
    specialty: "Neurology",
    image: doctor4,
  },
];

const DoctorCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-10">
      <h2 className="section-title">
        Top Doctors at Acibadem Hospitals Group, Istanbul
      </h2>
      <div className="pb-12">
        <Slider {...settings}>
          {doctors.map((doctor, index) => (
            <div key={index} className="px-4">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-primary text-center">
                  {doctor.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {doctor.specialty}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default DoctorCarousel;
