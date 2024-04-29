/* Importing Necessary files, module etc */
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import { getProducts } from "../../redux/slice/productSlice";
import { useState } from "react";
import removeImg from "../../images/remove.png";

/* Products Functional Component */
function Products() {
  /* Defining state variable price and setPrice to set price using useState hook */
  const [price, setPrice] = useState(75000);
  /* Defining state variable showMenu and setShowMenu to set boolean value using useState hook */
  const [showMenu, setShowMenu] = useState(false);
  /* Getting all products from product part redux store using useSelector hook  */
  const products = useSelector(getProducts);
  /* Defining state variable filterProduct and setFilterProduct to set empty array using useState hook */
  const [filterProduct, setFilterProduct] = useState([]);

  /* On sort button click setting the show menu to true */
  const handleSortClick = () => {
    setShowMenu(true);
  };

  /* On cross click setting the show menu to false */
  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  /* Finding and setting the filter product */
  const handleFilter = () => {
    const result = products.filter((product) => product.price <= price);
    setFilterProduct([...result]);
  };

  /* Returning the JSX */
  return (
    <div className="flex flex-wrap items-center justify-center w-5/6 relative">
      {showMenu ? (
        <div style={{ top: "-75px", right: "-110px" }} className="absolute">
          <img
            src={removeImg}
            className="absolute w-4 cursor-pointer"
            style={{ top: "-20px", right: "0px" }}
            onClick={handleCloseMenu}
          />
          <label className="flex items-center justify-center">
            <kbd className="kbd kbd-md mr-4">{price}</kbd>
            <input
              type="range"
              min={0}
              max="100000"
              value={price}
              className="range range-xs w-40"
              onChange={(e) => {
                setPrice(e.target.value);
                handleFilter();
              }}
            />
          </label>
        </div>
      ) : (
        <button
          className="btn btn-active btn-primary absolute right-5 font-extrabold"
          style={{ top: "-85px", right: "-110px" }}
          onClick={handleSortClick}
        >
          Sort By Price
        </button>
      )}

      {filterProduct.length === 0
        ? products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        : filterProduct.map((product) => (
            <Product key={product.id} product={product} />
          ))}
    </div>
  );
}

/* Exporting Products component */
export default Products;
