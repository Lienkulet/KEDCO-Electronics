import React, { useEffect, useRef, useState } from 'react';
import { client } from '../../lib/client';
import { Product } from '../../components';
import { Brand } from '../../components';
import Link from 'next/link';
import { useStateContext } from '../../context/StateContext';
import { urlFor } from '../../lib/client';

const Products = ({ subcategory, products }) => {
  const { sortProducts, HighToLow, sortedProdutsBrand, SortedProductsType, setSortedProdutsBrand, setMinValue, setMaxValue, minValue, maxValue, 
  sortPrice, tempPriceProducts, setTempPriceProducts } = useStateContext();


  const progressRef = useRef(null);
  const min = 0
  const max = 10000
  const step = 10
  const priceCap = 1000
  
  useEffect(() => {
    setMaxValue(max);
    setMinValue(min);
    setSortedProdutsBrand(products);
    sortProducts('ok', sortedProdutsBrand);

  }, []);

  const isFirstRender = useRef(true);
  const mutationRef = useRef(sortedProdutsBrand);
  const mutationRefHightLow = useRef(HighToLow);


  const sortBrand = (chosenBrand, productss) => {
    if (chosenBrand === 'All') {
      setSortedProdutsBrand(productss);
      sortPrice(sortedProdutsBrand);
      return;
    }
    setSortedProdutsBrand(productss.filter(product => product.brand === chosenBrand));
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log("sortedProdutsBrand after update", sortedProdutsBrand);
    }
  }, [sortedProdutsBrand]);

  // Updating mutation ref
  useEffect(() => {
    mutationRef.current = sortedProdutsBrand;
    sortProducts('ok', mutationRef.current);
  }, [sortedProdutsBrand]);

  useEffect(() => {
    const timer = setInterval(() => {
      // console.log("Actual state", sortedProdutsBrand);
      // console.log("mutationRef state", mutationRef.current);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    mutationRefHightLow.current = HighToLow;
    sortPrice(HighToLow);
  }, [HighToLow]);

  // PRICE

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step * 10 + "%";
    progressRef.current.style.right = step * 10 - (maxValue / max) * step * 10 + "%";
      sortPrice(HighToLow);
  }, [minValue, maxValue]);

  return (
    <div>
      <div className='products-header'>
        <h1>{subcategory.name}</h1>
      </div>
      <div className='filters'>
        <div>

          {subcategory.category != 'Apple' ?
            <div className='brands'>
              <h3>Brand:</h3>
              <select className='select_brand' onChange={e => sortBrand(e.target.value, products)}>
                <option className='select-option' value={'All'}>All</option>
                <option className='select-option' value={'Apple'}>Apple</option>
                <option className='select-option' value={'Xiaomi'}>Xiaomi</option>
                <option className='select-option' value={'Samsung'}>Samsung</option>
                <option className='select-option' value={'Huawei'}>Huawei</option>
                <option className='select-option' value={'Navigator'}>Navigator</option>
              </select>
            </div>
            :
            ''
          }
          <div className='sort'>
            <h3>Price:</h3>
            <button type='button' className={SortedProductsType == 'low' ? 'sortBtnActive sortBtn' : 'sortBtn'} onClick={() => { sortProducts('low', sortedProdutsBrand) }}>Ascending</button>
            <button type='button' className={SortedProductsType == 'high' ? 'sortBtnActive sortBtn' : 'sortBtn'} onClick={() => { sortProducts('high', sortedProdutsBrand) }}>Descending</button>
          </div>
        </div>
        <div className='price-range'>
          <h3>Price Range:</h3>
          <div className="price-input">
            <div className="field">
              <span> Min</span>
              <input
                onChange={(e) => setMinValue(e.target.value)}
                type="number"
                value={minValue}
                className="input-min"
              />
            </div>
            <div className="separator"> - </div>
            <div className="field">
              <span> Max</span>
              <input
                onChange={(e) => setMaxValue(e.target.value)}
                type="number"
                value={maxValue}
                className="input-max"
              />
            </div>
          </div>
          <div className="slider">
            <div
              className="progress"
              ref={progressRef}
            ></div>
          </div>

          <div className="range-input">
            <input
              onChange={handleMin}
              type="range"
              min={min}
              step={step}
              max={max}
              value={minValue}
              className="range-min"
            />
            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className="range-max"
            />
          </div>

        </div>

      </div>

      {tempPriceProducts.length > 0 ?
        <div className='products-container'>

          {tempPriceProducts?.map((product) => <Product key={product._id} product={product} />)}

        </div>
        :
        <p className='products-not-found'>0 products found</p>
        }
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "subcategory"] {
      slug {
        current
      }
    }
    `;

  const subcategory = await client.fetch(query);

  const paths = subcategory.map((subcategory) => ({
    params: {
      slug: subcategory.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const subcategoryQuery = `*[_type == "subcategory" && slug.current == '${slug}'][0]{
    'category': category->name,
  name,
    image,
    slug
  }`;
  const subcategory = await client.fetch(subcategoryQuery);

  const productsQuery = `*[_type == "product" && '${subcategory.name}' in subcategories[]->name]{
    image, 
    name, 
    slug,
     price,
    "brand" : brand->name
  }`;

  const products = await client.fetch(productsQuery);

  return {
    props: { subcategory, products }
  }
}

export default Products