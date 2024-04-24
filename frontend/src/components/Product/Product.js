function Product() {
  return (
    <div className="card w-60 bg-base-300 shadow-xl glass cursor-pointer">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Bolt
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className="text-base truncate font-bold text-wrap h-25 text-justify">
          If a dog chews shoes whose shoes does he choose ?
        </div>
        <p className="text-base font-extrabold">
          &#8377; 12345{" "}
          <span className="font-thin line-through text-xs">&#8377; 56556</span>
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}

export default Product;
