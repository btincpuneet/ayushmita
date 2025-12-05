import React, { useState } from "react";
import AdditionalSpecialitiesCancer from "./AdditionalSpecialitiesCancer";
import CancerImage from "../../../assets/bileDuct.jpg";
import TreatmentHeader from "../TreatmentHeader";
import Container from "../../Container";
import Header from "../../Header";
import Footer from "../../Footer";
import ModalAppointment from "./ModalAppointment";

const BileDuctCancerTreatment = () => {
  const [openModal, setOpenModal] = useState(false);

  const data = {
    title: "Bile Duct Cancer Treatment",
    breadcrumb: {
      parent: "Cancer",
      parentLink: "/cancer",
    },

    overview: {
      title: "Overview",
      image: CancerImage,
      description: `
        Bile duct cancer, or cholangiocarcinoma, is a rare and aggressive tumor that begins in the bile ducts. 
        The ducts are thin tubes that carry bile from the liver and gallbladder to the small intestine. 
        This cancer is classified by location: intrahepatic (inside the liver), perihilar (at the duct junction), 
        or distal (near the small intestine). Symptoms appear late, such as jaundice, abdominal pain, or weight loss, 
        making early diagnosis difficult.
      `,
    },

    sections: [
      {
        heading: "Types of Bile Duct Cancer",
        description: "This health condition is of three different kinds. These are as follows:",
        items: [
          {
            bold: "Intrahepatic Cholangiocarcinoma:",
            text: "It mainly occurs in different parts of a bile duct inside the liver. This problem is uncommon and usually considered as liver cancer for patients."
          },
          {
            bold: "Distal Cholangiocarcinoma:",
            text: "A bile duct cancer usually develops outside the liver. This problem is rare and can affect 20 or 30 percent of individuals."
          },
          {
            bold: "Perihilar Cholangiocarcinoma:",
            text: "It mostly happens at the left and right junction of a bile duct. This problem affects 50 or 60 percent of persons, and its symptoms are similar to distal cholangiocarcinoma."
          }
        ],
      },

      {
        heading: "Symptoms of Bile Duct Cancer",
        description: "The symptoms of this health problem are as follows:",
        twoColumn: true,
        items: [
          { bold: "", text: "Nausea & vomiting" },
          { bold: "", text: "Dark urine" },
          { bold: "", text: "Light-colored stools" },
          { bold: "", text: "Jaundice" },
          { bold: "", text: "Abdominal pain" },
          { bold: "", text: "Unexplained weight loss" },
          { bold: "", text: "Fatigue" },
          { bold: "", text: "Fever & chills" },
          { bold: "", text: "Distended gallbladder" },
          { bold: "", text: "Itching (pruritus)" },
          { bold: "", text: "Loss of appetite" },
        ],
      },

      {
        heading: "Diagnosis of Bile Duct Cancer",
        description: "The diagnostic tests for this health condition are as follows:",
        items: [
          { bold: "Endoscopic Ultrasound:", text: "An endoscopy is combined with an ultrasound to capture the images from the gastrointestinal tract. This procedure is the same as upper endoscopy and mainly useful to diagnose bile duct cancer in patients." },
          { bold: "Angiography:", text: "A doctor uses this procedure for the evaluation of the blockage in bile duct and visualization of blood vessels around the tumor. " },
          { bold: "Gastrointestinal Endoscopy:", text: "A small and flexible instrument, known as endoscope, is inserted into an esophagus through the mouth or throat. It is attached with a camera for the examination of the digestive system. During this surgery, a patient might require a topic anesthetic or pain medicine. " },
          { bold: "Endoscopic Retrograde Cholangiography (ERCP):", text: "A special doctor injects a contrast material into a bile duct through an endoscope. He or she may also take X-ray images to highlight the abnormalities associated with cancer. During this surgery, a biopsy test might also be performed for the identification of a bile duct tissue. " },
          { bold: "Percutaneous Transhepatic Cholangiography:", text: " A small needle is attached with one of the bile ducts and a contrast material is injected through this device. After injecting, a doctor might take X-ray images to view the biliary tree. This procedure is better than ERCP since it will allow direct access to a bile duct. " },
          { bold: "Cholangioscopy:", text: "A special endoscopic device, known as, cholangioscopy is inserted inside the bile duct, in which a doctor can view the tumor easily. This diagnostic procedure will be performed during an ERCP surgery. " },
        ],
      },

      {
        heading: "Bile Duct Cancer Treatment Options",
        description: "Bile duct cancer can be treated in several ways. These include the following:",
        items: [
          { bold: "Surgery:", text: ": It involves the removal of a bile duct fully or partially. This treatment approach is also recommended for the management of a blocked duct. " },
          { bold: "Chemotherapy:", text: "The powerful medication drugs are used to destroy cancer cells or shrink tumors in patients. They can be infused into a vein and travel throughout the body. This surgical method is performed before a liver transplant surgery. It is helpful for advanced cholangiocarcinoma which helps to slow down the disease and relieve its signs and symptoms. " },
          { bold: "Immunotherapy:", text: "A doctor uses checkpoint inhibitors, which help the immune system to fight with cancer cells. This treatment approach is mainly suitable for advanced bile duct cancer, when other techniques are unable to manage this health problem. " },
          { bold: "Radiation Therapy:", text: "The high-powered energy beams are used for the protection of cancer cells. It involves a machine in which radiation is directed towards the tumor. A healthcare provider uses tiny beads of radiation, which may be implanted in the blood vessels. This surgery helps to shrink tumors and provides protection from this health condition. " },
          { bold: "Biliary Drainage:", text: ": A thin tube is placed into a bile duct to drain out the unhealthy bile fluid. This helps to relieve obstruction in this canal and alleviate symptoms like jaundice, itching, and many more. " },
        ],
      },
    ],
  };

  return (
    <div className="w-full bg-white">
      <Header />

      <TreatmentHeader
        title={data.title}
        parentName={data.breadcrumb.parent}
        parentLink={data.breadcrumb.parentLink}
        highlightColor="#F0A324"
        bgColor="#faf7ee"
      />


      <Container>
        <div className="py-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 rounded-lg">
            <div>
              <img
                src={data.overview.image}
                alt="Overview"
                className="rounded-lg w-full shadow"
              />
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-3 text-gray-800">
                {data.overview.title}
              </h2>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {data.overview.description}
              </p>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-[#F0A324] mt-5 hover:bg-orange-500 text-white font-medium px-6 py-3 rounded"
              >
                Book An Appointment
              </button>

            </div>
          </div>


          <div className="mt-16 space-y-16">
            {data.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {section.heading}
                </h2>

                <p className="text-gray-600 mb-4">{section.description}</p>

                <ul
                  className={`${section.twoColumn
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : ""
                    }`}
                >
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">

                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2"></span>


                      <p className="text-gray-700 leading-relaxed">
                        {item.bold && (
                          <span className="font-semibold text-gray-800">
                            {item.bold}{" "}
                          </span>
                        )}
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>


        </div>
      </Container>

      <div className="mt-20">
        <AdditionalSpecialitiesCancer />
      </div>
      <ModalAppointment isOpen={openModal} onClose={() => setOpenModal(false)} />

      <Footer />
    </div>
  );
};

export default BileDuctCancerTreatment;
