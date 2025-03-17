import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
// @ts-ignore
import loginWelcomeImg from "../../../assets/common/cyrpto_currencies_compressed.jpg";
import "./Login.scss";
import { UserLoginInterface } from "../../../interfaces/AuthInterface";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { loginApi } from "../../../api/auth";
import { setUser } from "../../../app/slices/authSlice";
import { RouteEndPoint } from "../../../enums/appEnum";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { loader } from "../../../app/slices/loaderSlice";


const loginValidation = Yup.object().shape({
    email: Yup.string().email().required("Enter valid email-id"),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}$/,
            "Password must contain one uppercase, one number and one special case character"
        )
        .required("Please enter valid password."),
});


const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.userState);
    const { isLoggedIn } = userState;
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleForgotPassword = () => {
        alert("This feature has been skipped due to the limited timeframe of this assignment.")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (values: UserLoginInterface, actions: any) => {
        dispatch(loader(true));
        const signedInUser = await loginApi({ loginInfo: values });
        dispatch(loader(false));
        if (signedInUser) {
            dispatch(setUser(signedInUser))
        }
        setTimeout(() => {
            actions.setSubmitting(false);
        }, 500);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginValidation,
    });
    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/${RouteEndPoint.HOME}`);
            toast.success("Welcome to Crypto!");
        }
    }, [isLoggedIn]);

    return (
        <div id="login">
            <div className="container">
                <div className="welcome-img">
                    <h1> Welcome to Crypto </h1>
                    <img src={loginWelcomeImg} alt="welcome" />
                    <br/> <small className="author">(Visfortech Assignment - by Ibrahim Khan) </small>
                </div>
                <div className="loginForm">
                    <h2>Enter details to Login </h2>

                    <form className="fullwidthForm" onSubmit={formik.handleSubmit}>
                        <div className="loginInput">
                            <h3>Email Address</h3>
                            <TextField
                                type="email"
                                placeholder="Enter here"
                                onBlur={formik.handleBlur}
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="inputStyle"
                                helperText={
                                    formik.touched.email && formik.errors.email
                                        ? formik.errors.email
                                        : null
                                }
                                error={
                                    formik.touched.email && formik.errors.email ? true : false
                                }
                            />
                        </div>
                        <div className="loginInput">
                            <div className="passwordHeadFunction">

                                <h3>Password</h3>
                                <p className="iconText" onClick={togglePasswordVisibility}>
                                    {showPassword ?
                                        <>
                                            <AiFillEyeInvisible />
                                            Hide
                                        </>
                                        : <>
                                            <AiFillEye />
                                            Show
                                        </>}
                                </p>
                            </div>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter here"
                                onBlur={formik.handleBlur}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="inputStyle"
                                helperText={
                                    formik.touched.password && formik.errors.password
                                        ? formik.errors.password
                                        : null
                                }
                                error={
                                    formik.touched.password && formik.errors.password
                                        ? true
                                        : false
                                }
                            />
                        </div>
                        <p className="app-link" onClick={handleForgotPassword}>
                            Forgot your password ?
                        </p>
                        <div className="loginButton">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="login-button"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <p> Are you a new user, then click to
                        <Link to={"/register"} className="app-link"> Register </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
