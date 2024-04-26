import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../redux/slice/productSlice";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import replacementImg from "../../images/replacement.png";
import freeDeliveryImg from "../../images/free-delivery.png";
import topBrandImg from "../../images/brand-image.png";
import warrantyImg from "../../images/warranty.png";
import payOnDeliveryImg from "../../images/cash-on-delivery.png";

function ProductDetail() {
  const { id } = useParams();
  const products = useSelector(getProducts);
  const product = products.find((p) => p.id == id);
  const [currentImage, setCurrentImage] = useState(product.image[0]);

  const handleHover = () => {};

  return (
    <div className="flex items-start flex-row bottom-5 w-full justify-center h-auto pt-10 bg-sky-100 pb-3">
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
        <div className="w-3/5 font-bold text-justify h-screen flex-col">
          <h1 className="mb-2 font-mono">{product.title}</h1>

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
              <div className="stat-value text-primary">
                {product.rating} Star
              </div>
              <div className="stat-desc text-black">
                21% more than last month
              </div>
            </div>
          </div>

          <div className="border-t-2 border-slate-400 w-full mt-4 mb-1"></div>
          <div className="badge badge-error mt-3 mb-1">Limited Time Deal</div>
          <h1>
            <span className="font-xl font-normal text-red-700">
              -{Math.round(((product.mrp - product.price) / product.mrp) * 100)}
              %
            </span>
            <span> &#8377;</span>
            <span className="text-2xl font-extrabold">{product.price}</span>
          </h1>
          <p className="text-xs font-normal text-gray-700">
            MRP : &#8377;{product.mrp}
          </p>
          <div className="badge badge-ghost">ECom Fulfilled</div>
          <p className="text-xs font-normal text-gray-700">
            Inclusive of all taxes
          </p>
          <div className="border-t-2 border-slate-400 w-full mt-4 mb-3"></div>

          <div className="flex w-full justify-around items-start">
            <div className="flex flex-col justify-center items-center w-16">
              <img src={replacementImg} className="w-8" />
              <p className="text-center text-xs" style={{ fontSize: "0.6rem" }}>
                7 days Service Centre Replacement
              </p>
            </div>

            <div className="flex flex-col justify-center items-center w-16">
              <img src={freeDeliveryImg} className="w-8" />
              <p className="text-center text-xs" style={{ fontSize: "0.6rem" }}>
                Free Delivery
              </p>
            </div>

            <div className="flex flex-col justify-center items-center w-16">
              <img src={warrantyImg} className="w-8" />
              <p className="text-center text-xs" style={{ fontSize: "0.6rem" }}>
                6 Month Warranty
              </p>
            </div>

            <div className="flex flex-col justify-center items-center w-16">
              <img src={payOnDeliveryImg} className="w-8" />
              <p className="text-center text-xs" style={{ fontSize: "0.6rem" }}>
                Pay on Delivery
              </p>
            </div>

            <div className="flex flex-col justify-center items-center w-16">
              <img src={topBrandImg} className="w-8" />
              <p className="text-center text-xs" style={{ fontSize: "0.6rem" }}>
                Top Brand
              </p>
            </div>
          </div>

          {product.details && (
            <>
              <div className="border-t-2 border-slate-400 w-full mt-4 mb-3"></div>
              <div className="w-full">
                {Object.keys(product.details).map((key, index) => (
                  <div className="flex w-full" style={{ fontSize: "0.51rem" }}>
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
                  <div className="flex w-full" style={{ fontSize: "0.51rem" }}>
                    <div className="w-2/5 mr-2">{key}</div>
                    <div className="w-7/12"> {product.additional[key]}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="border-2 border-slate-400 w-2/6 p-2 rounded h-56">
          <h1>
            <span className="text-xs"> &#8377; </span>
            <span className="text-xl font-medium">{product.price}</span>
          </h1>
          <div
            className="badge badge-ghost font-semibold mb-1 text-xs"
            style={{ fontSize: "0.51rem", padding: "1px 10px" }}
          >
            ECom Fulfilled
          </div>
          <div className="" style={{ fontSize: "0.51rem" }}>
            <span className=" text-sky-800">FREE delivery</span>{" "}
            <span>{new Date().toDateString()}</span> on orders dispatched by
            E-Com Service over ₹499. Order within{" "}
            <span className="text-green-700">23 hrs 51 mins.</span>
          </div>
          <div className="text-green-700 font-semibold">In Stock</div>
          <div className="flex w-full" style={{ fontSize: "0.51rem" }}>
            <div className="w-2/4">Ship From</div>
            <div className="w-2/4">E-Com Service</div>
          </div>
          <div className="flex w-full" style={{ fontSize: "0.51rem" }}>
            <div className="w-2/4">Sold By</div>
            <div className="w-2/4">{product.Brand}</div>
          </div>
          <div style={{ fontSize: "0.8rem" }} className="font-bold mb-3">
            Quantity : 1
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="btn btn-warning text-md font-extrabold badge rounded-full w-11/12"
              style={{ height: "2rem", minHeight: "2rem" }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
