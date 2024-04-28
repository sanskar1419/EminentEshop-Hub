import { useSelector } from "react-redux";
import { getCart } from "../../redux/slice/userSlice";
import NoItemInCart from "../../components/NoItemsInCart/NoItemsInCart";

function Cart() {
  const cart = useSelector(getCart);
  return <>{cart.length === 0 ? <NoItemInCart /> : <h1>Cart Page</h1>}</>;
}

export default Cart;
