import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  toast.configure();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:5000/notes/create', {
        title,
        description,
      });
      toast.success('Note Created successfully', {
        autoClose: 1500,
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className='w-8/12 md:w-4/12 mx-auto mt-12'>
      <form onSubmit={submitHandler} className='border shadow-xl p-8'>
        <p className='text-center font-semibold pb-6 text-2xl'>Create a Note</p>
        <div>
          <div className='mb-3'>
            <input
              type='text'
              className='w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm focus:ring focus:ring-gray-200'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='relative'>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <textarea
              type='text'
              rows='2'
              className='w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm focus:ring focus:ring-gray-200'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-3'>
          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800  focus:outline-none'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
