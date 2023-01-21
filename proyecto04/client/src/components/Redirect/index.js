import { useEffect } from "react";

function Redirect({ path }) {

    useEffect(() => {
        window.location.href = path
    }, [path]);

    return null
}

export default Redirect

