import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect: false,
        formData: "",
    });

    const { name, description, price, stock, photo, categories, category, loading, error, createdProduct, getRedirect, formData } = values;

    const preload = (productId) => {
        getProduct(productId).then((data) => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData(),
                });
                preloadCategories();
            }
        });
    };

    const preloadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    categories: data,
                    formData: new FormData(),
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(match.params.productId, user._id, token, formData).then((data) => {
            console.log(data);
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
                    createdProduct: data.name,
                });
            }
        });
    };

    const handleChange = (name) => (event) => {
        console.log(event);
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: updateProduct ? "" : "none" }}>
            <h4>{updateProduct} Updated Successfully</h4>
        </div>
    );

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group mb-3">
                <label className="btn btn-block btn-success">
                    <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="choose a file" />
                </label>
            </div>
            <div className="form-group mb-3">
                <input onChange={handleChange("name")} name="photo" className="form-control" placeholder="Name" value={name} />
            </div>
            <div className="form-group mb-3">
                <textarea onChange={handleChange("description")} name="photo" className="form-control" placeholder="Description" value={description} />
            </div>
            <div className="form-group mb-3">
                <input onChange={handleChange("price")} type="number" className="form-control" placeholder="Price" value={price} />
            </div>
            <div className="form-group mb-3">
                <select onChange={handleChange("category")} className="form-control" placeholder="Category">
                    <option>Select</option>
                    {categories &&
                        categories.map((cate, index) => (
                            <option key={index} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group mb-3">
                <input onChange={handleChange("stock")} type="number" className="form-control" placeholder="Quantity" value={stock} />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Product
            </button>
        </form>
    );

    return (
        <Base title="Add Product" description="Welcome to product creation sectin" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md bg-danger mb-3">
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;
