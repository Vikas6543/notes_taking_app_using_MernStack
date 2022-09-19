import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';

const Nav = () => {
  const user = JSON.parse(localStorage.getItem('userData'));

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <nav className='bg-black sticky top-0 text-white flex justify-between px-4 items-center py-3'>
      <section className='font-bold'>
        <Link to='/'>Notes_App</Link>
      </section>

      <section>
        {user && (
          <div className='border px-3 rounded'>
            <span onClick={logoutHandler}>Logout</span>
          </div>
        )}
      </section>
    </nav>
  );
};

export default Nav;
