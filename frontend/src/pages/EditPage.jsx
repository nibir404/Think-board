import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../api/config'
import { useParams, useNavigate, Link } from 'react-router'
import { Edit2, ArrowLeft, Save } from 'lucide-react'
import toast from 'react-hot-toast'

const EditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`)
                const note = res.data.note
                setTitle(note.title)
                setContent(note.content)
            } catch (error) {
                console.error('Error fetching note:', error)
                toast.error("Note not found or could not be loaded")
                navigate('/')
            } finally {
                setIsFetching(false)
            }
        }
        fetchNote()
    }, [id, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
            toast.error("Fields cannot be empty")
            return
        }

        setIsLoading(true)
        try {
            await api.put(`/notes/${id}`, { title, content })
            toast.success("Note updated successfully")
            navigate('/')
        } catch (error) {
            console.error('Error updating note:', error)
            toast.error("Failed to update note")
        } finally {
            setIsLoading(false)
        }
    }

    if (isFetching) {
        return (
            <div className='min-h-screen bg-base-200'>
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-80px)]">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-base-200 transition-colors duration-300'>
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <Link to="/" className="btn btn-ghost btn-sm mb-6 gap-2">
                    <ArrowLeft className="size-4" />
                    Back to Board
                </Link>

                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body gap-6">
                        <div className="flex items-center gap-2">
                            <Edit2 className="size-6 text-primary" />
                            <h2 className="card-title text-2xl font-bold">Edit Note</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your note title..."
                                    className="input input-bordered focus:input-primary transition-all text-lg"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Content</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered focus:textarea-primary min-h-60 transition-all text-lg"
                                    placeholder="Start writing..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`btn btn-primary btn-lg gap-2 ${isLoading ? 'loading' : ''}`}
                                >
                                    {!isLoading && <Save className="size-5" />}
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EditPage
