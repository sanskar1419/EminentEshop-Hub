import { useSelector } from "react-redux";
import Product from "../Product/Product";
import { getProducts } from "../../redux/slice/productSlice";
import { useState } from "react";
import removeImg from "../../images/remove.png";

function Products() {
  const [price, setPrice] = useState(75000);
  const [showMenu, setShowMenu] = useState(false);
  const products = useSelector(getProducts);
  const [filterProduct, setFilterProduct] = useState([]);

  const handleSortClick = () => {
    setShowMenu(true);
  };
  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleFilter = () => {
    const result = products.filter((product) => product.price <= price);
    setFilterProduct([...result]);
  };

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

export default Products;
