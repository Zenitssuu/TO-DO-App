import React, { useEffect, useState } from "react";
import { register } from "../services/api.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigation = useNavigate();


  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
        return navigation('/');
    }
  })

  const [err, setErr] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // console.log(form);

    const result = await register(form);

    console.log(result);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErr(result.data.data);
        toast(result.data.message);
        return;
      } else if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      } else if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("something went wrong, please try again");
    }
  };
  return (
    <>
      <div className="conatiner">
        <ToastContainer />
        <div className="row justify-content-md-center mt-4">
          <div className="col-lg-5 card border-primary mb-3">
            <div className="card-header h4 text-center">
              Register And Account
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="col-form-label mt-4">Name</label>
                <input
                  name="name"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="enter name"
                />
                {err?.name && (
                  <small id="emailHelp" className="form-text text-danger">
                    {err.name.msg}
                  </small>
                )}
              </div>
              {/* username */}
              <div className="form-group">
                <label className="col-form-label mt-4">Username</label>
                <input
                  name="username"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="enter username"
                />
                {err?.username && (
                  <small id="emailHelp" className="form-text text-danger">
                    {err.username.msg}
                  </small>
                )}
              </div>
              {/* email */}
              <div className="form-group">
                <label className="col-form-label mt-4">Email</label>
                <input
                  name="email"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="enter email"
                />
                {err?.email && (
                  <small id="emailHelp" className="form-text text-danger">
                    {err.email.msg}
                  </small>
                )}
              </div>

              {/* password */}
              <div className="form-group">
                <label className="col-form-label mt-4">Password</label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="enter Password"
                />
                {err?.password && (
                  <small id="emailHelp" className="form-text text-danger">
                    {err.password.msg}
                  </small>
                )}
              </div>

              <div className="row justify-content-md-center form-group mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="col-sm-6 btn btn-outline-secondary center"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
