import { useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Swal from "sweetalert2";

export default function Login() {
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", state.username);
    formData.append("password", state.password);

    await api
      .post("api/login", formData)
      .then((response) => {
        localStorage["token"] = response.data.token;
        Swal.fire({
          title: "Log In success!",
          text: `You are logged in to rental website`,
          icon: "success",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: "#006fb9",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/products");
          }
        });
      })
      .catch((error) => {
        console.log("Error while login: ", error.message);
      });
  }

  return (
    <>
      <Navbar isAuth={true} />
      <div className="container py-5 mt-5">
        <div className="row py-3 w-100 d-flex justify-content-center">
          <form className="col-md-4 shadow-sm rounded-2 d-flex flex-column px-3 py-3" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-center mb-0">Login</h1>
            <p className="text-center">Log In to continue</p>
            <div className="mb-3">
              <label htmlFor="name" className="fw-bold form-label">
                Name
              </label>
              <div className="d-flex p-2 gap-2 align-items-center border rounded-2">
                <i className="bi bi-person-circle"></i>
                <input type="text" name="name" id="name" className="border-0" style={{ outline: "none", flex: "1 1 0" }} placeholder="Enter name" onChange={(e) => setState({ ...state, username: e.target.value })} />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="fw-bold form-label">
                Password
              </label>
              <div className="d-flex p-2 gap-2 align-items-center border rounded-2">
                <i className="bi bi-shield-lock"></i>
                <input
                  type={isHidden ? "password" : "text"}
                  name="password"
                  id="password"
                  className="border-0"
                  style={{ outline: "none", flex: "1 1 0" }}
                  placeholder="Enter Password"
                  onChange={(e) => setState({ ...state, password: e.target.value })}
                />
                <i className={isHidden ? "bi bi-eye-fill" : "bi bi-eye"} onClick={() => setIsHidden(!isHidden)}></i>
              </div>
            </div>
            <button type="submit" className="btn btn-dark btn-md mb-2">
              Submit
            </button>
            <p className="fs-6 text-center">
              Dont have an account ?{" "}
              <Link to={"/register"} className="text-decoration-none">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
