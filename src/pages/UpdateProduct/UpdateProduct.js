// import AddForm from "../../components/AddForm/AddForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProducts,
  productActions,
  updateProductAsync,
} from "../../redux/slice/productSlice";
import ImageMagnifier from "../../components/ImageMagnifier/ImageMagnifier";
import replacementImg from "../../images/replacement.png";
import freeDeliveryImg from "../../images/free-delivery.png";
import topBrandImg from "../../images/brand-image.png";
import warrantyImg from "../../images/warranty.png";
import payOnDeliveryImg from "../../images/cash-on-delivery.png";

function UpdateProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector(getProducts);
  const product = products.find((p) => p.id == id);
  const [currentImage, setCurrentImage] = useState(product.image[0]);
  const [input, setInputs] = useState({
    title: product.title,
    price: product.price,
    mrp: product.mrp,
    Brand: product.Brand,
    rating: product.rating,
  });
  console.log("Product : ", product);

  const handleClick = () => {
    dispatch(productActions.fetchStart());
    dispatch(
      updateProductAsync({
        id: product.id,
        title: input.title,
        rating: input.rating,
        mrp: input.mrp,
        price: input.price,
        Brand: product.Brand,
        Review: product.Review,
        image: [...product.image],
        type: product.type,
        details: product.details,
        description: [...product.description],
        additional: product.additional,
      })
    );
  };

  return (
    <>
      <div className="bg-sky-100 flex items-center justify-center font-bold pt-5 w-full text-2xl text-blue-900 relative">
        Update Product
        <button
          className="btn btn-outline btn-primary absolute right-5 font-extrabold"
          onClick={handleClick}
        >
          Save Updated Product
        </button>
      </div>
      <div className="flex items-start flex-row bottom-5 w-full justify-center h-auto pt-5 bg-sky-100 pb-3">
        <div className="mr-3 w-2/5 flex justify-around items-center">
          <div className="w-10 mr-4 flex justify-center flex-col">
            {product.image.map((i, index) => (
              <img
                src={i}
                className="mb-2 rounded-lg h-18 ring ring-pink-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 cursor-pointer hover:ring-blue-500"
                onMouseOver={() => setCurrentImage(i)}
              />
            ))}
          </div>
          <div className="w-5/6 cursor-pointer mix-blend-multiply">
            <ImageMagnifier src={currentImage} />
          </div>
        </div>
        <div className="w-3/6 flex justify-around text-black overflow-y-scroll no-scrollbar">
          <div className="w-full font-bold text-justify h-screen flex-col">
            {/* <h1 className="mb-2 font-mono">{product.title}</h1> */}
            {/* <textarea
              value={input.title}
              className="mb-2 font-mono bg-transparent w-full h-7"
              rows="5"
            /> */}
            <textarea
              className="textarea textarea-primary mb-2 font-mono bg-transparent w-full no-scrollbar"
              placeholder="Bio"
              value={input.title}
              rows="3"
              onChange={(e) => setInputs({ ...input, title: e.target.value })}
            ></textarea>

            <div className="stats bg-emerald-400">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title text-black">Total Ratings</div>
                {/* <div className="stat-value text-primary">
                  {product.rating} Star
                </div> */}
                <input
                  type="number"
                  className="stat-value text-primary bg-emerald-400 w-20 no-scrollbar"
                  min={0}
                  max={5}
                  step={0.1}
                  value={input.rating}
                  onChange={(e) =>
                    setInputs({ ...input, rating: e.target.value })
                  }
                />
                <div className="stat-desc text-black">
                  21% more than last month
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-400 w-full mt-4 mb-1"></div>
            <div className="badge badge-error mt-3 mb-1">Limited Time Deal</div>
            <h1>
              <span className="font-xl font-normal text-red-700">
                -
                {Math.round(
                  ((product.mrp - product.price) / product.mrp) * 100
                )}
                %
              </span>
              <span> &#8377;</span>
              <input
                type="number"
                className="no-scrollbar bg-sky-100 text-2xl font-extrabold ml-1 mb-1 w-20"
                min={1}
                max={input.mrp}
                value={input.price}
                onChange={(e) => setInputs({ ...input, price: e.target.value })}
              />
            </h1>
            <p className="text-xs font-normal text-gray-700">
              MRP : &#8377;
              <input
                type="number"
                className="no-scrollbar bg-sky-100 w-11 ml-1"
                min={1}
                value={input.mrp}
                onChange={(e) => setInputs({ ...input, mrp: e.target.value })}
              />
            </p>
            <div className="badge badge-ghost">ECom Fulfilled</div>
            <p className="text-xs font-normal text-gray-700">
              Inclusive of all taxes
            </p>
            <div className="border-t-2 border-slate-400 w-full mt-4 mb-3"></div>

            <div className="flex w-full justify-around items-start">
              <div className="flex flex-col justify-center items-center w-16">
                <img src={replacementImg} className="w-8" />
                <p
                  className="text-center text-xs"
                  style={{ fontSize: "0.6rem" }}
                >
                  7 days Service Centre Replacement
                </p>
              </div>

              <div className="flex flex-col justify-center items-center w-16">
                <img src={freeDeliveryImg} className="w-8" />
                <p
                  className="text-center text-xs"
                  style={{ fontSize: "0.6rem" }}
                >
                  Free Delivery
                </p>
              </div>

              <div className="flex flex-col justify-center items-center w-16">
                <img src={warrantyImg} className="w-8" />
                <p
                  className="text-center text-xs"
                  style={{ fontSize: "0.6rem" }}
                >
                  6 Month Warranty
                </p>
              </div>

              <div className="flex flex-col justify-center items-center w-16">
                <img src={payOnDeliveryImg} className="w-8" />
                <p
                  className="text-center text-xs"
                  style={{ fontSize: "0.6rem" }}
                >
                  Pay on Delivery
                </p>
              </div>

              <div className="flex flex-col justify-center items-center w-16">
                <img src={topBrandImg} className="w-8" />
                <p
                  className="text-center text-xs"
                  style={{ fontSize: "0.6rem" }}
                >
                  Top Brand
                </p>
              </div>
            </div>

            {product.details && (
              <>
                <div className="border-t-2 border-slate-400 w-full mt-4 mb-3"></div>
                <div className="w-full">
                  {Object.keys(product.details).map((key, index) => (
                    <div
                      className="flex w-full"
                      style={{ fontSize: "0.51rem" }}
                    >
                      <div className="w-2/4">{key}</div>
                      <div className="w-2/4"> {product.details[key]}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {product.description && (
              <>
                <div className="border-t-2 border-slate-400 w-full mt-4 mb-2"></div>
                <h1 style={{ fontSize: "0.6rem" }} className="mb-1">
                  About this item
                </h1>
                <ul style={{ fontSize: "0.5rem" }} className="w-full">
                  {product.description.map((a) => (
                    <li className="text-justify font-medium">
                      <div
                        className="badge badge-ghost badge-xs"
                        style={{ fontSize: "0.2rem", height: "0.3rem" }}
                      ></div>{" "}
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {product.additional && (
              <>
                <div className="border-t-2 border-slate-400 w-full mt-4 mb-3"></div>
                <h1 style={{ fontSize: "0.6rem" }} className="mb-1">
                  Additional Information
                </h1>
                <div className="w-full">
                  {Object.keys(product.additional).map((key, index) => (
                    <div
                      className="flex w-full"
                      style={{ fontSize: "0.51rem" }}
                    >
                      <div className="w-2/5 mr-2">{key}</div>
                      <div className="w-7/12"> {product.additional[key]}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
