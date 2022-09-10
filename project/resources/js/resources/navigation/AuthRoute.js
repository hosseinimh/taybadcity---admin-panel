import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import * as Pages from "../Pages";
import { Header, Sidebar } from "../components";
import { footer as strings } from "../../constants/strings";
import utils from "../../utils/Utils";
import { basePath } from "../../constants";

function AuthRoute() {
    const state = useSelector((state) => state.userReducer);
    const layoutState = useSelector((state) => state.layoutReducer);
    const [auth, setAuth] = useState(state.isAuthenticated);
    const lsUser = utils.getLSUser();

    useEffect(() => {
        validateAuth();
    }, [state]);

    const validateAuth = () => {
        try {
            if (!state.isAuthenticated || !lsUser || !lsUser?.id) {
                utils.clearLS();
                setAuth(false);
            } else {
                setAuth(true);
            }
        } catch (error) {
            utils.clearLS();
            setAuth(false);
        }
    };

    return (
        <Router>
            {auth && <Sidebar />}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {auth && (
                    <>
                        <Header />
                        <Routes>
                            <Route
                                path={`${basePath}/users/view/:userId`}
                                element={<Pages.ViewUser />}
                            />
                            <Route
                                path={`${basePath}/users/view`}
                                element={<Pages.ViewUser />}
                            />
                            <Route
                                path={`${basePath}/users/edit/:userId`}
                                element={<Pages.EditUser />}
                            />
                            <Route
                                path={`${basePath}/users/change_password/:userId`}
                                element={<Pages.ChangePasswordUser />}
                            />
                            <Route
                                path={`${basePath}/users/change_password`}
                                element={<Pages.ChangePasswordUser />}
                            />
                            <Route
                                path={`${basePath}/users`}
                                element={<Pages.Users />}
                            />
                            <Route
                                path={`${basePath}/districts/add/:parentId`}
                                element={<Pages.AddDistrict />}
                            />
                            <Route
                                path={`${basePath}/districts/add/`}
                                element={<Pages.AddDistrict />}
                            />
                            <Route
                                path={`${basePath}/districts/edit/:districtId`}
                                element={<Pages.EditDistrict />}
                            />
                            <Route
                                path={`${basePath}/districts/:parentId`}
                                element={<Pages.Districts />}
                            />
                            <Route
                                path={`${basePath}/districts`}
                                element={<Pages.Districts />}
                            />
                            <Route
                                path={`${basePath}/ad_categories/add/:parentId`}
                                element={<Pages.AddAdCategory />}
                            />
                            <Route
                                path={`${basePath}/ad_categories/add/`}
                                element={<Pages.AddAdCategory />}
                            />
                            <Route
                                path={`${basePath}/ad_categories/edit/:adCategoryId`}
                                element={<Pages.EditAdCategory />}
                            />
                            <Route
                                path={`${basePath}/ad_categories/:parentId`}
                                element={<Pages.AdCategories />}
                            />
                            <Route
                                path={`${basePath}/ad_categories`}
                                element={<Pages.AdCategories />}
                            />
                            <Route
                                path={`${basePath}`}
                                element={<Pages.Dashboard />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to={`${basePath}`} />}
                            />
                        </Routes>
                    </>
                )}
                {!auth && (
                    <Routes>
                        <Route
                            path={`${basePath}/users/login`}
                            exact={true}
                            element={<Pages.LoginUser />}
                        />
                        <Route
                            path="*"
                            element={
                                <Navigate to={`${basePath}/users/login`} />
                            }
                        />
                    </Routes>
                )}
                <footer className="footer d-print-none">
                    <div className="container-fluid sub-footer">
                        <p>{strings.text14}</p>
                        <p className="developer">
                            <a
                                href="http://www.hosseinimh.com"
                                target={"_blank"}
                                className="link"
                            >
                                {strings.text15}
                            </a>
                        </p>
                    </div>
                </footer>
                <div
                    className="loading-wrapper"
                    style={{
                        display: layoutState?.loading ? "flex" : "none",
                    }}
                >
                    <div className="loading"></div>
                    <p>{strings.loading}</p>
                </div>
            </div>
        </Router>
    );
}

export default AuthRoute;
