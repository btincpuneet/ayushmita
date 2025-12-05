import React from "react";
import Container from "../Container";

const TreatmentDescription = () => {
  const treatmentDescriptionData = [
    {
      id: 1,
      title:
        "Medical Treatment in India: A Gateway to Quality and Affordable Healthcare",
      description: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      `,
    },
    {
      id: 2,
      title: "Importance of Medical Treatment in India",
      description: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
      `,
    },
  ];

  return (
    <section className="pt-12">
      <Container>
        {treatmentDescriptionData.map((item) => (
          <div
            key={item.id}
            className="mb-12 max-w-4xl mx-auto text-left"
          >
           
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              {item.title}
            </h2>

            
            <p className="text-gray-600 text-base md:text-lg leading-7 whitespace-pre-line">
              {item.description}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default TreatmentDescription;
