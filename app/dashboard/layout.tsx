import Link from "next/link";
import { logout } from "@/app/login/actions";
import {
  FolderIcon,
  AcademicCapIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: 'Projects', href: '/dashboard/projects', icon: FolderIcon },
  { name: 'Learning', href: '/dashboard/learning', icon: AcademicCapIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-gray-900">
        <div className="flex h-16 shrink-0 items-center px-6">
          <Link href={"/"}>
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col px-4 py-4">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}

                <li className="mt-8">
                  <form action={logout}>
                    <button
                      type="submit"
                      className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-300/50 dark:bg-gray-700/50">
        <div className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
