import { Route, Routes } from "react-router-dom"
import Products from "../views/products"
import CreateProduct from "../views/products/Create"
import UpdateProduct from "../views/products/Update"
import Cars from "../views/cars"
import CreateCar from "../views/cars/Create"
import UpdateCar from "../views/cars/Update"
import Categories from "../views/category"
import CreateCategory from "../views/category/Create"
import UpdateCategory from "../views/category/Update"
import News from "../views/news"
import CreateNews from "../views/news/Create"
import Rentals from "../views/rentals"
import CreateRental from "../views/rentals/Create"
import UpdateRental from "../views/rentals/Update"
import Pages from "../views/pages";
import CreatePages from "../views/pages/Create"
import UpdatePages from "../views/pages/Update"
import UpdateNews from "../views/news/Update"
import Login from "../views/auth/Login"
import Register from "../views/auth/Register"
import DetailCars from "../views/cars/Detail"
import Profile from "../views/profile"
import Logout from "../views/auth/Logout"


export default function RouteIndex(){
    return (
       <Routes>
           <Route path="/" element={<Products/>} />
           <Route path="/create-product" element={<CreateProduct/>} />
           <Route path="/update-product/:id" element={<UpdateProduct/>} />

           <Route path="/cars" element={<Cars/>} />
           <Route path="/create-car" element={<CreateCar/>} />
           <Route path="/update-car/:id" element={<UpdateCar/>} />
           <Route path="/cars/:id" element={<DetailCars/>} />

           <Route path="/category" element={<Categories/>} />
           <Route path="/create-category" element={<CreateCategory/>} />
           <Route path="/update-category/:id" element={<UpdateCategory/>} />

           <Route path="/news" element={<News/>} />
           <Route path="/create-news" element={<CreateNews/>} />
           <Route path="/update-news/:id" element={<UpdateNews/>} />

           <Route path="/rental" element={<Rentals/>} />
           <Route path="/create-rental" element={<CreateRental/>} />
           <Route path="/update-rental/:id" element={<UpdateRental/>} />

           <Route path="/pages" element={<Pages/>} />
           <Route path="/create-pages" element={<CreatePages/>} />
           <Route path="update-pages/:id" element={<UpdatePages/>} />

           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>} />
           <Route path="/logout" element={<Logout/>} />
           
           <Route path="/profile" element={<Profile/>} />

       </Routes> 
    )
}