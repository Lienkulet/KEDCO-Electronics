import React, { useState } from 'react'
import { useStateContext } from '../context/StateContext'

const Brand = ({brand, products}) => {
    const { getBrands} = useStateContext();

    return (
        <div className='brand-name'>
            <input type="checkbox"  value={brand} name="brands" className="brands"
                onChange={e => getBrands(e.target.value, products)} />
            <h4>{brand}</h4>
            {/* {console.log(products)} */}
        </div>
    )
}

export default Brand