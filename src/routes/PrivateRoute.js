import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "../services/Authentication";
const PrivateRoute = ({ component: Component, ...rest }) => {
    const [logged, setLogged] = useState([]);
    useEffect(async () => {
        let isSubscribed = true;
        Authentication().then(result => {
            console.log(result);
            if (isSubscribed) {
                setLogged(result);
            }
        });
        return () => (isSubscribed = false);
    }, []);
    return (
        <Route
            {...rest}
            render={props =>
                logged ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{ pathname: "/login", state: { from: props.location } }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;