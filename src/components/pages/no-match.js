import React from "react";
import { Link } from "react-router-dom";

export default function () {
    return (
        <div>
            <h2> We COuldn't Find That Page</h2>
            <Link to="/"> Return to Home Page </Link>
        </div>
    )
}