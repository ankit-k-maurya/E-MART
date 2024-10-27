import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as jose from 'jose';
import Avatar from '@mui/material/Avatar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Navbar = (prop) => {
    const filterItem = prop.filterItem;
    const menuList = prop.menuList;

    const navigate = useNavigate();
    
    const gotoCartDetails = () =>{
        navigate('/Cart')
    }
    
    const token = document.cookie;
    const claims = jose.decodeJwt(token);
    const FirstName = claims.FirstName;
    console.log('menuList',menuList)

  return (
   <>
    <div className='cart'>
    <AddShoppingCartIcon sx={{ fontSize: 40 ,marginRight:5}}
    onClick = {() => gotoCartDetails()}></AddShoppingCartIcon>
     <Avatar sx={{ marginRight:3}}>{FirstName}</Avatar>
    </div>
    <nav className='navbar'>
      <div className='btn-group'>
        {menuList.map((curElem) =>(
          <button className='btn-group__item'
          key={curElem.index}
          onClick={() =>filterItem(curElem)}
          > 
          {curElem}
          </button>
        ))}
        </div> 
    </nav>
   </>
  )
}

export default Navbar 