import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* Sidebar: shrink-0 giúp sidebar không bị ép nhỏ lại, tự động chiếm không gian của nó */}
      <aside className="shrink-0 border-r border-[var(--border)] bg-[var(--bg)] z-40">
        <AdminSidebar />
      </aside>

      {/* Vùng nội dung chính: flex-1 sẽ tự động chiếm toàn bộ phần diện tích TỰ NHIÊN còn lại */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}