import fs from 'fs';
import { Createcustomer,getEmailPassword, Createcategories, CreateProduct, GetProductDetaile, CreateOrder, CreateOrderitem, OrderDetails } from './servisesorm.js';
import * as jose from 'jose';

const Bulidcustomer = async (req, res) => {
    let obj;
    const { FirstName, LastName, Address, EmailID, Password } = req.body;
    const result = await Createcustomer(FirstName, LastName, Address, EmailID, Password);
    if (result) {
        obj = { message: 'Your are registred  sucessfully registred.', result }
    }
    else {
        obj = { message: 'Your registration is failed.' }
    }
    res.status(201).send(obj);
}

const CustomerVerification = async (req, res) =>{
    let obj;
    const {EmailID,Password} = req.body;
    const result = await getEmailPassword(EmailID,Password);
    console.log('result',result)
    if(result){
    const CustomerID = result.dataValues.CustomerID;
    const FirstName = result.dataValues.FirstName;
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const alg = 'HS256';
    console.log('EmailID,Password,FirstName',EmailID,Password,FirstName)
    const jwt = await new jose.SignJWT({ EmailID:EmailID,CustomerID:CustomerID,FirstName:FirstName})
                .setProtectedHeader({alg})
                .setIssuedAt()
                .setExpirationTime('2h')
                .sign(secret)
  
        obj = {message:'Sucessfully login',result,jwt}
    }
    else{
        obj = {message:'You are not registerd'}
    }   
    res.status(200).send(obj)         
}

const BulidCategory = async (req, res) => {
    let obj;
    const { CategoriesName } = req.body;
  const  result = await Createcategories(CategoriesName);
    if (result) {
        obj = { message: 'New Categories create sucessfully.', result }
    }
    else {
        obj = { message: 'New Categories does not create sucessfully.' }
    }
    res.status(201).send(obj);
}

const BulidImage = async (req, res) => {
    fs.readFile('./images/' + req.params.id, function (error, data) {
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.write(data);
        return res.end();
    })
}

const Bulidproduct = async (req, res) => {
    let obj;
    const { ProductName, Price, StokQuantity, Images, Descreption, CategoryCategoriesID } = req.body;
    const result = await CreateProduct(ProductName, Price, StokQuantity, Images, Descreption, CategoryCategoriesID);
    if (result) {
        obj = { message: 'Product is registerd sucessfully', result }
    }
    else {
        obj = { message: 'Product is not registerd sucessfully' }
    }
    res.status(201).send(obj);
}

const findProductDetails = async (req, res) =>{
    let obj;
    const result = await GetProductDetaile();
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const reqcookies = req.cookies;
    const jwt = reqcookies.ankit;
    console.log('jwt',jwt);
    if(jwt !== undefined){
       try {
        const {payload,protectedHeader} = await jose.jwtVerify(jwt, secret);
        console.log('payload: ',payload);
        console.log('protectedHeader', protectedHeader);
       } catch (error) {
        console.log('error',error);
       }
    }
    else{
        obj = {message: 'Pls login cookies not send token'}
    }
    if(result){
        obj = {message: 'Your Product list is here', result}
    }
    else{
        obj = {message:'Your Product list is empty'}
    }
    res.status(200).json(obj);
}

const Bulidorder = async (req, res) => {
    let obj;
    // console.log('req.body',req.body)
    const { OderDate, Amount, CustomerID } = req.body;
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const reqcookies = req.cookies;
    const jwt = reqcookies.ankit;
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);
        console.log('payload', payload);
        console.log('protectedHeader', protectedHeader);
        const Customeridtoken = payload.CustomerID;
        // console.log('Orderdate, CustomerID, Amount',OderDate, CustomerCustomerID, Amount)
        if (Customeridtoken !== undefined) {
            const result = await CreateOrder(OderDate, Amount,  CustomerID);
            if (result) {
                obj = { message: 'Your  order  is sucessfully registered', result }
            }
            else {
                obj = { message: 'Your  order  is not sucessfully registered' }
            }
        }
    } catch (error) {
        console.log('error',error)
    }

    res.status(201).send(obj);
}

const CustomerOrderDetails = async (req,res) =>{
    let obj;
    const Customeridparm = req.params.CustomerID
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const reqcookies = req.cookies;
    const jwt = reqcookies.ankit;
    if (jwt !== undefined){
   
        try {
   
        const {payload, protectedHeader} = await jose.jwtVerify(jwt,secret);
        console.log('payload',payload);
        console.log('protectHeader',protectedHeader);
        const Customeridtoken = payload.CustomerID;
        if( Customeridtoken == Customeridparm){
        const result = await OrderDetails(Customeridparm);
        if(result){
            obj = {message: 'Your order details is here',result}
        }
        else{
            obj = {message: 'You are not give any order'}
        }
        }
    } 
   catch (error) {
    console.log('error',error);
   }
}
   res.status(200).send(obj);
}

const BulidOrderItem = async (req, res) => {
    let obj;
    var item = [];
    for(let i = 0; i < req.body.length; i++){
        console.log('OrderID, ProductID, Quantity, Subtotal',req.body[i])
        const { OrderID, ProductID, Quantity, SubTotal } = req.body[i];
        
        const result = await CreateOrderitem(OrderID, ProductID, Quantity, SubTotal); 
        item = [...item, result];
    }
    if (item.length) {
        obj = { message: 'Your OrderItem is sucessfully registerd ', item}
    }
    else {
        obj = { message: 'Your OrderItem is not sucessfully registerd ' }
    }
    res.status(201).send(obj);
}

const sendData = async (res) =>{
       res.send(res.obj);
}

export {sendData,BulidImage,Bulidcustomer,CustomerVerification,BulidCategory,Bulidproduct,Bulidorder,BulidOrderItem,findProductDetails,CustomerOrderDetails}
