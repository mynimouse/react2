import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Create(){
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage["token"];
        if(storedToken){
            setToken(storedToken)
        }else{
            navigate('/login');
        }
    }, [navigate]);
    
    const [state, setState] = useState({
        title: "",
        description: "",
        photo1: "",
        photo2: "",
        brand: "",
        model: "",
        fuel_type: "",
        gearbox: "",
        price: "",
        available: 0,
        status: 0,
    });
    const navigate = useNavigate();

    const handleReset = () => {
        setState({
            title: "",
            description: "",
            photo1: "",
            photo2: "",
            brand: "",
            model: "",
            fuel_type: "",
            gearbox: "",
            price: "",
            available: 0,
            status: 0,
        });
    }

    async function storeCars(e){
        e.preventDefault();

        const formData = {
            title: state.title,
            description: state.description,
            photo1: state.photo1,
            photo2: state.photo2,
            brand: state.brand,
            model: state.model,
            fuel_type: state.fuel_type,
            gearbox: state.gearbox,
            price: state.price,
            available: state.available,
            status: state.status,
        }

        console.log(formData);

        await api
            .post('api/cars', formData, {
                headers:{
                    "Content-type": "multipart/form-data"
                },
            })
            .then(() => {
                navigate('/cars');
            })
            .catch((error) => {
                console.log("Error post data: ", error.message);
            });
    }

    return (
        <>
            <Navbar active={"cars"}/>
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <h1 className="mb-0">Create Cars</h1>
                    <p>Create New Rent Cars</p>
                    <form className="col-md-12 mt-2" onSubmit={(e) => storeCars(e)} encType="multipart/form-data">
                        <div className="row w-100">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                                    <input type="text" name="title" id="title" className="form-control" placeholder="Enter Car Title" onChange={(e) => setState({...state, title: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                                    <input type="text" name="description" id="description" className="form-control" placeholder="Enter Car Description" onChange={(e) => setState({...state, description: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo1" className="form-label fw-bold">Photo 1</label>
                                    <input type="file" name="photo1" id="photo1" className="form-control" onChange={(e) => setState({...state, photo1: e.target.files[0]})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo2" className="form-label fw-bold">Photo 2</label>
                                    <input type="file" name="photo2" id="photo2" className="form-control" onChange={(e) => setState({...state, photo2: e.target.files[0]})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label fw-bold">Brand</label>
                                    <input type="text" name="brand" id="brand" className="form-control" placeholder="Enter Car Brand" onChange={(e) => setState({...state, brand: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="model" className="form-label fw-bold">Model</label>
                                    <input type="text" name="model" id="model" className="form-control" placeholder="Enter Car Model" onChange={(e) => setState({...state, model: e.target.value})}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="fuel_type" className="form-label fw-bold">Fuel Type</label>
                                    <input type="text" name="fuel_type" id="fuel_type" className="form-control" placeholder="Enter Car Fuel Type" onChange={(e) => setState({...state, fuel_type: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label fw-bold">Price</label>
                                    <input type="text" name="price" id="price" className="form-control" placeholder="Enter Car Price" onChange={(e) => setState({...state, price: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gearbox" className="form-label fw-bold">Gearbox</label>
                                    <input type="text" name="gearbox" id="gearbox" className="form-control" placeholder="Enter Car Gearbox" onChange={(e) => setState({...state, gearbox: e.target.value})}/>
                                </div>
                                <div className="mb-3 d-flex flex-column mb-0">
                                    <p className="fw-bold mb-1">Available</p>
                                    <select name="available" id="available" value={state.available} onChange={(e) => setState({...state, available: e.target.value})} className="form-select">
                                        <option value={1}>Yes</option>
                                        <option value={0}>No</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label fw-bold">Status</label>
                                    <select name="status" id="status" value={state.status} className="form-select" onChange={(e) => setState({...state, status: e.target.value})}>
                                        <option value={1}>Active</option>
                                        <option value={0}>Non-Active</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-2 mt-3">
                            <button className="btn btn-md btn-success" type="submit">Submit</button>
                            <button className="btn btn-md btn-danger" type="reset" onClick={() => handleReset()}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}