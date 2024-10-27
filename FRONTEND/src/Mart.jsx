import React, { useState } from 'react';
import './style.css';
import Menu from './MenuApi';
import MenuCard from './MenuCard';
import Navbar from './Navbar';
console.log('menu',Menu)
const uniqueList = [
    ...new Set(
        Menu.map((culElem) =>{
            return culElem.CategoriesName
            ;
        })
    ), 'All'
]

const Mart = () => {
       
    const [menuData,setMenuData] = useState(Menu);
   
    const filterItem = (CategoriesName) =>{
         if(CategoriesName === 'All'){
            setMenuData(Menu);
            return;
         }
         const uniqueList = Menu.filter((curElem) =>{
            return curElem.CategoriesName === CategoriesName
            ;
         })
         setMenuData(uniqueList);
    }
    console.log('Menudata',menuData)
console.log('uniqueList',uniqueList)
  return (
    <>
    <Navbar filterItem = {filterItem} menuList = {uniqueList} />
    <MenuCard menuData = {menuData}/>
    </>
  )
}

export default Mart