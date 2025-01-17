// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateASpotPageButton  from '../CreateASpot/CreateASpotPageButton';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav >
     <ul className='Nav_bar'>
      <li className='homelogo'>
        <NavLink to="/" id='homeicon'>Castlebnb</NavLink>
      </li>
      {
        sessionUser? ( <li >
          <CreateASpotPageButton  
          user={sessionUser}/> 
        </li>) : null
      }
     
      {isLoaded && (
        <li className='profileButtoncontainer'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </nav>
   
  );
}

export default Navigation;