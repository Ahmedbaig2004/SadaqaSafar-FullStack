import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Cog,
  Sun,
  Moon,
  Building2,
  MoreVertical,
  Info,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, ngo, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              SadaqaSafar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {ngo ? (
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-2 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            ) : user ? (
              <Link
                to="/donations"
                className="flex items-center space-x-2 px-2 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
                <span>My Donations</span>
              </Link>
            ) : null}

            <Link
              to="/ngos"
              className="flex items-center space-x-2 px-2 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <Building2 className="h-5 w-5" />
              <span>NGOs</span>
            </Link>

            <Link
              to="/AppSetting"
              className="flex items-center space-x-2 px-2 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <Cog className="h-5 w-5" />
              <span>App Setting</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center space-x-2 px-2 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <Info className="h-5 w-5" />
              <span>About Us</span>
            </Link>

            {user || ngo ? (
              <>
                {/* Profile and Logout */}
                <Link
                  to={ngo ? "/ngo-profile/settings" : "/profile/settings"}
                  className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <User className="h-5 w-5" />
                  <span>{ngo ? ngo.name : user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 hover:text-emerald-600"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-lg"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-800 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
          <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-800 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {ngo ? (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                ) : user ? (
                  <DropdownMenuItem asChild>
                    <Link to="/donations" className="flex items-center w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>My Donations</span>
                    </Link>
                  </DropdownMenuItem>
                ) : null}

                <DropdownMenuItem asChild>
                  <Link to="/ngos" className="flex items-center w-full">
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>NGOs</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/AppSetting" className="flex items-center w-full">
                    <Cog className="mr-2 h-4 w-4" />
                    <span>App Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/about" className="flex items-center w-full">
                    <Info className="mr-2 h-4 w-4" />
                    <span>About Us</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {user || ngo ? (
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="ml-auto h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/register"
                        className="flex items-center w-full"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Register</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
