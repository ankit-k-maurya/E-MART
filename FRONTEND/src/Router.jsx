import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mart from './Mart'
import Cart from './Cart'
import CustomerLogin from "./CustomerLogin";
import CustomerReg from './CustomerReg';
import OrderDetails from './OrderDetails';

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