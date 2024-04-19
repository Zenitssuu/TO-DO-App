import React, { useEffect, useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ user, setUser }) {
  useEffect(() => {
    console.log(user);
    if(user){
      navigation('/');
    }
  }, []);


  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigation = useNavigate();

  const handleSubmit = async () => {
    console.log("form: ", form);

    const result = await login(form);
    console.log(result);

    setErr(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }

      if (result.data.status === 201) {
        setErr(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer/>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mt-4 bg-light">
            <div className="card-header">Login</div>
            <div className="card-body">
              <h4 className="card-title">Enter you credentials</h4>
              {/* email */}
              <div>
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Email/Username
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                {err?.username && (
                  <small id="emailHelp" className="form-text text-muted">
                    {err.username.msg}
                  </small>
                )}
              </div>
              {/* password */}
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  autoComplete="off"
                />
                {err?.password && (
                  <small id="emailHelp" className="form-text text-muted">
                    {err.password.msg}
                  </small>
                )}
              </div>

              {/* buttons */}
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary btn-sm px-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
