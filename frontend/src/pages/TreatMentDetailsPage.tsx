import React from "react";
import { useParams } from "react-router-dom";

const TreatMentDetailsPage = () => {
  const { slug } = useParams();

  const treatmentName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const treatment = {
    id: 1,
    name: treatmentName,
    image: "/uploads/treatments/sample.jpg",
    short_description: `This is a short summary about ${treatmentName}.`,
    description_html: `<p>This is <strong>HTML description</strong> for ${treatmentName}.</p>`,
    seo_title: `${treatmentName} - SEO Title`,
    seo_description: `${treatmentName} SEO description goes here.`,
    seo_keywords: "cancer,treatment,india",
    canonical_url: `https://example.com/${slug}`,
    status: 1,
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{treatment.name}</h2>

      <img
        src={treatment.image}
        alt={treatment.name}
        width="300"
        style={{ borderRadius: "10px", marginTop: "15px" }}
      />

      <p style={{ marginTop: "12px" }}>
        <strong>Short Description:</strong> {treatment.short_description}
      </p>

      <div
        dangerouslySetInnerHTML={{ __html: treatment.description_html }}
        style={{ marginTop: "20px", background: "#fafafa", padding: "15px", borderRadius: "8px" }}
      />

      <h3 style={{ marginTop: "25px" }}>SEO Information</h3>
      <p><strong>SEO Title:</strong> {treatment.seo_title}</p>
      <p><strong>SEO Description:</strong> {treatment.seo_description}</p>
      <p><strong>Keywords:</strong> {treatment.seo_keywords}</p>
      <p><strong>Canonical URL:</strong> {treatment.canonical_url}</p>
      <p>
        <strong>Status:</strong>{" "}
        {treatment.status === 1 ? "Active" : "Inactive"}
      </p>
    </div>
  );
};

export default TreatMentDetailsPage;
