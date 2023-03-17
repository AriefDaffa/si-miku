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

const app = express();

// setup express
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

// connect database
connectDB();

//handle static assets
app.use(
  '/images/logo',
  express.static(path.join(__dirname + '/static/images/logo'))
);
app.use(
  '/images/profile',
  express.static(path.join(__dirname + '/static/images/user-profile'))
);
app.get('/template', function (req, res) {
  const file = path.join(
    __dirname + '/static/template/bulk-input-template-si-miku.xlsx'
  );
  res.download(file);
});

//import router
app.use(indicatorRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(majorRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
