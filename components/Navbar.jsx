import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import Menu from './Menu';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, showMenu, setShowMenu, 
    searchName, setSearchName, findItem } = useStateContext();
  
  return (
    <div className='navbar-container'>
      <div className="nav-items">
     {showMenu && <Menu />}
     
     
     <p className='logo' >
        <Link href='/'>KEDCO Electronics</Link>
      </p>

     
      <button type='button' className='menu-icon' onClick={() => setShowMenu(true)}>
        <AiOutlineMenu />
        <span className='menu-text'>All Categories</span>
      </button>
      
      <div className="search-bar">
        <input type="text" value={searchName} onChange={(event) => { setSearchName(event.target.value); }} 
         placeholder='Search the name of a product' />
        <Link href={searchName != undefined? '/search' : '/'} >
          <button type="button" className='searchBtn'>
          <AiOutlineSearch />
          </button>
        </Link>
      </div>
 
      

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}

     </div>

     <div className="search-bar-mobile">
        <input type="text" value={searchName} onChange={(event) => { setSearchName(event.target.value); }} 
         placeholder='Search the name of a product' />
        <Link href={searchName != undefined? '/search' : '/'} >
          <button type="button" className='searchBtn'>
          <AiOutlineSearch />
          </button>
        </Link>
      </div>

    


      

    </div>
  )

 
}

export default Navbar