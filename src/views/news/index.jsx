import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

export default function News(){
    const [newsData, setNewsData] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        try{
            const response = await api.get(`api/news/search/${search}`);
            setNewsData(response.data.data);
        }catch(error){
            console.log("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/news');
                setNewsData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try{
            const response = await api.delete(`api/news/${id}`);
            if(response.data.status === "success"){
                setNewsData(newsData.filter((news) => news.id_news !== id));
                Swal.fire({
                    title: "Delete News Success",
                    text: `News with id: ${id} successfully deleted`,
                    icon: "success",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#006fb9"
                });
            }
        }catch(error){
            Swal.fire({
                title: "Delete News failed",
                text: `News with id: ${id} failed to delete: ${error.message}`,
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
            <Navbar active={"news"}/>
            <div className="container py-5 mt-5">
                <div className="row w-100 d-flex flex-row justify-content-between align-items-center">
                    <div className="col-md-4">
                        <h1 className="mb-1">News List</h1>
                        <p>List of the News of rental pages</p>
                    </div>
                    <div className="col-md-4 d-flex flex-row justify-content-between align-items-center gap-3">
                        <input type="text" name="cari" id="cari" placeholder="Search News" className="form-control" onChange={(e) => setSearch(e.target.value)} />
                        <div className="bg-primary rounded-3 d-flex justify-content-center align-items-center cursor-pointer" style={{width: "50px", height: "40px", cursor: "pointer"}} onClick={() => handleSearch()}>
                            <i className="bi bi-search text-white"></i>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3 mt-md-0 mb-3 mb-md-0 d-flex justify-content-start justify-content-md-end align-items-center">
                        <Link to={'/create-news'} className="btn btn-md btn-success">Add News</Link>
                    </div>
                </div>
                <div className="row w-100">
                    <table className="shadow-sm">
                        <thead>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Links</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {newsData.map((news) => (
                                <tr key={news.id_category}>
                                    <td>{id++}</td>
                                    <td>{news.title}</td>
                                    <td>{news.description}</td>
                                    <td>{news.image}</td>
                                    <td>{news.links}</td>
                                    <td className="d-flex flex-row gap-2">
                                        <Link to={`/update-news/${news.id_news}`} className="btn btn-md btn-warning text-white">Edit</Link>
                                        <button className="btn btn-md btn-danger" onClick={() => handleDelete(news.id_news)}>Delete</button>
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