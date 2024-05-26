import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import { useSnackbar } from "notistack";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const { dispatch, user } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();
    const handleLogout = () => {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
            enqueueSnackbar('User logout successfully', { variant: 'success' });
        }
    }
    useEffect(() => {
        if (user) {
            setLoading(true);
            axios.get('http://localhost:8080/books', { headers: { 'Authorization': `Bearer ${user.token}` } })
                .then((res) => {
                    setBooks(res.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [dispatch, user]);
    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>
                    Table
                </button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>
                    Card
                </button>
                <div className="flex justify-center items-center gap-x-4">
                    <span className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">{user.email.toUpperCase()}</span>
                    <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Book List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? <Spinner /> : showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />}
        </div>
    )
}

export default Home