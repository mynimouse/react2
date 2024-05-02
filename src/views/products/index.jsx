import { useEffect, useState } from "react"
import api from "../../api"
import '../../css/table.css'
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function Products(){
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [token, setToken] = useState("");

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
            const response = await api.get(`api/products/search/${search}`);
            setProductData(response.data.data);
        }catch(error){
            console.log("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/products');
                setProductData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try{
            const response = await api.delete(`api/products/${id}`);
            if(response.data.status === "success"){
                setProductData(productData.filter((product) => product.id !== id));
                Swal.fire({
                    title: "Delete Product Success",
                    text: `Product with id: ${id} successfully deleted`,
                    icon: "success",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#006fb9"
                });
            }
        }catch(error){
            Swal.fire({
                title: "Delete Product failed",
                text: `Product with id: ${id} failed to delete: ${error.message}`,
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
          <Navbar active={"products"} />
          <div className="container py-5 mt-5">
            <div className="row w-100 d-flex flex-row justify-content-between align-items-center">
                <div className="col-md-4">
                    <h1>Product List</h1>
                    <p>List of the product</p>
                </div>
                <div className="col-md-4 d-flex flex-row justify-content-between align-items-center gap-3">
                    <input type="text" name="cari" id="cari" placeholder="Search Products" className="form-control" onChange={(e) => setSearch(e.target.value)} />
                    <div className="bg-primary rounded-3 d-flex justify-content-center align-items-center cursor-pointer" style={{width: "50px", height: "40px", cursor: "pointer"}} onClick={() => handleSearch()}>
                        <i className="bi bi-search text-white"></i>
                    </div>
                </div>
                <div className="col-md-4 mt-3 mt-md-0 mb-3 mb-md-0 d-flex justify-content-end align-items-center">
                    <Link to={'/create-product'} className="btn btn-md btn-success">Add Product</Link>
                </div>
            </div>
            <div className="row w-100">
                <table className="shadow-sm">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {productData.map((product) => (
                            <tr key={product.id}>
                                <td>{id++}</td>
                                <td>{product.name}</td>
                                <td>{product.image}</td>
                                <td>{product.description}</td>
                                <td className="d-flex flex-row gap-2">
                                    <button className="btn btn-md btn-warning text-white">Edit</button>
                                    <button className="btn btn-md btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                                    <button className="btn btn-md btn-primary">Detail</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>  
        </>
    )
}