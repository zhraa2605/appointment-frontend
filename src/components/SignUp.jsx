import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, registerUserAsync } from "@/redux/Slices/UserSlice";
import {
  AlertCircle,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function EnhancedSignUpForm({ hasAccount }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const userData = {
      firstname,
      lastname,
      email,
      phone,
      password,
    };

    try {
       const result = await dispatch(registerUserAsync(userData)).unwrap();
      localStorage.setItem("user", JSON.stringify(result));

      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message || "Sign up failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const userData = {
      email,
      password,
    };

    try {
      const result = await dispatch(loginUserAsync(userData)).unwrap();
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message || "Login failed");
    }
  };

  const toggleAccountType = () => {
    if (hasAccount) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-md relative">
        <Card className="w-full shadow-xl border-0 overflow-hidden bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <CardHeader className="p-3">
            <div className=" p-3 rounded-full bg-blue-50 my-2 flex flex-row align-center justify-start-safe space-x-4 text-blue-600  ">
              <User className="h-7 w-7  " />
              <h2 className="text-2xl font-bold ">
                {hasAccount ? "Welcome Back" : "Create Your Account"}
              </h2>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form
              onSubmit={hasAccount ? handleLogin : handleSignUp}
              className="space-y-4"
            >
              {!hasAccount && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstname"
                      className="text-gray-700 font-medium text-sm"
                    >
                      First Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="firstname"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="pl-10 focus:ring-2 focus:ring-blue-500 h-11 bg-gray-50 border-gray-200"
                        placeholder="John"
                      />
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastname"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Last Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="pl-10 focus:ring-2 focus:ring-blue-500 h-11 bg-gray-50 border-gray-200"
                        placeholder="Doe"
                      />
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              {!hasAccount && (
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="pl-10 focus:ring-2 focus:ring-blue-500 h-11 bg-gray-50 border-gray-200"
                      placeholder="(123) 456-7890"
                    />
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 font-medium text-sm"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 focus:ring-2 focus:ring-blue-500 h-11 bg-gray-50 border-gray-200"
                    placeholder="your.email@example.com"
                  />
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Password
                  </Label>
                  {/* {hasAccount && (
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </a>
                  )} */}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 focus:ring-2 focus:ring-blue-500 h-11 bg-gray-50 border-gray-200"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {!hasAccount && (
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10 focus:ring-2 focus:ring-blue-500 h-11 bg-gray-50 border-gray-200"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2 animate-pulse">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 h-12 mt-4 text-base font-medium transition-all duration-200 rounded-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {hasAccount ? "Signing In..." : "Creating Account..."}
                  </>
                ) : (
                  <>
                    {hasAccount ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="px-6 py-4 border-t border-gray-400 m">
            <div className="w-full text-center">
              <p className="text-gray-600 text-sm">
                {hasAccount
                  ? "Don't have an account yet?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleAccountType}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  {hasAccount ? "Sign up now" : "Sign in"}
                </button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
