import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage';
import EditUser from '../components/EditUser';

const Index = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element= { <HomePage />} />
            <Route path="/details-page/:empId" element={<DetailsPage />} />
            <Route path="/edit/:empId" element={ <EditUser />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Index