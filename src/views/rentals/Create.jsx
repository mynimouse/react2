import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Create(){
    const [carsData, setCarsData] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            try{
                const response = await api.get('api/cars');
                setCarsData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fecthData()
    }, []);

    const [state, setState] = useState({
        rental_date: "",
        return_date: "",
        price: "",
        user_id: 0,
        car_id: 0,
    });
    const navigate = useNavigate();

    const handleReset = () => {
        setState({
            rental_date: "",
            return_date: "",
            price: "",
            user_id: 0,
            car_id: 0,
        });
    }

    async function storeRental(e){
        e.preventDefault();

        const formData = {
            rental_date: state.rental_date,
            return_date: state.return_date,
            price: state.price,
            user_id: state.user_id,
            car_id: state.car_id,
        }

        console.log(formData);

        await api
            .post('api/rental', formData)
            .then(() => {
                navigate('/rental');
            })
            .catch((error) => {
                console.log("Error post data: ", error.message);
            });
    }

    let key = 1;

    return (
        <>
            <Navbar/>
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <h1 className="mb-0">Create Rental</h1>
                    <p>Create new Rental</p>
                    <form className="col-md-12 mt-2" onSubmit={(e) => storeRental(e)}>
                        <div className="mb-3">
                            <label htmlFor="rent_date" className="form-label fw-bold">Rental Date</label>
                            <input type="date" name="rent_date" id="rent_date" className="form-control" onChange={(e) => setState({...state, rental_date: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="return" className="form-label fw-bold">Return Date</label>
                            <input type="date" name="return" id="return" className="form-control" onChange={(e) => setState({...state, return_date: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label fw-bold">Price</label>
                            <input type="text" name="price" id="price" className="form-control" placeholder="Enter Rental Price" onChange={(e) => setState({...state, price: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user_id" className="form-label fw-bold">User ID</label>
                            <input type="text" name="user_id" id="user_id" className="form-control" placeholder="Enter User ID" onChange={(e) => setState({...state, user_id: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold form-label">Rental Car</label>
                            <select name="cars" id="cars" className="form-select" onChange={(e) => setState({...state, car_id: e.target.value})}>
                                <option value="none">Select Cars</option>
                                {carsData.map((car) => (
                                    <option value={car.id} key={key++}>{car.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex flex-row gap-2 mt-2">
                            <button className="btn btn-md btn-success" type="submit">Submit</button>
                            <button className="btn btn-md btn-danger" type="reset" onClick={() => handleReset()}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}