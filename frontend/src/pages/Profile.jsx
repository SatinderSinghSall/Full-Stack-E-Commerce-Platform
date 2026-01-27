import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Profile = () => {
  const { backendUrl, token, setToken, navigate } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-black text-white flex items-center justify-center text-3xl font-semibold mb-4">
              {user.name.charAt(0)}
            </div>

            <h2 className="text-lg font-medium">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <button
              onClick={logoutHandler}
              className="mt-6 w-full border py-2 rounded-md text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Account Information</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Account Status</p>
                <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Active
                </span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate("/orders")}
                className="bg-black text-white px-6 py-2 rounded-md text-sm"
              >
                View Orders
              </button>

              <button className="border px-6 py-2 rounded-md text-sm">
                Edit Profile (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
