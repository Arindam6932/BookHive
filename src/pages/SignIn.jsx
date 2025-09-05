import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const roles = ["Student", "Teacher", "Delivery Partner", "Bookstore"];

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password, role);

      // Redirect based on role
      switch (role) {
        case "Delivery Partner":
          navigate("/vendor");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    // FIX: Added dark mode classes to the main container
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mt-12">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            // FIX: Added dark mode classes to input fields
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            // FIX: Added dark mode classes to select field
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <div className="flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              required
              // FIX: Added dark mode classes to input fields
              className="w-full border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="px-3 py-2 rounded bg-slate-200 dark:bg-slate-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Sign in
          </button>
          <Link to="/signup" className="text-sm text-slate-600 dark:text-slate-400">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}

