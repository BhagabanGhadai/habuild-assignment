const express = require('express')
const app = express();
const client=require('./postgres')
const routes=require('./routes/route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

client
.connect()
.then(()=>{console.log('postgres connected')})
.catch((err)=>console.log(err))

app.use('/', routes);

app.listen(process.env.port||3000, () => {console.log(`server is running at: ${process.env.port||3000}`)});


// const {createBookingTable}=require('../src/controllers/bookingtable')