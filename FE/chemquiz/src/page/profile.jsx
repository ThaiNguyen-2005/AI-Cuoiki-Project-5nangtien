import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import TeacherNavbar from "../components/TeacherNavbar";
import StudentNavbar from "../components/StudentNavbar";

export default function Profile() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("user_role");
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  return (
    <div className={`min-h-screen bg-[#0b1326] text-[#dbe2fd] ${userRole === 'admin' ? 'flex' : 'pb-24'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%); }
        .glass-card { background: rgba(19, 27, 46, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* Hiển thị Sidebar/Navbar tương ứng với Role */}
      {userRole === "admin" && <AdminSidebar />}
      
      <main className={`flex-1 p-6 lg:p-10 ${userRole === "admin" ? "lg:ml-64" : "pt-20"}`}>
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Header Profile */}
          <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-3xl kinetic-gradient p-1 shadow-lg shadow-teal-500/20">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole}`} 
                className="w-full h-full rounded-[22px] object-cover bg-[#131b2e]" 
                alt="Avatar"
              />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white font-['Space_Grotesk'] uppercase tracking-tight">Vũ Thành Vinh</h1>
              <p className="text-teal-400 font-bold uppercase text-xs tracking-widest mt-1">{userRole} account</p>
              <p className="text-slate-500 text-sm mt-2 flex items-center gap-2 justify-center sm:justify-start">
                <span className="material-symbols-outlined text-sm">mail</span>
                vinh.vtv@student.edu.vn
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin chi tiết */}
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h3 className="font-bold text-white border-b border-white/5 pb-4">Thông tin cá nhân</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Mã số</label>
                  <p className="text-white font-medium">K49.103.001</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Lớp/Phòng ban</label>
                  <p className="text-white font-medium">12B4 - Hoá học Hữu cơ</p>
                </div>
              </div>
            </div>

            {/* Bảo mật */}
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h3 className="font-bold text-white border-b border-white/5 pb-4">Bảo mật</h3>
              {!isChangingPass ? (
                <button 
                  onClick={() => setIsChangingPass(true)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all text-sm"
                >
                  Đổi mật khẩu
                </button>
              ) : (
                <div className="space-y-3">
                  <input type="password" placeholder="Mật khẩu mới" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-2.5 text-sm outline-none focus:border-teal-400" />
                  <div className="flex gap-2">
                    <button onClick={() => setIsChangingPass(false)} className="flex-1 py-2 text-xs font-bold text-slate-400">Huỷ</button>
                    <button className="flex-1 py-2 bg-teal-500 text-[#0b1326] rounded-lg text-xs font-bold">Lưu</button>
                  </div>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Đăng xuất
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Hiển thị Bottom Navbar cho Mobile */}
      {userRole === "teacher" && <TeacherNavbar />}
      {userRole === "student" && <StudentNavbar />}
    </div>
  );
}