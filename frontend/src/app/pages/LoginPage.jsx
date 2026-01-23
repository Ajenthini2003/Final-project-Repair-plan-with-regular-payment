import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { setAppUser } from "../contexts/AppContext";

import Button from "../components/Button";
import Input from "../components/Input";

import Card from "../components/Card";
import CardHeader from "../components/CardHeader";
import CardBody from "../components/CardBody";
import CardTitle from "../components/CardTitle";
import CardDescription from "../components/CardDescription";

import { Wrench } from "../components/Icons";

import { toast } from "sonner";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    // Mock login
    const user = {
      id: 'user-1',
      name: 'Kasun Perera',
      email,
      phone: '+94 77 123 4567',
      address: '123 Galle Road, Colombo 03',
      role: 'user',
    };

    setAppUser(user);
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold">FixMate</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
                <label htmlFor="remember" className="cursor-pointer">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" className="w-full">Login</Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
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
        </CardBody>
      </Card>
    </div>
  );
}
