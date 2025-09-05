import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext.jsx"; // FIX: Corrected import path

const roles = ['Student', 'Teacher', 'Delivery Partner', 'Bookstore']

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (p) => {
    const checks = {
      length: p.length >= 8,
      upper: /[A-Z]/.test(p),
      lower: /[a-z]/.test(p),
      digit: /[0-9]/.test(p),
      special: /[^A-Za-z0-9]/.test(p)
    }
    return { ok: Object.values(checks).every(Boolean), checks }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const { ok } = validatePassword(password)
    if (!ok) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, digit and special character.")
      return
    }
    try {
      await signUp(name, email, password, { role, dob });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const pwState = validatePassword(password)

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={e=>setName(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Role</label>
          <select value={role} onChange={e=>setRole(e.target.value)} 
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} 
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm mb-1">Date of birth</label>
          <input type="date" value={dob} onChange={e=>setDob(e.target.value)} 
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <div className="flex gap-2">
            <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e=>setPassword(e.target.value)} 
              className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
            <button type="button" onClick={()=>setShowPassword(s=>!s)} className="px-3 py-2 rounded bg-slate-200 dark:bg-slate-600">{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            <div>Password rules:</div>
            <ul className="list-disc ml-5">
              <li className={pwState.checks.length ? 'text-green-600' : 'text-slate-500 dark:text-slate-400'}>Minimum 8 characters</li>
              <li className={pwState.checks.upper ? 'text-green-600' : 'text-slate-500 dark:text-slate-400'}>At least one uppercase letter</li>
              <li className={pwState.checks.lower ? 'text-green-600' : 'text-slate-500 dark:text-slate-400'}>At least one lowercase letter</li>
              <li className={pwState.checks.digit ? 'text-green-600' : 'text-slate-500 dark:text-slate-400'}>At least one digit</li>
              <li className={pwState.checks.special ? 'text-green-600' : 'text-slate-500 dark:text-slate-400'}>At least one special character</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition" type="submit">Create account</button>
          <Link to="/signin" className="text-sm text-slate-600 dark:text-slate-400">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}

