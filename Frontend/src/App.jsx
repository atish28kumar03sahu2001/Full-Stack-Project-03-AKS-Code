import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Welcome } from "./Components/Pages/Welcome";
import { Header } from "./Components/Pages/Header";
import { Signup } from "./Components/Pages/Signup";
export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}