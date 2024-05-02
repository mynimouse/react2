import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import Navbar from "../Navbar";

export default function Detail(){
    const [carData, setCarData] = useState({});
    const {id} = useParams();
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage["token"];
        if(storedToken){
            setToken(storedToken)
        }else{
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get(`api/cars/${id}`);
                setCarData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, [id]);

    return (
        <>
            <Navbar/>
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <div className="col-md-12">
                        <h1 className="mb-0">{carData.title}</h1>
                        <p>{carData.description}</p>
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col-md-6">
                        <img src={(Object.keys(carData).length !== 0) ? (carData.photo1.includes("https")) ? carData.photo1 : `http://localhost:8000/storage/${carData.photo1}` : ""} className="w-100 h-100 object-fit-cover rounded" onLoad={(<span className="placeholder col-md-6"></span>)}/>
                    </div>
                    <div className="col-md-6">
                        <img src={(Object.keys(carData).length !== 0) ? (carData.photo1.includes("https")) ? carData.photo2 : `http://localhost:8000/storage/${carData.photo2}` : ""} className="w-100 h-100 object-fit-cover rounded"/>
                    </div>
                </div>
                <div className="row w-100 mt-5">
                    <h1 className="mb-0">Detail Car</h1>
                    <p>Detail of the car</p>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Link :</p>
                        <p className="fs-5">{carData.link}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Brand :</p>
                        <p className="fs-5">{carData.brand}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Model :</p>
                        <p className="fs-5">{carData.model}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Fuel Type :</p>
                        <p className="fs-5">{(carData.fuel_type) ? carData.fuel_type.toUpperCase() : ""}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Price :</p>
                        <p className="fs-5">{carData.price + "$/day"}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Gearbox :</p>
                        <p className="fs-5">{(carData.gearbox) ? carData.gearbox.toUpperCase() : ""}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Available :</p>
                        <p className="fs-5">{(carData.available) ? "Yes" : "No"}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4 fw-bold mb-0">Status :</p>
                        <p className="fs-5">{carData.status}</p>
                    </div>
                </div>
            </div>
        </>
    );
}