// import React from "react"
// import { getInitials } from "../../utils/helper"

// const ProfileInfo = ({ onLogout, userInfo }) => {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
//         {getInitials(userInfo?.username)}
//       </div>

//       <div>
//         <p className="text-sm font-medium">{userInfo?.username}</p>
//       </div>

//       <button
//         className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80"
//         onClick={onLogout}
//       >
//         Logout
//       </button>
//     </div>
//   )
// }

// export default ProfileInfo

import React, { useState } from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    setShowDropdown(false); // Close dropdown before logout
    onLogout(); // Call the logout function passed as a prop
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Profile Picture/Initials */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer"
        onClick={toggleDropdown}
        title="View Profile Options"
      >
        {getInitials(userInfo?.username)}
      </div>

      {/* Username */}
      <div>
        <p className="text-sm font-medium">{userInfo?.username || "Guest"}</p>
        <p className="text-xs text-gray-500">{userInfo?.email || "No email"}</p>
      </div>

      {/* Logout Button */}
      <button
        className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-slate-950 z-10">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              ✏️ Edit Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              ⚙️ Account Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={handleLogout} // Attach the logout function here
            >
              🚪 Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

