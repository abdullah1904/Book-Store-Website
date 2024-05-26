import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const {user} = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Navigate to="/user/login"/>} />
        <Route path="/user/signup" element={!user ? <Signup/>:<Navigate to="/"/>}/>
        <Route path="/user/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/books/create" element={<CreateBook/>}/>
        <Route path="/books/details/:id" element={<ShowBook/>}/>
        <Route path="/books/edit/:id" element={<EditBook/>}/>
        <Route path="/books/delete/:id" element={<DeleteBook/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App