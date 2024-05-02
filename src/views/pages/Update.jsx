import Navbar from "../Navbar";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Update(){
    const { id } = useParams();
    const [pagesData, setpagesData] = useState({});
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
                const response = await api.get(`api/pages/${id}`);
                setpagesData(response.data.data);
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
        if(Object.keys(pagesData).length !== 0){
            setState({
                title: pagesData.title,
                description: pagesData.description,
                image: pagesData.image,
                links: pagesData.links,
                id_category: pagesData.id_category,
                id_user: pagesData.id_user,
                status: pagesData.status,
            });
        }
    }, [pagesData]);

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

    async function storePages(e){
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
            .post(`api/pages/${id}`, formData)
            .then(() => {
                navigate('/pages');
            })
            .catch((error) => {
                console.log("Error post data: ", error.message);
            });
    }

    let key = 1;

    return (
        <>
            <Navbar active={"pages"}/>
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <h1 className="mb-0">Create Pages</h1>
                    <p>Create new pages</p>
                    <form className="col-md-12 mt-2" onSubmit={(e) => storePages(e)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-bold">Title</label>
                            <input type="text" name="title" id="title" className="form-control" value={state.title} placeholder="Enter pages title" onChange={(e) => setState({...state, title: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-bold">Description</label>
                            <textarea name="description" id="description" cols="5" rows="4" value={state.description} className="form-control" placeholder="Enter pages description" onChange={(e) => setState({...state, description: e.target.value})}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fw-bold">Image</label>
                            <input type="text" name="image" id="image" className="form-control" value={state.image} placeholder="Enter pages image" onChange={(e) => setState({...state, image: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="links" className="form-label fw-bold">Links</label>
                            <input type="text" name="links" id="links" className="form-control" value={state.links} placeholder="Enter pages links" onChange={(e) => setState({...state, links: e.target.value})}/>
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
                            <input type="text" name="id_user" id="id_user" className="form-control" value={state.id_user} placeholder="Enter pages user ID" onChange={(e) => setState({...state, id_user: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label fw-bold">Status</label>
                            <input type="text" name="status" id="status" className="form-control" value={state.status} placeholder="Enter pages status" onChange={(e) => setState({...state, status: e.target.value})}/>
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