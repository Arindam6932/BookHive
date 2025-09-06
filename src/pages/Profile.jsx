import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../utils/cloudinary.js'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [email] = useState(user?.email || '')
  const [dob, setDob] = useState('')
  const [joined] = useState(user?.metadata?.creationTime || new Date().toISOString())
  const [points, setPoints] = useState(0)
  const [avatarFile, setAvatarFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // This effect hook syncs the component's local state (name, dob)
  // with the global user state from the context. This is crucial for
  // making sure the form is populated correctly when the user data loads.
  useEffect(()=> {
    if (user) {
      setName(user.displayName || '');
      setDob(user.dob || '');
    }
    const p = localStorage.getItem('bh_points_' + (user?.uid || 'guest'))
    setPoints(p ? Number(p) : 0)
  },[user])

  const onSave = async () => {
    setLoading(true)
    let newImageUrl = user?.photoURL;

    if (avatarFile) {
      const url = await uploadImage(avatarFile)
      if (url) {
        newImageUrl = url
      } else {
        alert('Failed to upload image. Please try again.')
        setLoading(false)
        return
      }
    }

    try {
      // Pass the updated data to the context function to handle the update.
      await updateProfile({ displayName: name, dob, photoURL: newImageUrl })
      setEditing(false)
    } catch (e) {
      alert(e.message || 'Failed to save')
    } finally {
      setLoading(false)
      setAvatarFile(null)
    }
  }

  if (!user) return <div className="p-8 text-center">You need to <button className="btn btn-primary" onClick={()=>navigate('/signin')}>sign in</button></div>

  return (
    <div className="max-w-3xl mx-auto shadow rounded-2xl p-6 glass">
      <div className="flex items-center gap-4">
        <img src={user.photoURL || 'https://api.dicebear.com/6.x/initials/svg?seed=' + (user.displayName || user.email)} alt="avatar" className="h-24 w-24 rounded-full object-cover" />
        <div className="text-slate-800 dark:text-white">
          <h2 className="text-xl font-semibold">{user.displayName || user.email}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{email}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Joined on: {new Date(joined).toLocaleDateString()}</p>
          
          {/* This will now correctly display the role from the user object */}
          <p className="mt-2 text-slate-800 dark:text-white"><strong>Role:</strong> {user.role || 'N/A'}</p>
          
          <p className="mt-2 text-slate-800 dark:text-white"><strong>Points:</strong> {points}</p>
          <p className="mt-2 text-slate-800 dark:text-white"><strong>Subscription:</strong> Free tier</p>
        </div>
      </div>

      <div className="mt-6">
        {editing ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">Date of Birth</label>
                <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">Update Profile Picture</label>
                <input type="file" onChange={e => setAvatarFile(e.target.files[0])} className="w-full block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary mr-2" onClick={onSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              <button className="btn" onClick={()=>setEditing(false)} disabled={loading}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Full name</p>
                <div className="font-medium text-slate-800 dark:text-white">{user.displayName || '-'}</div>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Date of birth</p>
                {/* This will now correctly display the dob from the user object */}
                <div className="font-medium text-slate-800 dark:text-white">{user.dob || '-'}</div>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary" onClick={()=>setEditing(true)}>Edit profile</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}