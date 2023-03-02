import React, { useEffect, useRef } from 'react';
import { client } from '../lib/client';
import { useStateContext } from '../context/StateContext';
import { Product } from '../components';

const SearchName = ({ products }) => {
  const { searchName, findItem, foundItem, HighToLow, sortedProdutsBrand, SortedProductsType, setSortedProdutsBrand,
    setTempPriceProducts, tempPriceProducts, sortProducts, setMaxValue, setMinValue, minValue, maxValue, sortPrice  } = useStateContext();

  const progressRef = useRef(null);
  const min = 0
  const max = 10000
  const step = 10
  const priceCap = 1000

  const isFirstRender = useRef(true);
  const mutationRef = useRef(searchName);
  const mutationRefFoundItem = useRef(foundItem);
  const mutationRefHightLow = useRef(HighToLow);

  // useEffect(() => {
    
  //     findItem(searchName, products);
    
  //     sortProducts('ok', foundItem);
  //   // if (foundItem.length > 0){
  //   //   setSortedProdutsBrand(foundItem);
  //   // }

  //   // console.log('f',foundItem)
  // }, [searchName]);


  // Updating mutation ref
  useEffect(() => {
    mutationRef.current = searchName;
    findItem(mutationRef.current, products);

  }, [searchName]);

  useEffect(() => {
    mutationRefFoundItem.current = foundItem;
      sortProducts('ok', mutationRefFoundItem.current);

  }, [foundItem]);

  useEffect(() => {
    setMaxValue(max);
    setMinValue(min);
    // setSortedProdutsBrand(foundItem);
    // sortProducts('ok', sortedProdutsBrand);
    sortProducts('ok', foundItem);
  }, []);

  

  // const sortBrand = (chosenBrand, productss) => {
  //   if (chosenBrand === 'All') {
  //     setSortedProdutsBrand(productss);
  //     return;
  //   }
  //   setSortedProdutsBrand(productss.filter(product => product.brand === chosenBrand));
  //   // sortProducts('ok', sortedProdutsBrand); 
  //   // console.log(sortedProdutsBrand);
  // }

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //   } else {
  //     console.log("sortedProdutsBrand after update", sortedProdutsBrand);
  //   }
  // }, [sortedProdutsBrand]);

  // Updating mutation ref
  // useEffect(() => {
  //   mutationRef.current = sortedProdutsBrand;
  //   sortProducts('ok', mutationRef.current);

  // }, [sortedProdutsBrand]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     // console.log("Actual state", sortedProdutsBrand);
  //     // console.log("mutationRef state", mutationRef.current);
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

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
      <div className="subcategory-heading">
        <h1>{tempPriceProducts.length} {tempPriceProducts.length > 1 ? 'products' : 'product'} found</h1>
        <div className='filters'>
          <div>
          <div className='sort'>
          <h3>Price:</h3>
          <div className='searchSortBtns'>
            <button type='button' className={SortedProductsType == 'low' ? 'sortBtnActive sortBtn' : 'sortBtn'} onClick={() => { sortProducts('low', foundItem) }}>Ascending</button>
            <button type='button' className={SortedProductsType == 'high' ? 'sortBtnActive sortBtn' : 'sortBtn'} onClick={() => { sortProducts('high', foundItem) }}>Descending</button>
          </div>
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

      </div>
      {tempPriceProducts.length > 0 ?
        <div className="products-container">

          {tempPriceProducts?.map((product) => <Product key={product._id} product={product} />)}

        </div>
        :
        <p className='products-not-found'>0 products found</p>
      }
    </div>
  )
}

export const getServerSideProps = async () => {
  const productQuery = `*[_type == "product"]`;
  const products = await client.fetch(productQuery);

  return {
    props: { products }
  }
}


export default SearchName