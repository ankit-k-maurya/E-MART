import  { useEffect, useState } from 'react';
import axios from './axios';
import * as jose from 'jose';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();

    const gotoOrderDetails = () => {
        navigate('/OrderDetails')
    }

    const getLocalCartData = () => {
        let localCartData = JSON.parse(localStorage.getItem("Card"));
        if (localCartData === -1) return [];
        return localCartData;
    }

    const [cart, setCart] = useState(getLocalCartData);

    useEffect(() => {
        localStorage.setItem("Card", JSON.stringify(cart))
    }, [cart])

    if (cart.length < 0) {
        let message = 'You are not select any product.';
        return message;
    }

    const Delete = (index) => {
        const details = cart.filter((curElem) => {
            return curElem.ID !== index;
        })
        setCart(details);
    }

    const Inc = (ID, Name, CategoryName, Price, Descreption, image) => {
        const ifProductExists = cart.findIndex((curElem) => {
            return curElem.ID === ID
        })
        if (ifProductExists === -1) {
            const product = {
                ID: ID,
                Name: Name,
                CategoryName: CategoryName,
                Price: Price,
                Descreption: Descreption,
                image: image,
                Count: 1
            }
            cart.push(product);
        }

        let newCart = cart.map((curElem) => {
            if (curElem.ID === ID) {
                return { ...curElem, Count: curElem.Count + 1 }
            }
            return curElem;
        })
        setCart(newCart);
    }

    const DecNum = (ID) => {
        const newCart = cart.map((curElem) => {
            if (curElem.ID === ID) {
                return { ...curElem, Count: curElem.Count - 1 }
            }
            return curElem;
        })
        setCart(newCart);
    }

    const Quantity = (ID) => {
        const ProductIndex = cart.findIndex((curElem) => curElem.ID === ID);
        if (ProductIndex === -1) return 0;
        return cart[ProductIndex].Count
    }

    let Price = cart.map((curElem) => curElem.Price);

    let Count = cart.map((curElem) => curElem.Count);

    let amount = [];
    for (let i = 0; i < Price.length; i++) {
        let result = Price[i] * Count[i];
        amount = [...amount, result];
    }

    let sum = 0;
    for (let i = 0; i < amount.length; i++)  sum += amount[i];

    const date = new Date();

    const GiveOrders = async () => {
        const token = document.cookie;
        const claims = jose.decodeJwt(token);
        const CustomerID = claims.CustomerID;
        console.log('Amout',sum)
        console.log('date',date)
        const res = await axios.post('/CreateOrder', {
            OderDate: date,
            Amount: sum,
            CustomerID: CustomerID
        })
        console.log('Order',res);
        alert(res.data.message);

        let items = [];
        for (let i = 0; i < cart.length; i++) {
            console.log('SubTotal' ,cart[i].Price,);
            items.push({
                OrderID: res.data.result.OrderID,
                ProductID: cart[i].ID,
                Quantity: cart[i].Count,
                SubTotal: cart[i].Price*cart[i].Count, 
            })
        }
        console.log(items)
        const response = await axios.post('/CreateOrderItem', items);
          console.log('Response:',response);
    }
    return (
        <>
            <h1 className='heade'>-: Your Cart listItem :-</h1>
            <section className='main-card--cointainer'>
                {cart.map((curElem) => {
                    const { ID, Name, CategoryName, Price, Descreption, image } = curElem;
                    return (
                        <>
                            <div className='card-container'>
                                <div className='card' key={ID}>
                                    <div className='card-body'>
                                        <h2 className='card-title'>{Name}</h2>
                                        <span className='card-description subtle'>
                                            {Descreption}
                                        </span>
                                        <img src={'http://localhost:8000/CreateImage/' + image} alt="images" className='card-media' />
                                        <div className='btn-pric'>
                                            <span className='card-autor subtle'>
                                                <FaIndianRupeeSign /> {Price * Quantity(ID)}
                                            </span>
                                            <h1>Quantity:{Quantity(ID)}</h1>
                                            <button className="button-card " onClick={() => Inc(ID, Name, CategoryName, Price, Descreption, image)}> +  </button>
                                            <button className="button-card " onClick={() => DecNum(ID)}> - </button>
                                            <button className="button-card " onClick={() => Delete(ID)}><MdDeleteForever /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </section>
            <button className='buttone' onClick={() => navigate(-1)}>Go to Back</button>
            <button className='buttone' onClick={GiveOrders}>GiveOrders</button>
            <button className='buttone' onClick={gotoOrderDetails}> OrderDetails</button>
        </>
    )
}

export default Cart