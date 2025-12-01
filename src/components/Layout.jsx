import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/ACIM/' || location.pathname === '/ACIM';

  return (
    <div className="min-h-screen">
      {/* Navigation header - only show on lesson pages */}
      {!isHomePage && (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>返回課程列表</span>
          </Link>
        </nav>
      )}

      {/* Main content */}
      <main>
        {children}
      </main>
    </div>
  );
}
