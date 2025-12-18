"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, message]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setAgreedToTerms(false);
    setShowPassword(false);
  };

  const translateFirebaseError = (code: string | undefined, fallback?: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "此 Email 已註冊，請直接登入。";
      case "auth/invalid-email":
        return "Email 格式好似有問題，請再檢查一次。";
      case "auth/weak-password":
        return "密碼要至少 6 個字元。";
      case "auth/user-not-found":
        return "搵唔到呢個帳戶，請確認 Email。";
      case "auth/wrong-password":
        return "密碼唔正確，請再試一次。";
      case "auth/network-request-failed":
        return "網絡連線有問題，請稍後再試。";
      case "auth/popup-closed-by-user":
        return "未完成第三方登入流程。";
      default:
        return fallback || "系統暫時有啲問題，請稍後再試。";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!isLogin) {
      if (!agreedToTerms) {
        setError("請先勾選同意服務條款及私隱政策，先可以開啟 FraudKick 帳戶。");
        return;
      }
      if (password !== confirmPassword) {
        setError("兩次輸入嘅密碼唔一樣，請再確認。");
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        if (!userSnap.exists()) {
          await setDoc(userDocRef, {
            email: user.email,
            username: user.email?.split("@")[0] || "",
            points: 0,
            createdAt: new Date(),
          });
        }
        setMessage("成功登入，歡迎返嚟 FraudKick。");
        resetForm();
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          username: username || email.split("@")[0],
          email: user.email,
          points: 0,
          createdAt: new Date(),
        });
        setMessage("帳戶已成功建立，可以開始報料同瀏覽平台內容。");
        resetForm();
        setIsLogin(true);
      }
    } catch (err: any) {
      console.error("Auth / Firestore Error", err);
      const code = err?.code as string | undefined;
      const msg = err?.message as string | undefined;
      setError(translateFirebaseError(code, msg));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("請先輸入你想重設密碼嘅 Email。");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("重設密碼電郵已發送，請檢查收件箱。");
    } catch (err: any) {
      console.error("Reset Password Error", err);
      setError(translateFirebaseError(err?.code, err?.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const p = provider === "google" ? new GoogleAuthProvider() : new FacebookAuthProvider();
      const res = await signInWithPopup(auth, p);
      const user = res.user;
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          username: user.displayName || user.email?.split("@")[0] || "",
          email: user.email,
          points: 0,
          createdAt: new Date(),
        });
      }
      setMessage("成功登入，歡迎加入 FraudKick。");
      resetForm();
      setIsLogin(true);
    } catch (err: any) {
      console.error("Social Login Error", err);
      setError(translateFirebaseError(err?.code, err?.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(circle at top, #fefce8 0, #f7fafc 40%, #e5edf5 100%)",
      }}
    >
      {/* Header */}
      <header style={{ padding: "8px 0 20px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              src="/logo.png"
              alt="FraudKick Logo"
              width={100}
              height={100}
              style={{ borderRadius: 18, objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "2.1em",
                color: "#fb7185",
                fontWeight: 800,
                whiteSpace: "nowrap",
                letterSpacing: "0.03em",
              }}
            >
              伏Kick
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>
            <Link
              href="/"
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(248,113,113,0.4)",
                backgroundColor: "#ffffff",
                color: "#b91c1c",
                fontSize: "0.86em",
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(148,163,184,0.25)",
              }}
            >
              返回主頁
            </Link>
            <Link
              href="/faq"
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(248,113,113,0.4)",
                backgroundColor: "#ffffff",
                color: "#b91c1c",
                fontSize: "0.86em",
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(148,163,184,0.25)",
              }}
            >
              FAQ
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 16px 48px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
            gap: 32,
          }}
        >
          {/* Left section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h1 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#fb7185", margin: 0 }}>
              
            </h1>
            <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
              
            </p>
            <ul style={{ paddingLeft: 18, color: "#4b5563", fontSize: "0.95rem" }}>
              <li>分享消費體驗，参考集體評分</li>
              <li>匿名報料，共建香港消費指南。</li>
            </ul>
            <div
              style={{
                marginTop: 24,
                padding: 16,
                borderRadius: 16,
                background: "#fee2e2",
                color: "#b91c1c",
                fontSize: "0.9rem",
              }}
            >
              溫馨提示：平台資料只供參考，正式行動前建議再自行核實或尋求專業意見。
            </div>
          </div>

          {/* Right section */}
          <div
            style={{
              background: "white",
              borderRadius: 24,
              padding: 24,
              boxShadow: "0 18px 45px rgba(248,113,113,0.25)",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: 8,
                color: "#111827",
              }}
            >
               "建立 FraudKick 帳戶"
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: 20 }}>
              {isLogin
                ? "登入之後就可以即時查閱其他用戶報料，亦可以追蹤商戶回應。"
                : "新用戶免費加入，完成註冊後即可開始報料、追蹤個案同收藏你關注嘅商戶。"}
            </p>

            {error && (
              <div
                style={{
                  marginBottom: 16,
                  padding: 12,
                  borderRadius: 12,
                  background: "#fee2e2",
                  color: "#b91c1c",
                  fontSize: "0.88rem",
                }}
              >
                {error}
              </div>
            )}

            {message && (
              <div
                style={{
                  marginBottom: 16,
                  padding: 12,
                  borderRadius: 12,
                  background: "#ecfdf3",
                  color: "#166534",
                  fontSize: "0.88rem",
                }}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 6,
                      fontSize: "0.88rem",
                      color: "#374151",
                    }}
                  >
                    顯示名稱（可改）
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 12,
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                    }}
                    required
                  />
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    fontSize: "0.88rem",
                    color: "#374151",
                  }}
                >
                  電子郵件
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: 20, position: "relative" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    fontSize: "0.88rem",
                    color: "#374151",
                  }}
                >
                  密碼
                  {isLogin && (
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      style={{
                        float: "right",
                        background: "none",
                        border: "none",
                        color: "#fb7185",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      忘記密碼？
                    </button>
                  )}
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 12px",
                    borderRadius: 12,
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 38,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                  }}
                >
                  {showPassword ? "隱藏" : "顯示"}
                </button>
              </div>

              {!isLogin && (
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 6,
                      fontSize: "0.88rem",
                      color: "#374151",
                    }}
                  >
                    再輸入一次密碼
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 12,
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                    }}
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      marginBottom: 12,
                      padding: 12,
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      background: "#f9fafb",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setShowTerms(!showTerms)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#fb7185",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        padding: 0,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {showTerms ? "▼" : "▶"} 查看使用條款及私隱政策
                    </button>
                    
                    {showTerms && (
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
                        <div style={{ marginBottom: 20 }}>
                          <h4 style={{ color: "#111827", marginBottom: 8, fontSize: "1.05rem" }}>
                            使用條款
                          </h4>
                          <ul style={{ color: "#374151", fontSize: "0.85rem", lineHeight: 1.6, paddingLeft: 20, margin: 0 }}>
                            <li>我哋唔會要求真實名字，只需要聯絡方式（電話或Email）用來驗證身份同回覆查詢。</li>
                            <li>最少要俾電話或Email（用於確認身份 + 平台聯絡你），內容會完全匿名（你嘅名字、電話唔會公開）。</li>
                            <li>如果發現報假料：第一次警告 + 凍結帳戶7日；第二次永久禁用帳戶；情節嚴重會考慮報警（誹謗罪）。</li>
                            <li>你提供嘅電話/Email唔會公開顯示，只供平台內部使用。</li>
                            <li>你嘅報料內容會完全匿名顯示（例如「用戶A」）。</li>
                            <li>如果發現任何洩露，我哋會立即通知你。</li>
                            <li>你可以隨時PM平台要求刪除你嘅個人資料。</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 style={{ color: "#111827", marginBottom: 8, fontSize: "1.05rem" }}>
                            私隱政策
                          </h4>
                          <ul style={{ color: "#374151", fontSize: "0.85rem", lineHeight: 1.6, paddingLeft: 20, margin: 0 }}>
                            <li>伏Kick遵守香港《個人資料（私隱）條例》。</li>
                            <li>你提供嘅電話/Email唔會公開顯示，只供平台內部使用。</li>
                            <li>你嘅報料內容會完全匿名顯示（例如「用戶A」）。</li>
                            <li>如果發現任何洩露，我哋會立即通知你。</li>
                            <li>你可以隨時PM平台要求刪除你嘅個人資料。</li>
                            <li>平台主要作為用戶分享個人報料經歷及意見之用途。</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: "0.9rem",
                      color: "#374151",
                      lineHeight: 1.6,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      style={{ marginTop: 3 }}
                    />
                    <span>
                      我已細閱並同意 FraudKick 之使用條款及私隱政策，並明白平台主要作為用戶分享個人報料經歷及意見之用途。
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg,#fb7185,#f97316)",
                  color: "white",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  marginBottom: 12,
                }}
              >
                {loading ? "處理中…" : isLogin ? "登入" : "免費建立帳戶"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 8, marginBottom: 16 }}>
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>或使用以下方式登入：</p>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  background: "white",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "0.9rem",
                }}
              >
                使用 Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  background: "white",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "0.9rem",
                }}
              >
                使用 Facebook
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: 12 }}>
              {isLogin ? (
                <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                  未有帳戶？{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                      setMessage(null);
                      setShowTerms(false);
                      setAgreedToTerms(false);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fb7185",
                      cursor: "pointer",
                    }}
                  >
                    立即註冊
                  </button>
                </p>
              ) : (
                <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                  已經有帳戶？{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError(null);
                      setMessage(null);
                      setShowTerms(false);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fb7185",
                      cursor: "pointer",
                    }}
                  >
                    返回登入
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "18px 8px 4px",
          marginTop: 8,
          color: "#6b7280",
          fontSize: "0.8rem",
        }}
      >
        <p style={{ margin: "3px 0" }}>© 2025 伏Kick FraudKick - 以真實報料互相提醒。</p>
      </footer>

      <style jsx>{`
        @media (max-width: 900px) {
          main > div {
            grid-template-columns: minmax(0, 1fr);
          }
          header > div {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}