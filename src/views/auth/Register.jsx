import { useState } from "react";
import api from "../../api";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register(){
    const [state, setState] = useState({
        username: "",
        firstname: "",
        lastname: "",
        telephone: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const navigate = useNavigate();

    const handleReset = () => {
        setState({
            username: "",
            firstname: "",
            lastname: "",
            telephone: "",
            email: "",
            password: "",
            password_confirmation: "",
        });
    }

    console.log(state);

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append('firstname', state.firstname)
        formData.append('lastname', state.lastname)
        formData.append('username', state.username)
        formData.append('telephone', state.telephone)
        formData.append('email', state.email)
        formData.append('password', state.password)
        formData.append('password_confirmation', state.password_confirmation);

        await api
            .post('api/register', formData)
            .then(() => {
                Swal.fire({
                    title: "Create account success!",
                    text: `You are registered to rental website`,
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "#006fb9"
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate('/login');
                    }
                });
            })
            .catch((error) => {
                console.log("Error while post data: ", error.message);
            })
    }

    return (
        <>
            <Navbar isAuth={true}/>
            <div className="container py-5 mt-5">
                <div className="row w-100 d-flex justify-content-center">
                    <h1>Register</h1>
                    <p>Create rental account</p>
                    <form className="col-md-12" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row w-100">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="firstname" className="form-label fw-bold">Firstname</label>
                                    <input type="text" name="firstname" id="firstname" className="form-control" placeholder="Enter firstname" onChange={(e) => setState({...state, firstname: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label fw-bold">Lastname</label>
                                    <input type="text" name="lastname" id="lastname" className="form-control" placeholder="Enter lastname" onChange={(e) => setState({...state, lastname: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                                    <input type="text" name="username" id="username" className="form-control" placeholder="Enter Username" onChange={(e) => setState({...state, username: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telephone" className="form-label fw-bold">Telephone</label>
                                    <input type="text" name="telephone" id="telephone" className="form-control" placeholder="Enter telephone" onChange={(e) => setState({...state, telephone: e.target.value})} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                                    <input type="text" name="email" id="email" className="form-control" placeholder="Enter email" onChange={(e) => setState({...state, email: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-bold">password</label>
                                    <input type="password" name="password" id="password" className="form-control" placeholder="Enter password" onChange={(e) => setState({...state, password: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirm" className="form-label fw-bold">Confirm Password</label>
                                    <input type="password" name="confirm" id="confirm" className="form-control" placeholder="Enter confirm password" onChange={(e) => setState({...state, password_confirmation: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className="action d-flex flex-row gap-2 mt-2">
                            <button type="submit" className="btn btn-success btn-md">Submit</button>
                            <button type="reset" className="btn btn-danger btn-md" onClick={() => handleReset()}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}