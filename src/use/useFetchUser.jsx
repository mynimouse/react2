import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const useFecthUser = () => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage["token"];
        if(storedToken){
            setToken(storedToken);
        }else{
            navigate('/login');
        }
    }, [navigate]);

    const [apiData, setApiData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/profile', {
                    headers:{
                        "Authorization": Bearer ${token},
                        "Content-Type": "application/json"
                    }
                });
                setApiData(response.data);
            }catch(error){
                console.log("Error fetching user data: ", error.message);
            }
        }

        if(token){
            fetchData();
        }else{
            console.log("Token where are you ??");
        }
    }, [token]);

    console.log(apiData)

    return {token, apiData};
}