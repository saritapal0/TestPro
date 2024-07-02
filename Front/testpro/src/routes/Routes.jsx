import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import FullLayout from "../layouts/Fulllayouts";
import Dashboard from "../components/Dashboard/UserTable";
import Register from '../components/Register/Register';
import { useNavigate } from 'react-router-dom';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<FullLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </>
  )
);

export default routes;
