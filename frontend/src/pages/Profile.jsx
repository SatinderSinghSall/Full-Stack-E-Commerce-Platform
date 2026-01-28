import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Profile = () => {
  const { backendUrl, token, setToken, navigate } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/user/profile", {
        headers: { token },
      });

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) return;
    fetchProfile();
  }, [token]);

  /* ---------------- SKELETON ---------------- */
  if (loading) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full bg-white rounded-xl p-8 shadow-sm animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-40 bg-gray-200 rounded" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-8 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT CARD */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-black text-white flex items-center justify-center text-3xl font-semibold mb-4">
              {user.name.charAt(0)}
            </div>

            <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="mt-6 w-full border border-gray-300 py-2 rounded-md text-sm hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>

          {/* RIGHT CARD */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Account Status</p>
                <span className="inline-flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Active
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/orders")}
                className="bg-black text-white px-6 py-2 rounded-md text-sm hover:opacity-90 transition"
              >
                View Orders
              </button>

              <button
                disabled
                className="border px-6 py-2 rounded-md text-sm text-gray-400 cursor-not-allowed"
              >
                Edit Profile (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={logoutHandler}
                className="px-4 py-2 text-sm bg-black text-white rounded-md hover:opacity-90"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
