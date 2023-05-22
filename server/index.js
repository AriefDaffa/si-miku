require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./app/utils/connectDB.js');

const indicatorRoutes = require('./app/routes/indicator.routes.js');
const userRoutes = require('./app/routes/user.routes.js');
const authRoutes = require('./app/routes/auth.routes.js');
const majorRoutes = require('./app/routes/major.routes.js');
const departmentRoutes = require('./app/routes/department.routes');

const app = express();

// setup express
app.use(
  cors({
    credentials: true,
    // origin: 'https://shimmering-lokum-851637.netlify.app/',
  })
);
app.use(express.json());
app.use(cookieParser());

// connect database
connectDB();

//handle static assets

// handle image
app.use(
  '/images/logo',
  express.static(path.join(__dirname + '/static/images/logo'))
);
app.use(
  '/images/profile',
  express.static(path.join(__dirname + '/static/images/user-profile'))
);

//handle template bulk input
app.get('/template', function (req, res) {
  const file = path.join(
    __dirname + '/static/template/indicator-bulk-template.xlsx'
  );
  res.download(file);
});
app.get('/template/major', function (req, res) {
  const file = path.join(
    __dirname + '/static/template/major-bulk-template.xlsx'
  );
  res.download(file);
});
app.get('/template/department', function (req, res) {
  const file = path.join(
    __dirname + '/static/template/department-bulk-template.xlsx'
  );
  res.download(file);
});

//import router
app.use(indicatorRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(majorRoutes);
app.use(departmentRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
