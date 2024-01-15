import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/dashboard/navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toaster />
            <div>
                <Navbar />
            </div>
            <div className="m-4">{children}</div>
        </>
    );
};

export default layout;
