import { useState } from 'react'
import { uploadImage } from '../utils/cloudinary'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

export default function Sell() {
  const [form, setForm] = useState({ title: '', author: '', isbn: '', condition: 'Good', price: '', semester: '' })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onImageChange = (e) => setImageFile(e.target.files[0])

  const handleListBook = async () => {
    setLoading(true)
    let imageUrl = null;
    
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        alert('Failed to upload image. Please try again.');
        setLoading(false);
        return;
      }
    }

    const bookData = {
      ...form,
      imageUrl,
      createdAt: new Date(),
    }

    try {
      const docRef = await addDoc(collection(db, "books"), bookData);
      console.log("Book successfully listed with ID: ", docRef.id);
      alert('Listing created successfully!');
      
      setForm({ title: '', author: '', isbn: '', condition: 'Good', price: '', semester: '' });
      setImageFile(null);

    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Failed to save listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "input bg-white dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-lg dark:text-white dark:placeholder-gray-400 w-full";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Sell a Book</h1>
      <div className="card bg-white dark:bg-gray-800 p-6 space-y-4 rounded-xl shadow-soft">
        <div className="grid sm:grid-cols-2 gap-4">
          <input name="title" className={inputStyles} placeholder="Title" value={form.title} onChange={onChange} />
          <input name="author" className={inputStyles} placeholder="Author" value={form.author} onChange={onChange} />
          <input name="isbn" className={inputStyles} placeholder="ISBN (Scan or type)" value={form.isbn} onChange={onChange} />
          <select name="condition" className={inputStyles} value={form.condition} onChange={onChange}>
            <option>New</option><option>Like New</option><option>Good</option><option>Acceptable</option>
          </select>
          <input name="price" type="number" className={inputStyles} placeholder="Price (₹)" value={form.price} onChange={onChange} />
          <input name="semester" className={inputStyles} placeholder="Semester / Course" value={form.semester} onChange={onChange} />
        </div>
        <textarea name="desc" className={inputStyles} placeholder="Short description (edition, highlights, any writing...)" rows="3" onChange={onChange} />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Book Image</label>
          <input type="file" onChange={onImageChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={handleListBook} disabled={loading}>
            {loading ? 'Uploading...' : 'List Book'}
          </button>
          <button className="btn btn-ghost bg-slate-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" onClick={()=>alert('Bulk upload allows CSV with ISBN, price, condition, etc.')} disabled={loading}>Bulk Upload (CSV)</button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Tip: Use the ISBN from the back cover to guarantee the correct edition for buyers.</p>
      </div>
    </div>
  )
}