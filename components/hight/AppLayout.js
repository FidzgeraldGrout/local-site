import React from "react";
import FFooter from "../middle/FFooter";
import FNavbar from "../middle/FNavbar";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from "./StoreProvider";
import FLoadingScreen from "../middle/FLoadingScreen";

export default function AppLayout({ isFirstMount, children }) {

    const router = useRouter();

    const { MOBXUser, MOBXui } = useStore();

    useEffect(() => {

        if (isFirstMount && localStorage.getItem('token')) {

            MOBXui.setLoading();

            MOBXUser.checkAuth().then(() => {

                MOBXui.setLoading();

            }).catch(() => {

                MOBXui.setLoading();

            })

        }

        return () => {

            MOBXUser.stopRefreshAuth();

        }

    });

    return (
        <div className="flex flex-col min-h-screen">
            <FLoadingScreen />
            <FNavbar />
            <main className="flex-1 flex" >{children}</main>
            <FFooter />
        </div>
    );
};