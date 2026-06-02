import React from "react";
import Aux from "../auxilary/Auxilary";
import { getAuthProps, isAuthorized } from "@/utils/AuthenticationLibrary";

const AuthWrap = (props) => {
    const isAuthenticated = () => {
        let authProps = {};
        if (isAuthorized()) {
            const authString = getAuthProps();
            authProps = authString;
            if (authProps.corporateMemberId || authProps.individualMemberId) {
                return true;
            }
        }
    };

    return (
        <Aux>
            {
                (isAuthenticated()) ?
                    props.children
                    :
                    props.unAuthenticationChild
            }
        </Aux>
    );
};

export default AuthWrap;
