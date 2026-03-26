"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProfileForm } from "@/types/ProfileForm";
// ── icons ──────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="1" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="12" r="0.8" fill="currentColor" />
  </svg>
);
const IconLink = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
    <path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconLock = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="8" cy="11" r="1" fill="currentColor" />
  </svg>
);
const IconEye = ({ open }: { open: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
    {!open && <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />}
  </svg>
);
const IconCamera = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="5" width="16" height="12" rx="2.5" stroke="white" strokeWidth="1.5" />
    <circle cx="10" cy="11" r="3" stroke="white" strokeWidth="1.5" />
    <path d="M7 5l1.5-2h3L13 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconBack = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── constants ──────────────────────────────────────────────────────────────
const ACCENT      = "rgb(199,242,167)";
const ACCENT_DARK = "#2e5c10";
const ACCENT_MID  = "rgb(160,220,120)";

// ── strength ───────────────────────────────────────────────────────────────
function getStrength(val: string) {
  let s = 0;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  const data = [
    { label: "Enter a new password", color: "transparent" },
    { label: "Too weak",             color: "#f09595"           },
    { label: "Getting there",        color: "#EF9F27"           },
    { label: "Pretty good",          color: "rgb(149,196,89)"   },
    { label: "Strong",               color: "rgb(63,109,17)"    },
  ];
  return { score: s, pct: s * 25, ...data[s] };
}

// ── floating label input ───────────────────────────────────────────────────
interface FloatInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  rightSlot?: React.ReactNode;
  autoComplete?: string;
}

function FloatInput({ label, id, type = "text", value, onChange, icon, rightSlot, autoComplete }: FloatInputProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div style={{
      position: "relative",
      border: `1.5px solid ${focused ? "rgb(130,200,80)" : "rgba(0,0,0,0.08)"}`,
      borderRadius: 12,
      background: focused ? "#fff" : "#fafaf8",
      transition: "border-color 0.18s, background 0.18s, transform 0.12s",
      transform: focused ? "scale(1.012)" : "scale(1)",
    }}>
      <span style={{
        position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
        color: focused ? "rgb(90,160,40)" : "#bbb",
        display: "flex", transition: "color 0.18s", pointerEvents: "none",
      }}>
        {icon}
      </span>

      <label htmlFor={id} style={{
        position: "absolute", left: 36,
        top: floated ? 6 : "50%",
        transform: floated ? "none" : "translateY(-50%)",
        fontSize: floated ? 10 : 13,
        fontWeight: floated ? 700 : 500,
        letterSpacing: floated ? "0.06em" : "normal",
        textTransform: floated ? "uppercase" : "none",
        color: focused ? "rgb(90,160,40)" : "#bbb",
        transition: "all 0.18s cubic-bezier(.22,1,.36,1)",
        pointerEvents: "none",
        fontFamily: "'Quicksand', sans-serif",
      }}>
        {label}
      </label>

      <input
        id={id} type={type} value={value} autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", height: 50,
          paddingTop: floated ? 18 : 0, paddingBottom: floated ? 4 : 0,
          paddingLeft: 36, paddingRight: rightSlot ? 40 : 12,
          border: "none", background: "transparent", outline: "none",
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 14, fontWeight: 500, color: "#1a1a1a", borderRadius: 12,
        }}
      />
      {rightSlot && (
        <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
          {rightSlot}
        </span>
      )}
    </div>
  );
}

function PasswordInput({ label, id, value, onChange }: { label: string; id: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <FloatInput
      label={label} id={id} type={show ? "text" : "password"}
      value={value} onChange={onChange}
      autoComplete={id === "currentPass" ? "current-password" : "new-password"}
      icon={<IconLock />}
      rightSlot={
        <button type="button" onClick={() => setShow(p => !p)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: show ? "rgb(80,160,40)" : "#ccc",
          display: "flex", alignItems: "center", padding: 2, transition: "color 0.15s",
        }}>
          <IconEye open={show} />
        </button>
      }
    />
  );
}

