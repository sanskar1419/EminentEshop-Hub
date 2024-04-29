/* Importing Necessary files, module etc */
import { useState } from "react";
import hintImg from "../../images/lightbulb.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductAsync,
  getLoading,
  productActions,
} from "../../redux/slice/productSlice";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

/* AddForm Functional Component */
function AddForm() {
  /* Defining Method To Dispatching Actions */
  const dispatch = useDispatch();
  /* Defining method to navigate to some other link */
  const navigate = useNavigate();
  /* Getting loading state from product part redux store using useSelector hook  */
  const loading = useSelector(getLoading);

  /* Defining state variable inputs and setInputs to record the form data using useState hook */
  const [inputs, setInputs] = useState({
    title: "",
    rating: 0,
    mrp: 0,
    price: 0,
    Brand: "",
    Review: 0,
    image: [],
    type: "",
    details: {},
    description: [],
    additional: null,
  });

  /* Defining state variable images and setImages to record the images URL inputs using useState hook */
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",
  });

  /* Defining state variable description and setDescription to record the description inputs using useState hook */
  const [description, setDescription] = useState({
    para1: "",
    para2: "",
    para3: "",
    para4: "",
    para5: "",
    para6: "",
    para7: "",
    para8: "",
    para9: "",
    para10: "",
  });

  /* Defining state variable detailKey and setDetailKey to record the detail key inputs using useState hook */
  const [detailKey, setDetailKey] = useState({
    detailKey1: "",
    detailKey2: "",
    detailKey3: "",
    detailKey4: "",
    detailKey5: "",
    detailKey6: "",
    detailKey7: "",
    detailKey8: "",
    detailKey9: "",
    detailKey10: "",
  });

  /* Defining state variable detailValue and setDetailValue to record the detail value inputs using useState hook */
  const [detailValue, setDetailValue] = useState({
    detailValue1: "",
    detailValue2: "",
    detailValue3: "",
    detailValue4: "",
    detailValue5: "",
    detailValue6: "",
    detailValue7: "",
    detailValue8: "",
    detailValue9: "",
    detailValue10: "",
  });

  /* Defining state variable additionalKey and setAdditionalKey to record the additional key inputs using useState hook */
  const [additionalKey, setAdditionalKey] = useState({
    additionalKey1: "",
    additionalKey2: "",
    additionalKey3: "",
    additionalKey4: "",
    additionalKey5: "",
    additionalKey6: "",
    additionalKey7: "",
    additionalKey8: "",
    additionalKey9: "",
    additionalKey10: "",
  });

  /* Defining state variable additionalValue and setAdditionalValue to record the additional value inputs using useState hook */
  const [additionalValue, setAdditionalValue] = useState({
    additionalValue1: "",
    additionalValue2: "",
    additionalValue3: "",
    additionalValue4: "",
    additionalValue5: "",
    additionalValue6: "",
    additionalValue7: "",
    additionalValue8: "",
    additionalValue9: "",
    additionalValue10: "",
  });

  /* Function to handle form input data and dispatching a action to add new product */
  const handleSubmit = (e) => {
    /* Preventing the default form submit behavior */
    e.preventDefault();

    /* Applying Validation on mrp and price */
    if (inputs.mrp <= 0) {
      dispatch(productActions.setError("MRP should be grater then 0."));
      return;
    }
    if (inputs.price <= 0 || inputs.price >= inputs.mrp) {
      dispatch(
        productActions.setError(
          "Price should be grater then 0 and it should be less then MRP"
        )
      );
      return;
    }

    /* Defining array imageList and productDescriptionList to store image URL and description */
    const imageList = [];
    const productDescriptionList = [];

    /* Removing all the empty string from the object and pushing all the value with URL in imageList */
    Object.keys(images).forEach((key) => {
      if (images[key] !== "") {
        imageList.push(images[key]);
      }
    });

    /* Removing all the empty string from the object and pushing all the value with URL in productDescriptionList */
    Object.keys(description).forEach((key) => {
      if (description[key] !== "") {
        productDescriptionList.push(description[key]);
      }
    });

    /* Defining productDetail object with detailKey as key and detailValue as value */
    let productDetail = {
      [detailKey.detailKey1]: detailValue.detailValue1,
      [detailKey.detailKey2]: detailValue.detailValue2,
      [detailKey.detailKey3]: detailValue.detailValue3,
      [detailKey.detailKey4]: detailValue.detailValue4,
      [detailKey.detailKey5]: detailValue.detailValue5,
      [detailKey.detailKey6]: detailValue.detailValue6,
      [detailKey.detailKey7]: detailValue.detailValue7,
      [detailKey.detailKey8]: detailValue.detailValue8,
      [detailKey.detailKey9]: detailValue.detailValue9,
      [detailKey.detailKey10]: detailValue.detailValue10,
    };

    /* Removing all the empty key value pair from productDetail object */
    productDetail = Object.keys(productDetail)
      .filter((objKey) => objKey !== "")
      .reduce((newObj, key) => {
        newObj[key] = productDetail[key];
        return newObj;
      }, {});

    /* Defining additionalDetails object with additionalKey as key and additionalValue as value */
    let additionalDetails = {
      [additionalKey.additionalKey1]: additionalValue.additionalValue1,
      [additionalKey.additionalKey2]: additionalValue.additionalValue2,
      [additionalKey.additionalKey3]: additionalValue.additionalValue3,
      [additionalKey.additionalKey4]: additionalValue.additionalValue4,
      [additionalKey.additionalKey5]: additionalValue.additionalValue5,
      [additionalKey.additionalKey6]: additionalValue.additionalValue6,
      [additionalKey.additionalKey7]: additionalValue.additionalValue7,
      [additionalKey.additionalKey8]: additionalValue.additionalValue8,
      [additionalKey.additionalKey9]: additionalValue.additionalValue9,
      [additionalKey.additionalKey10]: additionalValue.additionalValue10,
    };

    /* Removing all the empty key value pair from additionalDetails object */
    additionalDetails = Object.keys(additionalDetails)
      .filter((objKey) => objKey !== "")
      .reduce((newObj, key) => {
        newObj[key] = additionalDetails[key];
        return newObj;
      }, {});

    /* Setting the inputs */
    setInputs({
      ...inputs,
      image: [...imageList],
      description: [...productDescriptionList],
      rating: Math.floor(Math.random() * (5 - 0 + 1)) + 0,
      Review: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
      details:
        Object.keys(productDetail).length === 0 ? null : { ...productDetail },
      additional:
        Object.keys(additionalDetails).length === 0
          ? null
          : { ...additionalDetails },
    });

    /* Calling this redux#ActionCreator fetchStart with an argument */
    dispatch(productActions.fetchStart());
    /* Calling AsyncThunkAction name addNewProductAsync with argument to make a POST Call */
    dispatch(
      addNewProductAsync({
        title: inputs.title,
        mrp: inputs.mrp,
        price: inputs.price,
        Brand: inputs.Brand,
        type: inputs.type,
        image: [...imageList],
        description: [...productDescriptionList],
        rating: Math.floor(Math.random() * (5 - 0 + 1)) + 0,
        Review: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
        details:
          Object.keys(productDetail).length === 0 ? null : { ...productDetail },
        additional:
          Object.keys(additionalDetails).length === 0
            ? null
            : { ...additionalDetails },
      })
    );
    /* Navigating to home page */
    navigate("/");
  };

  /* Returning The JSX */
  return (
    <form className="w-5/6" onSubmit={handleSubmit}>
      {/* Title Inputs ................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          <div>Enter Title</div>
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Title must contain brand and important feature"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type your product title here"
          className="input input-bordered input-success w-full max-w-full"
          /* Setting the value as inputs.title state variable */
          value={inputs.title}
          /* On changing of input setting the inputs */
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          oninvalid="this.setCustomValidity('Please Enter valid email')"
          required
        />
      </label>

      {/* MRP Inputs ................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter MRP{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="MRP Shouldn't be less then 0"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <input
          type="number"
          placeholder="Type product MRP here"
          min={0}
          className="input input-bordered input-success w-full max-w-full"
          /* Setting the value as inputs.mrp state variable */
          value={inputs.mrp}
          /* On changing of input setting the inputs */
          onChange={(e) => setInputs({ ...inputs, mrp: e.target.value })}
          required
        />
      </label>

      {/* Price input .................................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Price{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Price should be greater then zero"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <input
          type="number"
          placeholder="Type product price here"
          min={0}
          /* Setting the value as inputs.price state variable */
          value={inputs.price}
          /* On changing of input setting the inputs */
          onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          className="input input-bordered input-success w-full max-w-full"
          required
        />
      </label>

      {/*  Brand Input .....................................................  */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Brand{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Enter Valid Brand Name"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type your product brand here"
          className="input input-bordered input-success w-full max-w-full"
          /* Setting the value as inputs.Brand state variable */
          value={inputs.Brand}
          /* On changing of input setting the inputs */
          onChange={(e) => setInputs({ ...inputs, Brand: e.target.value })}
          required
        />
      </label>

      {/* Type Input .................................................... */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Select Product Type{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Select Type Care Fully"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <select
          className="select select-success w-full max-w-full"
          /* Setting the value as inputs.type state variable */
          value={inputs.type}
          /* On changing of input setting the inputs */
          onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          required
        >
          <option disabled selected value={""}>
            Pick the type of product
          </option>
          <option value="electronic">Electronic</option>
          <option value="Men">Men</option>
          <option value="women">Women</option>
          <option value="Bags">Bag</option>
          <option value="Accessories">Accessories</option>
        </select>
      </label>

      {/* Image URL Inputs .................................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Image URL{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Can enter max 7 images"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          /* Setting the value as images.image1 state variable */
          value={images.image1}
          /* On changing of input setting the inputs */
          onChange={(e) => setImages({ ...images, image1: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          /* Setting the value as images.image1 state variable */
          value={images.image2}
          /* On changing of input setting the inputs */
          onChange={(e) => setImages({ ...images, image2: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          /* Setting the value as images.image1 state variable */
          value={images.image3}
          /* On changing of input setting the inputs */
          onChange={(e) => setImages({ ...images, image3: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          /* Setting the value as images.image1 state variable */
          value={images.image4}
          /* On changing of input setting the inputs */
          onChange={(e) => setImages({ ...images, image4: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          /* Setting the value as images.image1 state variable */
          value={images.image5}
          /* On changing of input setting the inputs */
          onChange={(e) => setImages({ ...images, image5: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          /* Setting the value as images.image1 state variable */
          value={images.image6}
          /* On changing of input setting the inputs */
          onChange={(e) => setImages({ ...images, image6: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          /* Setting the value as images.image1 state variable */
          value={images.image7}
          /* On changing of input setting the inputs */
          onChange={(e) => setImages({ ...images, image7: e.target.value })}
        />
      </label>

      {/* Product Description input .................................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Product Description{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Can only enter max 10 para about the product"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type description para 1 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para1}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para1: e.target.value })
          }
          required
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 2 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para2}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para2: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 3 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para3}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para3: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 4 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para4}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para4: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 5 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para5}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para5: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 6 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para6}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para6: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 7 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para7}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para7: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 8 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para8}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para8: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 9 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para9}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para9: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 10 here..."
          /* Setting the value as images.image1 state variable */
          value={description.para10}
          onChange={(e) =>
            /* On changing of input setting the inputs */
            setDescription({ ...description, para10: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
      </label>

      {/* Product Specific input .................................... */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Product Specific Detail{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Enter detail heading on left and its description on right"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        {/* !st Key Value pair input */}
        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey1}
            onChange={(e) =>
              /* On changing of input setting the inputs */
              setDetailKey({
                ...detailKey,
                detailKey1: e.target.value,
              })
            }
            className="input input-bordered input-secondary w-5/12 mb-1"
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue1}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue1: e.target.value })
            }
          />
        </div>

        {/* Second key value pair input */}
        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey2}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey2: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue2}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue2: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey3}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey3: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue3}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue3: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey4}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey4: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue4}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue4: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey5}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey5: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue5}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue5: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey6}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey6: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue6}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue6: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey7}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey7: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue7}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue7: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey8}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey8: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue8}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue8: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey9}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey9: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue9}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue9: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailKey.detailKey10}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey10: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={detailValue.detailValue10}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue10: e.target.value })
            }
          />
        </div>
      </label>

      {/* Input of key value pair of additional detail */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Additional Details{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Enter detail heading on left and its description on right"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" alt="bulb" />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey1 state variable */
            value={additionalKey.additionalKey1}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey1: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue1 state variable */
            value={additionalValue.additionalValue1}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue1: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey2 state variable */
            value={additionalKey.additionalKey2}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey2: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue2 state variable */
            value={additionalValue.additionalValue2}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue2: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={additionalValue.additionalValue3}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey3: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue3 state variable */
            value={additionalValue.additionalValue3}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue3: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as images.image1 state variable */
            value={additionalValue.additionalValue4}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey4: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue4 state variable */
            value={additionalValue.additionalValue4}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue4: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey5 state variable */
            value={additionalKey.additionalKey5}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey5: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue5 state variable */
            value={additionalValue.additionalValue5}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue5: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey6 state variable */
            value={additionalKey.additionalKey6}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey6: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue6 state variable */
            value={additionalValue.additionalValue6}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue6: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey7 state variable */
            value={additionalKey.additionalKey7}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey7: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue7 state variable */
            value={additionalValue.additionalValue7}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue7: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey8 state variable */
            value={additionalKey.additionalKey8}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey8: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue8 state variable */
            value={additionalValue.additionalValue8}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue8: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey9 state variable */
            value={additionalKey.additionalKey9}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey9: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue9 state variable */
            value={additionalValue.additionalValue9}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue9: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalKey.additionalKey10 state variable */
            value={additionalKey.additionalKey10}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey10: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            /* Setting the value as additionalValue.additionalValue10 state variable */
            value={additionalValue.additionalValue10}
            /* On changing of input setting the inputs */
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue10: e.target.value,
              })
            }
          />
        </div>
      </label>
      <div className="w-full flex justify-center items-center">
        {/* If Loading state is true showing the PropagateLoader otherwise button */}
        {loading ? (
          <PropagateLoader color="blue" />
        ) : (
          <button
            className="btn btn-active btn-primary w-3/12 font-extrabold text-lg"
            type="submit"
          >
            Add Product
          </button>
        )}
      </div>
    </form>
  );
}

/* Exporting AddForm Component */
export default AddForm;
