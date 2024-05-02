import { Link } from "react-router-dom";
import { useFecthUser } from "../../use/useFetchUser";
import Navbar from "../Navbar";

export default function Profile(){
    const {token, apiData:userData} = useFecthUser();

    return (
        <>
            <Navbar active={"profile"}/>
            <div className="container py-5 mt-5">
                <div className="row w-100">
                    <h1>Profile</h1>
                    <p>View and edit your profile</p>
                    <div className="col-md-6">
                        <table className="w-100 shadow-sm">
                            <thead aria-colspan={2}>
                                <th>Profile Detail</th>
                                <th></th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>First name</td>
                                    <td>{userData.firstname}</td>
                                </tr>
                                <tr>
                                    <td>Last name</td>
                                    <td>{userData.lastname}</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>{userData.username}</td>
                                </tr>
                                <tr>
                                    <td>Telephone</td>
                                    <td>{userData.telephone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{userData.email}</td>
                                </tr>
                                <tr>
                                    <td>Action</td>
                                    <td className="d-flex flex-row gap-2">
                                        <Link to={'/logout'} className="btn btn-danger btn-md">Log Out</Link>
                                        <Link to={'/login'} className="btn btn-md btn-success text-white">Change Account</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}