import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Create(){
    const [state, setState] = useState({
        name: "",
        description: "",
        status: 0
    });
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage["token"];
        if(storedToken){
            setToken(storedToken)
        }else{
            navigate('/login');
        }
    }, [navigate]);

    const handleReset = () => {
        setState({
            name: "",
            description: "",
            status: 0
        });
    }

    async function storeCategory(e){
        e.preventDefault();

        const formData = {
            name: state.name,
            description: state.description,
            status: state.status
        }

        console.log(formData);

        await api
            .post('api/category', formData)
            .then(() => {
                navigate('/category');
            })
            .catch((error) => {
                console.log("Error post data: ", error.message);
            });
    }

    return (
        <>
            <Navbar active={"category"}/>
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <h1 className="mb-0">Create Category</h1>
                    <p>Create new Category</p>
                    <form className="col-md-12 mt-2" onSubmit={(e) => storeCategory(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Enter Category Name" onChange={(e) => setState({...state, name: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label fw-bold">Status</label>
                            <select name="status" id="status" className="form-select" value={state.status} onChange={(e) => setState({...state, status: e.target.value})}>
                                <option value={1}>Active</option>
                                <option value={0}>Non-Active</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="form-label fw-bold">Description</label>
                            <textarea name="description" id="description" cols="5" rows="5" className="form-control" placeholder="Enter Category Description" onChange={(e) => setState({...state, description: e.target.value})}></textarea>
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