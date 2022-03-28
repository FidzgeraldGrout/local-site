import React from "react";
import FFooter from "../middle/FFooter";
import FNavbar from "../middle/FNavbar";

export default function AppLayout({ isFirstMount, children }) {
    return (
        //
        <div className="flex flex-col min-h-screen">
            <FNavbar />
            <main className="flex-1 flex pt-20" >{children}</main>
            <FFooter />
        </div>
    );
};