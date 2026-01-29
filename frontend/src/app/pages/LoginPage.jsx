import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import { Wrench } from "lucide-react";
import { toast } from "sonner";

// ✅ USE CENTRAL API
import { loginUser } from "../../api";

export default function LoginPage() {
  const { setUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // ----- AUTO LOGIN IF USER EXISTS IN LOCALSTORAGE -----
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);
      navigate("/dashboard");
    }
  }, [setUser, navigate]);

  // ----- HANDLE LOGIN -----
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      console.log("Logging in:", email);

      // ✅ CORRECT LOGIN CALL
      const userData = await loginUser({ email, password });

      if (!userData || !userData._id) {
        toast.error("Login failed: no user data returned");
        return;
      }

      setUser(userData);

      if (remember) {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold">FixMate</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="remember" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-gray-500 text-xs">
            <div className="relative mb-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white">Demo Access</span>
              </div>
            </div>
            <p>Email: demo@fixmate.lk | Password: demo123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
