// Importing necessary module, hooks etc.
import starImg from "../../images/star.png";
import { useDispatch, useSelector } from "react-redux";

// Creating CartItem functional component
function CartItem({ product, quantity }) {
  console.log("product", product);
  /* Defining Dispatcher */
  const dispatch = useDispatch();

  // Returning the JSX Content
  return (
    <div className="flex justify-evenly flex-row mt-2 w-full">
      <div className="flex justify-center flex-col items-center">
        <div className="mix-blend-multiply w-4/5">
          <img src={product.image[0]} className="" width={"300px"} />
        </div>
      </div>
      <div className="w-3/5 flex flex-col">
        <div className="text-lg font-bold">
          <span>{product.Brand}</span>
        </div>
        <div className="text-sm font-mono">
          <span>{product.title}</span>
        </div>
        <div className="font-extrabold">
          <span>&#8377; {quantity * product.price}</span>
        </div>
        <div className="text-sm font-bold">
          MRP <span className="">&#8377; {product.mrp * quantity}</span>{" "}
          <span className="">
            ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
            OFF)
          </span>
        </div>
        <div className="font-extrabold  mb-2">Quantity : {quantity}</div>
        <div className="badge badge-primary mr-5 font-extrabold">
          4 <img src={starImg} className="w-3 ml-1" />
        </div>
      </div>
    </div>
  );
}

// Exporting CartItem component
export default CartItem;
