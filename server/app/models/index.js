const db = require('../config/db.config.js');

// import models
const { Role } = require('./role.model.js');
const { User } = require('./user.model.js');
const { Indicator } = require('./indicator.model.js');
const { Major } = require('./major.model.js');
const { TargetQuarters } = require('./TargetQuarters.model.js');
const { Year } = require('./year.model.js');

// import join models
const {
  IndicatorMajor,
} = require('./join-table-models/indicatorMajor.model.js');
const {
  IndicatorMajorYear,
} = require('./join-table-models/indicatorMajorYear.model.js');

const model = {};

// assign db
model.db = db;

// assign model
model.Role = Role;
model.User = User;
model.Indicator = Indicator;
model.Major = Major;
model.TargetQuarters = TargetQuarters;
model.Year = Year;
model.IndicatorMajor = IndicatorMajor;
model.IndicatorMajorYear = IndicatorMajorYear;

// One-to-Many (User & Role)
model.Role.hasMany(model.User, { foreignKey: 'role_id' });
model.User.belongsTo(model.Role, { foreignKey: 'role_id' });

// One-to-Many (user & Indicator)
model.User.hasMany(model.Indicator, { foreignKey: 'created_by' });
model.Indicator.belongsTo(model.User, { foreignKey: 'created_by' });

// Many-to-Many (Indicator, Year)
model.Indicator.belongsToMany(model.Major, {
  through: model.IndicatorMajor,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Major.belongsToMany(model.Indicator, {
  through: model.IndicatorMajor,
  foreignKey: 'major_id',
  timestamps: false,
});
model.IndicatorMajor.belongsTo(model.Indicator, { foreignKey: 'indicator_id' });
model.IndicatorMajor.belongsTo(model.Major, { foreignKey: 'major_id' });
model.Indicator.hasMany(model.IndicatorMajor, { foreignKey: 'indicator_id' });
model.Major.hasMany(model.IndicatorMajor, { foreignKey: 'major_id' });

// Many-to-Many
model.Year.belongsToMany(model.IndicatorMajor, {
  through: model.IndicatorMajorYear,
  foreignKey: 'year_id',
  timestamps: false,
});
model.IndicatorMajor.belongsToMany(model.Year, {
  through: model.IndicatorMajorYear,
  foreignKey: 'indicator_major_id',
  timestamps: false,
});
model.IndicatorMajorYear.belongsTo(model.Year, { foreignKey: 'year_id' });
model.IndicatorMajorYear.belongsTo(model.IndicatorMajor, {
  foreignKey: 'indicator_major_id',
});
model.Year.hasMany(model.IndicatorMajorYear, { foreignKey: 'year_id' });
model.IndicatorMajor.hasMany(model.IndicatorMajorYear, {
  foreignKey: 'indicator_major_id',
});

// One-to-Many (Target & quarter)
model.TargetQuarters.hasMany(model.IndicatorMajorYear, {
  foreignKey: 'target_quarter_id',
});
model.IndicatorMajorYear.belongsTo(model.TargetQuarters, {
  foreignKey: 'target_quarter_id',
});

module.exports = model;
