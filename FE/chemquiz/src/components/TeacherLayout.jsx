import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherNavbar from './TeacherNavbar';

export default function TeacherLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      {/* Navbar cố định trên cùng */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
        <TeacherNavbar />
      </header>

      {/* Vùng nội dung chính */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}