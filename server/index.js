require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const { parse } = require('csv-parse');

const connectDB = require('./app/utils/connectDB.js');
const router = require('./app/routes/index.js');

const app = express();

// setup express
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

// fs.createReadStream('Indikator SAKIP 2022.csv')
//   .pipe(parse({ delimiter: ',' }))
//   .on('data', (row) => console.log(row));

// connect database
connectDB();

//import router
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
