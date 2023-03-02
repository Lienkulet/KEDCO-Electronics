import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Category = ({ category : { image, name, slug }}) => {
  return (
    <div>
        <Link href={`/subcategory/${slug.current}`}>
            <div className="menu-item" onClick={() => setShowMenu(false)}>
              <div className="category-image">
              <img 
            src={urlFor(image)}
            width={250}
            height={250}
            className="product-image"
          />
              </div>
              <h4>{name}</h4>
            </div>
          </Link>
    </div>
  )
}

export default Category