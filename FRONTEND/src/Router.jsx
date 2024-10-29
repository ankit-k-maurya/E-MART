import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mart from './Mart.jsx'
import Cart from './Cart.jsx'
import CustomerLogin from "./CustomerLogin.jsx";
import CustomerReg from './CustomerReg.jsx';
import OrderDetails from './OrderDetails.jsx';

const Router = () => {
     return(
     <BrowserRouter>
     <Routes>
        <Route
         exact
         path="/Mart"
         element = {<Mart />}
        />
        <Route
         exact
         path="/"
         element = {<CustomerLogin />}
        />
        <Route
         exact
         path="/CustomerReg"
         element = {<CustomerReg />}
        />
        <Route
         exact
         path="/OrderDetails"
         element = {<OrderDetails />}
        />
        <Route
         exact
         path="/Cart"
         element = {<Cart />}
        />
     </Routes>
     </BrowserRouter>
     );
}

export default Router;
