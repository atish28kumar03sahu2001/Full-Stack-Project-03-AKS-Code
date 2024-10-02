//frontend/src/Components/Pages/Signup.jsx
import React, { useState } from "react";
import '../styles/Signup.css';
import { IoPersonCircle } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {signupUser} from '../../redux/actions/authActions';
export const Signup = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const SubmitHandler = (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        dispatch(signupUser(formData, navigate));
        form.reset();
    }
    return (
        <>
            <div className="SGUP_DIV"><h1 className="SGUP_H1">User SignUp</h1></div>
            <div className="SGUP_DIV_FRM">
                <form className="SGUP_FRM" onSubmit={SubmitHandler}>
                    <div className="SGUP_FRM_IMG">
                        {
                            imagePreview ? (
                                <img src={imagePreview} alt="Preview" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                            ) : (
                                <IoPersonCircle size={62} color="rgb(50,103,50)" />
                            )
                        }
                        <label className="FRM_IMG_LBL" htmlFor="userimage"><GrGallery size={20} color="white" /></label>
                    </div>
                    <input type="file" id="userimage" name="userimage" onChange={HandleImageChange} accept="image/*" style={{display:"none"}} />

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
                        <input className="SBMT_BTN" type="submit" value="Sign Up User" />
                    </div>
                    <div className="FRM_SBTM">
                        <Link className="LNK_SN" to="/signin">Already Have Account? Click Here</Link>
                    </div>
                </form>
            </div>
        </>
    );
}