import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../api/config'
import NoteCard from '../components/NoteCard'
import toast from 'react-hot-toast'

const HomePage = () => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        console.log('Fetched notes:', res.data)
        if (Array.isArray(res.data)) {
          setNotes(res.data)
        } else if (res.data && Array.isArray(res.data.notes)) {
          setNotes(res.data.notes)
        } else {
          console.error('Unexpected response format:', res.data)
          setNotes([])
        }
      } catch (error) {
        console.error('Error fetching notes:', error)
        toast.error("Failed to load notes. Please check if the server is running.")
      }
    }
    fetchNotes()
  }, [])

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/notes/${id}`)
      if (res.status === 200) {
        toast.success("Note deleted")
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id))
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error("Failed to delete note")
    }
  }

  return (
    <div className='min-h-screen bg-base-200 transition-colors duration-300'>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} deleteNote={deleteNote} />
          ))}
        </div>
        {notes.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold opacity-50">No notes found. Create one to get started!</h2>
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage