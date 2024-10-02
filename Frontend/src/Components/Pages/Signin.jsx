//frontend/src/Components/Pages/Signin.jsx
import React from "react";
import '../styles/Signup.css';
import { Link, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinUser } from "../../redux/actions/authActions";
export const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SubmitHandler = (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        dispatch(signinUser(formData, navigate));
    }
    return (
        <>
            <div className="SGUP_DIV"><h1 className="SGUP_H1">User SignIn</h1></div>
            <div className="SGUP_DIV_FRM">
                <form className="SGUP_FRM" onSubmit={SubmitHandler}>
                    <div className="FRM_LBL_IP">
                        <label className="FRM_LBL" htmlFor="username">User Name</label>
                        <input className="FRM_IP" required type="text" placeholder="Username@.1234" id="username" name="username" />
                    </div>
                    <div className="FRM_LBL_IP">
                        <label className="FRM_LBL" htmlFor="usermail">User Email</label>
                        <input className="FRM_IP" required type="text" placeholder="username@mail.com" id="usermail" name="usermail" />
                    </div>
                    <div className="FRM_LBL_IP">
                        <label className="FRM_LBL" htmlFor="userpassword">User Password</label>
                        <input className="FRM_IP" required type="password" placeholder="userpassword" id="userpassword" name="userpassword" />
                    </div>
                    <div className="FRM_SBTM">
                        <input className="SBMT_BTN" type="submit" value="Sign In User" />
                    </div>
                    <div className="FRM_SBTM">
                        <Link className="LNK_SN" to="/signup">I Don'T Have Account? Click Here</Link>
                    </div>
                </form>
            </div>
        </>
    );
}