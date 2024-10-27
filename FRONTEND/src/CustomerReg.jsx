import React, { useState } from 'react';
import './App.css';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const CustomerReg = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [password, setpassword] = useState()
    const [message, setMessage] = useState()
    const [allEntry, setAllEntry] = useState([]);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        if (firstName && lastName && email && address && password) {
            const newEntry = { id: new Date().getTime().toString(), firstName, lastName, email, password, address }
            const res = await axios.post('/CreateCustomer', {
                FirstName: firstName,
                Lastname: lastName,
                EmailID: email,
                Password: password,
                Address: address
            })
            const message = res.data.message;
            setMessage(message);
            setAllEntry([...allEntry, newEntry])
            setFirstName(' ')
            setLastName(' ')
            setEmail(' ')
            setpassword(' ')
            setAddress(' ')

        }
        else {
            alert('Pls fill all the input filed')
        }
    }
    return (
        <div className="Container">
        <div className="cardl">
           <h1>-: CUSTOMER REGESTRAION FORM:-</h1>
           <form onSubmit={submitForm}>
                <div >
                    <label htmlFor="Firstname"><h2>FirstName:</h2></label>
                    <input type="text" name="firstName" id="firstName" placeholder="Enter Your First Name" autoComplete="off"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div >
                    <label htmlFor="Lastname"><h2>LastName:</h2></label>
                    <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name " autoComplete="off"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div >
                    <label htmlFor="email"><h2>Email:</h2></label>
                    <input type="text" name="email" id="email" placeholder="Enter email id " autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div >
                    <label htmlFor="Address"><h2>Address:</h2></label>
                    <input type="text " name="password" id="password" placeholder="Enter Your Address" autoComplete="off"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    /> 
                </div>
                <div >
                    <label htmlFor="Address"><h2>Password:</h2></label>
                    <input type="text " name="password" id="password" placeholder="Creat your password" autoComplete="off"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    /> 
                </div>
                <br/>
                <button type="submit"> Submit</button> 
                <br/> 
            </form>
            <button onClick={() => navigate(-1)}>GO BACK </button>
           <br/>
           <p className="paratext"><h2>{ message }</h2></p> 
        </div>
        
    </div>
    )
}

export default CustomerReg