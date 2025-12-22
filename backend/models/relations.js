const { Disease } = require('./disease');
const { Treatment } = require('./treatment');

Disease.hasMany(Treatment, {
  as: 'treatments',
  foreignKey: 'disease_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Treatment.belongsTo(Disease, {
  as: 'disease',
  foreignKey: 'disease_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = { Disease, Treatment };
