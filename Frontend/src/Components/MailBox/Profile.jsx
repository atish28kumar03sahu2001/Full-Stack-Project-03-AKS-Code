//frontend/src/Components/MailBox/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { IoPersonCircle } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { updateUserProfile } from '../../redux/actions/authActions';
import "../styles/Profile.css";
import '../styles/Signup.css';
export const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
          setUserData(user);
        } else {
          const storedUser = JSON.parse(localStorage.getItem('userData'));
          if (storedUser) {
            setUserData(storedUser);
          }
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        window.location.href = '/signin';
    };

    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };
    const PatchHandler = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        const userId = userData._id;
        const updatedUser = await dispatch(updateUserProfile(formData, userId));
        if (updatedUser) {
            setUserData(updatedUser);
            localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
        form.reset();
    }
    return(
        <>
            <div className='PF_DIV_HD'><h1 className='PF_DIV_H1'>Welcome To Profile Page</h1></div>
            {userData && (
                <div className='PROFILE_DIV'>
                    <img className='IMG_SRC' src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(userData.userimage.data)))}`} alt= {userData.username} />
                    <p className='PF_P'>{userData.username}</p>
                    <p className='PF_P'>{userData.usermail}</p>
                    <button className='PF_LGT' onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div className="SGUP_DIV_FRM">
                <form className="SGUP_FRM" onSubmit={PatchHandler}>
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
                        <label className="FRM_LBL" htmlFor='username'>Username</label>
                        <input className="FRM_IP" type='text' placeholder='Enter Username' id='username' name='username' />
                    </div>
                    <div className="FRM_LBL_IP">
                        <label className="FRM_LBL" htmlFor='usermail'>Usermail</label>
                        <input className="FRM_IP" type='text' placeholder='Enter Usermail' id='usermail' name='usermail' />
                    </div>
                    <div className="FRM_SBTM">
                        <input className="SBMT_BTN" type="submit" value="Update Profile" />
                    </div>
                </form>
            </div>
        </>
    );
}