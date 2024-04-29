import AddForm from "../../components/AddForm/AddForm";

function AddProduct() {
  return (
    <>
      <div className="flex mt-4 text-3xl flex-col justify-center items-center mb-8">
        <h1 className="font-extrabold mb-4 text-emerald-600">
          Add A New Product
        </h1>
        <AddForm />
      </div>
    </>
  );
}

export default AddProduct;
