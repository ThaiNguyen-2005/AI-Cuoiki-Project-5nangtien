import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';

export default function StudentLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      {/* Navbar được ghim cố định */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
        <StudentNavbar />
      </header>

      {/* Vùng chứa nội dung chính */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}