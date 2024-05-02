import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";
import '../../css/table.css'

export default function Pages(){
    const [pages, setpages] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        try{
            const response = await api.get(`api/pages/search/${search}`);
            setpages(response.data.data);
        }catch(error){
            console.log("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/pages');
                setpages(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try{
            const response = await api.delete(`api/pages/${id}`);
            if(response.data.status === "success"){
                setpages(pages.filter((pages) => pages.id_pages !== id));
                Swal.fire({
                    title: "Delete pages Success",
                    text: `pages with id: ${id} successfully deleted`,
                    icon: "success",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#006fb9"
                });
            }
        }catch(error){
            Swal.fire({
                title: "Delete pages failed",
                text: `pages with id: ${id} failed to delete: ${error.message}`,
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
            <Navbar active={"pages"}/>
            <div className="container py-5 mt-5">
            <div className="row w-100 d-flex flex-row justify-content-between align-items-center">
                <div className="col-md-4">
                    <h1 className="mb-1">Pages List</h1>
                    <p>List of the Pages of rental pages</p>
                </div>
                <div className="col-md-4 d-flex flex-row justify-content-between align-items-center gap-3">
                    <input type="text" name="cari" id="cari" placeholder="Search Pages" className="form-control" onChange={(e) => setSearch(e.target.value)} />
                    <div className="bg-primary rounded-3 d-flex justify-content-center align-items-center cursor-pointer" style={{width: "50px", height: "40px", cursor: "pointer"}} onClick={() => handleSearch()}>
                        <i className="bi bi-search text-white"></i>
                    </div>
                </div>
                <div className="col-md-4 mt-3 mt-md-0 mb-3 mb-md-0 d-flex justify-content-start justify-content-md-end align-items-center">
                    <Link to={'/create-pages'} className="btn btn-md btn-success">Add Pages</Link>
                </div>
            </div>
            <div className="row w-100">
                <table className="shadow-sm">
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Links</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {pages.map((pages) => (
                            <tr key={pages.id_pages}>
                                <td>{id++}</td>
                                <td>{pages.title}</td>
                                <td>{pages.description}</td>
                                <td>{pages.links}</td>
                                <td className="d-flex flex-row gap-2">
                                    <Link to={`/update-pages/${pages.id_pages}`} className="btn btn-md btn-warning text-white">Edit</Link>
                                    <button className="btn btn-md btn-danger" onClick={() => handleDelete(pages.id_pages)}>Delete</button>
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