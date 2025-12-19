'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Report = {
  id: number;
  title: string;
  type: string;
  category: string;
  area: string;
  time: string;
  brand: string;
  status: string;
  summary: string;
  hugs: number;
  sameVictims: number;
  comments: number;
  consumptionType: string;
  reporterNeeds: string;
  hasProof: boolean;
  details?: string;
  images?: string[];
  merchantResponse?: string; // 新增：商家回覆
};

const allReports: Report[] = [
  {
    id: 1,
    title: 'ABC 美容中心 · hard sell 再收隱藏費',
    type: '報料商店',
    category: '美容/健康',
    area: '銅鑼灣',
    time: '10 分鐘前',
    brand: 'ABC 美容中心',
    status: '商家回覆',
    summary: '今日去銅鑼灣ABC美容中心試做療程，職員一開始話試做價$288，做完後話要加多$1500清潔費，仲要hard sell買$8000套餐，最後埋單$2000幾，完全冇事先講清楚！',
    hugs: 23,
    sameVictims: 8,
    comments: 15,
    consumptionType: '服務',
    reporterNeeds: '搵同路中伏友',
    hasProof: true,
    details: '今日下晝2點去銅鑼灣ABC美容中心，諗住試做$288 facial。做完之後，職員話面部污垢太多，要加$1500深層清潔費。跟住兩個sales圍住我hard sell，話買$8000療程就可以豁免今次費用。最後被迫碌卡$2000，冇單冇收據。\n\n我有錄音證明職員hard sell過程，同埋碌卡記錄。',
    images: ['/sample-receipt.jpg', '/sample-conversation.jpg'],
    merchantResponse: 'ABC美容中心回覆：感謝客人嘅意見。我哋已經即時檢討相關員工嘅培訓流程，並會為客人安排退款處理。'
  },
  {
    id: 2,
    title: '123 餐廳 生日餐被呃秤',
    type: '報料商店',
    category: '餐飲',
    area: '尖沙咀',
    time: '30 分鐘前',
    brand: '123 餐廳',
    status: '消委會',
    summary: '生日去尖沙咀123餐廳食飯，叫咗隻龍蝦話1.5斤，上枱明顯細隻，問職員仲話「煮完會縮水」。埋單計數仲要收多$100「切餅費」，完全冇事先講！',
    hugs: 45,
    sameVictims: 12,
    comments: 32,
    consumptionType: '服務+產品',
    reporterNeeds: '商家回應',
    hasProof: true,
    details: '尋晚7點半，6個人去123餐廳食生日飯。叫咗隻「波士頓龍蝦1.5斤」，上枱目測得1斤左右。問經理點解，佢話「煮完會縮水，正常」。另外，我哋自備蛋糕，埋單時無啦啦收$100切餅費，menu同職員完全冇提過。\n\n我有影到龍蝦相，同埋收據有寫$100切餅費。',
    images: ['/sample-lobster.jpg']
  },
  {
    id: 3,
    title: 'XYZ 網店 貨不對辦兼拖延退款',
    type: '報料商店',
    category: '網上購物',
    area: '線上',
    time: '1 小時前',
    brand: 'XYZ 網店',
    status: '商家回覆',
    summary: '網購一件$1200外套，收到貨完全係另一款，質料差好多。要求退款，客服拖足兩星期都未處理，而家直頭唔覆訊息！',
    hugs: 67,
    sameVictims: 21,
    comments: 48,
    consumptionType: '產品',
    reporterNeeds: '搵同路中伏友',
    hasProof: true,
    details: '11月30號喺XYZ網店買咗件$1200羽絨外套，網站顯示係90%白鴨絨。12月5號收到貨，件衫薄到似風褸，標籤寫50%聚酯纖維。即日要求退款，客服話3-5個工作天處理。等到今日已經兩星期，email、IG、WhatsApp全部唔覆。\n\n我有網站截圖、對話紀錄、收貨相片。',
    images: ['/sample-jacket-1.jpg', '/sample-jacket-2.jpg', '/sample-chat.jpg'],
    merchantResponse: 'XYZ網店回覆：我哋已經為客人安排全額退款，並會加強品質檢查流程。'
  },
  {
    id: 4,
    title: '某牌子家用美容儀 功能失靈',
    type: '產品分享',
    category: '美容/健康',
    area: '線上',
    time: '2 小時前',
    brand: '某品牌',
    status: '網民分享',
    summary: '買咗部$3000家用美容儀，用咗一個月就失靈，聯絡客服話要寄回原廠檢查，但運費要自付$500，仲話人為損壞唔保養！',
    hugs: 89,
    sameVictims: 15,
    comments: 56,
    consumptionType: '產品',
    reporterNeeds: '尋找其他商家/產品/良心商家主動聯絡',
    hasProof: false,
    details: '11月初喺官方網站買咗部$2999家用RF美容儀，用到12月頭就完全開唔到機。聯絡客服，佢話要寄去台灣原廠檢查，來回運費$500自付。檢查後話係「人為入水」，唔受保養。但部機寫明防水，我亦從來冇帶入浴室。\n\n冇保留單據同對話紀錄，冇證據。'
  },
  {
    id: 5,
    title: 'LLL 健身中心 自動續約無通知',
    type: '報料商店',
    category: '健身',
    area: '旺角',
    time: '昨日',
    brand: 'LLL 健身中心',
    status: '網民分享',
    summary: '健身會籍完咗，但信用卡繼續被扣錢，問職員話合約有自動續約條款，但簽約時完全冇提過，而家要賠3個月月費先可以取消！',
    hugs: 102,
    sameVictims: 34,
    comments: 78,
    consumptionType: '服務',
    reporterNeeds: '搵同路中伏友',
    hasProof: true,
    details: '去年12月簽LLL健身中心一年會籍，月費$680。今年11月完約，但12月頭繼續扣$680。上centre問，職員話合約有寫「自動續約」，完約前一個月要書面通知取消。但我簽約時sales完全冇提，而家話要賠3個月月費($2040)先可以取消。\n\n我有合約副本、信用卡月結單。',
    images: ['/sample-contract.jpg']
  },
  {
    id: 6,
    title: 'MMM 美容院 療程無效不退錢',
    type: '報料商店',
    category: '美容/健康',
    area: '觀塘',
    time: '2日前',
    brand: 'MMM 美容院',
    status: '商家回覆',
    summary: '買咗$5000瘦身療程，做足10次完全冇效果，要求退款，商家話「個人體質問題」拒絕退錢，仲話要加錢做加強版先有效！',
    hugs: 56,
    sameVictims: 9,
    comments: 42,
    consumptionType: '服務',
    reporterNeeds: '搵專業人士',
    hasProof: true,
    details: '9月買咗MMM美容院$5000「10次瘦身療程」，sales保證做10次減到10cm腰圍。做足10次後，腰圍完全冇變。要求退款，經理話「個人體質問題」，唔關療程事，仲sell我加$3000做「加強版」。有錄音證明sales當初嘅保證。\n\n我有療程單據、度腰圍紀錄、錄音檔。',
    merchantResponse: 'MMM美容院回覆：我哋已經安排專業顧問跟進，並會為客人安排合適嘅跟進方案。'
  }
];

