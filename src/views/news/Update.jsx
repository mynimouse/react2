import Navbar from "../Navbar";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Update(){
    const { id } = useParams();
    const [newsData, setnewsData] = useState({});
    const [state, setState] = useState({
        title: "",
        description: "",
        image: "",
        links: "",
        id_category: 0,
        id_user: 0,
        status: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get(`api/news/${id}`);
                setnewsData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, [id]);

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/category');
                setCategories(response.data.data);
            }catch(error){
                console.log("Error fecthing data: ", error)
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if(Object.keys(newsData).length !== 0){
            setState({
                title: newsData.title,
                description: newsData.description,
                image: newsData.image,
                links: newsData.links,
                id_category: newsData.id_category,
                id_user: newsData.id_user,
                status: newsData.status,
            });
        }
    }, [newsData]);

    const handleReset = () => {
        setState({
            title: "",
            description: "",
            image: "",
            links: "",
            id_category: 0,
            id_user: 0,
            status: "",
        });
    }

    async function storeNews(e){
        e.preventDefault();

        const formData = {
            title: state.title,
            description: state.description,
            image: state.image,
            links: state.links,
            id_category: state.id_category,
            id_user: state.id_user,
            status: state.status,
        }

        console.log(formData);

        await api
            .post(`api/news/${id}`, formData)
            .then(() => {
                navigate('/news');
            })
            .catch((error) => {
                console.log("Error post data: ", error.message);
            });
    }

    let key = 1;

    return (
        <>
            <Navbar active={"news"}/>
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <h1 className="mb-0">Create news</h1>
                    <p>Create new news</p>
                    <form className="col-md-12 mt-2" onSubmit={(e) => storeNews(e)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-bold">Title</label>
                            <input type="text" name="title" id="title" className="form-control" value={state.title} placeholder="Enter news title" onChange={(e) => setState({...state, title: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-bold">Description</label>
                            <textarea name="description" id="description" cols="5" rows="4" value={state.description} className="form-control" placeholder="Enter news description" onChange={(e) => setState({...state, description: e.target.value})}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fw-bold">Image</label>
                            <input type="text" name="image" id="image" className="form-control" value={state.image} placeholder="Enter news image" onChange={(e) => setState({...state, image: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="links" className="form-label fw-bold">Links</label>
                            <input type="text" name="links" id="links" className="form-control" value={state.links} placeholder="Enter news links" onChange={(e) => setState({...state, links: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label fw-bold">Category</label>
                            <select name="category" id="category" className="form-select" value={state.id_category} onChange={(e) => setState({...state, id_category: e.target.value})}>
                                <option value="none">Select Category</option>
                                {categories.map((category) => (
                                    <option value={category.id_category} key={key++}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_user" className="form-label fw-bold">User ID</label>
                            <input type="text" name="id_user" id="id_user" className="form-control" value={state.id_user} placeholder="Enter news user ID" onChange={(e) => setState({...state, id_user: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label fw-bold">Status</label>
                            <input type="text" name="status" id="status" className="form-control" value={state.status} placeholder="Enter news status" onChange={(e) => setState({...state, status: e.target.value})}/>
                        </div>
                        <div className="d-flex flex-row gap-2">
                            <button className="btn btn-md btn-success" type="submit">Submit</button>
                            <button className="btn btn-md btn-danger" type="reset" onClick={() => handleReset()}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}