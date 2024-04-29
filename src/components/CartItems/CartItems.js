// Importing necessary module, hooks etc.
import { getCart } from "../../redux/slice/userSlice";
import CartItem from "../CartItem/CartItem";
import { useSelector } from "react-redux";

// Creating CartItems functional component
function CartItems() {
  /* Getting cart from userReducer of Redux Store using useSelector*/
  const cart = useSelector(getCart);

  // Returning the JSX Content
  return (
    <div className="w-full h-full flex items-center flex-col overflow-scroll no-scrollbar pb-2">
      {cart.map((cartItem, index) => (
        <CartItem
          key={index}
          product={cartItem.product}
          quantity={cartItem.quality}
        />
      ))}
    </div>
  );
}

// Exporting CartItems component
export default CartItems;
