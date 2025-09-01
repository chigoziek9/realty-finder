import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation */}
      <TopNavbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-10 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
