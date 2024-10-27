import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './axios'
import * as jose from 'jose'
import './App.css';

const CustomerLogin = () => {

    const navigate = useNavigate();
    const [EmailID, setEmailID] = useState();
    const [Password, setPassword] = useState();

    // const registration = () => navigate('/CustomerReg')
       
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires" + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ";path=/";
    }

    const SubmitForm = async (e) => {
        e.preventDefault();
        if (EmailID && Password) {
            const res = await axios.post('/GetCustomerVerfication', {
                EmailID: EmailID,
                Password: Password
            });
            const token = res.data.jwt;
            console.log('token',token)
           
            if (token == null) {
                alert('Pls registration before login .You are not registred');
                navigate('/CustomerReg')
            }
            else {
                const claims = jose.decodeJwt(token);
                const CustomerID = claims.CustomerID;
                console.log('CID:', CustomerID);
                const gtoken = 'ankit';
                setCookie(gtoken, token, 1)
                setEmailID('')
                setPassword('')
                navigate('/Mart')
            }
        }
        else {
            alert("Pls fill the all data !")
        }
    }
    return (
        <>
            <div className='Container'>
                <div className='cardl'>
                    <h1>-: Customer Login :-</h1>
                    <form onSubmit={SubmitForm}>
                        <div>
                            <label htmlFor="EmailID"><h2>Enter Emailid:</h2></label>
                            <input type="text" name='Enter Emailid' id='EmailID' placeholder='Enter your emailid' autoComplete='off'
                                value={EmailID}
                                onChange={(e) => setEmailID(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="Password"><h2>Enter Password:</h2></label>
                            <input type="password" name='Enter Password' id='Password' placeholder='Enter your Password' autoComplete='off'
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <button type='submit'>Submit</button>
                    </form>
                    {/* <button onClick={ registration }> Click Registration</button> */}
                </div>
            </div>
        </>
    )
}

export default CustomerLogin