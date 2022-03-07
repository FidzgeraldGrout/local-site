import React from "react";
import FFooter from "../components/FFooter";
import FNavbar from "../components/FNavbar";
import Authorization from "../pages/authorization";

export default function Layout({ children }) {

    return (
        <div className="flex flex-col min-h-screen">
            <FNavbar 
                isAuthorized = {children.type == Authorization}
            />
            <main className="flex-1 flex">{children}</main>
            <FFooter />
        </div>
    );
};