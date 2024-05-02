import Navbar from "../Navbar";
import "../../css/table.css";
import { useEffect, useState } from "react";
import api from "../../api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function Cars() {
  const [carsData, setCarsData] = useState([]);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage["token"];
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`api/cars/search/${search}`);
      setCarsData(response.data.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/cars");
        setCarsData(response.data.data);
      } catch (error) {
        console.log("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`api/cars/${id}`);
      if (response.data.status === "success") {
        setCarsData(carsData.filter((car) => car.id !== id));
        Swal.fire({
          title: "Delete Car Success",
          text: `Car with id: ${id} successfully deleted`,
          icon: "success",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: "#006fb9",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Delete Car failed",
        text: `Car with id: ${id} failed to delete: ${error.message}`,
        icon: "error",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: "#006fb9",
      });
    }
  };

  let id = 1;

  return (
    <>
      <Navbar active={"cars"} />
      <div className="container py-5 mt-5">
        <div className="row w-100 d-flex flex-row justify-content-between align-items-center">
          <div className="col-md-4">
            <h1 className="mb-1">Cars List</h1>
            <p>List of the cars to rental</p>
          </div>
          <div className="col-md-4 d-flex flex-row justify-content-between align-items-center gap-3">
            <input type="text" name="cari" id="cari" placeholder="Search Cars" className="form-control" onChange={(e) => setSearch(e.target.value)} />
            <div className="bg-primary rounded-3 d-flex justify-content-center align-items-center cursor-pointer" style={{ width: "50px", height: "40px", cursor: "pointer" }} onClick={() => handleSearch()}>
              <i className="bi bi-search text-white"></i>
            </div>
          </div>
          <div className="col-md-4 mt-3 mt-md-0 mb-3 mb-md-0 d-flex justify-content-start justify-content-md-end align-items-center">
            <Link to={"/create-car"} className="btn btn-md btn-success">
              Add Cars
            </Link>
          </div>
        </div>
        <div className="row w-100">
          <table className="shadow-sm">
            <thead>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Price</th>
              <th>Action</th>
            </thead>
            <tbody>
              {carsData.map((car) => (
                <tr key={car.id}>
                  <td>{id++}</td>
                  <td>{car.title || "-"}</td>
                  <td>{car.description || "-"}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.price + "$/day"}</td>
                  <td className="d-flex flex-row gap-2 flex-wrap justify-content-center">
                    <Link to={`/update-car/${car.id}`} className="btn btn-md btn-warning text-white">
                      Edit
                    </Link>
                    <button className="btn btn-md btn-danger" onClick={() => handleDelete(car.id)}>
                      Delete
                    </button>
                    <Link to={`/cars/${car.id}`} className="btn btn-md btn-primary">
                      Detail
                    </Link>
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
