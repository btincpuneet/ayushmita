// const { Disease } = require('./disease');
// const { Treatment } = require('./treatment');

// Disease.hasMany(Treatment, {
//   as: 'treatments',
//   foreignKey: 'disease_id',
//   sourceKey: 'id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// Treatment.belongsTo(Disease, {
//   as: 'disease',
//   foreignKey: 'disease_id',
//   targetKey: 'id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// module.exports = { Disease, Treatment };
const { Disease } = require("./disease");
const { Treatment } = require("./treatment");
const { Doctor } = require("./doctor");
const { TopPartnerHospital } = require("./topPartnerHospital");
const { RelationHospitalDoctor } = require("./relationHospitalDoctor");

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

TopPartnerHospital.belongsToMany(Doctor, {
  through: RelationHospitalDoctor,
  as: "doctors",
  foreignKey: "hospital_id",
  otherKey: "doctor_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  Disease,
  Treatment,
  Doctor,
  TopPartnerHospital,
  RelationHospitalDoctor,
};
