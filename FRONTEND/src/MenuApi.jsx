import axios from "./axios";

const response = await axios.get('/GetProductDetails');

const Menu = response.data.result;

console.log('Menu',Menu)

export default Menu;
