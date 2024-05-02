import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Create(){
    const [state, setState] = useState({
        title: "",
        description: "",
        image: null,
        id_category: 0,
        id_user: 0,
        status: 0,
    });
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

    const handleReset = () => {
        setState({
            title: "",
            description: "",
            image: null,
            id_category: 0,
            id_user: 0,
            status: 0,
        });
    }

    async function storePages(e){
        e.preventDefault();

        const formData = {
            title: state.title,
            description: state.description,
            image: state.image,
            id_category: state.id_category,
            id_user: state.id_user,
            status: state.status,
        }

        console.log(formData);

        await api
            .post('api/pages', formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            })
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
                    <form className="col-md-12 mt-2" onSubmit={(e) => storePages(e)} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-bold">Title</label>
                            <input type="text" name="title" id="title" className="form-control" placeholder="Enter pages title" onChange={(e) => setState({...state, title: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-bold">Description</label>
                            <textarea name="description" id="description" cols="5" rows="4" className="form-control" placeholder="Enter pages description" onChange={(e) => setState({...state, description: e.target.value})}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fw-bold">Image</label>
                            <input type="file" name="image" id="image" className="form-control" onChange={(e) => setState({...state, image: e.target.files[0]})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label fw-bold">Category</label>
                            <select name="category" id="category" className="form-select" onChange={(e) => setState({...state, id_category: e.target.value})}>
                                <option value="none">Select Category</option>
                                {categories.map((category) => (
                                    <option value={category.id_category} key={key++}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_user" className="form-label fw-bold">User ID</label>
                            <input type="text" name="id_user" id="id_user" className="form-control" placeholder="Enter pages user ID" onChange={(e) => setState({...state, id_user: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label fw-bold">Status</label>
                            <select name="status" id="status" className="form-select" value={state.status} onChange={(e) => setState({...state, status: e.target.value})}>
                                <option value={1}>Active</option>
                                <option value={0}>Non-Active</option>
                            </select>
                        </div>
                        <div className="d-flex flex-row gap-2">
                            <button className="btn btn-md btn-success" type="submit">Submit</button>
                            <button className="btn btn-md btn-danger" type="reset" onClick={() => handleReset()}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}