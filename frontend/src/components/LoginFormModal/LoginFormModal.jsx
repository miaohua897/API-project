// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
// import {  useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const [showMenu, setShowMenu] = useState(true);
  //  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        // console.log('data',data)
        if(data.message==='Invalid credentials'){
          const newerror = {...errors};
          newerror.credential= "The provided credentials were invalid";
          setErrors(newerror );
        }
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    window.location.reload();

  };
 
  
  return (
    <div className='LoginFormModal'>
      <h1>Log In</h1>
    
      {
             true&&   (<form onSubmit={handleSubmit}
                className='logninContainer'
                // {/* className={formClassName} */}
                // // ref={formRef}
                >
                   <button  onClick={toggleMenu} id ='closeloginform'>
                    ✖️
                  </button>
                  <div className='loginFormContainer'>
                  <label>
                    Username or Email {'           '}
                    <input
                      type="text"
                      value={credential}
                      onChange={(e) => setCredential(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Password{'           '}
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                  {errors.credential && (
                    <p>{errors.credential}</p>
                  )}
                  <button 
                  className={credential.length<4 || password.length<6?'submitLoginButtonDisable':'submitLoginButton'}
                  type="submit"
                  disabled={credential.length<4 || password.length<6}
                  >Log In</button>
                  </div>
                
                </form>)
      }
     
    </div>
  );
}

export default LoginFormModal;