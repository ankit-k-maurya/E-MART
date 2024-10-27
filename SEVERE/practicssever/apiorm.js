import express from 'express';
import cookieParser from 'cookie-parser';
import cros from 'cors';
import bodyParser from 'body-parser';
import {sendData,BulidImage,Bulidcustomer,CustomerVerification,BulidCategory,Bulidproduct,Bulidorder,BulidOrderItem,findProductDetails,CustomerOrderDetails} from './midlwareorm.js';

const app = express ();
const port = 8000;
app.use(bodyParser.json());
const CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200,
    methods:['GET', 'PATCH', 'POST', 'DELETE']
}

app.use(cookieParser())
app.use (cros(CorsOptions))

app.get('/CreateImage/:id',BulidImage,sendData)

app.post('/CreateCustomer',Bulidcustomer,sendData)

app.post('/GetCustomerVerfication',CustomerVerification,sendData)

app.post('/CreateCategories',BulidCategory,sendData)

app.post('/CreateProduct',Bulidproduct,sendData)

app.get('/GetProductDetails',findProductDetails,sendData)

app.post('/CreateOrder',Bulidorder,sendData)

app.post('/CreateOrderItem',BulidOrderItem,sendData)

app.get('/GetOrderdetails/:CustomerID',CustomerOrderDetails,sendData)

app.listen(port, () =>{
    console.log('sever is running on',port)
});
