const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./app/utils/connectDB.js');
const router = require('./app/routes/index.js');

const app = express();

// setup express
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

// connect database
connectDB();

//import router
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
