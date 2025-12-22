import React from "react";
import Container from "../Container";
import cancerImg from "../../assets/treatment.jpg";

export default function CardiologySection() {
  const items = [
    [
      "Angioplasty Surgery Treatment","Aortic Stenosis Treatment","Aortic Valve Repair Treatment",
      "Aortopulmonary window Treatment","Coarctation Of The Aorta Treatment","Coronary Angiography",
      "Heart Valve Repair Treatment","Hypertension Treatment","Pacemaker Implantation Treatment"
    ],
    [
      "Atrial Septal Defect","Balloon Mitral Valvuloplasty Treatment","Coronary Artery Disease Treatment",
      "Double Valve Replacement","Electrophysiology Study Treatment","Myocardial Bridge Treatment",
      "Rastelli Procedure","Rhythm Surgery"
    ],
    [
      "Atherosclerosis Treatment","Balloon Pulmonary Valvuloplasty Treatment","Cardiac Asthma Treatment",
      "Endoscopic Vein Harvesting","Heart Bypass Surgery Treatment","Pulmonary Artery Banding",
      "Ventricular Septal Defect Treatment"
    ]
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-16">  
      <Container> 

        <h2 className="text-3xl font-bold mb-10">Cardiology Treatment</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700 text-[15px]">
            {items.map((col, index) => (
              <div key={index}>
                {col.map((item) => (
                  <p key={item} className="mb-2">{item}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={cancerImg}
              alt="Cardiology Treatment"
              className="rounded-xl shadow-lg w-full max-w-[420px] h-auto object-cover"
            />
          </div>
        </div>

      </Container>
    </section>
  );
}
