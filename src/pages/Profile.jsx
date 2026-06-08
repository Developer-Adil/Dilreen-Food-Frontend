import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function Profile() {
  const navigate = useNavigate();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [profileData, setProfileData] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setProfileLoading(true);

      const res = await API.put("/auth/profile", profileData);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      setPasswordLoading(true);

      await API.put("/auth/change-password", passwordData);

      toast.success("Password changed successfully");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Account settings
            </p>

            <h1 className="text-4xl font-black md:text-6xl">
              My <span className="text-red-500">Profile</span>
            </h1>

            <p className="mt-4 text-white/50">
              Manage your account details and password.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={updateProfile}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-2xl font-black">Profile Information</h2>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Email
                  </label>
                  <input
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Role
                  </label>
                  <input
                    value={savedUser?.role || "user"}
                    disabled
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white/50 outline-none"
                  />
                </div>
              </div>

              <button
                disabled={profileLoading}
                className="mt-8 rounded-2xl bg-red-500 px-8 py-4 font-bold hover:bg-red-600 disabled:opacity-60"
              >
                {profileLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>

            <form
              onSubmit={changePassword}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-2xl font-black">Change Password</h2>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                    placeholder="Enter old password"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              <button
                disabled={passwordLoading}
                className="mt-8 rounded-2xl bg-red-500 px-8 py-4 font-bold hover:bg-red-600 disabled:opacity-60"
              >
                {passwordLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;