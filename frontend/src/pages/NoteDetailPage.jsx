import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import api from '../api/config'
import { ArrowLeft, Edit, Trash } from 'lucide-react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

const NoteDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data.note)
      } catch (error) {
        console.error('Error fetching note details:', error)
        toast.error("Could not fetch the note")
        navigate("/")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id, navigate])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/notes/${id}`)
        toast.success("Note deleted successfully")
        navigate("/")
      } catch (error) {
        console.error('Error deleting note:', error)
        toast.error("Failed to delete note")
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold opacity-50">Note not found</h2>
          <Link to="/" className="btn btn-ghost mt-4">
            <ArrowLeft className="size-4 mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="btn btn-ghost btn-sm">
            <ArrowLeft className="size-4 mr-2" /> Back
          </Link>
          <div className="flex gap-2">
            <Link to={`/edit/${id}`} className="btn btn-primary btn-sm">
              <Edit className="size-4 mr-2" /> Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-sm btn-outline">
              <Trash className="size-4 mr-2" /> Delete
            </button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <h1 className="card-title text-3xl font-bold text-primary">{note.title}</h1>
              <div className="badge badge-outline opacity-70">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="divider opacity-20"></div>
            
            <div className="prose max-w-none text-lg leading-relaxed text-base-content whitespace-pre-wrap">
              {note.content}
            </div>
            
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <div className="mt-8 text-xs opacity-40 text-right italic">
                Last updated: {new Date(note.updatedAt).toLocaleDateString()} at {new Date(note.updatedAt).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default NoteDetailPage