import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SingleSpotPage from './components/SingleSpot/SingleSpot';
import SignleSpotDetail from './components/SignleSpotDetail/SignleSpotDetail';
import ManageYourSpots from './components/ManageYourSpots/ManageYourSpots';
import UpdateASpot from './components/UpdateASpot/UpdateASpot';
import CreateASpotPage from './components/CreateASpot/CreateASpotPage';
import ManageReviews from './components/ManageReviews/ManageReviews';
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SingleSpotPage />
      },
      {
        path: '/spots/:id/edit',
        element: <UpdateASpot />
      },
      {
        path: '/spots/:spotId',
        element: <SignleSpotDetail />
      } ,
      {
        path:'/reviews/current',
        element: <ManageReviews />
      },
      {
        path:'/spots/current',
        element: <ManageYourSpots />
      },
      {
        path:'/spots/new',
        element: <CreateASpotPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;