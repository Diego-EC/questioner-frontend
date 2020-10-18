import React, { useState } from "react";
import { Navbar } from "./component/navbar";

// https://stackoverflow.com/questions/32452695/react-bootstrap-how-to-collapse-menu-when-item-is-selected
export const Login = () => {
    const [expanded, setExpanded] = useState(false);

return(

    <div>
<Navbar expanded={expanded}/>
    </div>
)

}