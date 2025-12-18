// app/(auth)/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AuthPage() {
  // ===== Form State =====
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // ===== UI State =====
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const router = useRouter();

  // ===== Main Form Handler =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!email || !password) {
      setError('請填寫電郵和密碼');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('密碼不一致');
      return;
    }

    if (!isLogin && !username) {
      setError('請填寫用戶名稱');
      return;
    }

    if (!isLogin && !agreedToTerms) {
      setError('請同意服務條款');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('登入成功！');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('註冊成功！請檢查電郵驗證你的帳戶');
        // Auto-login after signup
        setTimeout(() => {
          setIsLogin(true);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setUsername('');
          setAgreedToTerms(false);
        }, 2000);
      }
    } catch (err: any) {
      console.error('Auth error:', err);

      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('此電郵已被使用，請嘗試登入');
          break;
        case 'auth/invalid-email':
          setError('無效的電郵地址');
          break;
        case 'auth/weak-password':
          setError('密碼強度不足（至少6位字符）');
          break;
        case 'auth/user-not-found':
          setError('帳戶不存在，請先註冊');
          break;
        case 'auth/wrong-password':
          setError('密碼錯誤');
          break;
        default:
          setError('發生錯誤，請稍後再試');
      }
    } finally {
      setLoading(false);
    }
  };

  // ===== Social Login Handler =====
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      let authProvider;
      if (provider === 'google') {
        authProvider = new GoogleAuthProvider();
      } else {
        authProvider = new FacebookAuthProvider();
      }

      await signInWithPopup(auth, authProvider);
      setSuccess('登入成功！');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      console.error('Social login error:', err);
      setError('社交登入失敗，請稍後再試');
    }
  };

  // ===== Reset Password Handler =====
  const handleResetPassword = async () => {
    if (!email) {
      setError('請輸入電郵地址');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('重設密碼電郵已發送，請檢查你的信箱');
    } catch (err: any) {
      setError('發送重設密碼電郵失敗');
    }
  };

  // ===== Scroll to Top Handler =====
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== Back to Top Button Visibility =====
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 20px 12px 32px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Noto Sans HK', 'PingFang HK', sans-serif;
          background: radial-gradient(circle at top, #fefce8 0, #f7fafc 40%, #e5edf5 100%);
          color: #111827;
          -webkit-font-smoothing: antialiased;
          font-size: 15px;
          line-height: 1.6;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Back to Top Button */
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
        }

        /* Header Styles */
        header {
          padding: 8px 0 20px;
        }

        .header-top-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-logo-img {
          border-radius: 18px;
          object-fit: contain;
          cursor: pointer;
        }

        .header-logo-text {
          font-size: 2.1em;
          color: #fb7185;
          font-weight: 800;
          letter-spacing: 0.03em;
          margin: 0;
        }

        .header-top-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .btn-top {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(248, 113, 113, 0.4);
          background-color: #ffffff;
          color: #b91c1c;
          font-size: 0.86em;
          cursor: pointer;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 10px rgba(148, 163, 184, 0.25);
          transition: all 0.2s ease;
        }

        .btn-top:hover {
          background-color: #fff5f5;
          transform: translateY(-1px);
        }

        /* Main Content */
        .auth-wrapper {
          max-width: 500px;
          margin: 40px auto;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-title {
          font-size: 2.5em;
          color: #fb7185;
          margin: 0 0 12px;
          font-weight: 700;
        }

        .auth-subtitle {
          font-size: 1.1em;
          color: #6b7280;
          margin: 0;
        }

        /* Form Card */
        .form-card {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 18px;
          padding: 32px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        }

        /* Tab Switcher */
        .tab-switcher {
          display: flex;
          margin-bottom: 28px;
          border-bottom: 1px solid #e5e7eb;
        }

        .tab-btn {
          flex: 1;
          padding: 14px 0;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #6b7280;
          font-weight: 400;
          font-size: 1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          color: #fb7185;
          font-weight: 600;
          border-bottom-color: #fb7185;
        }

        /* Social Login */
        .social-section {
          margin-bottom: 24px;
        }

        .social-label {
          text-align: center;
          margin-bottom: 16px;
          color: #6b7280;
          font-size: 0.9em;
        }

        .social-buttons {
          display: flex;
          gap: 12px;
        }

        .social-btn {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: white;
          color: #4b5563;
          font-size: 0.9em;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          background: #f9fafb;
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        /* Divider */
        .divider {
          position: relative;
          margin: 24px 0;
          text-align: center;
        }

        .divider-line {
          height: 1px;
          background: #e5e7eb;
        }

        .divider-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 0 16px;
          color: #6b7280;
          font-size: 0.85em;
        }

        /* Form Group */
        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #4b5563;
          font-size: 0.9em;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          font-size: 1em;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #fb7185;
          box-shadow: 0 0 0 3px rgba(251, 113, 133, 0.1);
        }

        /* Password Toggle */
        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 0.9em;
        }

        .password-input {
          padding-right: 50px;
        }

        /* Password Header (with Forgot Password) */
        .password-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .forgot-password-btn {
          background: none;
          border: none;
          color: #fb7185;
          font-size: 0.85em;
          cursor: pointer;
          text-decoration: underline;
        }

        /* Alert Messages */
        .alert {
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 0.9em;
        }

        .alert-error {
          background: #fee2e2;
          color: #b91c1c;
        }

        .alert-success {
          background: #dcfce7;
          color: #166534;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #fb7185, #f97316);
          color: white;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 10px 24px rgba(248, 113, 113, 0.45);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(248, 113, 113, 0.55);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Checkbox */
        .checkbox-group {
          margin-bottom: 24px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #4b5563;
          font-size: 0.9em;
        }

        .checkbox-label input {
          margin-top: 3px;
          cursor: pointer;
        }

        .checkbox-label a {
          color: #fb7185;
          text-decoration: underline;
        }

        /* Tab Toggle */
        .tab-toggle {
          text-align: center;
          margin-top: 24px;
          color: #6b7280;
          font-size: 0.9em;
        }

        .tab-toggle-btn {
          background: none;
          border: none;
          color: #fb7185;
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
        }

        /* Member Benefits */
        .member-benefits {
          margin-top: 32px;
          background: #fff1f2;
          border-radius: 18px;
          padding: 24px;
          text-align: center;
        }

        .benefits-title {
          color: #fb7185;
          margin: 0 0 12px;
          font-size: 1.2em;
        }

        .benefits-list {
          margin: 0;
          padding: 0;
          list-style: none;
          color: #7c2d12;
          font-size: 0.95em;
        }

        .benefits-list li {
          margin-bottom: 8px;
        }

        /* Footer */
        footer {
          text-align: center;
          padding: 18px 8px 4px;
          margin-top: 48px;
          color: #6b7280;
          font-size: 0.8em;
        }

        footer p {
          margin: 3px 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          body {
            padding: 16px 10px 24px;
          }

          .header-top-line {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-top-bar {
            width: 100%;
            justify-content: flex-start;
            flex-wrap: wrap;
          }

          .auth-wrapper {
            margin: 24px auto;
          }

          .form-card {
            padding: 20px;
          }

          .back-to-top-btn {
            width: 45px;
            height: 45px;
            bottom: 20px;
            right: 20px;
            font-size: 20px;
          }
        }
      `}</style>

      {/* Back to Top Button */}
      <button
        className={`back-to-top-btn ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        title="回到頂部"
      >
        ↑
      </button>

      <div className="container">
        {/* Header */}
        <header>
          <div className="header-top-line">
            <div className="header-logo">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="伏Kick Logo"
                  width={60}
                  height={60}
                  className="header-logo-img"
                />
              </Link>
              <span className="header-logo-text">伏Kick</span>
            </div>
            <div className="header-top-bar">
              <Link href="/">
                <button type="button" className="btn-top">
                  返回首頁
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Auth Wrapper */}
        <div className="auth-wrapper">
          {/* Title Section */}
          <div className="auth-header">
            <h1 className="auth-title">{isLogin ? '歡迎回來' : '加入伏Kick'}</h1>
            <p className="auth-subtitle">
              {isLogin ? '登入以管理你的報料和徽章' : '一起守護香港消費者的權益'}
            </p>
          </div>

          {/* Form Card */}
          <div className="form-card">
            {/* Tab Switcher */}
            <div className="tab-switcher">
              <button
                className={`tab-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                登入
              </button>
              <button
                className={`tab-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                註冊
              </button>
            </div>

            {/* Social Login */}
            <div className="social-section">
              <p className="social-label">
                或使用以下方式{isLogin ? '登入' : '註冊'}
              </p>
              <div className="social-buttons">
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => handleSocialLogin('google')}
                >
                  <span>🔍</span> Google
                </button>
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => handleSocialLogin('facebook')}
                >
                  <span>📘</span> Facebook
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">
                或使用電郵{isLogin ? '登入' : '註冊'}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Error Alert */}
              {error && <div className="alert alert-error">⚠️ {error}</div>}

              {/* Success Alert */}
              {success && (
                <div className="alert alert-success">✅ {success}</div>
              )}

              {/* Username (Registration Only) */}
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">用戶名稱 *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="輸入你的用戶名稱"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Email */}
              <div className="form-group">
                <label className="form-label">電郵地址 *</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="password-header">
                  <label className="form-label" style={{ margin: 0 }}>
                    密碼 *
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      className="forgot-password-btn"
                      onClick={handleResetPassword}
                    >
                      忘記密碼？
                    </button>
                  )}
                </div>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input password-input`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      isLogin ? '輸入你的密碼' : '至少6位字符'
                    }
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Registration Only) */}
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">確認密碼 *</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="再次輸入密碼"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Terms Agreement (Registration Only) */}
              {!isLogin && (
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span>
                      我同意{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer">
                        服務條款
                      </a>{' '}
                      及{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer">
                        私隱政策
                      </a>
                      ，並確認已年滿18歲
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span>處理中...</span>
                ) : isLogin ? (
                  <span>登入</span>
                ) : (
                  <span>註冊</span>
                )}
              </button>
            </form>

            {/* Tab Toggle */}
            <div className="tab-toggle">
              {isLogin ? (
                <p>
                  還未成為會員？{' '}
                  <button
                    className="tab-toggle-btn"
                    onClick={() => setIsLogin(false)}
                  >
                    立即註冊
                  </button>
                </p>
              ) : (
                <p>
                  已有帳戶？{' '}
                  <button
                    className="tab-toggle-btn"
                    onClick={() => setIsLogin(true)}
                  >
                    立即登入
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Member Benefits */}
          <div className="member-benefits">
            <h3 className="benefits-title">🎁 成為伏Kick會員福利</h3>
            <ul className="benefits-list">
              <li>✓ 追蹤你的報料進度</li>
              <li>✓ 累積積分換取徽章</li>
              <li>✓ 優先參與社區投票</li>
              <li>✓ 每日幸運輪盤機會</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <p>🛡️ 伏Kick - 香港首個消費資料庫</p>
          <p>隱私優先 | 用戶至上 | 社區驅動</p>
          <p>遵守香港《個人資料（私隱）條例》</p>
        </footer>
      </div>
    </>
  );
}