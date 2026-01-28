const { Disease } = require("./disease");
const { Treatment } = require("./treatment");
const { Doctor } = require("./doctor");
const { TopPartnerHospital } = require("./topPartnerHospital");
const { RelationHospitalDoctor } = require("./relationHospitalDoctor");
const { TopPartnerHospitalSpecialities } = require("./topPartnerHospitalSpecialities");
const { FAQ } = require("./faq");

Disease.hasMany(Treatment, {
  as: "treatments",
  foreignKey: "disease_id",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Treatment.belongsTo(Disease, {
  as: "disease",
  foreignKey: "disease_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Doctor.belongsToMany(TopPartnerHospital, {
  through: RelationHospitalDoctor,
  as: "hospitals",
  foreignKey: "doctor_id",
  otherKey: "hospital_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Doctor.belongsTo(Disease, {
  foreignKey: "speciality_id",
  as: "speciality",
});

Disease.hasMany(Doctor, {
  foreignKey: "speciality_id",
  as: "doctors",
});



TopPartnerHospital.belongsToMany(Disease, {
  through: "top_partner_hospital_diseases",
  as: "specialities", 
  foreignKey: "top_partner_hospital_id",
  otherKey: "disease_id",
});

Disease.belongsToMany(TopPartnerHospital, {
  through: "top_partner_hospital_diseases",
  as: "partnerHospitals", 
  foreignKey: "disease_id",
  otherKey: "top_partner_hospital_id",
});

FAQ.belongsTo(TopPartnerHospital, {
  foreignKey: "hospital_id",
  as: "hospital",
});

FAQ.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  as: "doctor",
});

TopPartnerHospital.hasMany(FAQ, {
  foreignKey: "hospital_id",
});

Doctor.hasMany(FAQ, {
  foreignKey: "doctor_id",
});


module.exports = {
  Disease,
  Treatment,
  Doctor,
  FAQ,
  TopPartnerHospital,
  RelationHospitalDoctor,
  TopPartnerHospitalSpecialities,

};
