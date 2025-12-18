(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,a,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"warnOnce",{enumerable:!0,get:function(){return t}});let t=e=>{}},30229,e=>{"use strict";var a=e.i(43476),i=e.i(37902),t=e.i(71645),s=e.i(57688),c=e.i(22016);function n(){let[e,n]=(0,t.useState)("all"),[o,l]=(0,t.useState)(null),[r,d]=(0,t.useState)(""),[x,p]=(0,t.useState)([]),[h,f]=(0,t.useState)(!1),[m,g]=(0,t.useState)(""),[b,u]=(0,t.useState)(""),[j,v]=(0,t.useState)(!1),w={account:[{id:"account-1",question:"Q1：我要提供咩資料先可以報料？",answer:"A：最少要俾電話或Email（用於確認身份 + 平台聯絡你），內容會完全匿名（你嘅名字、電話唔會公開）。"},{id:"account-2",question:"Q2：我嘅個人資料會唔會被洩露？",answer:"A：唔會。伏Kick遵守香港《個人資料（私隱）條例》：\n\n• 你提供嘅電話 / Email 唔會公開顯示，只供平台內部使用\n• 你嘅報料內容會完全匿名顯示（例如「用戶A」）\n• 如果發現任何洩露，我哋會立即通知你\n\n你可以隨時PM平台要求刪除你嘅個人資料。"},{id:"account-3",question:"Q3：我可以用假名報料嗎？",answer:"A：可以。我哋唔驗證你真實身份，但如果被報料方要求證實報料真偽，你可能要提供完整證據（例如收據、聊天記錄）。如證明虛假，平台會刪帖。"},{id:"account-4",question:"Q4：點樣修改或刪除我嘅報料？",answer:"A：報料發佈後，你可以透過PM平台提出要求，註明「報料ID」。我哋會喺 7-14 工作日內審核並回覆。理由可以係：\n\n• 「已解決，唔需要再提示其他人」\n• 「發現內容有誤」\n• 「商戶已退款，事件完結」"}],report:[{id:"report-1",question:"Q5：點樣知道我嘅報料被接受定拒絕？",answer:"A：\n\n✅ 已接受 - 收到「確認Email」，個案出現喺伏Kick網站\n❌ 被拒絕 - 收到「拒絕Email」，會簡要說明原因（例如「內容過於情緒化」「缺乏事實根據」）並邀請你修改後重新提交\n⏳ 審核中 - 一般 3-7 工作日，複雜個案可能更長"},{id:"report-2",question:"Q6：如果我個報料被拒絕，點樣上訴？",answer:"A：可以回覆拒絕Email，清楚解釋點樣修改咗內容或提供更多證據。平台會再審一次，一般會喺 5-10 工作日內再次回覆。"},{id:"report-3",question:"Q7：我發現個報料有誤，想修改？",answer:"A：已發佈嘅報料唔可以自己編輯，但可以PM平台要求「修訂」。提供新版本內容，我哋會審核後更新。建議附上「修改原因」（例如「日期寫錯」「補充新資訊」）。"}],merchant:[{id:"merchant-1",question:"Q12：我係被報料的商戶，點樣回應？",answer:"A：\n\n1. 搵到你嘅報料頁面\n2. 按「商戶回應」按鈕，申請開設「官方帳戶」（免費）\n3. 提供你嘅商戶資料 + 營業執照副本作驗證\n4. 審核通過後，可以喺該報料下方發表官方回應\n\n回應內容應包括：澄清事實、提供你嘅版本說法、解決方案（例如已退款、已改善）、聯絡方式（Email / 電話，方便進一步協調）。"},{id:"merchant-2",question:"Q13：我係商戶，想刪除某一宗報料，點樣做？",answer:"A：\n\n• 按「報料有疑問」申請，提供理由 + 證據（例如「報料日期錯誤，該日期店鋪冇開門」）\n• 附上商戶證明文件（例如營業時間表、監控記錄、交易紀錄）\n• 平台會喺 7-14 工作日內審核\n• 如確實虛假，會刪除；如難以判斷，會保留但標示「商戶有異議」"}],platform:[{id:"platform-1",question:"Q15：伏Kick 係免費的嗎？",answer:"A：當前完全免費。未來可能會推出：\n\n• 進階搜尋功能（付費）\n• 商戶風險報告（付費）\n• 廣告位（付費）\n\n但現有所有免費功能會永久免費，唔會收費。"},{id:"platform-2",question:"Q16：伏Kick 點樣搵錢維持營運？",answer:"A：長期計劃包括：\n\n• 向商戶收費（聲譽管理服務）\n• 向投資者 / 保險公司賣行業數據報告\n• 廣告合作（好心商家、法律顧問等）\n\n當前全靠志願、慢慢建立。如果你想支持，可以多分享個平台😊"}],legal:[{id:"legal-1",question:"Q21：如果我報料嘅商戶起訴我誹謗，伏Kick 會唔會幫我？",answer:"A：唔會。伏Kick係中立平台，唔參與任何法律訴訟。你需要自行處理法律責任。建議：\n\n• 保留所有證據\n• 聯絡法律顧問\n• 向警方 / 消委會舉報（如涉及詐騙）"},{id:"legal-2",question:"Q22：伏Kick 對報料內容有冇法律責任？",answer:"A：伏Kick唔保證報料內容真實性，用戶自行承責。但伏Kick會：\n\n• 移除明顯虛假 / 誹謗內容\n• 遵守《個人資料（私隱）條例》\n• 遵從法院刪帖命令\n\n詳見「免責聲明」。"}]},k={privacy:{title:"私隱政策",content:`
        <h2 class="legal-title">私隱政策</h2>
        <div class="legal-section">
          <h3>1. 收集個人資料聲明</h3>
          <p>伏Kick尊重用戶隱私，承諾遵守香港《個人資料（私隱）條例》。我們收集的個人資料僅用於：</p>
          <ul>
            <li>處理用戶報料申請</li>
            <li>驗證用戶身份以防止濫用</li>
            <li>與用戶溝通關於其報料狀態</li>
            <li>改善平台服務質素</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>2. 資料收集範圍</h3>
          <p>我們可能收集以下資料：</p>
          <ul>
            <li>聯絡方式（電郵地址、電話號碼）</li>
            <li>報料內容及相關證據</li>
            <li>瀏覽紀錄及使用數據（匿名）</li>
            <li>設備信息（IP地址、瀏覽器類型）</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>3. 資料使用及披露</h3>
          <p>我們承諾：</p>
          <ul>
            <li>不會出售或出租用戶個人資料</li>
            <li>報料內容會匿名處理</li>
            <li>只在法律要求或保護權利時披露資料</li>
            <li>與第三方服務商分享資料時會確保其遵守私隱條例</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>4. 資料保留及刪除</h3>
          <p>用戶可隨時要求：</p>
          <ul>
            <li>查閱其個人資料</li>
            <li>更正不準確資料</li>
            <li>刪除其個人資料（除法律要求保留外）</li>
          </ul>
          <p>請電郵至 contact@fraudkick.hk 提出相關要求。</p>
        </div>
        <div class="legal-section">
          <h3>5. 資料安全</h3>
          <p>我們採取合理措施保護用戶資料，包括加密傳輸、安全存儲及訪問控制。</p>
        </div>
        <div class="legal-section">
          <h3>6. 政策更新</h3>
          <p>本政策可能會不時更新，請定期查閱。最後更新日期：2025年12月。</p>
        </div>
      `},terms:{title:"使用條款",content:`
        <h2 class="legal-title">使用條款</h2>
        <div class="legal-section">
          <h3>1. 接受條款</h3>
          <p>使用伏Kick即表示您同意遵守本使用條款。如不同意，請勿使用本平台。</p>
        </div>
        <div class="legal-section">
          <h3>2. 服務描述</h3>
          <p>伏Kick是一個消費資訊分享平台，允許用戶：</p>
          <ul>
            <li>提交消費報料及相關證據</li>
            <li>瀏覽其他用戶的報料</li>
            <li>參與討論（如功能開放）</li>
            <li>舉報不當內容</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>3. 用戶責任</h3>
          <p>用戶承諾：</p>
          <ul>
            <li>提供真實、準確的資訊</li>
            <li>不提交虛假、誹謗或誤導性內容</li>
            <li>不侵犯他人知識產權或私隱權</li>
            <li>不從事任何非法活動</li>
            <li>不試圖破壞平台安全或功能</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>4. 內容審核</h3>
          <p>伏Kick保留權利：</p>
          <ul>
            <li>審核所有提交內容</li>
            <li>拒絕或刪除不當內容</li>
            <li>暫停或終止違規用戶帳戶</li>
            <li>配合執法機關要求</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>5. 知識產權</h3>
          <p>平台內容（除用戶提交內容外）屬伏Kick所有。用戶保留其提交內容的版權，但授予伏Kick使用、展示及分發的權利。</p>
        </div>
        <div class="legal-section">
          <h3>6. 免責聲明</h3>
          <p>平台僅提供資訊分享服務，不對內容真實性負責。用戶應自行判斷資訊可信度。</p>
        </div>
        <div class="legal-section">
          <h3>7. 條款修改</h3>
          <p>伏Kick可隨時修改條款，修改後繼續使用即表示接受新條款。</p>
        </div>
      `},disclaimer:{title:"免責聲明",content:`
        <h2 class="legal-title">免責聲明</h2>
        <div class="legal-section">
          <h3>1. 平台性質</h3>
          <p>伏Kick是一個用戶生成內容的平台，所有報料均由用戶提交。平台本身不創建、驗證或保證任何報料內容的真實性、準確性或完整性。</p>
        </div>
        <div class="legal-section">
          <h3>2. 不具法律效力</h3>
          <p>本平台內容不構成法律意見、專業建議或官方聲明。用戶應諮詢相關專業人士（如律師、消費者委員會）以獲取正式建議。</p>
        </div>
        <div class="legal-section">
          <h3>3. 內容責任</h3>
          <p>提交報料的用戶需對其內容負全部責任。伏Kick不對以下情況負責：</p>
          <ul>
            <li>報料內容的真實性或準確性</li>
            <li>因依賴報料內容而導致的任何損失或損害</li>
            <li>用戶之間的糾紛或法律訴訟</li>
            <li>第三方對報料內容的反應或行動</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>4. 商戶回應</h3>
          <p>商戶回應僅代表該商戶觀點，伏Kick不對其內容負責。平台不偏袒任何一方，僅提供溝通渠道。</p>
        </div>
        <div class="legal-section">
          <h3>5. 技術免責</h3>
          <p>伏Kick不保證：</p>
          <ul>
            <li>平台永遠不間斷或無錯誤運作</li>
            <li>所有缺陷將被修正</li>
            <li>平台或伺服器不受病毒或其他有害組件影響</li>
          </ul>
        </div>
        <div class="legal-section">
          <h3>6. 第三方連結</h3>
          <p>平台可能包含第三方網站連結，這些連結僅為方便提供。伏Kick不對這些網站的內容或隱私實踐負責。</p>
        </div>
        <div class="legal-section">
          <h3>7. 責任限制</h3>
          <p>在法律允許的最大範圍內，伏Kick及其員工、代理不對因使用或無法使用平台而導致的任何間接、附帶、特殊或後果性損害負責。</p>
        </div>
        <div class="legal-section">
          <h3>8. 法律管轄</h3>
          <p>本免責聲明受香港法律管轄並據其解釋。任何爭議應提交香港法院專屬管轄。</p>
        </div>
        <div class="info-box">
          <strong>重要提示</strong>
          <p>使用本平台即表示您理解並接受：您應自行核實任何報料內容的真實性，並對依賴這些內容所做的決定承擔全部責任。如遇消費糾紛，請聯絡香港消費者委員會（電話：2929 2222）或尋求法律建議。</p>
        </div>
      `}},N=e=>{n(e),l(null)};(0,t.useEffect)(()=>{if(!r.trim())return void p([]);let e=r.toLowerCase(),a=[];Object.entries(w).forEach(([i,t])=>{t.forEach(t=>{(t.question.toLowerCase().includes(e)||t.answer.toLowerCase().includes(e))&&a.push({...t,category:i})})}),p(a)},[r]);let y=e=>{let a=k[e];u(a.title),g(a.content),f(!0)};(0,t.useEffect)(()=>{let e=()=>{v(window.scrollY>300)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let q=(e,i)=>{let t=o===e.id;return(0,a.jsxs)("div",{className:"faq-item","data-category":i,children:[(0,a.jsx)("div",{className:`faq-question ${t?"active":""}`,onClick:()=>{var a;o===(a=e.id)?l(null):l(a)},children:e.question}),(0,a.jsx)("div",{className:`faq-answer ${t?"show":""}`,children:(0,a.jsx)("div",{className:"faq-answer-content",style:{whiteSpace:"pre-line"},children:e.answer})})]},e.id)};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.default,{id:"706b0c6ee63146ac",children:':root{--bg:#f7fafc;--bg-card:#fff;--primary:#fb7185;--primary-soft:#ffe4e6;--accent:#38bdf8;--text-main:#111827;--text-soft:#4b5563;--border-soft:#e2e8f0;--shadow-soft:0 10px 30px #0f172a0f;--radius-lg:18px;--radius-md:12px}*{box-sizing:border-box;margin:0;padding:0}body{color:var(--text-main);-webkit-font-smoothing:antialiased;background:radial-gradient(circle at top,#fefce8 0,#f7fafc 40%,#e5edf5 100%);padding:20px 12px 32px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,Noto Sans HK,PingFang HK,sans-serif;font-size:16px;line-height:1.6}.container{max-width:1100px;margin:0 auto}header{padding:8px 0 20px}.header-row{flex-direction:column;gap:18px;display:flex}.header-top-line{justify-content:space-between;align-items:center;gap:16px;display:flex}.header-logo{align-items:center;gap:10px;display:flex}.header-logo-img{object-fit:contain;border-radius:18px}.header-top-bar{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:8px;font-size:1em;display:flex}.btn-top{color:#b91c1c;cursor:pointer;white-space:nowrap;background-color:#fff;border:1px solid #f8717166;border-radius:999px;align-items:center;gap:4px;padding:6px 14px;font-size:.86em;text-decoration:none;transition:all .2s;display:inline-flex;box-shadow:0 4px 10px #94a3b840}.btn-top:hover{background-color:#fff5f5;transform:translateY(-1px)}.faq-header{text-align:center;margin:20px 0 30px;padding:20px}.faq-title{color:#fb7185;letter-spacing:.02em;margin:0 0 8px;font-size:2.8em;font-weight:800}.faq-subtitle{color:var(--text-soft);max-width:600px;margin:0 auto 20px;font-size:1.3em;line-height:1.5}.faq-search-container{max-width:600px;margin:0 auto 35px}.faq-search-box{background-color:#f9fafb;border:1px solid #cbd5e1;border-radius:999px;align-items:center;gap:12px;width:100%;padding:15px 25px;font-size:1em;display:flex}.faq-search-box input{color:#0f172a;background:0 0;border:none;outline:none;width:100%;font-size:1em}.faq-category-nav{flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:40px;display:flex}.category-nav-btn{color:#b91c1c;cursor:pointer;background-color:#fff;border:1px solid #f8717166;border-radius:999px;padding:10px 20px;font-size:1em;transition:all .2s}.category-nav-btn:hover,.category-nav-btn.active{color:#fff;background-color:#fb7185;border-color:#fb7185}.faq-category-section{margin-bottom:45px}.category-title{color:#fb7185;border-bottom:2px solid #ffe4e6;margin-bottom:20px;padding-bottom:8px;font-size:1.6em;font-weight:700}.faq-item{border-radius:var(--radius-lg);border:1px solid var(--border-soft);box-shadow:var(--shadow-soft);background:#fffffff5;margin-bottom:16px;overflow:hidden}.faq-question{cursor:pointer;color:#111827;-webkit-user-select:none;user-select:none;justify-content:space-between;align-items:center;padding:20px 25px;font-size:1.1em;font-weight:700;transition:background-color .3s;display:flex}.faq-question:hover{background-color:#fefce8}.faq-question:after{content:"+";color:#fb7185;font-size:26px;font-weight:300;transition:transform .3s}.faq-question.active:after{content:"−";transform:rotate(180deg)}.faq-answer{background-color:#fff;max-height:0;padding:0 25px;transition:max-height .5s ease-out,padding .5s ease-out;overflow:hidden}.faq-answer.show{max-height:2000px;padding:0 25px 25px}.faq-answer-content{color:#555;font-size:1.05em;line-height:1.7}.faq-answer-content p{margin-bottom:15px}.faq-answer-content ul,.faq-answer-content ol{margin-bottom:15px;margin-left:25px}.faq-answer-content li{margin-bottom:8px}.info-box{background-color:#f8f9fa;border-left:4px solid #3498db;border-radius:0 8px 8px 0;margin:25px 0;padding:20px;font-size:1.05em}.info-box strong{color:#2c3e50;margin-bottom:10px;font-size:1.2em;display:block}.warning-box{background-color:#fff8e1;border-left:4px solid #f39c12;border-radius:0 8px 8px 0;margin:25px 0;padding:20px;font-size:1.05em}.warning-box strong{color:#2c3e50;margin-bottom:10px;font-size:1.2em;display:block}.quick-contact{border-radius:var(--radius-lg);border:1px solid var(--border-soft);box-shadow:var(--shadow-soft);text-align:center;background:linear-gradient(135deg,#fefce8 0%,#f7fafc 100%);margin:50px 0;padding:30px}.quick-contact h3{color:#fb7185;margin-bottom:20px;font-size:1.5em}.contact-methods{flex-wrap:wrap;justify-content:center;gap:20px;margin-top:25px;display:flex}.contact-method{border:1px solid var(--border-soft);background:#fff;border-radius:12px;min-width:200px;padding:15px 20px;box-shadow:0 4px 12px #0000000d}.contact-method h4{color:#fb7185;margin-bottom:10px;font-size:1.1em}.legal-modal{z-index:1000;background-color:#00000080;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:fixed;top:0;left:0}.legal-content{border-radius:var(--radius-lg);background:#fff;width:90%;max-width:800px;max-height:80vh;padding:30px;position:relative;overflow-y:auto;box-shadow:0 20px 60px #0000004d}.legal-close{color:#fff;cursor:pointer;background:#fb7185;border:none;border-radius:50%;justify-content:center;align-items:center;width:36px;height:36px;font-size:20px;transition:all .3s;display:flex;position:absolute;top:20px;right:20px}.legal-close:hover{background:#b91c1c;transform:rotate(90deg)}.legal-title{color:#fb7185;border-bottom:2px solid #ffe4e6;margin-bottom:20px;padding-bottom:10px}.legal-section{margin-bottom:25px}.legal-section h3{color:#fb7185;margin:15px 0 10px}footer{text-align:center;color:#6b7280;border-top:1px solid var(--border-soft);margin-top:40px;padding:18px 8px 4px;font-size:.9em}footer p{margin:5px 0}.back-to-top{color:#fff;cursor:pointer;z-index:999;opacity:0;background:linear-gradient(135deg,#fb7185,#f97316);border:none;border-radius:50%;justify-content:center;align-items:center;width:50px;height:50px;font-size:22px;transition:opacity .3s,transform .3s;display:flex;position:fixed;bottom:30px;right:30px;transform:translateY(20px);box-shadow:0 8px 20px #f8717173}.back-to-top.show{opacity:1;transform:translateY(0)}.back-to-top:hover{transform:translateY(-3px);box-shadow:0 12px 25px #f871718c}@media (width<=768px){.header-top-line{flex-direction:column;align-items:center;gap:20px}.header-logo-img{width:80px;height:80px}.header-top-bar{justify-content:center;width:100%}.faq-title{font-size:2.2em}.faq-subtitle{font-size:1.15em}.faq-question{padding:18px 20px;font-size:1.05em}.category-title{font-size:1.4em}.contact-methods{flex-direction:column;align-items:center}.contact-method{width:100%;max-width:300px}.legal-content{width:95%;padding:20px}.back-to-top{width:45px;height:45px;font-size:20px;bottom:20px;right:20px}}@media (width<=480px){body{padding:15px 8px 25px;font-size:15px}.header-logo-img{width:70px;height:70px}.faq-title{font-size:1.8em}.faq-subtitle{padding:0 10px;font-size:1.05em}.category-title{font-size:1.3em}.faq-question{padding:16px 18px;font-size:1em}.faq-answer-content{font-size:1em}.quick-contact{padding:20px 15px}.btn-top{padding:6px 12px;font-size:.8em}.category-nav-btn{padding:8px 16px;font-size:.9em}}.highlight{background-color:#ffe4b5;border-radius:4px;padding:2px 4px}a{color:#fb7185;text-decoration:none;transition:color .2s}a:hover{color:#b91c1c;text-decoration:underline}.legal-link{cursor:pointer;color:#fb7185;text-decoration:underline}.legal-link:hover{color:#b91c1c}'}),h&&(0,a.jsx)("div",{id:"legalModal",className:"jsx-706b0c6ee63146ac legal-modal",children:(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac legal-content",children:[(0,a.jsx)("button",{id:"legalClose",onClick:()=>f(!1),className:"jsx-706b0c6ee63146ac legal-close",children:"×"}),(0,a.jsx)("div",{id:"legalContent",dangerouslySetInnerHTML:{__html:m},className:"jsx-706b0c6ee63146ac"})]})}),(0,a.jsx)("button",{id:"backToTop",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},className:`jsx-706b0c6ee63146ac back-to-top ${j?"show":""}`,children:"↑"}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac container",children:[(0,a.jsx)("header",{className:"jsx-706b0c6ee63146ac",children:(0,a.jsx)("div",{className:"jsx-706b0c6ee63146ac header-row",children:(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac header-top-line",children:[(0,a.jsx)("div",{className:"jsx-706b0c6ee63146ac header-logo",children:(0,a.jsx)(s.default,{src:"/logo.png",alt:"伏Kick Logo",width:100,height:100,className:"header-logo-img"})}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac header-top-bar",children:[(0,a.jsx)(c.default,{href:"/",className:"btn-top",children:"🏠 返回主頁"}),(0,a.jsx)(c.default,{href:"https://docs.google.com/forms/d/1iaRTo26gA1n08lJyXj_o-EK4Sv8BkY16h_lJv1e2NjU/prefill",className:"btn-top",target:"_blank",rel:"noopener noreferrer",children:"📝 我要報料"}),(0,a.jsx)(c.default,{href:"https://docs.google.com/spreadsheets/d/1vNjD8K9lNJh7SXzQkS7L-P02xLrKJSYQ6XfL27_3L7U/edit?usp=sharing",className:"btn-top",target:"_blank",rel:"noopener noreferrer",children:"🔍 瀏覽報料"}),(0,a.jsx)("button",{style:{backgroundColor:"#fff5f5",color:"#b91c1c",fontWeight:600},onClick:()=>window.scrollTo(0,0),className:"jsx-706b0c6ee63146ac btn-top",children:"❓ 常見問題"})]})]})})}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac faq-header",children:[(0,a.jsx)("h1",{className:"jsx-706b0c6ee63146ac faq-title",children:"常見問題"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac faq-subtitle",children:"關於平台使用、報料流程、隱私保護等疑問，都可以搵到答案"}),(0,a.jsx)("div",{className:"jsx-706b0c6ee63146ac faq-search-container",children:(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac faq-search-box",children:[(0,a.jsx)("span",{className:"jsx-706b0c6ee63146ac",children:"🔍"}),(0,a.jsx)("input",{type:"text",id:"faqSearchInput",placeholder:"搜尋問題關鍵字...",value:r,onChange:e=>d(e.target.value),className:"jsx-706b0c6ee63146ac"})]})}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac faq-category-nav",children:[(0,a.jsx)("button",{"data-category":"all",onClick:()=>N("all"),className:`jsx-706b0c6ee63146ac category-nav-btn ${"all"===e?"active":""}`,children:"全部問題"}),(0,a.jsx)("button",{"data-category":"account",onClick:()=>N("account"),className:`jsx-706b0c6ee63146ac category-nav-btn ${"account"===e?"active":""}`,children:"帳戶 / 隱私"}),(0,a.jsx)("button",{"data-category":"report",onClick:()=>N("report"),className:`jsx-706b0c6ee63146ac category-nav-btn ${"report"===e?"active":""}`,children:"報料流程"}),(0,a.jsx)("button",{"data-category":"merchant",onClick:()=>N("merchant"),className:`jsx-706b0c6ee63146ac category-nav-btn ${"merchant"===e?"active":""}`,children:"商戶相關"}),(0,a.jsx)("button",{"data-category":"platform",onClick:()=>N("platform"),className:`jsx-706b0c6ee63146ac category-nav-btn ${"platform"===e?"active":""}`,children:"平台服務"}),(0,a.jsx)("button",{"data-category":"legal",onClick:()=>N("legal"),className:`jsx-706b0c6ee63146ac category-nav-btn ${"legal"===e?"active":""}`,children:"法律責任"})]})]}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac faq-content",children:[r.trim()?(0,a.jsxs)("section",{className:"jsx-706b0c6ee63146ac faq-category-section",children:[(0,a.jsx)("h2",{className:"jsx-706b0c6ee63146ac category-title",children:"🔍 搜尋結果"}),0===x.length&&r.trim()?(0,a.jsxs)("div",{className:"faq-item",children:[(0,a.jsx)("div",{className:"faq-question",children:"沒有找到相關問題"}),(0,a.jsx)("div",{className:"faq-answer show",children:(0,a.jsxs)("div",{className:"faq-answer-content",children:[(0,a.jsxs)("p",{children:["抱歉，沒有找到與「",r,"」相關的問題。"]}),(0,a.jsx)("p",{children:"建議："}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"檢查關鍵字是否拼寫正確"}),(0,a.jsx)("li",{children:"嘗試使用其他相關關鍵字"}),(0,a.jsxs)("li",{children:["或直接",(0,a.jsx)("a",{href:"mailto:contact@fraudkick.hk",children:"聯絡我們"})]})]})]})})]}):x.map(e=>q(e,e.category))]}):(0,a.jsxs)(a.Fragment,{children:[("all"===e||"account"===e)&&(0,a.jsxs)("section",{id:"account-section",className:"jsx-706b0c6ee63146ac faq-category-section",children:[(0,a.jsx)("h2",{className:"jsx-706b0c6ee63146ac category-title",children:"📱 帳戶 / 隱私相關"}),w.account.map(e=>q(e,"account"))]}),("all"===e||"report"===e)&&(0,a.jsxs)("section",{id:"report-section",className:"jsx-706b0c6ee63146ac faq-category-section",children:[(0,a.jsx)("h2",{className:"jsx-706b0c6ee63146ac category-title",children:"📝 報料流程相關"}),w.report.map(e=>q(e,"report")),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac info-box",children:[(0,a.jsx)("strong",{className:"jsx-706b0c6ee63146ac",children:"💡 報料小貼士"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"提交報料時，請準備好相關證據（收據、相片、對話記錄等），並提供清晰的事件經過、日期、金額和商戶資料，這將有助於加快審核過程。"})]})]}),("all"===e||"merchant"===e)&&(0,a.jsxs)("section",{id:"merchant-section",className:"jsx-706b0c6ee63146ac faq-category-section",children:[(0,a.jsx)("h2",{className:"jsx-706b0c6ee63146ac category-title",children:"🏪 商戶相關"}),w.merchant.map(e=>q(e,"merchant")),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac info-box",children:[(0,a.jsx)("strong",{className:"jsx-706b0c6ee63146ac",children:"🏢 給商戶的建議"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"積極回應客戶報料是最好的商譽管理。透過官方回應展示解決問題的誠意，往往能贏回客戶信任。"})]})]}),("all"===e||"platform"===e)&&(0,a.jsxs)("section",{id:"platform-section",className:"jsx-706b0c6ee63146ac faq-category-section",children:[(0,a.jsx)("h2",{className:"jsx-706b0c6ee63146ac category-title",children:"🌐 平台服務相關"}),w.platform.map(e=>q(e,"platform"))]}),("all"===e||"legal"===e)&&(0,a.jsxs)("section",{id:"legal-section",className:"jsx-706b0c6ee63146ac faq-category-section",children:[(0,a.jsx)("h2",{className:"jsx-706b0c6ee63146ac category-title",children:"⚖️ 法律責任相關"}),w.legal.map(e=>q(e,"legal")),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac warning-box",children:[(0,a.jsx)("strong",{className:"jsx-706b0c6ee63146ac",children:"⚠️ 免責聲明"}),(0,a.jsxs)("p",{className:"jsx-706b0c6ee63146ac",children:["伏Kick作為資訊分享平台，不保證報料內容的真實性。用戶應自行判斷，平台對任何因使用資訊而導致的損失概不負責。詳見完整版",(0,a.jsx)("span",{onClick:()=>y("disclaimer"),className:"jsx-706b0c6ee63146ac legal-link",children:"免責聲明"}),"。"]})]})]})]}),(0,a.jsxs)("section",{className:"jsx-706b0c6ee63146ac quick-contact",children:[(0,a.jsx)("h3",{className:"jsx-706b0c6ee63146ac",children:"仲有其他問題？"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"如果FAQ未能解答你的疑問，歡迎直接聯絡我們"}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac contact-methods",children:[(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac contact-method",children:[(0,a.jsx)("h4",{className:"jsx-706b0c6ee63146ac",children:"📧 電郵聯絡"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"contact@fraudkick.hk"}),(0,a.jsx)("p",{style:{fontSize:"0.85em",color:"#6b7280"},className:"jsx-706b0c6ee63146ac",children:"一般查詢：2-3個工作日回覆"})]}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac contact-method",children:[(0,a.jsx)("h4",{className:"jsx-706b0c6ee63146ac",children:"📱 社交媒體"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"Facebook: @FraudKick_HK"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"Instagram: @FraudKick_HK"})]}),(0,a.jsxs)("div",{className:"jsx-706b0c6ee63146ac contact-method",children:[(0,a.jsx)("h4",{className:"jsx-706b0c6ee63146ac",children:"📄 法律文件"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:(0,a.jsx)("span",{onClick:()=>y("privacy"),className:"jsx-706b0c6ee63146ac legal-link",children:"私隱政策"})}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:(0,a.jsx)("span",{onClick:()=>y("terms"),className:"jsx-706b0c6ee63146ac legal-link",children:"使用條款"})}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:(0,a.jsx)("span",{onClick:()=>y("disclaimer"),className:"jsx-706b0c6ee63146ac legal-link",children:"免責聲明"})})]})]}),(0,a.jsx)("p",{style:{marginTop:"20px",fontSize:"0.85em",color:"#6b7280"},className:"jsx-706b0c6ee63146ac",children:"*請勿透過社交媒體提交敏感個人資料"})]})]}),(0,a.jsxs)("footer",{className:"jsx-706b0c6ee63146ac",children:[(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"🛡️ 伏Kick - 香港首個消費資料庫"}),(0,a.jsx)("p",{style:{marginTop:"15px"},className:"jsx-706b0c6ee63146ac",children:"© 2025 伏Kick 版權所有。本網站內容僅供參考，不構成法律建議。"}),(0,a.jsx)("p",{className:"jsx-706b0c6ee63146ac",children:"最後更新: 2025年12月 | 版本: 1.0"})]})]})]})}e.s(["default",()=>n])}]);