// ── main ───────────────────────────────────────────────────────────────────
export default function EditProfile({
  userName  = "Sarah Johnson",
  userEmail = "sarah@email.com",
  userImage = "",
  userRole  = "User",
}: {
  userName?:  string;
  userEmail?: string;
  userImage?: string;
  userRole?:  string;
}) {
  const router  = useRouter();
  const [tab, setTab]   = useState<"info" | "pass">("info");
  const [form, setForm] = useState<ProfileForm>({
    firstName:   userName.split(" ")[0] ?? "",
    lastName:    userName.split(" ").slice(1).join(" ") ?? "",
    email:       userEmail,
    phone:       "",
    imageUrl:    userImage,
    newPassword: "",
  });
  const [currentPass, setCurrentPass] = useState("");
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [wiggle,  setWiggle]  = useState(false);

  const set = (k: keyof ProfileForm) => (v: string) => setForm(p => ({ ...p, [k]: v }));
  const displayName = `${form.firstName} ${form.lastName}`.trim() || "Your Name";
  const strength    = getStrength(form.newPassword);
  const initials    = displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  async function handleSave() {
    setSaving(true);
    // 👇 replace with your real API call
    await new Promise(r => setTimeout(r, 1100));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2800);
  }

  function handleCancel() {
    setForm({
      firstName:   userName.split(" ")[0] ?? "",
      lastName:    userName.split(" ").slice(1).join(" ") ?? "",
      email:       userEmail,
      phone:       "",
      imageUrl:    userImage,
      newPassword: "",
    });
    setCurrentPass("");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
        .ep * { font-family: 'Quicksand', sans-serif; box-sizing: border-box; }

        .ep-card { animation: epUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        .ep-card:nth-child(2) { animation-delay: 0.06s; }
        .ep-card:nth-child(3) { animation-delay: 0.12s; }
        @keyframes epUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ep-avatar-inner:hover .ep-cam { opacity: 1 !important; }
        .ep-avatar-ring.wiggle { animation: epWiggle 0.4s ease; }
        @keyframes epWiggle {
          0%  { transform: translateX(-50%) rotate(0) scale(1); }
          30% { transform: translateX(-50%) rotate(-8deg) scale(1.08); }
          65% { transform: translateX(-50%) rotate(5deg) scale(1.05); }
          100%{ transform: translateX(-50%) rotate(0) scale(1); }
        }

        .ep-tab { transition: background 0.18s, color 0.18s; cursor: pointer; }
        .ep-panel { animation: epFade 0.25s ease both; }
        @keyframes epFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ep-back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.08); background: #fff;
          font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 600;
          color: #888; cursor: pointer;
          transition: border-color 0.18s, color 0.18s, transform 0.1s;
          margin-bottom: 1.2rem;
        }
        .ep-back-btn:hover { border-color: ${ACCENT_MID}; color: ${ACCENT_DARK}; transform: translateX(-2px); }

        .ep-settings-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 11px 0; border-bottom: 1px solid rgba(0,0,0,0.05);
          cursor: pointer; transition: transform 0.15s;
        }
        .ep-settings-row:last-of-type { border-bottom: none; }
        .ep-settings-row:hover { transform: translateX(3px); }

        .ep-btn-save { transition: opacity 0.15s, transform 0.1s; }
        .ep-btn-save:hover:not(:disabled) { opacity: 0.88; }
        .ep-btn-save:active:not(:disabled) { transform: scale(0.97); }
        .ep-btn-cancel { transition: background 0.15s, transform 0.1s; }
        .ep-btn-cancel:hover { background: #f0f5ea !important; }
        .ep-btn-cancel:active { transform: scale(0.97); }

        .ep-toast { animation: epToast 0.3s cubic-bezier(.22,1,.36,1); }
        @keyframes epToast {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        .ep-bar { transition: width 0.35s ease, background 0.35s ease; }

        @media (max-width: 768px) {
          .ep-layout { flex-direction: column !important; }
          .ep-sidebar { width: 100% !important; }
        }
      `}</style>

      <div className="ep" style={{ minHeight: "100vh", background: "#f7f8f5", padding: "2rem 1.5rem" }}>

        {/* back button */}
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <button className="ep-back-btn" onClick={() => router.back()}>
            <IconBack /> Back to profile
          </button>
        </div>

        <div
          className="ep-layout"
          style={{ display: "flex", gap: "1.5rem", maxWidth: 960, margin: "0 auto", alignItems: "flex-start" }}
        >

          {/* ── sidebar ── */}
          <div className="ep-sidebar" style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* profile preview card */}
            <div
              className="ep-card"
              style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden", textAlign: "center" }}
            >
              {/* green hero strip */}
              <div style={{ height: 64, background: ACCENT, position: "relative" }}>
                <svg viewBox="0 0 240 64" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <path d="M0 0h240v44 Q180 70 120 58 Q60 46 0 62Z" fill={ACCENT} />
                  <path d="M0 0h240v32 Q170 58 120 48 Q60 38 0 52Z" fill="rgba(160,220,120,0.4)" />
                </svg>

                {/* avatar */}
                <div
                  className={`ep-avatar-ring${wiggle ? " wiggle" : ""}`}
                  style={{
                    position: "absolute", bottom: -28, left: "50%",
                    transform: "translateX(-50%)",
                    width: 64, height: 64, borderRadius: "50%", padding: 3,
                    background: ACCENT, boxShadow: "0 3px 14px rgba(100,180,60,.22)",
                  }}
                >
                  <div
                    className="ep-avatar-inner"
                    onClick={() => { setWiggle(true); setTimeout(() => setWiggle(false), 420); }}
                    style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#e8553a", cursor: "pointer", position: "relative", overflow: "hidden" }}
                  >
                    {form.imageUrl ? (
                      <Image src={form.imageUrl} alt="avatar" width={58} height={58} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>
                        {initials}
                      </div>
                    )}
                    <div className="ep-cam" style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      background: "rgba(0,0,0,0.35)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: "opacity 0.2s",
                    }}>
                      <IconCamera />
                    </div>
                  </div>
                </div>
              </div>

              {/* name preview — updates live */}
              <div style={{ padding: "36px 1.2rem 1.4rem" }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{displayName}</p>
                <p style={{ fontSize: 12, color: "#aaa", fontWeight: 500, margin: "3px 0 10px" }}>{form.email || userEmail}</p>
                <span style={{
                  display: "inline-block", padding: "3px 12px", borderRadius: 20,
                  background: ACCENT, color: ACCENT_DARK,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                }}>
                  {userRole}
                </span>
              </div>
            </div>

            {/* tips card */}
            <div
              className="ep-card"
              style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", padding: "1.2rem" }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT_DARK, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Tips
              </p>
              {[
                "Your name is visible to vets",
                "Use a real email for reminders",
                "Strong password = safer account",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT_MID, flexShrink: 0, marginTop: 5 }} />
                  <p style={{ fontSize: 12, color: "#888", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── main content ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* personal info card */}
            <div
              className="ep-card"
              style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", padding: "1.4rem 1.6rem" }}
            >
              {/* tabs */}
              <div style={{ display: "flex", gap: 4, background: "#f0f4ec", borderRadius: 12, padding: 4, marginBottom: "1.4rem" }}>
                {(["info", "pass"] as const).map(t => (
                  <button key={t} className="ep-tab" onClick={() => setTab(t)} style={{
                    flex: 1, padding: "7px 0", border: "none",
                    background: tab === t ? "#fff" : "transparent",
                    color: tab === t ? ACCENT_DARK : "#999",
                    fontFamily: "'Quicksand', sans-serif", fontSize: 13, fontWeight: 600,
                    borderRadius: 9, boxShadow: tab === t ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                  }}>
                    {t === "info" ? "Personal info" : "Password"}
                  </button>
                ))}
              </div>

              {/* panel: info */}
              {tab === "info" && (
                <div className="ep-panel" style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <FloatInput label="First name" id="firstName" value={form.firstName} onChange={set("firstName")} icon={<IconUser />} />
                    <FloatInput label="Last name"  id="lastName"  value={form.lastName}  onChange={set("lastName")}  icon={<IconUser />} />
                  </div>
                  <FloatInput label="Email address"    id="email"    type="email" value={form.email}    onChange={set("email")}    icon={<IconMail />}  autoComplete="email" />
                  <FloatInput label="Phone"            id="phone"    type="tel"   value={form.phone}    onChange={set("phone")}    icon={<IconPhone />} autoComplete="tel"   />
                  <FloatInput label="Profile image URL" id="imageUrl" type="url"  value={form.imageUrl} onChange={set("imageUrl")} icon={<IconLink />}  />
                </div>
              )}

              {/* panel: password */}
              {tab === "pass" && (
                <div className="ep-panel" style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  <PasswordInput label="Current password" id="currentPass" value={currentPass}       onChange={setCurrentPass}   />
                  <PasswordInput label="New password"     id="newPassword" value={form.newPassword}  onChange={set("newPassword")} />
                  <div style={{ marginTop: -4 }}>
                    <div style={{ height: 3, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
                      <div className="ep-bar" style={{ height: "100%", borderRadius: 2, width: `${strength.pct}%`, background: strength.color }} />
                    </div>
                    <p style={{ fontSize: 11, color: strength.score >= 3 ? "rgb(60,110,17)" : "#bbb", marginTop: 4, fontWeight: 500, transition: "color 0.3s" }}>
                      {strength.label}
                    </p>
                  </div>
                </div>
              )}

              {/* actions */}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button className="ep-btn-cancel" type="button" onClick={handleCancel} style={{
                  flex: 1, height: 42, borderRadius: 12,
                  border: "1.5px solid rgba(0,0,0,0.08)", background: "#fff",
                  fontFamily: "'Quicksand', sans-serif", fontSize: 14, fontWeight: 600,
                  color: "#999", cursor: "pointer",
                }}>
                  Cancel
                </button>
                <button className="ep-btn-save" type="button" onClick={handleSave} disabled={saving} style={{
                  flex: 2, height: 42, borderRadius: 12, border: "none",
                  background: ACCENT, fontFamily: "'Quicksand', sans-serif",
                  fontSize: 14, fontWeight: 700, color: ACCENT_DARK,
                  cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1,
                }}>
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>

              {saved && (
                <div className="ep-toast" style={{
                  marginTop: 10, padding: "11px 14px", borderRadius: 12,
                  background: ACCENT, color: ACCENT_DARK,
                  fontSize: 13, fontWeight: 600, textAlign: "center",
                }}>
                  ✓ Profile updated!
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}