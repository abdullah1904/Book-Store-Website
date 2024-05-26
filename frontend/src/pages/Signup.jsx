import axios from "axios";
import { useState } from "react"
import { useSnackbar } from 'notistack';
import { useAuthContext } from "../hooks/useAuthContext";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleSignup = async () => {
        const data = { email, password };
        setLoading(true);
        axios.post('http://localhost:8080/user/signup', data)
            .then((res) => {
                setLoading(false);
                enqueueSnackbar('User created successfully', { variant: 'success' });
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch({ type: "LOGIN", payload: res.data });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error: ' + error.response.data.message, { variant: 'error' });
                console.log(error);
            })
    }
    return (
        <div className="p-4">
            <h1 className="text-3xl my-4">Signup</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4 ">
                    <label className="text-xl mr-4 text-gray-500">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
                </div>
                <div className="my-4 ">
                    <label className="text-xl mr-4 text-gray-500">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
                </div>
                <button className="p-2 bg-sky-300 mt-8 mx-8 mb-2" onClick={handleSignup}>Signup</button>
                <button className="p-2 bg-sky-300 mb-8 mx-8 mt-2">
                    <Link to="/user/login">Already User?</Link>
                </button>
            </div>
        </div>
    )
}

export default Signup
