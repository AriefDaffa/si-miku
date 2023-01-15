const db = require('../config/db.config.js');
const Role = require('./role.model.js');
const User = require('./user.model.js');
const {
  Indicator,
  TargetAndQuarter,
  Year,
  IndicatorMajor,
} = require('./indicator.model.js');
const { Jurusan } = require('./jurusan.model');

const model = {};

// assign db
model.db = db;

// assign model
model.role = Role;
model.user = User;
model.Indicator = Indicator;
model.TargetAndQuarter = TargetAndQuarter;
model.Year = Year;
model.Jurusan = Jurusan;
model.IndicatorMajor = IndicatorMajor;

// One-to-Many (User & Role)
model.role.hasMany(model.user, { foreignKey: 'role_id' });
model.user.belongsTo(model.role, { foreignKey: 'role_id' });

// One-to-Many (user & Indicator)
model.user.hasMany(model.Indicator, { foreignKey: 'created_by' });
model.Indicator.belongsTo(model.user, { foreignKey: 'created_by' });

// Many-to-Many (Indicator & Year)
model.Indicator.belongsToMany(model.Year, {
  through: model.TargetAndQuarter,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Year.belongsToMany(model.Indicator, {
  through: model.TargetAndQuarter,
  foreignKey: 'year_id',
  timestamps: false,
});

// Many-to-Many (Indicator & Jurusan)
model.Indicator.belongsToMany(model.Jurusan, {
  through: model.IndicatorMajor,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Jurusan.belongsToMany(model.Indicator, {
  through: model.IndicatorMajor,
  foreignKey: 'major_id',
  timestamps: false,
});

module.exports = model;
