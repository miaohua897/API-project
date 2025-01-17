import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import {getCurrentSpot} from '../../store/spot';
// import {getCurrentReviews} from '../../store/review';
// import ManageYourSpots from '../ManageYourSpots/ManageYourSpots';

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const handleDemoUser=()=>{
    // e.preventDefault();
    return dispatch(sessionActions.login({
      "credential": "Demo-lition",
      "password": "password"
  }))
  }

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const manageYourSpotsHanlder=(e)=>{
    e.preventDefault();
    dispatch(getCurrentSpot());
    navigate('/spots/current');
  }
  const manageYourReviewsHanlder=(e)=>{
    e.preventDefault();
    // dispatch(getCurrentReviews());
    navigate('/reviews/current');
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className='profileButton'>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='menuitemcontainer'>
           <li>{"Hello, "+user.firstName}</li>
            {/* <li>{user.username}</li> */}
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <li>{user.email}</li>
            <li >
              <button onClick={manageYourSpotsHanlder}
              className='DemoUser'
              >manage spots</button>
            </li>
            <li >
              <button onClick={manageYourReviewsHanlder}
              className='DemoUser'
              >manage reviews</button>
            </li>
            <li>
              <button onClick={logout}
              className='DemoUser'
              >Log Out</button>
            </li>

          </div>
        ) : (
          <div className='menuitemcontainer'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <button 
            className='DemoUser'
            onClick={handleDemoUser}
            >Log in as Demo User</button>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;