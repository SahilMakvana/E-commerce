import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getProduct, updateProduct, getCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        error: "",
        getRedirect: false,
        formData: "",
    });

    const { name, description, error, getRedirect, formData } = values;

    // const preloadCategories = () => {
    //     getCategories().then((data) => {
    //         if (data.error) {
    //             setValues({ ...values, error: data.error });
    //         } else {
    //             setValues({
    //                 categories: data,
    //             });
    //         }
    //     });
    // };

    const preload = (categoryId) => {
        getCategory(categoryId).then((data) => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    // description: data.description,
                    // price: data.price,
                    // category: data.category._id,
                    // stock: data.stock,
                    formData: new FormData(),
                });
                // preloadCategories();
            }
        });
    };

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(match.params.productId, user._id, token, formData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    photo: "",
                    loading: false,
                });
            }
        });
    };

    const handleChange = (event) => {
        // console.log(event.target.value);
        const value = event.target.value;
        // event.target.value = value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
        // console.log(formData.get(name));
        console.log(values[name]);
    };

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: updateProduct ? "" : "none" }}>
            <h4>{updateProduct} Updated Successfully</h4>
        </div>
    );

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                {/* {console.log(values.name)} */}
                {/* <input type="text" onChange={handleChange("name")} name="name" value={name} autoFocus required placeholder="For Ex. Summer" /> */}
                <input onChange={(event) => handleChange(event)} name="photo" className="form-control" placeholder="Name" value={values.name} />
                <button className="btn btn-outline-info" onClick={onSubmit}>
                    Update Category
                </button>
            </div>
        </form>
    );

    return (
        <Base title="Create a Category Here" description="Add a new category for new T-Shirts" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md bg-danger mb-3">
                Admin Home
            </Link>
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">{myCategoryForm()}</div>
            </div>
        </Base>
    );
};

export default UpdateCategory;
