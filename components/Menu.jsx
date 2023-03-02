import React, { useRef } from 'react';
import { AiOutlineRight, AiOutlineLaptop } from 'react-icons/ai';
import { RiAppleLine } from'react-icons/ri';
import { FiSmartphone, FiHeadphones } from'react-icons/fi';
import { BsSmartwatch } from'react-icons/bs';
import Link from 'next/link';

import { client } from '../lib/client';
import { useStateContext } from '../context/StateContext';
import Category from './Category';

const Menu = () => {
  const menuRef = useRef();
  const { setShowMenu } = useStateContext();
 
  return (
    <div className='menu-wrapper' ref={menuRef}>
      <div className='menu-container'>
        <button type='button' className='menu-heading' onClick={() => setShowMenu(false)} >
          <span className='heading'>Categories</span>
          <AiOutlineRight />
        </button>

        <div className="menu-items">
        <Link href={`/category/apple`}>
            <div className="menu-item" onClick={() => setShowMenu(false)}>
              <div className="category-image">
              <RiAppleLine />
              </div>
              <h4>Apple</h4>
            </div>
          </Link>

          <Link href={`/category/phones`}>
            <div className="menu-item" onClick={() => setShowMenu(false)}>
              <div className="category-image">
              <FiSmartphone />
              </div>
              <h4>Phones</h4>
            </div>
          </Link>

          <Link href={`/category/laptops-and-pc`}>
            <div className="menu-item" onClick={() => setShowMenu(false)}>
              <div className="category-image">
              <AiOutlineLaptop />
              </div>
              <h4>Laptop & PC</h4>
            </div>
          </Link>

          <Link href={`/category/gadgets`}>
            <div className="menu-item" onClick={() => setShowMenu(false)}>
              <div className="category-image">
              <BsSmartwatch />
              </div>
              <h4>Gadgets</h4>
            </div>
          </Link>

          <Link href={`/category/audio`}>
            <div className="menu-item" onClick={() => setShowMenu(false)}>
              <div className="category-image">
              <FiHeadphones />
              </div>
              <h4>Audio</h4>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}


export default Menu