import Swal from "sweetalert2";
import { useFecthUser } from "../../use/useFetchUser";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout(){
    const {token, apiData:userData} = useFecthUser();
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: "Are you sure ?",
            text: `You will logged out from rental website`,
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonColor: "#006fb9",
            confirmButtonColor: "#ff0000",
        }).then((result) => {
            if(result.isConfirmed){
                handleLogout();
            }
        });
    }, []);

    async function handleLogout(){
        try{
            const response = await api.get('api/logout', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(response.data.status === "success"){
                localStorage.removeItem('token');
                Swal.fire({
                    title: "Log Out success!",
                    text: `You are successfully logged out from rental website`,
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonColor: "#006fb9",
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate('/login');
                    }
                });
            }
        }catch(error){
            Swal.fire({
                title: "Log Out failed",
                text: `You are failed to logged out from rental website`,
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: "#006fb9",
            }).then((result) => {
                if(result.isConfirmed){
                    navigate('/products');
                }
            });
        }
    }

    return (
        <>
        </>
    );
}