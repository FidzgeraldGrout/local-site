import React from "react";
import FFooter from "../middle/FFooter";
import FNavbar from "../middle/FNavbar";
import Login from "../../pages/login";
import Registration from "../../pages/registration";

export default function Layout({ children }) {

    return (
        <div className="flex flex-col min-h-screen">
            <FNavbar 
                isAuthorized = {children.type == Login || children.type == Registration}
            />
            <main className="flex-1 flex">{children}</main>
            <FFooter />
        </div>
    );
};