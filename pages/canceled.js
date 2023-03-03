import React from 'react';
import { BsBagXFill } from 'react-icons/bs';
import Link from 'next/link';


const Canceled = () => {
  return (
    <div className='cancel-wrapper'>
    <div className='cancel'>
        <p className='icon'>
            <BsBagXFill />
        </p>
        <h2>Your order has been canceled!</h2>
        
        <Link href="/">
          <button className='btn' type='button' width="300px">Back to Home</button>    
        </Link>
    </div>
</div>
  )
}

export default Canceled