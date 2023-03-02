import React, { createContext, useContext, useState, useEffect, Children } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [searchName, setSearchName] = useState();
  const [TempSearchName, setTempSearchName] = useState();
  const [foundItem, setFoundItem] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState();
  const [LowToHigh, setLowToHigh ] = useState([]);
  const [HighToLow, setHighToLow ] = useState([]);
  const [SortedProductsType, setSortedProductsType ] = useState('high');
  const [sortedProdutsBrand, setSortedProdutsBrand ] = useState([]);
  const [tempPriceProducts, setTempPriceProducts] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);

    setQty(1);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }


  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.find((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setCartItems(prevCartItems =>
        prevCartItems.map(item => {
          if (item._id === id) {
            return { ...item, quantity: foundProduct.quantity + 1 }
          }
          return item
        })
      );

      // setCartItems( [...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}] ); 
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems(prevCartItems =>
          prevCartItems.map(item => {
            if (item._id === id) {
              return { ...item, quantity: foundProduct.quantity - 1 }
            }
            return item
          })
        );

        // setCartItems( [...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}] ); 
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }

  }


  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }


  let yy;
  const getBrands = (brand, product) => {
    yy = product;
    if (!xxx.includes(brand)) {
      xxx.push(brand);
      
    } else {
      // const index = xxx.indexOf(brand);
      xxx.splice(xxx.indexOf(brand), 1);
    }
    console.log('X', xxx);

    if (xxx.length === 0) {
      yy = product;
      return;
    } 

    // yy = product.filter(prod => xxx.includes(prod.brand));
    setSelectedProducts(product.filter(prod => xxx.includes(prod.brand)));
    
    // console.log('y', yy);
    // setSelectedProducts(yy);
    console.log('sp', selectedProducts);
  }

  let z;
 

  const xxx = [];

  const findItem = (nameProduct, array) => {
    if (nameProduct != undefined) {

      array.map((product) => {
        if (product.name.toLowerCase().includes(nameProduct.toLowerCase())) {
          xxx.push(product);
        }
      })

      setFoundItem(xxx);

    } else {
      console.log('nameProduct undefined');
    }
  }


  
  const sortProducts = (value, products) => {
    let tempP = products;
    if (value == 'low') {
      for (let i = 0; i < tempP.length; i++) {
        for (let j = 0; j < tempP.length; j++) {
          if (tempP[i].price < tempP[j].price) {
            let temp = tempP[i];
            tempP[i] = tempP[j];
            tempP[j] = temp;
          }
        }
      }
      setHighToLow(tempP);
      setSortedProductsType('low');
    } else if( value == 'high'){
        for (let i = 0; i < tempP.length; i++) {
          for (let j = 0; j < tempP.length; j++) {
            if (tempP[i].price > tempP[j].price) {
              let temp = tempP[i];
              tempP[i] = tempP[j];
              tempP[j] = temp;
            }
          }
        }
        setHighToLow(tempP);
        setSortedProductsType('high');
      } else if( value == 'ok'){
        setHighToLow(products);
        setSortedProductsType('ok')
      }

      // setTempPriceProducts(HighToLow);
      sortPrice(HighToLow);
  }

  const sortBrand = (chosenBrand, products) => {
    if(chosenBrand === 'All'){
      setSortedProdutsBrand(products);
      sortProducts('ok', sortedProdutsBrand);
      return;
    } 
    setSortedProdutsBrand(products.filter(product => product.brand === chosenBrand));
    sortProducts('ok', sortedProdutsBrand);
    // console.log(sortedProdutsBrand);
  }

  const sortPrice = (productss) => {
    setTempPriceProducts(productss.filter(product => product.price >= minValue && product.price <= maxValue));
    // console.log(productss.filter(product => product.price >= minValue && product.price <= maxValue));
    // console.log('pr',sortedProdutsBrand);
  }


  return (
    <Context.Provider value={{
      showCart,
      setShowCart,
      setCartItems,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      showMenu,
      setShowMenu,
      incQty,
      decQty,
      onAdd,
      onRemove,
      toggleCartItemQuantity,
      setTotalPrice,
      setTotalQuantities,
      getBrands,
      searchName,
      setSearchName,
      findItem,
      foundItem,
      setFoundItem, 
      SortedProductsType,
      HighToLow,
      LowToHigh,
      LowToHigh,
      HighToLow,
      SortedProductsType,
      sortProducts,
      setTempSearchName,
      TempSearchName,
      sortBrand,
      setSortedProdutsBrand,
      sortedProdutsBrand,
      setSortedProductsType,
      SortedProductsType,
      sortPrice,
      setMaxValue,
      setMinValue,
      minValue,
      maxValue,
      setTempPriceProducts,
      tempPriceProducts,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);