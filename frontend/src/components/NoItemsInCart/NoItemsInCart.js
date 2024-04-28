// Importing necessary module, hooks, images etc.
import emptyCartImg from "../../images/empty-cart.png";
import { useNavigate } from "react-router-dom";

// Creating NoItemInCart functional component
function NoItemInCart() {
  const navigate = useNavigate();

  // Returning the JSX Content
  return (
    <div
      className="flex flex-col justify-center items-center w-full"
      style={{ height: "84vh" }}
    >
      <img src={emptyCartImg} alt="empty cart" className="w-48" />
      <div className="font-extrabold text-2xl">Your cart is empty!</div>
      <div className="font-bold text-xl mb-4">Add items to it now.</div>
      <button
        className="btn btn-active btn-primary btn-wide"
        onClick={() => {
          navigate("/");
        }}
      >
        SHOP NOW
      </button>
    </div>
  );
}

// Exporting NoItemInCart component
export default NoItemInCart;
