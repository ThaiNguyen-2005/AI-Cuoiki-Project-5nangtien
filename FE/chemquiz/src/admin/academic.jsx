import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminAcademic() {
  const [viewGrade, setViewGrade] = useState("10"); // 10, 11, 12
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({ subs: {}, chas: {} }); // Tracks expanded IDs

  const [modal, setModal] = useState({ open: false, type: "", data: null, parentId: null });

  useEffect(() => {
    fetchData();
  }, [viewGrade]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const subRes = await axiosClient.get(`/admin/subjects?grade=${viewGrade}`);
      setSubjects(subRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const toggleSub = async (subId) => {
    const isExp = expanded.subs[subId];
    if (!isExp) {
      try {
        const res = await axiosClient.get(`/admin/chapters?subject_id=${subId}&grade=${viewGrade}`);
        setSubjects(prev => prev.map(s => s.id === subId ? { ...s, chapters: res.data } : s));
      } catch (e) { console.error(e); }
    }
    setExpanded(prev => ({ ...prev, subs: { ...prev.subs, [subId]: !isExp } }));
  };

  const toggleCha = async (subId, chaId) => {
    const isExp = expanded.chas[chaId];
    if (!isExp) {
      try {
        const res = await axiosClient.get(`/admin/lessons?chapter_id=${chaId}`);
        setSubjects(prev => prev.map(s => s.id === subId ? {
          ...s,
          chapters: s.chapters?.map(c => c.id === chaId ? { ...c, lessons: res.data } : c)
        } : s));
      } catch (e) { console.error(e); }
    }
    setExpanded(prev => ({ ...prev, chas: { ...prev.chas, [chaId]: !isExp } }));
  };

  const handleDelete = async (id, type, subId = null, chaId = null) => {
    if (!window.confirm("Xoá mục này?")) return;
    try {
      await axiosClient.delete(`/admin/${type}s/${id}`);
      if (type === "subject") fetchData();
      else if (type === "chapter") {
        const res = await axiosClient.get(`/admin/chapters?subject_id=${subId}&grade=${viewGrade}`);
        setSubjects(prev => prev.map(s => s.id === subId ? { ...s, chapters: res.data } : s));
      } else {
        const res = await axiosClient.get(`/admin/lessons?chapter_id=${chaId}`);
        setSubjects(prev => prev.map(s => s.id === subId ? {
          ...s,
          chapters: s.chapters?.map(c => c.id === chaId ? { ...c, lessons: res.data } : c)
        } : s));
      }
    } catch (e) { alert("Lỗi khi xoá"); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());
    const { type, data, parentId } = modal;

    try {
      if (data?.id) {
        await axiosClient.put(`/admin/${type}s/${data.id}`, payload);
      } else {
        await axiosClient.post(`/admin/${type}s`, payload);
      }

      setModal({ open: false, type: "", data: null, parentId: null });

      if (type === "subject") fetchData();
      else if (type === "chapter") {
        const sId = parentId || payload.subject_id;
        const cRes = await axiosClient.get(`/admin/chapters?subject_id=${sId}&grade=${viewGrade}`);
        setSubjects(prev => prev.map(s => s.id === sId ? { ...s, chapters: cRes.data, chapters_count: cRes.data.length } : s));
        setExpanded(prev => ({ ...prev, subs: { ...prev.subs, [sId]: true } }));
      } else {
        const cId = parentId || payload.chapter_id;
        const lRes = await axiosClient.get(`/admin/lessons?chapter_id=${cId}`);
        setSubjects(prev => prev.map(s => ({
          ...s,
          chapters: s.chapters?.map(c => c.id === cId ? { ...c, lessons: lRes.data } : c)
        })));
        setExpanded(prev => ({ ...prev, chas: { ...prev.chas, [cId]: true } }));
      }
    } catch (e) { alert("Lỗi khi lưu"); }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-32">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-4">Cấu Trúc <span className="text-blue-500">Học Liệu</span></h1>
          <div className="flex gap-2 p-1 bg-white/5 rounded-2xl w-fit border border-white/5">
            {["10", "11", "12"].map(g => (
              <button
                key={g}
                onClick={() => setViewGrade(g)}
                className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${viewGrade === g ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:text-white"}`}
              >
                Khối {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && <div className="text-center py-20 italic text-slate-500 animate-pulse">Đang tải cây học liệu...</div>}

      <div className="space-y-6">
        {subjects.map(sub => (
          <div key={sub.id} className="bg-white/5 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all hover:border-white/10 shadow-2xl">
            <div className="p-6 sm:p-8 flex items-center justify-between group cursor-pointer" onClick={() => toggleSub(sub.id)}>
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${expanded.subs[sub.id] ? 'bg-blue-600 text-white rotate-90 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-blue-500'}`}>
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{sub.name}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    {(expanded.subs[sub.id] ? sub.chapters?.length : sub.chapters_count) || 0} chương học đã thiết lập
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={(e) => { e.stopPropagation(); setModal({ open: true, type: "chapter", data: null, parentId: sub.id }); }} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 border border-blue-500/20">
                  <span className="material-symbols-outlined text-sm">add</span> Thêm chương
                </button>
                <button onClick={(e) => { e.stopPropagation(); setModal({ open: true, type: "subject", data: sub, parentId: null }); }} className="p-2 text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">edit</span></button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(sub.id, "subject"); }} className="p-2 text-red-500/50 hover:text-red-400 transition-colors"><span className="material-symbols-outlined">delete</span></button>
              </div>
            </div>

            {expanded.subs[sub.id] && (
              <div className="px-8 pb-8 space-y-4 animate-in slide-in-from-top-4 duration-300">
                {!sub.chapters?.length && <p className="text-xs text-slate-600 italic ml-20 py-4 border-l-2 border-white/5 pl-6">Môn học này chưa có chương nào trong Khối {viewGrade}.</p>}
                {sub.chapters?.map(cha => (
                  <div key={cha.id} className="ml-14 bg-white/2 border border-white/5 rounded-3xl overflow-hidden shadow-inner">
                    <div className="p-5 flex items-center justify-between group cursor-pointer" onClick={() => toggleCha(sub.id, cha.id)}>
                      <div className="flex items-center gap-4">
                        <span className={`material-symbols-outlined text-slate-500 transition-transform ${expanded.chas[cha.id] ? 'rotate-90 text-blue-400' : ''}`}>arrow_right</span>
                        <h4 className="text-lg font-black text-white/80">{cha.name}</h4>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={(e) => { e.stopPropagation(); setModal({ open: true, type: "lesson", data: null, parentId: cha.id }); }} className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 text-teal-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-teal-500/20 border border-teal-500/20">
                          <span className="material-symbols-outlined text-xs">add</span> Thêm bài học
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setModal({ open: true, type: "chapter", data: cha, parentId: sub.id }); }} className="p-1.5 text-slate-500 hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(cha.id, "chapter", sub.id); }} className="p-1.5 text-red-500/40 hover:text-red-400 transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                      </div>
                    </div>

                    {expanded.chas[cha.id] && (
                      <div className="px-10 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                        {!cha.lessons?.length && <p className="text-[10px] text-slate-600 italic ml-8 py-2">Chương này chưa có bài học nào.</p>}
                        {cha.lessons?.map(les => (
                          <div key={les.id} className="flex items-center justify-between p-3 ml-6 border-l border-white/10 hover:bg-white/5 rounded-r-xl group/les transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30 group-hover/les:bg-blue-500 transition-colors" />
                              <span className="text-sm font-bold text-slate-400 group-hover/les:text-white transition-colors">{les.name}</span>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover/les:opacity-100 transition-all">
                              <button onClick={() => setModal({ open: true, type: "lesson", data: les, parentId: cha.id })} className="p-1 text-slate-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-xs">edit</span></button>
                              <button onClick={() => handleDelete(les.id, "lesson", sub.id, cha.id)} className="p-1 text-red-500/30 hover:text-red-400 transition-colors"><span className="material-symbols-outlined text-xs">delete</span></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setModal({ open: false, type: "", data: null, parentId: null })} />
          <div className="relative z-10 bg-[#0b1326] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <form onSubmit={handleSave} className="p-8 sm:p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {modal.data ? "Cập nhật" : "Thêm mới"} {modal.type === "subject" ? "Môn học" : modal.type === "chapter" ? "Chương" : "Bài học"}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Cấp độ: <span className="text-blue-500">{modal.type}</span></p>
                </div>
                <button type="button" onClick={() => setModal({ open: false, type: "", data: null, parentId: null })} className="text-slate-500 hover:text-white transition-colors"><span className="material-symbols-outlined">close</span></button>
              </div>

              <div className="space-y-6">
                {modal.type === "subject" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên môn học</label>
                      <input name="name" defaultValue={modal.data?.name} required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mô tả ngắn</label>
                      <textarea name="description" defaultValue={modal.data?.description} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all h-24 resize-none" />
                    </div>
                  </>
                )}

                {modal.type === "chapter" && (
                  <>
                    <input type="hidden" name="subject_id" value={modal.parentId || modal.data?.subject_id} />
                    <input type="hidden" name="grade" value={viewGrade} />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên chương (Khối {viewGrade})</label>
                      <input name="name" defaultValue={modal.data?.name} required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold" />
                    </div>
                  </>
                )}

                {modal.type === "lesson" && (
                  <>
                    <input type="hidden" name="chapter_id" value={modal.parentId || modal.data?.chapter_id} />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên bài học</label>
                      <input name="name" defaultValue={modal.data?.name} required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold" />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-10 flex gap-4">
                <button type="button" onClick={() => setModal({ open: false, type: "", data: null, parentId: null })} className="flex-1 py-4 rounded-2xl bg-white/5 text-slate-400 font-black uppercase tracking-widest text-xs border border-white/5 hover:bg-white/10 transition-all">Huỷ bỏ</button>
                <button type="submit" className="flex-2 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all">Xác nhận lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
