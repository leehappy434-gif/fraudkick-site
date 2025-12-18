'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductTestDatabase() {
  // 篩選狀態（根據原 HTML 推斷常見類別，可自行擴充）
  const [selectedYear, setSelectedYear] = useState('全部');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#111827] font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-5">
          <header className="py-5 border-b-4 border-[#f97373]">
            {/* Logo + Title */}
            <div className="flex items-center gap-4 mb-3">
              <Image
                src="/logo.png"
                alt="伏Kick Logo"
                width={80}
                height={80}
                className="rounded-xl object-contain"
              />
              <div>
                <h1 className="text-4xl font-extrabold text-[#f97373] m-0">
                  伏Kick x 消委會 | 產品測試資料庫
                </h1>
                <p className="text-base text-[#4b5563] mt-2">
                  匯集香港消費者委員會5年《選擇》月刊產品測試報告，一站式查閱安全、性能、性價比評測
                </p>
              </div>
            </div>

          
          </header>

          {/* Filter Section */}
          <div className="py-5">
            <div className="bg-white rounded-[18px] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <h2 className="text-lg font-bold text-[#111827] mb-4">篩選測試報告</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 關鍵字搜尋 */}
                <div>
                  <label className="block text-sm font-medium text-[#4b5563] mb-1">關鍵字搜尋</label>
                  <input
                    type="text"
                    placeholder="產品名稱、品牌、型號..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-[#e2e8f0] bg-[#f9fafb] focus:outline-none focus:border-[#f97373]"
                  />
                </div>

                {/* 年份篩選 */}
                <div>
                  <label className="block text-sm font-medium text-[#4b5563] mb-1">測試年份</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#f97373]"
                  >
                    <option>全部</option>
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020 以前</option>
                  </select>
                </div>

                {/* 產品類別篩選 */}
                <div>
                  <label className="block text-sm font-medium text-[#4b5563] mb-1">產品類別</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#f97373]"
                  >
                    <option>全部</option>
                    <option>家電</option>
                    <option>數碼產品</option>
                    <option>嬰幼兒用品</option>
                    <option>食品及飲品</option>
                    <option>個人護理及美容</option>
                    <option>家居清潔</option>
                    <option>運動及休閒</option>
                    <option>其他</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 text-center">
                <button className="px-8 py-3 bg-gradient-to-r from-[#fb7185] to-[#f97373] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition">
                  🔍 搜尋報告
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* 這裡未來會放篩選後的測試報告列表（卡片式） */}
        <div className="bg-white rounded-[18px] p-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)] text-center text-[#4b5563]">
          <p className="text-xl">📊 正在載入產品測試報告...</p>
          <p className="mt-3">共收錄超過 1,500 項消委會實測報告，涵蓋家電、食品、嬰兒用品等</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="bg-[#ffe4e6] p-4 rounded-xl">
              <div className="text-3xl font-bold text-[#f97373]">1500+</div>
              <div className="text-sm text-[#4b5563]">項測試報告</div>
            </div>
            <div className="bg-[#e0f2fe] p-4 rounded-xl">
              <div className="text-3xl font-bold text-[#0ea5e9]">50+</div>
              <div className="text-sm text-[#4b5563]">產品類別</div>
            </div>
            <div className="bg-[#fef3c7] p-4 rounded-xl">
              <div className="text-3xl font-bold text-[#f59e0b]">20</div>
              <div className="text-sm text-[#4b5563]">年歷史數據</div>
            </div>
            <div className="bg-[#f0fdf4] p-4 rounded-xl">
              <div className="text-3xl font-bold text-[#22c55e]">100%</div>
              <div className="text-sm text-[#4b5563]">獨立公正</div>
            </div>
          </div>
        </div>

        {/* 示例報告卡片（可複製多個） */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 示例卡片 1 */}
          <div className="bg-white rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-xl transition">
            <div className="h-48 bg-gray-200 border-2 border-dashed rounded-t-[18px]" />
            <div className="p-5">
              <div className="text-sm text-[#f97373] font-semibold mb-1">2025年1月 • 家電</div>
              <h3 className="text-lg font-bold mb-2">雪櫃比較測試（15款）</h3>
              <p className="text-sm text-[#4b5563] line-clamp-3">
                測試制冷速度、溫度穩定性、耗電量及噪音水平。發現某平價品牌表現超越國際大牌...
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs bg-[#ffe4e6] text-[#f97373] px-3 py-1 rounded-full">5星推薦</span>
                <a href="#" className="text-[#f97373] font-medium text-sm hover:underline">
                  查看詳情 →
                </a>
              </div>
            </div>
          </div>

          {/* 可繼續添加更多卡片 */}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-[#4b5563] text-sm border-t border-[#e2e8f0]">
        <p className="font-bold">伏Kick x 消委會 產品測試資料庫</p>
        <p className="mt-2">資料來源：香港消費者委員會《選擇》月刊 | 僅供參考，不構成購買建議</p>
        <p className="mt-1">© 2025 伏Kick - 香港首個消費資料庫</p>
      </footer>
    </div>
  );
}