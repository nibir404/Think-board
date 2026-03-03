import { Edit, Trash } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router'

const NoteCard = ({ note, deleteNote }) => {
  const navigate = useNavigate();

  return (
    <Link to={`/note/${note._id}`}>
      <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-primary">{note.title}</h2>
          <p className="line-clamp-3 text-base-content/70">{note.content}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="badge badge-outline opacity-50 text-xs">
              {new Date(note.createdAt).toLocaleDateString()}
            </div>
            <div className='flex gap-2'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/edit/${note._id}`);
                }}
                className='hover:text-primary transition-colors'
              >
                <Edit className='size-4' />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteNote(note._id);
                }}
                className='hover:text-error transition-colors'
              >
                <Trash className='size-4' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard