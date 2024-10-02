// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Welcome } from "./Components/Pages/Welcome";
import { Header } from "./Components/Pages/Header";
import { Signup } from "./Components/Pages/Signup";
import { Signin } from "./Components/Pages/Signin";
import { Profile } from "./Components/MailBox/Profile";
import { Compose } from "./Components/MailBox/Compose";
import { Star } from "./Components/MailBox/Star";
import { Trash } from "./Components/MailBox/Trash";
import { SentBox } from "./Components/MailBox/SentBox";
import { useSelector } from 'react-redux';
import { Inbox } from "./Components/MailBox/Inbox";

export const App = () => {
    const user = useSelector((state) => state.user);
    
    const ProtectedRoute = ({ children }) => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (!storedUser) {
            return <Navigate to="/signup" />;
        }
        return children;
    };

    const RedirectIfLoggedIn = ({ children }) => {
        if (user || localStorage.getItem('userData')) {
            const parsedUser = JSON.parse(localStorage.getItem('userData'));
            return <Navigate to={`/user/${parsedUser._id}`} />;
        }
        return children;
    };
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<RedirectIfLoggedIn><Welcome /></RedirectIfLoggedIn>} />
                <Route path="/signup" element={<RedirectIfLoggedIn><Signup /></RedirectIfLoggedIn>} />
                <Route path="/signin" element={ <RedirectIfLoggedIn><Signin /></RedirectIfLoggedIn>} />
                <Route path="/user/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/user/:id/compose" element={<ProtectedRoute><Compose/></ProtectedRoute>} />
                <Route path="/user/:id/inbox" element={<ProtectedRoute><Inbox/></ProtectedRoute>} />
                <Route path="/user/:id/star" element={<ProtectedRoute><Star /></ProtectedRoute>} />
                <Route path="/user/:id/trash" element={<ProtectedRoute><Trash /></ProtectedRoute>} />
                <Route path="/user/:id/sentbox" element={<ProtectedRoute><SentBox /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}