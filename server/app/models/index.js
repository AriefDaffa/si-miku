const db = require('../config/db.config.js');

// import models
const { Role } = require('./role.model.js');
const { User } = require('./user.model.js');
const { Indicator } = require('./indicator.model.js');
const { Major } = require('./major.model.js');
const { TargetQuarters } = require('./TargetQuarters.model.js');
const { Year } = require('./year.model.js');
const { Department } = require('./department.model');
const { Faculty } = require('./faculty.model');
const { Supervisor } = require('./supervisor.model');

// import join models
const {
  IndicatorsMajor,
} = require('./join-table-models/indicatorsMajor.model');
const {
  IndicatorFaculty,
} = require('./join-table-models/indicatorsFaculty.model');
const {
  IndicatorDepartment,
} = require('./join-table-models/indicatorsDepartment.model');
//
const { TargetFaculty } = require('./join-table-models/TargetFaculty.model');
const { TargetDeps } = require('./join-table-models/TargetDeps.model');
const { TargetMajor } = require('./join-table-models/TargetMajor.model');

const model = {};

// assign db
model.db = db;

// assign model
model.Role = Role;
model.User = User;
model.Indicator = Indicator;
model.Year = Year;
model.Major = Major;
model.Department = Department;
model.Faculty = Faculty;
model.Supervisor = Supervisor;
model.TargetQuarters = TargetQuarters;
model.IndicatorsMajor = IndicatorsMajor;
model.IndicatorsFaculty = IndicatorFaculty;
model.IndicatorsDepartment = IndicatorDepartment;
model.TargetFaculty = TargetFaculty;
model.TargetDeps = TargetDeps;
model.TargetMajor = TargetMajor;

// One-to-Many (User & Role)
model.Role.hasMany(model.User, { foreignKey: 'role_id' });
model.User.belongsTo(model.Role, { foreignKey: 'role_id' });

// One-to-Many (user & Indicator)
model.User.hasMany(model.Indicator, { foreignKey: 'created_by' });
model.Indicator.belongsTo(model.User, { foreignKey: 'created_by' });

// year-target_quarter
model.Year.hasMany(model.TargetQuarters, { foreignKey: 'year_id' });
model.TargetQuarters.belongsTo(model.Year, { foreignKey: 'year_id' });

// year-target_quarter
model.Department.hasMany(model.Major, { foreignKey: 'department_id' });
model.Major.belongsTo(model.Department, { foreignKey: 'department_id' });

// indicator - supervisor
model.Supervisor.hasMany(model.Indicator, { foreignKey: 'supervised_by' });
model.Indicator.belongsTo(model.Supervisor, { foreignKey: 'supervised_by' });

// indicator Majors //
model.Indicator.belongsToMany(model.Major, {
  through: model.IndicatorsMajor,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Major.belongsToMany(model.Indicator, {
  through: model.IndicatorsMajor,
  foreignKey: 'major_id',
  timestamps: false,
});
model.IndicatorsMajor.belongsTo(model.Indicator, {
  foreignKey: 'indicator_id',
});
model.IndicatorsMajor.belongsTo(model.Major, { foreignKey: 'major_id' });
model.Indicator.hasMany(model.IndicatorsMajor, { foreignKey: 'indicator_id' });
model.Major.hasMany(model.IndicatorsMajor, { foreignKey: 'major_id' });

// indicator Department //
model.Indicator.belongsToMany(model.Department, {
  through: model.IndicatorsDepartment,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Department.belongsToMany(model.Indicator, {
  through: model.IndicatorsDepartment,
  foreignKey: 'department_id',
  timestamps: false,
});
model.IndicatorsDepartment.belongsTo(model.Indicator, {
  foreignKey: 'indicator_id',
});
model.IndicatorsDepartment.belongsTo(model.Department, {
  foreignKey: 'department_id',
});
model.Indicator.hasMany(model.IndicatorsDepartment, {
  foreignKey: 'indicator_id',
});
model.Department.hasMany(model.IndicatorsDepartment, {
  foreignKey: 'department_id',
});

// indicator Faculty //
model.Indicator.belongsToMany(model.Faculty, {
  through: model.IndicatorsFaculty,
  foreignKey: 'indicator_id',
  timestamps: false,
});
model.Faculty.belongsToMany(model.Indicator, {
  through: model.IndicatorsFaculty,
  foreignKey: 'faculty_id',
  timestamps: false,
});
model.IndicatorsFaculty.belongsTo(model.Indicator, {
  foreignKey: 'indicator_id',
});
model.IndicatorsFaculty.belongsTo(model.Faculty, {
  foreignKey: 'faculty_id',
});
model.Indicator.hasMany(model.IndicatorsFaculty, {
  foreignKey: 'indicator_id',
});
model.Faculty.hasMany(model.IndicatorsFaculty, {
  foreignKey: 'faculty_id',
});

// indicator year faculty
model.IndicatorsFaculty.belongsToMany(model.TargetQuarters, {
  through: model.TargetFaculty,
  foreignKey: 'indicator_faculty_id',
  timestamps: false,
});
model.TargetQuarters.belongsToMany(model.IndicatorsFaculty, {
  through: model.TargetFaculty,
  foreignKey: 'target_quarter_id',
  timestamps: false,
});
model.TargetFaculty.belongsTo(model.IndicatorsFaculty, {
  foreignKey: 'indicator_faculty_id',
});
model.TargetFaculty.belongsTo(model.TargetQuarters, {
  foreignKey: 'target_quarter_id',
});
model.IndicatorsFaculty.hasMany(model.TargetFaculty, {
  foreignKey: 'indicator_faculty_id',
});
model.TargetQuarters.hasMany(model.TargetFaculty, {
  foreignKey: 'target_quarter_id',
});

// indicator year department
model.IndicatorsDepartment.belongsToMany(model.TargetQuarters, {
  through: model.TargetDeps,
  foreignKey: 'indicator_department_id',
  timestamps: false,
});
model.TargetQuarters.belongsToMany(model.IndicatorsDepartment, {
  through: model.TargetDeps,
  foreignKey: 'target_quarter_id',
  timestamps: false,
});
model.TargetDeps.belongsTo(model.IndicatorsDepartment, {
  foreignKey: 'indicator_department_id',
});
model.TargetDeps.belongsTo(model.TargetQuarters, {
  foreignKey: 'target_quarter_id',
});
model.IndicatorsDepartment.hasMany(model.TargetDeps, {
  foreignKey: 'indicator_department_id',
});
model.TargetQuarters.hasMany(model.TargetFaculty, {
  foreignKey: 'target_quarter_id',
});

// indicator year major
model.IndicatorsMajor.belongsToMany(model.TargetQuarters, {
  through: model.TargetMajor,
  foreignKey: 'indicator_major_id',
  timestamps: false,
});
model.TargetQuarters.belongsToMany(model.IndicatorsMajor, {
  through: model.TargetMajor,
  foreignKey: 'target_quarter_id',
  timestamps: false,
});
model.TargetMajor.belongsTo(model.IndicatorsMajor, {
  foreignKey: 'indicator_major_id',
});
model.TargetMajor.belongsTo(model.TargetQuarters, {
  foreignKey: 'target_quarter_id',
});
model.IndicatorsMajor.hasMany(model.TargetMajor, {
  foreignKey: 'indicator_major_id',
});
model.TargetQuarters.hasMany(model.TargetFaculty, {
  foreignKey: 'target_quarter_id',
});

module.exports = model;