export default function ReportPage() {
  // 搜索和篩選狀態
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedConsumptionType, setSelectedConsumptionType] = useState('');
  const [selectedReporterNeeds, setSelectedReporterNeeds] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [hasProofFilter, setHasProofFilter] = useState(false);

  // 報料詳情狀態
  const [showDetails, setShowDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // 品牌篩選狀態
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showBrandReports, setShowBrandReports] = useState(false);

  // 返回頂部按鈕狀態
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 過濾後的報料
  const [filteredReports, setFilteredReports] = useState<Report[]>(allReports);

  // 打開報料詳情
  const openDetails = (report: Report) => {
    setSelectedReport(report);
    setShowDetails(true);
    document.body.style.overflow = 'hidden';
  };

  // 關閉報料詳情
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedReport(null);
    document.body.style.overflow = 'auto';
  };

  // 打開品牌篩選
  const openBrandFilter = (brand: string) => {
    setSelectedBrand(brand);
    setShowBrandReports(true);
    closeDetails();
  };

  // 關閉品牌篩選
  const closeBrandFilter = () => {
    setShowBrandReports(false);
    setSelectedBrand('');
  };

  // 改進的搜尋邏輯
  const searchMatches = (query: string, report: Report): boolean => {
    if (!query) return true;

    const q = query.toLowerCase().trim();

    // 精確匹配得分最高
    if (report.title.toLowerCase() === q) return true;
    if (report.brand.toLowerCase() === q) return true;

    // 開頭匹配次高
    if (report.title.toLowerCase().startsWith(q)) return true;
    if (report.brand.toLowerCase().startsWith(q)) return true;

    // 包含匹配
    return (
      report.title.toLowerCase().includes(q) ||
      report.brand.toLowerCase().includes(q) ||
      report.summary.toLowerCase().includes(q) ||
      report.area.toLowerCase().includes(q)
    );
  };

  // 應用篩選
  useEffect(() => {
    let filtered = [...allReports];

    // 搜尋過濾
    if (searchQuery) {
      filtered = filtered.filter(report => searchMatches(searchQuery, report));
    }

    // 類別過濾
    if (selectedType) {
      filtered = filtered.filter(report => report.type === selectedType);
    }

    // 行業過濾
    if (selectedCategory) {
      filtered = filtered.filter(report => report.category === selectedCategory);
    }

    // 地區過濾
    if (selectedArea) {
      filtered = filtered.filter(report => report.area === selectedArea);
    }

    // 消費類別過濾
    if (selectedConsumptionType) {
      filtered = filtered.filter(report => report.consumptionType === selectedConsumptionType);
    }

    // 報料者需求過濾
    if (selectedReporterNeeds) {
      filtered = filtered.filter(report => report.reporterNeeds === selectedReporterNeeds);
    }

    // 狀態過濾
    if (selectedStatus) {
      filtered = filtered.filter(report => report.status === selectedStatus);
    }

    // 有証明過濾
    if (hasProofFilter) {
      filtered = filtered.filter(report => report.hasProof);
    }

    // 品牌過濾
    if (selectedBrand) {
      filtered = filtered.filter(report => report.brand === selectedBrand);
    }

    // 排序
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return 0;
        case 'hugs':
          return b.hugs - a.hugs;
        case 'sameVictims':
          return b.sameVictims - a.sameVictims;
        case 'comments':
          return b.comments - a.comments;
        default:
          return 0;
      }
    });

    setFilteredReports(sorted);
  }, [searchQuery, selectedType, selectedCategory, selectedArea, selectedConsumptionType, selectedReporterNeeds, selectedStatus, sortBy, hasProofFilter, selectedBrand]);

  // 監聽滾動以顯示/隱藏回到頂部按鈕
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 重置篩選
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedCategory('');
    setSelectedArea('');
    setSelectedConsumptionType('');
    setSelectedReporterNeeds('');
    setSelectedStatus('');
    setSortBy('newest');
    setHasProofFilter(false);
    setSelectedBrand('');
  };

  // 計算活躍的篩選條件數量
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedType) count++;
    if (selectedCategory) count++;
    if (selectedArea) count++;
    if (selectedConsumptionType) count++;
    if (selectedReporterNeeds) count++;
    if (selectedStatus) count++;
    if (hasProofFilter) count++;
    if (selectedBrand) count++;
    return count;
  };

  // 處理抱抱功能
  const handleHug = (id: number) => {
    const updatedReports = allReports.map(report => {
      if (report.id === id) {
        return { ...report, hugs: report.hugs + 1 };
      }
      return report;
    });

    if (selectedReport && selectedReport.id === id) {
      setSelectedReport(prev => prev ? { ...prev, hugs: prev.hugs + 1 } : null);
    }

    alert('抱抱已送出！感謝支持');
  };

  // 處理同路中伏友功能
  const handleSameVictims = (id: number) => {
    const updatedReports = allReports.map(report => {
      if (report.id === id) {
        return { ...report, sameVictims: report.sameVictims + 1 };
      }
      return report;
    });

    if (selectedReport && selectedReport.id === id) {
      setSelectedReport(prev => prev ? { ...prev, sameVictims: prev.sameVictims + 1 } : null);
    }

    alert('已加入同路中伏友！其他受害者可以聯絡你');
  };

  // 打開商家回覆表單
  const openMerchantResponseForm = () => {
    window.open('https://forms.gle/pGXmYh2TcRQngmq16', '_blank');
  };

  // 處理分享功能
  const handleShare = () => {
    if (selectedReport) {
      // 創建分享連結
      const shareText = `睇下呢個報料！「${selectedReport.title}」\n\n${selectedReport.summary}\n\n`;
      const shareUrl = window.location.href;
      
      // 嘗試使用 Web Share API（在支援的裝置上）
      if (navigator.share) {
        navigator.share({
          title: `伏Kick報料：${selectedReport.title}`,
          text: shareText,
          url: shareUrl,
        })
        .then(() => console.log('分享成功'))
        .catch((error) => {
          console.log('分享失敗:', error);
          // 如果 Web Share API 失敗，使用複製連結的方式
          copyToClipboard(shareText + shareUrl);
        });
      } else {
        // 如果不支援 Web Share API，使用複製連結的方式
        copyToClipboard(shareText + shareUrl);
      }
    }
  };

  // 複製到剪貼簿
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('連結已複製到剪貼簿！你可以貼上分享俾朋友。');
      })
      .catch(err => {
        console.error('複製失敗:', err);
        alert('無法複製連結，請手動複製網址。');
      });
  };

  // 回到頂部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 點擊狀態標籤處理
  const handleStatusClick = (e: React.MouseEvent, status: string) => {
    e.stopPropagation();
    if (status === '商家回覆') {
      openMerchantResponseForm();
    }
  };

  return (
    <>
      {/* 全局樣式 */}
      <style jsx global>{`
        :root {
          --bg: #f7fafc;
          --bg-card: #ffffff;
          --primary: #f97373;
          --primary-soft: #ffe4e6;
          --accent: #38bdf8;
          --text-main: #111827;
          --text-soft: #4b5563;
          --border-soft: #e2e8f0;
          --shadow-soft: 0 10px 30px rgba(15, 23, 42, 0.06);
          --radius-lg: 18px;
          --radius-md: 12px;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          padding: 20px 12px 32px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans HK", "PingFang HK", sans-serif;
          background: radial-gradient(circle at top, #fefce8 0, #f7fafc 40%, #e5edf5 100%);
          color: var(--text-main);
          -webkit-font-smoothing: antialiased;
          font-size: 15px;
          line-height: 1.6;
        }

        .container { max-width: 1100px; margin: 0 auto; }

        /* ===== 搜尋卡片 ===== */
        .search-card {
          margin: 10px 0 20px;
          background: rgba(255, 255, 255, 0.96);
          border-radius: var(--radius-lg);
          padding: 16px 18px 18px;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-soft);
        }

        .global-search-box {
          text-align: center;
          width: 100%;
        }

        .global-search {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
          background-color: #f9fafb;
          margin-bottom: 10px;
          max-width: 100%;
          position: relative;
        }

        .global-search span { font-size: 18px; }

        .global-search input {
          border: none;
          outline: none;
          background: transparent;
          color: #0f172a;
          font-size: 0.9em;
          width: min(300px, 70vw);
          padding: 0;
        }

        .global-search input::placeholder {
          color: #b0b5b9;
        }

        .clear-search-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #9ca3af;
          padding: 0 4px;
          transition: color 0.2s;
        }

        .clear-search-btn:hover {
          color: #111827;
        }

        .search-hint {
          font-size: 0.9em;
          color: #6b7280;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .active-filters-badge {
          background: #f97373;
          color: white;
          border-radius: 999px;
          padding: 2px 8px;
          font-size: 0.75em;
          font-weight: 600;
        }

        .filter-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
          margin: 0;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .filter-group label {
          color: #4b5563;
          font-weight: 500;
          font-size: 0.9em;
        }

        .filter-group select {
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #111827;
          font-size: 0.9em;
          height: 40px;
          cursor: pointer;
        }

        .filter-group select:hover {
          border-color: #9ca3af;
        }

        .filter-group select:focus {
          outline: none;
          border-color: #fb7185;
          box-shadow: 0 0 0 2px #ffe4e6;
        }

        /* ===== 報料卡片 ===== */
        .report-card {
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-soft);
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .report-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
          border-color: #fb7185;
        }

        .report-header {
          padding: 16px 18px 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .report-title {
          font-size: 1.1em;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .report-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }

        .meta-tag {
          font-size: 0.75em;
          padding: 4px 10px;
          border-radius: 999px;
          background: #f3f4f6;
          color: #4b5563;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .meta-tag:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .meta-tag.type {
          background: #fee2e2;
          color: #b91c1c;
        }

        .meta-tag.category {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .meta-tag.area {
          background: #fef3c7;
          color: #92400e;
        }

        .meta-tag.proof {
          background: #dcfce7;
          color: #166534;
        }

        .meta-tag.no-proof {
          background: #fee2e2;
          color: #b91c1c;
        }

        .report-time-brand {
          font-size: 0.8em;
          color: #9ca3af;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .brand-link {
          color: #38bdf8;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }

        .brand-link:hover {
          color: #0284c7;
          text-decoration: underline;
        }

        .report-body {
          padding: 14px 18px 16px;
        }

        .report-summary {
          font-size: 0.95em;
          color: #374151;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .report-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
          flex-wrap: wrap;
          gap: 8px;
        }

        .report-stats {
          display: flex;
          gap: 14px;
          font-size: 0.85em;
          color: #6b7280;
          flex-wrap: wrap;
        }

        .report-stat {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .report-status {
          font-size: 0.8em;
          padding: 4px 12px;
          border-radius: 999px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .report-status:hover {
          transform: scale(1.05);
        }

        .status-商家回覆 {
          background: #ede9fe;
          color: #5b21b6;
        }

        .status-消委會 {
          background: #d1fae5;
          color: #065f46;
        }

        .status-網民分享 {
          background: #fef3c7;
          color: #92400e;
        }

        /* ===== Modal 詳情 ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fefce8;
          padding: 24px;
          border: 1px solid var(--border-soft);
          border-radius: 18px;
          max-width: 700px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          z-index: 1001;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translate(-50%, -60px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }

        .modal-close {
          color: #6b7280;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          line-height: 20px;
        }

        .modal-close:hover {
          color: #111827;
        }

        .modal-title {
          color: #fb7185;
          margin-top: 0;
          font-size: 1.3em;
          margin-bottom: 12px;
          line-height: 1.4;
          clear: both;
        }

        .modal-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 12px 0;
        }

        .modal-summary {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin: 20px 0;
          line-height: 1.7;
          color: #374151;
          white-space: pre-line;
          font-size: 0.95em;
        }

        .modal-details {
          background: #f9fafb;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
        }

        .detail-item {
          display: flex;
          margin-bottom: 12px;
          font-size: 0.9em;
          align-items: flex-start;
        }

        .detail-label {
          font-weight: 600;
          color: #4b5563;
          min-width: 120px;
          flex-shrink: 0;
        }

        .detail-value {
          color: #111827;
          flex: 1;
        }

        /* 媒體展示區域 */
        .media-gallery {
          margin: 20px 0;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 16px;
        }

        .media-gallery h4 {
          margin: 0 0 12px 0;
          color: #111827;
          font-size: 1em;
          font-weight: 600;
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
          margin-top: 12px;
        }

        .media-item {
          border-radius: 8px;
          overflow: hidden;
          background: #f3f4f6;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 0.8em;
          border: 1px solid #e5e7eb;
        }

        .media-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #9ca3af;
          font-size: 0.9em;
        }

        /* 商家回覆區域 */
        .merchant-response {
          margin: 20px 0;
          background: #f0fdf4;
          border-radius: 12px;
          border: 1px solid #bbf7d0;
          padding: 20px;
        }

        .merchant-response h4 {
          margin: 0 0 12px 0;
          color: #166534;
          font-size: 1em;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .response-content {
          color: #374151;
          line-height: 1.7;
          white-space: pre-line;
          font-size: 0.95em;
          padding: 12px;
          background: white;
          border-radius: 8px;
          border: 1px solid #dcfce7;
        }

        /* ===== 按鈕樣式 ===== */
        .btn {
          display: inline-block;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 0.9em;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          border: none;
          transition: all 0.2s ease;
          background-color: #ffffff;
          color: #fb7185;
          border: 1px solid rgba(248, 113, 113, 0.5);
          box-shadow: 0 4px 12px rgba(148, 163, 184, 0.25);
        }

        .btn:hover {
          background-color: #fff7f7;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(148, 163, 184, 0.35);
        }

        /* ===== 響應式 ===== */
        @media (max-width: 1024px) {
          .filter-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 768px) {
          body { padding-inline: 10px; }
          .filter-row { grid-template-columns: 1fr; }
          .report-meta { flex-direction: column; gap: 6px; }
          .modal-content {
            width: 95%;
            padding: 18px;
            max-height: 90vh;
          }
          .media-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* 回到頂部按鈕樣式 - 同主頁一樣 */
        .back-to-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fb7185, #f97316);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(248, 113, 113, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          font-size: 24px;
          transform: translateY(20px);
        }

        .back-to-top-btn.show {
          opacity: 1;
          transform: translateY(0);
        }

        .back-to-top-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(248, 113, 113, 0.6);
          background: linear-gradient(135deg, #f97316, #fb7185);
        }

        @media (max-width: 768px) {
          .back-to-top-btn {
            width: 45px;
            height: 45px;
            bottom: 20px;
            right: 20px;
            font-size: 20px;
          }
        }
      `}</style>

      {/* 回到頂部按鈕 */}
      <button
        className={`back-to-top-btn ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        title="回到頂部"
      >
        ↑
      </button>

      <div className="container">
        {/* ===== HEADER ===== */}
        <header style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image
                src="/logo.png"
                alt="伏Kick Logo"
                width={80}
                height={80}
                style={{ borderRadius: '16px', objectFit: 'contain' }}
              />
              <div>
                <h1 style={{ fontSize: '1.8em', color: '#fb7185', fontWeight: 800, margin: 0 }}>
                  伏Kick 最新報料
                </h1>
                <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '0.9em' }}>
                  一眼睇晒最近報料，想睇多D就撳入去啦~
                </p>
              </div>
            </div>

            <Link href="/">
              <button className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                ← 返回主頁
              </button>
            </Link>
          </div>
        </header>

        {/* ===== 搜尋和篩選卡片 ===== */}
        <div className="search-card">
          <div className="global-search-box">
            {/* 全局搜尋框 */}
            <div className="global-search">
              <span>🔍</span>
              <input
                type="text"
                placeholder="搜尋報料內容 · 店名／地區"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="清除搜尋"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 搜尋提示 */}
            <div className="search-hint">
              找到 <strong>{filteredReports.length}</strong> 個報料
              {getActiveFiltersCount() > 0 && (
                <span className="active-filters-badge">已套用 {getActiveFiltersCount()} 個篩選</span>
              )}
              <button
                onClick={resetFilters}
                className="btn"
                style={{
                  padding: '4px 12px',
                  fontSize: '0.8em'
                }}
              >
                🔄 重置
              </button>
            </div>

            {/* 詳細篩選行 */}
            <div className="filter-row">
              <div className="filter-group">
                <label>📋 報料類別</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">全部</option>
                  <option value="報料商店">報料商店</option>
                  <option value="產品分享">產品分享</option>
                </select>
              </div>

              <div className="filter-group">
                <label>🏪 行業分類</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">全部</option>
                  <option value="餐飲">餐飲</option>
                  <option value="零售">零售</option>
                  <option value="美容/健康">美容 / 健康</option>
                  <option value="教育/培訓">教育 / 培訓</option>
                  <option value="房產/旅遊">房產 / 旅遊</option>
                  <option value="交通/物流">交通 / 物流</option>
                  <option value="維修/裝修">維修 / 裝修</option>
                  <option value="金融/保險">金融 / 保險</option>
                  <option value="電訊/IT">電訊 / IT</option>
                  <option value="網上購物">網上購物</option>
                  <option value="個人服務">個人服務業</option>
                  <option value="健身">健身</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div className="filter-group">
                <label>📍 地區</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="">全部</option>
                  <option value="中西區">中西區</option>
                  <option value="灣仔區">灣仔區</option>
                  <option value="東區">東區</option>
                  <option value="南區">南區</option>
                  <option value="油尖旺區">油尖旺區</option>
                  <option value="深水埗區">深水埗區</option>
                  <option value="九龍城區">九龍城區</option>
                  <option value="黃大仙區">黃大仙區</option>
                  <option value="觀塘區">觀塘區</option>
                  <option value="荃灣區">荃灣區</option>
                  <option value="屯門區">屯門區</option>
                  <option value="元朗區">元朗區</option>
                  <option value="北區">北區</option>
                  <option value="大埔區">大埔區</option>
                  <option value="西貢區">西貢區</option>
                  <option value="沙田區">沙田區</option>
                  <option value="葵青區">葵青區</option>
                  <option value="離島區">離島區</option>
                  <option value="線上">線上</option>
                </select>
              </div>

              <div className="filter-group">
                <label>🛍️ 消費類別</label>
                <select
                  value={selectedConsumptionType}
                  onChange={(e) => setSelectedConsumptionType(e.target.value)}
                >
                  <option value="">全部</option>
                  <option value="服務">服務</option>
                  <option value="產品">產品</option>
                  <option value="服務+產品">服務 + 產品</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div className="filter-group">
                <label>💭 Kick 完又點？</label>
                <select
                  value={selectedReporterNeeds}
                  onChange={(e) => setSelectedReporterNeeds(e.target.value)}
                >
                  <option value="">全部</option>
                  <option value="搵同路中伏友">搵同路中伏友</option>
                  <option value="商家回應">商家回應</option>
                  <option value="搵專業人士">搵專業人士</option>
                  <option value="尋找其他商家/產品/良心商家主動聯絡">尋找其他商家/產品/良心商家主動聯絡</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div className="filter-group">
                <label>📊 其他</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">全部</option>
                  <option value="商家回覆">商家回覆</option>
                  <option value="消委會">消委會</option>
                  <option value="網民分享">網民分享 (from 各大社交網站，群組，公開post)</option>
                </select>
              </div>

              <div className="filter-group">
                <label>⬇️ 排序方式</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">最新報料</option>
                  <option value="hugs">最多抱抱</option>
                  <option value="sameVictims">最多同路中伏友</option>
                  <option value="comments">最多留言</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 品牌過濾 Modal ===== */}
        {showBrandReports && selectedBrand && (
          <>
            <div className="modal-overlay" onClick={closeBrandFilter}></div>
            <div className="modal-content">
              <span className="modal-close" onClick={closeBrandFilter}>&times;</span>
              <h2 className="modal-title">📋 {selectedBrand} 的所有報料</h2>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                共 {filteredReports.filter(r => r.brand === selectedBrand).length} 個報料
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredReports.filter(r => r.brand === selectedBrand).map((report) => (
                  <div
                    key={report.id}
                    style={{
                      padding: '12px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => {
                      closeBrandFilter();
                      openDetails(report);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = '#fb7185';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <div style={{ fontSize: '0.95em', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                      {report.title}
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#6b7280' }}>
                      {report.time} • {report.area}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ===== 報料列表 ===== */}
        <section>
          <h2 style={{
            fontSize: '1.2em',
            color: '#fb7185',
            margin: '24px 0 16px',
            fontWeight: 700
          }}>
            📝 最新報料 ({filteredReports.length} 個)
          </h2>

          {filteredReports.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ color: '#6b7280', fontSize: '1em' }}>
                暫時沒有符合條件的報料
              </p>
              <button
                onClick={resetFilters}
                className="btn"
                style={{
                  marginTop: '16px',
                  padding: '8px 20px'
                }}
              >
                顯示所有報料
              </button>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="report-card"
                onClick={() => openDetails(report)}
              >
                <div className="report-header">
                  <div className="report-title">{report.title}</div>
                  <div className="report-meta">
                    <span className="meta-tag type">{report.type}</span>
                    <span className="meta-tag category">{report.category}</span>
                    <span className="meta-tag area">{report.area}</span>
                    {report.hasProof ? (
                      <span className="meta-tag proof">💡 有証明</span>
                    ) : (
                      <span className="meta-tag no-proof">⚠️ 無証明</span>
                    )}
                  </div>
                  <div className="report-time-brand">
                    {report.time} •
                    <span
                      className="brand-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        openBrandFilter(report.brand);
                      }}
                    >
                      {report.brand}
                    </span>
                  </div>
                </div>
                <div className="report-body">
                  <div className="report-summary">{report.summary}</div>
                  <div className="report-footer">
                    <div className="report-stats">
                      <div className="report-stat">
                        <span style={{ color: '#fb7185' }}>♥</span>
                        {report.hugs} 抱抱
                      </div>
                      <div className="report-stat">
                        <span style={{ color: '#f97316' }}>👥</span>
                        {report.sameVictims} 同路中伏友
                      </div>
                      <div className="report-stat">
                        <span style={{ color: '#38bdf8' }}>💬</span>
                        {report.comments} 則留言
                      </div>
                    </div>
                    <div 
                      className={`report-status status-${report.status}`}
                      onClick={(e) => handleStatusClick(e, report.status)}
                    >
                      {report.status === '網民分享' ? '👥 ' : report.status === '消委會' ? '🛡️ ' : ''}
                      {report.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* ===== 報料詳情 Modal ===== */}
        {showDetails && selectedReport && (
          <>
            <div className="modal-overlay" onClick={closeDetails}></div>
            <div className="modal-content">
              <span className="modal-close" onClick={closeDetails}>&times;</span>

              <h2 className="modal-title">{selectedReport.title}</h2>

              <div className="modal-meta">
                <span className="meta-tag type">{selectedReport.type}</span>
                <span className="meta-tag category">{selectedReport.category}</span>
                <span className="meta-tag area">{selectedReport.area}</span>
                {selectedReport.hasProof ? (
                  <span className="meta-tag proof">💡 有証明</span>
                ) : (
                  <span className="meta-tag no-proof">⚠️ 無証明</span>
                )}
              </div>

              <div style={{ fontSize: '0.9em', color: '#6b7280', marginBottom: '8px' }}>
                {selectedReport.time} •
                <span
                  className="brand-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeDetails();
                    openBrandFilter(selectedReport.brand);
                  }}
                  style={{ marginLeft: '4px' }}
                >
                  商戶：{selectedReport.brand}
                </span>
              </div>

              <div className="modal-summary">
                {selectedReport.details || selectedReport.summary}
              </div>

              {/* 媒體展示區域 */}
              <div className="media-gallery">
                <h4>📁 附件證明</h4>
                {selectedReport.images && selectedReport.images.length > 0 ? (
                  <div className="media-grid">
                    {selectedReport.images.map((img, index) => (
                      <div key={index} className="media-item">
                        圖片 {index + 1}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="media-placeholder">
                    <div style={{ fontSize: '2em', marginBottom: '8px' }}>📸</div>
                    <p>報料者暫未上傳圖片或影片</p>
                  </div>
                )}
              </div>

              {/* 商家回覆區域 */}
              {selectedReport.merchantResponse && (
                <div className="merchant-response">
                  <h4>💼 商家回覆</h4>
                  <div className="response-content">
                    {selectedReport.merchantResponse}
                  </div>
                </div>
              )}

              <div className="modal-details">
                <div className="detail-item">
                  <div className="detail-label">🛍️ 消費類別：</div>
                  <div className="detail-value">
                    <span className="meta-tag" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                      {selectedReport.consumptionType}
                    </span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">💭 Kick 完又點？：</div>
                  <div className="detail-value">
                    <span className="meta-tag" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                      {selectedReport.reporterNeeds}
                    </span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">👥 KICK友表示：</div>
                  <div className="detail-value">
                    <span style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap' }}>
                      <span>♥ {selectedReport.hugs} 抱抱</span>
                      <span>👥 {selectedReport.sameVictims} 同路中伏友</span>
                      <span>💬 {selectedReport.comments} 則留言</span>
                    </span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">📊 報料狀態：</div>
                  <div className="detail-value">
                    <span 
                      className={`report-status status-${selectedReport.status}`} 
                      style={{ display: 'inline-block' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedReport.status === '商家回覆') {
                          openMerchantResponseForm();
                        }
                      }}
                    >
                      {selectedReport.status === '網民分享' ? '👥 ' : selectedReport.status === '消委會' ? '🛡️ ' : ''}
                      {selectedReport.status}
                    </span>
                    {selectedReport.status === '網民分享' && (
                      <div style={{ fontSize: '0.8em', color: '#6b7280', marginTop: '4px' }}>
                        (from 各大社交網站，群組，公開post)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <button
                  onClick={closeDetails}
                  className="btn"
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.9em'
                  }}
                >
                  關閉詳情
                </button>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleHug(selectedReport.id)}
                    className="btn"
                    style={{
                      padding: '8px 20px',
                      fontSize: '0.9em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    ♥ 抱抱 ({selectedReport.hugs})
                  </button>
                  <button
                    onClick={() => handleSameVictims(selectedReport.id)}
                    className="btn"
                    style={{
                      padding: '8px 20px',
                      fontSize: '0.9em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    👥 同路中伏友 ({selectedReport.sameVictims})
                  </button>
                  <button
                    onClick={() => {
                      alert('留言功能即將推出！');
                    }}
                    className="btn"
                    style={{
                      padding: '8px 20px',
                      fontSize: '0.9em'
                    }}
                  >
                    加入討論
                  </button>
                  <button
                    onClick={handleShare}
                    className="btn"
                    style={{
                      padding: '8px 20px',
                      fontSize: '0.9em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    ↗️ 分享
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== 頁腳 ===== */}
        <footer style={{
          textAlign: 'center',
          padding: '24px 8px',
          marginTop: '32px',
          color: '#6b7280',
          fontSize: '0.8em',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p>🛡️ 伏Kick - 香港首個消費資料庫</p>
          <p>隱私優先 | 用戶至上 | 社區驅動</p>
          <p>遵守香港《個人資料（私隱）條例》</p>
        </footer>
      </div>
    </>
  );
}
