require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./app/utils/connectDB.js');

const indicatorRoutes = require('./app/routes/indicator.routes.js');
const userRoutes = require('./app/routes/user.routes.js');
const authRoutes = require('./app/routes/auth.routes.js');

const app = express();

// setup express
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

// connect database
connectDB();

//import router
app.use(indicatorRoutes);
app.use(userRoutes);
app.use(authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
