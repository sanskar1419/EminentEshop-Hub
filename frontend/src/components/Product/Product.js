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

function Product({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const [showButton, setShowButton] = useState(false);
  const [hoverProductIndex, setHoverProductIndex] = useState(0);

  const handleClick = () => {
    navigate(`${product.id}`);
  };

  const handleDelete = () => {
    dispatch(productActions.fetchStart());
    dispatch(deleteProductAsync(product.id));
  };

  const handleEdit = () => {
    navigate(`update/${product.id}`);
  };

  const handleHover = (index) => {
    setHoverProductIndex(index);
    setShowButton(true);
  };

  const handleHoverOut = () => {
    setHoverProductIndex(0);
    setShowButton(false);
  };

  return (
    <div
      className="card w-60 bg-slate-400 shadow-xl glass cursor-pointer mb-8 mr-5 text-black pb relative"
      onMouseOver={() => handleHover(product.id)}
      onMouseLeave={handleHoverOut}
    >
      <figure className="mix-blend-multiply" onClick={handleClick}>
        {/* <ImageMagnifier src={product.image[0]} /> */}
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

export default Product;
