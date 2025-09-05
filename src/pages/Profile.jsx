
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.displayName || '')
  const [email] = useState(user?.email || '')
  const [dob, setDob] = useState(user?.dob || '')
  const [joined] = useState(user?.metadata?.creationTime || new Date().toISOString())
  const [points, setPoints] = useState(0)
  const navigate = useNavigate()

  useEffect(()=> {
    // mock: calculate points from localStorage or user metadata if exists
    const p = localStorage.getItem('bh_points_' + (user?.uid || 'guest'))
    setPoints(p ? Number(p) : 0)
  },[user])

  const onSave = async () => {
    try {
      await updateProfile({ displayName: name, dob })
      setEditing(false)
    } catch (e) {
      alert(e.message || 'Failed to save')
    }
  }

  if (!user) return <div className="p-8 text-center">You need to <button className="btn btn-primary" onClick={()=>navigate('/signin')}>sign in</button></div>

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <img src={user.photoURL || 'https://api.dicebear.com/6.x/initials/svg?seed=' + (user.displayName || user.email)} alt="avatar" className="h-24 w-24 rounded-full object-cover" />
        <div>
          <h2 className="text-xl font-semibold">{user.displayName || user.email}</h2>
          <p className="text-sm text-slate-600">{email}</p>
          <p className="text-sm text-slate-600">Joined on: {new Date(joined).toLocaleDateString()}</p>
          <p className="mt-2"><strong>Points:</strong> {points}</p>
          <p className="mt-2"><strong>Subscription:</strong> Free tier</p>
        </div>
      </div>

      <div className="mt-6">
        {editing ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Date of Birth</label>
                <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary mr-2" onClick={onSave}>Save</button>
              <button className="btn" onClick={()=>setEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-slate-600">Full name</p>
                <div className="font-medium">{user.displayName || '-'}</div>
              </div>
              <div>
                <p className="text-sm text-slate-600">Date of birth</p>
                <div className="font-medium">{dob || '-'}</div>
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
