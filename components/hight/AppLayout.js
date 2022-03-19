import React from "react";
import FFooter from "../middle/FFooter";
import FNavBarExample from "../middle/FNavBarExample";
import FNavbar from "../middle/FNavbar";
import { useEffect } from 'react';
import { useStore } from "./StoreProvider";

export default function AppLayout({ isFirstMount, children }) {

    const mobxUser = useStore().MOBXUser;

    useEffect(() => {

        if (isFirstMount && localStorage.getItem('token')) {

            mobxUser.checkAuth();

        }

    });

    return (
        <div className="flex flex-col min-h-screen">
            <FNavBarExample/>
            <FNavbar/>
            <main className="flex-1 flex" >{children}</main>
            <FFooter />
        </div>
    );
};