import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

export default function Rentals(){
    const [rentalData, setRentalData] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        try{
            const response = await api.get(`api/rental/search/${search}`);
            setRentalData(response.data.data);
        }catch(error){
            console.log("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/rental');
                setRentalData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try{
            const response = await api.delete(`api/rental/${id}`);
            if(response.data.status === "success"){
                setRentalData(rentalData.filter((rental) => rental.id_rental !== id));
                Swal.fire({
                    title: "Delete rental Success",
                    text: `Rental with id: ${id} successfully deleted`,
                    icon: "success",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#006fb9"
                });
            }
        }catch(error){
            Swal.fire({
                title: "Delete rental failed",
                text: `Rental with id: ${id} failed to delete: ${error.message}`,
                icon: "error",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: "#006fb9"
            });
        }
    }

    function capitalize(word){
        let newWord = word[0].toUpperCase();
        for(let i = 1; i < word.length; i++){
            newWord += word[i];
        }

        return newWord;
    }

    let id = 1;

    return (
        <>
            <Navbar active={"rental"}/>
            <div className="container py-5 mt-5">
                <div className="row w-100 d-flex justify-content-between align-items-center">
                    <div className="col-md-4">
                        <h1 className="mb-1">Rental List</h1>
                        <p>List of the rental</p>
                    </div>
                    <div className="col-md-4 d-flex flex-row justify-content-between align-items-center gap-3">
                        <input type="text" name="cari" id="cari" placeholder="Search Rental" className="form-control" onChange={(e) => setSearch(e.target.value)} />
                        <div className="bg-primary rounded-3 d-flex justify-content-center align-items-center cursor-pointer" style={{width: "50px", height: "40px", cursor: "pointer"}} onClick={() => handleSearch()}>
                            <i className="bi bi-search text-white"></i>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3 mt-md-0 mb-3 mb-md-0 d-flex justify-content-end align-items-center">
                        <Link to={'/create-rental'} className="btn btn-md btn-success">Add Rental</Link>
                    </div>
                </div>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <th>ID</th>
                            <th>Rental Date</th>
                            <th>Return Date</th>
                            <th>Price</th>
                            <th>User</th>
                            <th>Car ID</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {rentalData.map((rental) => (
                                <tr key={rental.id}>
                                    <td>{id++}</td>
                                    <td>{rental.rental_date}</td>
                                    <td>{rental.return_date}</td>
                                    <td>{rental.price}</td>
                                    <td>{`${capitalize(rental.user.firstname)} ${capitalize(rental.user.lastname)} (${rental.user_id})`}</td>
                                    <td>{rental.car_id}</td>
                                    <td className="d-flex flex-row gap-2">
                                        <Link to={`/update-rental/${rental.id}`} className="btn btn-md btn-warning text-white">Edit</Link>
                                        <button className="btn btn-md btn-danger" onClick={() => handleDelete(rental.id)}>Delete</button>
                                        <button className="btn btn-md btn-primary">Detail</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}