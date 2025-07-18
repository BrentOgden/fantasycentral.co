// src/components/BottomNav.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTrophy, FaUsers, FaCog } from 'react-icons/fa';

export default function BottomNav() {
  const { pathname } = useLocation();
  const tabs = [
    { to: '/',         label: 'Home',    Icon: FaHome },
    { to: '/leaguerecordsat',  label: 'Leagues', Icon: FaTrophy },
    { to: '/results',    label: 'Picks',   Icon: FaUsers },
    { to: '/leaguehistory', label: 'Past Winners',Icon: FaCog },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner 
                    pb-safe env(safe-area-inset-bottom) z-50">
      <ul className="flex">
        {tabs.map(({ to, label, Icon }) => {
          const isActive = pathname === to;
          return (
            <li key={to} className="flex-1">
              <Link 
                to={to}
                className={`flex flex-col items-center py-2 text-sm
                            ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <Icon className="text-xl" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
