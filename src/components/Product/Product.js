/* Importing Necessary files, module etc */
import { useNavigate } from "react-router-dom";
import deleteImg from "../../images/delete-product.png";
import editImg from "../../images/pencil.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  getLoading,
  productActions,
} from "../../redux/slice/productSlice";
import BeatLoader from "react-spinners/BeatLoader";

/* Product Functional Component */
function Product({ product }) {
  /* Defining method to navigate to some other link */
  const navigate = useNavigate();
  /* Defining Method To Dispatching Actions */
  const dispatch = useDispatch();
  /* Getting loading state from product part redux store using useSelector hook  */
  const loading = useSelector(getLoading);
  /* Defining state variable showButton and setShowButton to bool data using useState hook */
  const [showButton, setShowButton] = useState(false);
  /* Defining state variable showButton and setShowButton to record index to save using useState hook */
  const [hoverProductIndex, setHoverProductIndex] = useState(0);

  /* Function to handle product click */
  const handleClick = () => {
    /* On clicking navigating to product detail page */
    navigate(`${product.id}`);
  };

  /* Function to handle delete */
  const handleDelete = () => {
    /* Calling this redux#ActionCreator fetchStart with an argument */
    dispatch(productActions.fetchStart());
    /* Calling AsyncThunkAction name deleteProductAsync with argument to make a DELETE Call */
    dispatch(deleteProductAsync(product.id));
  };

  /* Function to handle Edit click */
  const handleEdit = () => {
    /* On clicking navigating to update product page */
    navigate(`update/${product.id}`);
  };

  /* Function to handle and set product index on hover */
  const handleHover = (index) => {
    setHoverProductIndex(index);
    setShowButton(true);
  };

  /* Function to handle and set product index as 0 on hover */
  const handleHoverOut = () => {
    setHoverProductIndex(0);
    setShowButton(false);
  };

  /* Returning the JSX */
  return (
    <div
      className="card w-60 bg-slate-400 shadow-xl glass cursor-pointer mb-8 mr-5 text-black pb relative"
      onMouseOver={() => handleHover(product.id)}
      onMouseLeave={handleHoverOut}
    >
      <figure className="mix-blend-multiply" onClick={handleClick}>
        <img
          src={product.image[0]}
          alt="product"
          className="h-60 w-full m-auto mix-blend-lighten"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title truncate text-lg" onClick={handleClick}>
          {product.Brand}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div
          className="text-base truncate font-bold  h-25 text-justify"
          onClick={handleClick}
        >
          {product.title}
        </div>
        <p className="text-base font-extrabold">
          &#8377; {product.price}{" "}
          <span className="font-thin line-through text-xs">
            &#8377; {product.mrp}
          </span>
        </p>

        <div class="flex items-center">
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p class="ms-2 text-sm font-bold text-gray-900 ">{product.rating}</p>
          <span class="w-1 h-1 mx-1.5 bg-gray-900 rounded-full "></span>
          <a
            href="#"
            class="text-sm font-medium text-gray-900 underline hover:no-underline "
          >
            {product.Review} reviews
          </a>
        </div>

        <div className="card-actions justify-end mb-2">
          <div className="badge badge-outline capitalize">{product.type}</div>
          <div className="badge badge-outline">Products</div>
        </div>
        {showButton && hoverProductIndex === product.id ? (
          <div className="w-full absolute bg-red-700 bottom-0 left-0 rounded-b-xl flex items-center text-lg font-extrabold productButton">
            <div
              className="w-3/6 flex items-center justify-center bg-green-300 rounded-bl-xl"
              onClick={handleEdit}
            >
              Edit <img src={editImg} className="w-5 ml-2" />
            </div>
            <div
              className="w-3/6 flex items-center justify-center bg-red-300 rounded-br-xl"
              onClick={handleDelete}
            >
              {/* If Loading State is true showing the BeatLoader otherwise button */}
              {loading ? (
                <BeatLoader color="black" />
              ) : (
                <>
                  Delete <img src={deleteImg} className="w-5 ml-2" />
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* Export Product Component */
export default Product;
