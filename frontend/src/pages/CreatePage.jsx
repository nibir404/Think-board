import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../api/config'
import { useNavigate } from 'react-router'
import { PlusIcon, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import toast from 'react-hot-toast'

const CreatePage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            toast.error("Title and content cannot be empty")
            return
        }

        setIsLoading(true)
        try {
            const res = await api.post('/notes', { 
                title: trimmedTitle, 
                content: trimmedContent 
            })
            console.log('Note created:', res.data)
            toast.success("Note created successfully!")
            navigate('/')
        } catch (error) {
            console.error('Error creating note:', error)
            const errorMsg = error.response?.data?.message || "Failed to create note. Please check if the server is running."
            toast.error(errorMsg)
        } finally {
            setIsLoading(false)
        }
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
                            <PlusIcon className="size-6 text-primary" />
                            <h2 className="card-title text-2xl font-bold">New Note</h2>
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
                                    {!isLoading && <PlusIcon className="size-5" />}
                                    {isLoading ? 'Creating...' : 'Create Note'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreatePage