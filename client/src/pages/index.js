import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [showColors, setShowColors] = useState(false);

  const fetchNotes = async () => {
    try {
      const fetchNotes = async () => {
        const { data } = await Axios.get('http://localhost:5000/notes');
        setNotes(data.notes);
      };
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = (id) => {
    try {
      const deleteNotes = async () => {
        const confirmDelete = window.confirm(
          'Are you sure you want to delete this note?'
        );
        if (confirmDelete) {
          await Axios.delete(`http://localhost:5000/notes/delete/${id}`);
          fetchNotes();
        }
      };
      deleteNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const colorHandler = (id, color) => {
    try {
      const updateColor = async () => {
        await Axios.put(`http://localhost:5000/notes/update/${id}/${color}`);
        fetchNotes();
      };
      updateColor();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className='mx-4'>
      <section className='mt-6'>
        {notes.length > 0 ? (
          <div className='grid grid-cols-12 gap-6'>
            {notes.map((note) => (
              <div
                className='border w-52 rounded shadow col-span-12 sm:col-span-4 md:col-span-3 mx-auto'
                key={note._id}
              >
                <div className='p-1' style={{ backgroundColor: note.color }}>
                  <div className='border-b pb-1 flex justify-between'>
                    <h1 className='font-bold'>{note.title}</h1>
                  </div>
                  <p className='pt-1 text-sm'>{note.description}</p>
                </div>

                <section className='text-xs mt-2 rounded cursor-pointer text-lg flex justify-between mx-2'>
                  <div>
                    <i
                      onClick={() => setShowColors(!showColors)}
                      className='fas fa-palette'
                    ></i>
                    <div>
                      {showColors && (
                        <div className='flex'>
                          <div
                            className='w-4 h-4 rounded-full cursor-pointer p-2 border'
                            style={{ backgroundColor: 'red' }}
                            onClick={() => colorHandler(note._id, 'red')}
                          ></div>
                          <div
                            className='w-4 h-4 rounded-full cursor-pointer p-2 border'
                            style={{ backgroundColor: 'green' }}
                            onClick={() => colorHandler(note._id, 'green')}
                          ></div>
                          <div
                            className='w-4 h-4 rounded-full cursor-pointer p-2 border'
                            style={{ backgroundColor: 'blue' }}
                            onClick={() => colorHandler(note._id, 'blue')}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p>
                      <i
                        onClick={() => deleteHandler(note._id)}
                        className='fas fa-trash-alt text-sm text-red-600 cursor-pointer'
                      ></i>
                    </p>
                  </div>
                </section>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex justify-center items-center h-screen'>
            <h1 className='text-2xl font-bold'>No Notes found</h1>
          </div>
        )}
      </section>

      <section className='border rounded shadow mx-auto flex justify-center items-center rounded-full w-14 p-4 shadow bg-blue-400 text-white absolute bottom-12 right-4 hover:shadow-2xl cursor-pointer'>
        <Link to='/create'>
          <i className='fas fa-plus text-2xl'></i>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
