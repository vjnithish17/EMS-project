import { useContext } from "react";

import AuthContext from "../context/AuthContext";

function Home() {

    const { user } = useContext(AuthContext);

    return (

        <div>

            <h1>Home Page</h1>

            <h2>{user}</h2>

        </div>

    );

}

export default Home;
