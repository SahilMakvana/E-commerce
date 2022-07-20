import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const { name, email, password, error, success } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then();
    };

    const signUpForm = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input className="form-control" onChange={handleChange("name")} type="text" />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input className="form-control" onChange={handleChange("email")} type="email" />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input className="form-control" onChange={handleChange("password")} type="password" />
                    </div>
                    <div className="form-group">
                        <label className="text-light"> </label>
                    </div>
                    <div class="d-grid mx-auto">
                        <button class="btn btn-success" type="button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <Base title="Signup Page" description="A page for user Signup">
            {signUpForm()}
        </Base>
    );
};

export default Signup;
