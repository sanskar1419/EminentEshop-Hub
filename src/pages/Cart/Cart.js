import { useSelector } from "react-redux";
import { getCart } from "../../redux/slice/userSlice";
import NoItemInCart from "../../components/NoItemsInCart/NoItemsInCart";
import styles from "./Cart.module.css";
import { useEffect, useState } from "react";
import CartItems from "../../components/CartItems/CartItems";

function Cart() {
  // Defining useState hook name priceBreakup to store totals
  const [priceBreakUp, setPriceBreakup] = useState({
    totalPrice: 0,
    totalDiscount: 0,
    totalItem: 0,
    totalMRP: 0,
  });
  const cart = useSelector(getCart);

  console.log("Cart Item : ", cart);

  // Using useEffect hook to calculate totals on mounting and whenever user data changes
  useEffect(() => {
    if (cart.length > 0) {
      let totalPr = 0;
      let totalMrp = 0;
      cart.map((cartItem) => {
        totalPr += cartItem.product.price * cartItem.quality;
        totalMrp += cartItem.product.mrp * cartItem.quality;
      });
      setPriceBreakup({
        totalPrice: totalPr,
        totalDiscount: totalMrp - totalPr,
        totalItem: cart.length,
        totalMRP: totalMrp,
      });
    }
  }, [cart]);

  return (
    <>
      {cart.length === 0 ? (
        <NoItemInCart />
      ) : (
        <div
          className="w-full flex items-center justify-center bg-slate-400 shadow-xl glass text-black"
          style={{ height: "88vh" }}
        >
          <div className={styles.cartItemsAndPriceContainer}>
            <div className={styles.cartItemsAndOrderContainer}>
              <CartItems />
            </div>
            <div className={styles.priceBreakUpContainer}>
              <div className={styles.priceDetailsHeader}>
                <p>PRICE DETAILS</p>
              </div>
              <div className="divider divider-primary mt-0 mb-0"></div>
              <div className={styles.priceContainer}>
                <p>Price ({priceBreakUp.totalItem} Items)</p>
                <p>&#8377; {priceBreakUp.totalMRP}</p>
              </div>
              <div className={styles.priceContainer}>
                <p>Discount</p>
                <p className={styles.textGreen}>
                  - &#8377; {priceBreakUp.totalDiscount}
                </p>
              </div>
              <div className={styles.priceContainer}>
                <p>Delivery Charges</p>
                <p>
                  <span className={styles.delivery}>&#8377;240</span>
                  <span className={styles.textGreen}> Free</span>
                </p>
              </div>
              <div className={styles.totalAmountContainer}>
                <h4>Total Amount</h4>
                <h4>&#8377; {priceBreakUp.totalPrice}</h4>
              </div>
              <div className={styles.priceContainer}>
                <p className={styles.textGreen}>
                  You will save ₹{priceBreakUp.totalDiscount + 240} on this
                  order
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
