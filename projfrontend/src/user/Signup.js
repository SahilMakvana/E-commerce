import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const signUpForm = () => (
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
            <form>
                <div className="form-group">
                    <label className="text-light">Name</label>
                    <input className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label className="text-light">Email</label>
                    <input className="form-control" type="email" />
                </div>
                <div className="form-group">
                    <label className="text-light">Password</label>
                    <input className="form-control" type="password" />
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

const Signup = () => {
    return (
        <Base title="Signup Page" description="A page for user Signup">
            {signUpForm()}
        </Base>
    );
};

export default Signup;
