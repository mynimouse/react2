import Navbar from "../Navbar";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Update(){
    const { id } = useParams();
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
    
    const [categoryData, setCategoryData] = useState({});
    const [state, setState] = useState({
        name: "",
        status: "",
        description: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get(`api/category/${id}`);
                setCategoryData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, [id]);

    useEffect(() => {
        if(Object.keys(categoryData).length !== 0){
            setState({
                name: categoryData.name, 
                status: categoryData.status, 
                description: categoryData.description
            });
        }
    }, [categoryData]);

    const handleReset = () => {
        setState({
            name: "",
            status: "",
            description: ""
        });
    }

    async function storeCategory(e){
        e.preventDefault();

        const formData = {
            name: state.name,
            status: state.status,
            description: state.description
        }

        console.log(formData);

        await api
            .post(`api/category/${id}`, formData)
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
                    <h1 className="mb-0">Edit Category</h1>
                    <p>Edit new detail of category</p>
                    <form className="col-md-12 mt-2" onSubmit={(e) => storeCategory(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Enter Product Name" value={state.name} onChange={(e) => setState({...state, name: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fw-bold">Status</label>
                            <input type="text" name="status" id="status" className="form-control" placeholder="Enter Status" value={state.status} onChange={(e) => setState({...state, status: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fw-bold">Description</label>
                            <input type="text" name="description" id="description" className="form-control" placeholder="Enter Description Product" value={state.description} onChange={(e) => setState({...state, description: e.target.value})}/>
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