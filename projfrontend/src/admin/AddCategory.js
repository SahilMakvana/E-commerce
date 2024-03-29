import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        createCategory(user._id, token, { name }).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
                setName("");
            }
        });
    };

    const SuccessMessage = () => {
        if (success) {
            return <h4 className="text-success">Category Created Successfully</h4>;
        }
    };

    const WarningMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to Create Category</h4>;
        }
    };

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input type="text" className="form-control mb-3" onChange={handleChange} value={name} autoFocus required placeholder="For Ex. Summer" />
                <button className="btn btn-outline-info" onClick={onSubmit}>
                    Create Category
                </button>
            </div>
        </form>
    );

    return (
        <Base title="Create a Category Here" description="Add a new category for new T-Shirts" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {SuccessMessage()}
                    {WarningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;
