import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import  toast from 'react-hot-toast'

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  return (
    <div className="p-4">
      <input
        type="text"
        className="mb-4 p-2 border rounded-lg w-full"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="border p-4 rounded-lg shadow">
              <div className="text-lg font-semibold mb-2">{paste.title}</div>
              <div className="text-gray-700 mb-3">{paste.content}</div>

              <div className="flex flex-row gap-4 justify-evenly text-sm">
                <button className="px-3 py-1 rounded bg-blue-500 text-black">
                <a href={`/?PasteId=${paste?._id}`}>Edit</a>

                </button>
                <button className="px-3 py-1 rounded bg-purple-500 text-black">
                <a href={`/pastes/${paste?._id}`}>View</a>
{/* bhai ye ~ iss button par jo ' he vo he backtick */}
                  </button>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="px-3 py-1 rounded bg-red-500 text-black"
                >
                  Delete
                </button>
                <button className="px-3 py-1 rounded bg-gray-600 text-black" onClick={() =>{
                  navigator.clipboard.writeText(paste?.content)
                  toast.success("copied to clipbaord")
                }}>Copy</button>
                <button className="px-3 py-1 rounded bg-green-500 text-black">Share</button>
              </div>

              <div className="text-xs text-gray-400 mt-2 text-end">
                Created: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No pastes found.</div>
        )}
      </div>
    </div>
  )
}

export default Paste
