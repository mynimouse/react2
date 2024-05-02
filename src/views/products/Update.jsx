import Navbar from "../Navbar";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Update(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({});
    const [state, setState] = useState({
        name: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get(`api/products/${id}`);
                setProductData(response.data.data);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        fetchData();
    }, [id]);

    useEffect(() => {
        if(productData.length !== 0){
            setState({
                name: productData.name, 
                image: productData.image, 
                description: productData.description
            });
        }
    }, [productData]);

    const handleReset = () => {
        setState({
            name: "",
            image: "",
            description: ""
        });
    }

    async function storeProduct(e){
        e.preventDefault();

        const formData = {
            name: state.name,
            image: state.image,
            description: state.description
        }

        console.log(formData);

        await api
            .post(`api/products/${id}`, formData)
            .then(() => {
                navigate('/products');
            })
            .catch((error) => {
                console.log("Error post data: ", error.message);
            });
    }


    return (
        <>
            <Navbar active={"products"} />
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <h1 className="mb-0">Create Product</h1>
                    <p>Create new product</p>
                    <form className="col-md-12 mt-2" onSubmit={(e) => storeProduct(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Enter Product Name" value={state.name} onChange={(e) => setState({...state, name: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fw-bold">Image</label>
                            <input type="text" name="image" id="image" className="form-control" placeholder="Enter Image" value={state.image} onChange={(e) => setState({...state, image: e.target.value})}/>
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