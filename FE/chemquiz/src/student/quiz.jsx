import React from 'react';
const quiz = () => {
    return (
        <>
            <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@300..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #404176 100%);\n        }\n        .glass-card {\n            background: rgba(45, 52, 73, 0.4);\n            backdrop-filter: blur(20px);\n            border: 1px solid rgba(192, 193, 255, 0.1);\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* TopAppBar */}
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 z-50 bg-[#2d3449]/70 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
        <img
          alt="Student Profile Photo"
          className="w-full h-full object-cover"
          data-alt="Close-up portrait of a serious young student in a modern classroom setting with soft blue ambient lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlPb4yxEiwQxRTV3drQyy9xBXO4lN1Uhi3p2r4CBS8IFt8vr27_4V5dSSpuNPi8NZoIQOw8QFQohv-USCeCskpDOJ0LuFxatEJHBi1H_IoSgNajVqvWk_zKvClv3YbtwPE08dW_NKhHfDgzGKoMkehw20lc3mAfFXCURZvTjWb7TC8Uxrhkiu8EmneAepLP0Mk6wDmV8z2vvWydSE8Iw0gd_4YrxED4qP-6BKmPNHnPxKyrmf6owBwtnDTZwtTn21ep78tFhSgqbwx"
        />
      </div>
      <h1 className="text-lg font-black uppercase tracking-widest text-[#c0c1ff] font-display">
        Kinetic Chemistry
      </h1>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex gap-4 items-center">
        <span className="text-slate-400 font-label-caps uppercase">
          Chương 3: Liên Kết Hóa Học
        </span>
        <div className="h-4 w-[1px] bg-outline-variant" />
        <div className="flex items-center gap-2 text-tertiary">
          <span className="material-symbols-outlined text-sm">timer</span>
          <span className="font-display font-bold">14:52</span>
        </div>
      </div>
      <button className="material-symbols-outlined text-[#c0c1ff] hover:bg-indigo-500/10 p-2 rounded-full transition-all duration-300">
        notifications
      </button>
    </div>
  </header>
  <main className="pt-24 pb-32 px-4 md:px-10 max-w-6xl mx-auto">
    {/* Progress Section */}
    <div className="mb-10">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-1">
            Câu hỏi 12{" "}
            <span className="text-outline text-lg font-normal">/ 20</span>
          </h2>
          <p className="text-on-surface-variant font-body-md italic">
            Cấu trúc phân tử và sự lai hóa
          </p>
        </div>
        <div className="text-right">
          <span className="text-label-caps text-tertiary-fixed block mb-1">
            TIẾN ĐỘ HOÀN THÀNH
          </span>
          <span className="font-display font-bold text-xl">60%</span>
        </div>
      </div>
      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div className="h-full kinetic-gradient w-[60%] rounded-full shadow-[0_0_15px_rgba(192,193,255,0.4)]" />
      </div>
    </div>
    {/* Quiz Bento Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Question Content */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
          <span className="material-symbols-outlined absolute -top-4 -right-4 text-primary opacity-5 text-9xl pointer-events-none">
            science
          </span>
          <p className="font-headline-md text-headline-md leading-relaxed text-on-surface relative z-10">
            Dựa trên thuyết VSEPR, hãy xác định dạng hình học của phân tử CH₄
            (Methane) và trạng thái lai hóa của nguyên tử trung tâm Carbon.
          </p>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden aspect-video relative">
          <img
            alt="Molecule model"
            className="w-full h-full object-cover opacity-80"
            data-alt="3D digital render of a methane molecule with a central carbon atom bonded to four hydrogen atoms in a tetrahedral shape, neon glow style"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuANwwT7xfhvjol308kKS_lJk701M4UlrXdr5xD-BWX0ADFzt0EpS253zl_I_Yo2Mli4Ugep6WRTVSar_c_4OfLwLDSl4nQWMFuxhOB_NuJ8khvbqp2uVQpyGPpS0SIvq-p67ZVJSswWH2-Tk3od5zpSLRVv3OSsQEzVq-etEchzVhUuKJBf6zcpSOEZeW4mfGF91Huu2JI5_ufdcS3Xl3oHmFrcY0mLaSXRj8MjL3_7OYxsUhSVx_hOkp7RsjsiVFKfFFPutWuPjYVY"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant px-3 py-1 rounded-full text-xs font-label-caps text-on-primary-container">
              SƠ ĐỒ PHÂN TỬ CH₄
            </span>
          </div>
        </div>
      </div>
      {/* Answer Options */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <button className="group flex items-center p-6 rounded-2xl glass-card hover:bg-primary-container/10 border-2 border-transparent hover:border-primary-container/30 transition-all duration-300 text-left active:scale-[0.98]">
          <span className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center font-display font-bold text-primary mr-5 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
            A
          </span>
          <span className="font-body-md text-on-surface text-lg">
            Hình tam giác đều, lai hóa sp²
          </span>
        </button>
        <button className="group flex items-center p-6 rounded-2xl bg-primary-container/20 border-2 border-primary-container shadow-[0_0_20px_rgba(192,193,255,0.15)] text-left relative active:scale-[0.98]">
          <span className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center font-display font-bold text-on-primary-container mr-5">
            B
          </span>
          <span className="font-body-md text-primary text-lg font-semibold">
            Hình tứ diện đều, lai hóa sp³
          </span>
          <span
            className="material-symbols-outlined absolute right-6 text-primary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            check_circle
          </span>
        </button>
        <button className="group flex items-center p-6 rounded-2xl glass-card hover:bg-primary-container/10 border-2 border-transparent hover:border-primary-container/30 transition-all duration-300 text-left active:scale-[0.98]">
          <span className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center font-display font-bold text-primary mr-5 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
            C
          </span>
          <span className="font-body-md text-on-surface text-lg">
            Hình chóp tam giác, lai hóa sp³
          </span>
        </button>
        <button className="group flex items-center p-6 rounded-2xl glass-card hover:bg-primary-container/10 border-2 border-transparent hover:border-primary-container/30 transition-all duration-300 text-left active:scale-[0.98]">
          <span className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center font-display font-bold text-primary mr-5 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
            D
          </span>
          <span className="font-body-md text-on-surface text-lg">
            Hình đường thẳng, lai hóa sp
          </span>
        </button>
        {/* Navigation Controls */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-surface-container-high border border-outline-variant text-on-surface hover:bg-surface-variant transition-all font-display font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined">arrow_back</span>
            Quay lại
          </button>
          <button className="flex items-center justify-center gap-2 py-4 rounded-2xl kinetic-gradient text-on-primary-container hover:brightness-110 transition-all font-display font-bold uppercase tracking-wider shadow-lg shadow-primary-container/20">
            Tiếp theo
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <button className="mt-2 w-full py-4 rounded-2xl border-2 border-dashed border-tertiary-container/30 text-tertiary hover:bg-tertiary-container/10 transition-all font-display font-bold uppercase tracking-widest text-sm">
          Nộp bài sớm
        </button>
      </div>
    </div>
  </main>
  {/* BottomNavBar (Mobile Only) */}
  <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe py-3 bg-[#0b1326]/90 backdrop-blur-xl border-t border-indigo-500/30 shadow-[0_-4px_20px_rgba(192,193,255,0.1)]">
    <a
      className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 px-4 py-1.5 transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">home</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        Home
      </span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-[#c0c1ff] bg-indigo-500/20 rounded-xl px-4 py-1.5 brightness-125 scale-105"
      href="#"
    >
      <span className="material-symbols-outlined">quiz</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        Quiz
      </span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 px-4 py-1.5 transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">history</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        History
      </span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 px-4 py-1.5 transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">insights</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        Analysis
      </span>
    </a>
  </nav>
  {/* Navigation Drawer (Desktop Sidebar) */}
  <aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 flex-col items-center py-8 gap-10 bg-surface-container-lowest border-r border-outline-variant/10">
    <div className="relative group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors cursor-pointer">
        home
      </span>
      <div className="absolute left-full ml-4 px-2 py-1 bg-surface-container rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Trang chủ
      </div>
    </div>
    <div className="relative group">
      <div className="absolute -right-[40px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-l-full" />
      <span
        className="material-symbols-outlined text-primary"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        quiz
      </span>
    </div>
    <div className="relative group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors cursor-pointer">
        history
      </span>
    </div>
    <div className="relative group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors cursor-pointer">
        insights
      </span>
    </div>
    <div className="mt-auto relative group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors cursor-pointer">
        settings
      </span>
    </div>
  </aside>
</>
        </>
    );
};

export default quiz;