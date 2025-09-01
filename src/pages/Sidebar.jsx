import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Helper to style active link
  const linkClasses = (path) =>
    `flex items-center w-full text-left px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-green-700 text-white font-semibold"
        : "hover:bg-gray-100 text-gray-800"
    }`;

  return (
    <aside className="w-64 border-r border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6">Notifications</h2>

      <nav className="space-y-6">
        {/* Notification Type Section */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Notification type
          </p>
          <Link to="/notifications" className={linkClasses("/notifications")}>
            <span className="mr-2">🔔</span> Email, SMS
          </Link>
          <p className="mt-2 text-xs text-gray-500">
            Control how you want to be notified across your subscriptions.
          </p>
        </div>

        {/* Subscriptions Section */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Your subscriptions
          </p>
          <ul className="space-y-2">
            <li>
              <Link to="/home-matches" className={linkClasses("/home-matches")}>
                <span className="mr-2">🔍</span> Home matches
              </Link>
            </li>
            <li>
              <Link to="/messages" className={linkClasses("/messages")}>
                <span className="mr-2">✉️</span> Messages
              </Link>
            </li>
            <li>
              <Link
                to="/saved-property"
                className={linkClasses("/saved-property")}
              >
                <span className="mr-2">❤️</span> My saved property
              </Link>
            </li>
            <li>
              <Link to="/home-tours" className={linkClasses("/home-tours")}>
                <span className="mr-2">🏠</span> Home tours
              </Link>
            </li>
            <li>
              <Link to="/home-report" className={linkClasses("/home-report")}>
                <span className="mr-2">📊</span> Home reports
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
