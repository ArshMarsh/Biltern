import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import empty_profile_pic from '../../assets/empty_profile_pic.png';
import dummy_profile_pic from '../../assets/dummy_profile_pic.png';
import NavbarItem from './NavbarItem';

import classes from "./Navbar.module.css";

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 * @abstract This component is responsible for displaying navbar specific to user role
 */

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentId = useSelector(state => state.auth.user?.id);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.user?.role);
  const userName = useSelector(state => state.auth.user?.name);

  const items = [
    {to: "/dashboard", name: "Dashboard"},
    {to: "/settings", name: "Settings"},
  ]
  
  if (userRole) {
    if (userRole === "UNDERGRADUATE") {
      items.push({to: `/currentstatus/${studentId}`, name: "Current Status"});
      items.push({to: "/uploadedfiles", name: "Uploaded Files"});
    } 
    else if (userRole === "TEACHING_ASSISTANT") {
      items.push({to: "/studentlist", name: "Student List"});
    } 
    else if (userRole === "FACULTY_MEMBER") {
      items.push({to: "/studentlist", name: "Student List"});
    } 
    else if (userRole === "BCC_ADMIN") {
      items.push({to: "/registeruser", name: "Register User"});
      items.push({to: "/studentlist", name: "Student List"});
      // grader list will be added
    } 
    else if (userRole && userRole === "SECRETARY") {
      items.push({to: "/semesterInitialization", name: "Semester Initialization"});
      items.push({to: "/registeruser", name: "Register User"});
      items.push({to: "/studentlist", name: "Student List"});
      // grader list will be added
    } 
    else if (userRole && userRole === "COURSE_COORDINATOR") {
      items.push({to: "/studentlist", name: "Student List"});
      // grader list will be added
    } 
  }
  
  const logoutHandler = () => {
    dispatch(logout());
  }

  const goHomeHandler = () => {
    navigate('/dashboard');
  }

  return (
    <nav className={classes.sidebar}>
      <h1 onClick={goHomeHandler} className={classes.title} >BILTERN</h1>
      <div className={classes.userInfo}>
        <img src={isAuthenticated ? dummy_profile_pic : empty_profile_pic} alt="profilePicture" className={classes.profilePic}/>
        <div className={classes.userInfoRight}>
          <h4 className={classes.userName}>{isAuthenticated && userName}</h4>
          <p>{isAuthenticated && userRole}</p>
        </div>
      </div>
      {isAuthenticated ? <>
      {items.map((item, index) => <NavbarItem to={item.to} name={item.name} index={index} key={index}/>)}  
      <NavbarItem to="/login" name="Logout" onClick={logoutHandler}/>
      </> : 
      <NavbarItem to="/login" name="Login"/> }
    </nav>
  );
}

export default Navbar;