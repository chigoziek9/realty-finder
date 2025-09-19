import { Clock, Bell, Heart, Settings, LogOut, X, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import DocumentCompliance from "../components/DocumentCompliance.jsx";
import { User, BellRing, Info } from "lucide-react";

export default function AgentSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  

const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";
  return (
   <div className="flex min-h-screen bg-gray-100">
         {/* Sidebar */}
         <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
           <div>
             {/* Menu */}
             <nav className="mt-[85px] space-y-1">
               <button
                 onClick={() => navigate("/agents-dashboard")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white  ${isActive(
                   "/agents-dashboard"
                 )}`}
               >
                 <Clock size={18} />
                 <span>Dashboard Overview</span>
               </button>
   
               <button
                 onClick={() => navigate("/agents-transaction")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                   "/agents-transaction"
                 )}`}
               >
                 <Bell size={18} />
                 <span>Transaction & Commission</span>
               </button>
   
               <button
                 onClick={() => navigate("/agents-client")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white  ${isActive(
                   "/agents-client"
                 )}`}
               >
                 <Heart size={18} />
                 <span>Clients</span>
               </button>
               <button
                 onClick={() => navigate("/agents-document")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                   "/agents-document"
                 )}`}
               >
                 <Heart size={18} />
                 <span>Document Compliance</span>
               </button>
               <button
                 onClick={() => navigate("/agents-property")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                   "/agents-property"
                 )}`}
               >
                 <Heart size={18} />
                 <span>Property Management</span>
               </button>
   
               <button
                 onClick={() => navigate("/agent-settings")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                   "/agent-settings"
                 )}`}
               >
                 <Settings size={18} />
                 <span>Account Settings</span>
               </button>
             </nav>
           </div>
   
           {/* User Info */}
           <div className="p-6 border-t border-green-800">
             <div className="flex items-center space-x-3">
               <img
                 src={user?.profilePic || "https://via.placeholder.com/40"}
                 alt="profile"
                 className="w-10 h-10 rounded-full object-cover border"
               />
               <div className="flex-colunm">
                 <p className="font-medium ">
                   {user?.firstName} {user?.lastName}
                 </p>
                 <p className="text-sm text-gray-300">{user?.email}</p>
               </div>
             </div>
             <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
               <LogOut size={18} />
               <span>Logout</span>
             </button>
           </div>
         </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Section */}
       <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold">Account settings</h1>
        <Info size={18} className="text-green-700" />
      </div>
      <p className="text-gray-600 mb-6">
        Manage your profile, preferences, and security options.
      </p>

      {/* Profile Card */}
      <div
        onClick={() => navigate("/profile")}
        className="bg-gray-100 p-5 rounded-lg flex items-center justify-between mb-4 cursor-pointer transition hover:bg-gray-200"
      >
        <div className="flex items-center gap-4">
          <User size={20} className="text-green-700" />
          <div>
            <p className="font-medium">Profile</p>
            <p className="text-sm text-gray-600">
              Personalize your account and update your sign in preferences.
            </p>
          </div>
        </div>
        <span className="text-gray-500 text-lg">&gt;</span>
      </div>

      {/* Notifications Card */}
      <div
        onClick={() => navigate("/notifications")}
        className="bg-gray-100 p-5 rounded-lg flex items-center justify-between cursor-pointer transition hover:bg-gray-200"
      >
        <div className="flex items-center gap-4">
          <BellRing size={20} className="text-green-700" />
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-sm text-gray-600">
              Manage the content and frequency of your RealtyFinder emails.
            </p>
          </div>
        </div>
        <span className="text-gray-500 text-lg">&gt;</span>
      </div>
        
      </main>
    </div>
  );
}
