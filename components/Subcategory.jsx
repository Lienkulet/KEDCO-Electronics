import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Subcategory = ({ subcategory : { name, image, slug }}) => {
    return (
      <div>    
         <Link href={`/products/${slug.current}`}> 
         <div className="subCategory-card css-box-shadow"> 
           <img 
            src={urlFor(image)}
            width={250}
            height={250}
            className="subCategory-image"
          /> 
          <p className="subCategory-name">{name}</p> 
          {/* <p className="subCategory-name">{slug}</p>  */}
         </div> 
       </Link> 
       </div>
      )
}

export default Subcategory