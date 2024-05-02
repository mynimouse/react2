import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";
import '../../css/table.css'

export default function Categories(){
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
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

    const handleSearch = async () => {
        try{
            const response = await api.get(`api/category/search/${search}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            setCategories(response.data.data);
        }catch(error){
            console.log("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/category', {
                    headers:{
                        "Authorization": "Bearer" . ${token}
                    }
                });
                setCategories(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, [token]);

    const handleDelete = async (id) => {
        try{
            const response = await api.delete(`api/category/${id}`);
            if(response.data.status === "success"){
                setCategories(categories.filter((category) => category.id_category !== id));
                Swal.fire({
                    title: "Delete Car Success",
                    text: `Category with id: ${id} successfully deleted`,
                    icon: "success",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#006fb9"
                });
            }
        }catch(error){
            Swal.fire({
                title: "Delete Car failed",
                text: `Category with id: ${id} failed to delete: ${error.message}`,
                icon: "error",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: "#006fb9"
            });
        }
    }

    let id = 1;

    return (
        <>
            <Navbar active={"category"}/>
            <div className="container py-5 mt-5">
            <div className="row w-100 d-flex flex-row justify-content-between align-items-center">
                <div className="col-md-4">
                    <h1 className="mb-1">Category List</h1>
                    <p>List of the category of rental cars</p>
                </div>
                <div className="col-md-4 d-flex flex-row justify-content-between align-items-center gap-3">
                    <input type="text" name="cari" id="cari" placeholder="Search Category" className="form-control" onChange={(e) => setSearch(e.target.value)} />
                    <div className="bg-primary rounded-3 d-flex justify-content-center align-items-center cursor-pointer" style={{width: "50px", height: "40px", cursor: "pointer"}} onClick={() => handleSearch()}>
                        <i className="bi bi-search text-white"></i>
                    </div>
                </div>
                <div className="col-md-4 mt-3 mt-md-0 mb-3 mb-md-0 d-flex justify-content-end align-items-center">
                    <Link to={'/create-category'} className="btn btn-md btn-success">Add Category</Link>
                </div>
            </div>
            <div className="row w-100">
                <table className="shadow-sm">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id_category}>
                                <td>{id++}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td className="d-flex flex-row gap-2">
                                    <Link to={`/update-category/${category.id_category}`} className="btn btn-md btn-warning text-white">Edit</Link>
                                    <button className="btn btn-md btn-danger" onClick={() => handleDelete(category.id_category)}>Delete</button>
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