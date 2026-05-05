import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminClass() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", teacher_id: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classRes, userRes] = await Promise.all([
        axiosClient.get("/admin/classes"),
        axiosClient.get("/admin/users"),
      ]);
      setClasses(classRes.data.data ?? classRes.data);

      // Lọc chỉ lấy teacher
      const allUsers = userRes.data.data ?? userRes.data;
      setTeachers(allUsers.filter((u) => u.role === "teacher"));
    } catch (e) {
      console.error("Lỗi tải lớp học:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setSaving(true);
    setError("");
    try {
      await axiosClient.post("/admin/classes", form);
      setShowModal(false);
      setForm({ name: "", teacher_id: "", description: "" });
      fetchData();
    } catch (e) {
      setError(e.response?.data?.message ?? "Lỗi tạo lớp học");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa lớp học này?")) return;
    try {
      await axiosClient.delete(`/admin/classes/${id}`);
      fetchData();
    } catch (e) {
      console.error("Lỗi xóa:", e);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1326] text-white">
        Đang tải...
      </div>
    );

  return (
    <div className="p-6 bg-[#0b1326] min-h-screen text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#c0c1ff]">Quản Lý Lớp Học</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Tạo lớp học
        </button>
      </div>

      {/* Danh sách lớp */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-gray-800/50 rounded-xl p-5 border border-white/10 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">{cls.name}</h2>
                {cls.description && (
                  <p className="text-sm text-gray-400 mt-1">{cls.description}</p>
                )}
                {cls.teacher && (
                  <p className="text-xs text-blue-400 mt-2">
                    GV: {cls.teacher.name}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(cls.id)}
                className="text-red-400 hover:text-red-300 text-xs ml-2 flex-shrink-0"
              >
                Xóa
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex gap-4 text-xs text-gray-400">
              <span>👤 {cls.students_count ?? 0} học sinh</span>
            </div>
          </div>
        ))}

        {classes.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-500">
            Chưa có lớp học nào. Bấm "Tạo lớp học" để bắt đầu!
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1a2540] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Tạo lớp học mới</h3>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Tên lớp</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                  placeholder="VD: Lớp 10A1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Mô tả</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                  placeholder="Tùy chọn"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Giáo viên phụ trách</label>
                <select
                  value={form.teacher_id}
                  onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                >
                  <option value="">-- Chọn giáo viên --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.email})
                    </option>
                  ))}
                </select>
                {teachers.length === 0 && (
                  <p className="text-xs text-yellow-400 mt-1">
                    Chưa có giáo viên nào trong hệ thống.
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-sm transition"
              >
                Hủy
              </button>
              <button
                onClick={handleCreate}
                disabled={saving || !form.name}
                className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {saving ? "Đang lưu..." : "Tạo lớp"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}