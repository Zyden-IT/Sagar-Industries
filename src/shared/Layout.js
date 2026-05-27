import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Footer from "./Footer.js";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
/>


const Layout = ({
    children,
    title,
    searchType,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
}) => {
    const [isChildrenRendered, setIsChildrenRendered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsChildrenRendered(true);
    }, [children]);



    const is404Page = router.pathname === '/404';
    const islogin = router.pathname === '/login/Login'
    const isSignup = router.pathname === '/signup/Signup'
    const isForgotPassword = router.pathname === '/forgotPassword/ForgotPassword'

    return (
        <div className="page-layout w-full overflow-hidden">
            {!is404Page && !isForgotPassword && !isSignup && !islogin && <Header />}
            <div className="page-content"
            >
                {children}
            </div>
            {!is404Page && !isForgotPassword && !isSignup && !islogin && <Footer />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchType: state.searchType,
    };
};

export default Layout;