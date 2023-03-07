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
  MajorIndicator,
} = require('./join-table-models/majorIndicator.model.js');
const {
  MajorIndicatorYear,
} = require('./join-table-models/majorIndicatorYear.model.js');
const {
  FacultyIndicator,
} = require('./join-table-models/facultyIndicator.model.js');

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
model.MajorIndicator = MajorIndicator;
model.MajorIndicatorYear = MajorIndicatorYear;
model.FacultyIndicator = FacultyIndicator;

// One-to-Many (User & Role)
model.Role.hasMany(model.User, { foreignKey: 'role_id' });
model.User.belongsTo(model.Role, { foreignKey: 'role_id' });

// One-to-Many (user & Indicator)
model.User.hasMany(model.Indicator, { foreignKey: 'created_by' });
model.Indicator.belongsTo(model.User, { foreignKey: 'created_by' });

// Many-to-Many
model.Indicator.belongsToMany(model.Major, {
  through: model.MajorIndicator,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Major.belongsToMany(model.Indicator, {
  through: model.MajorIndicator,
  foreignKey: 'major_id',
  timestamps: false,
});
model.MajorIndicator.belongsTo(model.Indicator, { foreignKey: 'indicator_id' });
model.MajorIndicator.belongsTo(model.Major, { foreignKey: 'major_id' });
model.Indicator.hasMany(model.MajorIndicator, { foreignKey: 'indicator_id' });
model.Major.hasMany(model.MajorIndicator, { foreignKey: 'major_id' });

// Many-to-Many
model.Year.belongsToMany(model.MajorIndicator, {
  through: model.MajorIndicatorYear,
  foreignKey: 'year_id',
  timestamps: false,
});
model.MajorIndicator.belongsToMany(model.Year, {
  through: model.MajorIndicatorYear,
  foreignKey: 'major_indicator_id',
  timestamps: false,
});
model.MajorIndicatorYear.belongsTo(model.Year, { foreignKey: 'year_id' });
model.MajorIndicatorYear.belongsTo(model.MajorIndicator, {
  foreignKey: 'major_indicator_id',
});
model.Year.hasMany(model.MajorIndicatorYear, { foreignKey: 'year_id' });
model.MajorIndicator.hasMany(model.MajorIndicatorYear, {
  foreignKey: 'major_indicator_id',
});

// One-to-Many (Target & quarter)
model.TargetQuarters.hasMany(model.MajorIndicatorYear, {
  foreignKey: 'target_quarter_id',
});
model.MajorIndicatorYear.belongsTo(model.TargetQuarters, {
  foreignKey: 'target_quarter_id',
});

// Many-to-Many
model.Indicator.belongsToMany(model.Year, {
  through: model.FacultyIndicator,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Year.belongsToMany(model.Indicator, {
  through: model.FacultyIndicator,
  foreignKey: 'year_id',
  timestamps: false,
});
model.FacultyIndicator.belongsTo(model.Indicator, {
  foreignKey: 'indicator_id',
});
model.FacultyIndicator.belongsTo(model.Year, { foreignKey: 'year_id' });
model.Indicator.hasMany(model.FacultyIndicator, { foreignKey: 'indicator_id' });
model.Year.hasMany(model.FacultyIndicator, { foreignKey: 'year_id' });

// One-to-Many
model.TargetQuarters.hasMany(model.FacultyIndicator, {
  foreignKey: 'target_quarter_id',
});
model.FacultyIndicator.belongsTo(model.TargetQuarters, {
  foreignKey: 'target_quarter_id',
});

module.exports = model;
