import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setCredentials } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
:root{--saffron:#E8820C;--gold:#C9962A;--goldl:#E8B84B;--night:#080612;--night2:#0F0C1E;--ivory:#F5EDD8;--ash:#9E97AA;--mid:#1A1630;--mid2:#120F24;}
*{box-sizing:border-box;}

.auth-page{min-height:100vh;background:var(--night);display:grid;grid-template-columns:1fr 1fr;}
.auth-left{position:relative;overflow:hidden;}
.auth-left-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:authZoom 14s ease-out forwards;}
@keyframes authZoom{from{transform:scale(1.06)}to{transform:scale(1)}}
.auth-left-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,6,18,.92) 0%,rgba(8,6,18,.6) 100%);}
.auth-left-content{position:relative;z-index:2;padding:60px 52px;height:100%;display:flex;flex-direction:column;justify-content:center;}
.auth-left-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:24px;}
.auth-left-eyebrow-line{width:32px;height:1px;background:var(--gold);}
.auth-left-eyebrow-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);}
.auth-left-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(30px,3.5vw,52px);color:var(--ivory);letter-spacing:-1.5px;line-height:1;margin-bottom:20px;}
.auth-left-title em{font-style:italic;color:var(--goldl);font-family:'Crimson Pro',serif;font-weight:300;}
.auth-left-sub{font-family:'Crimson Pro',serif;font-size:17px;color:rgba(245,237,216,.55);line-height:1.7;margin-bottom:40px;}
.auth-left-stats{display:flex;flex-direction:column;gap:20px;padding-top:32px;border-top:1px solid rgba(201,150,42,.1);}
.auth-left-stat-num{font-family:'Cinzel',serif;font-size:28px;font-weight:900;color:var(--ivory);}
.auth-left-stat-num span{color:var(--gold);}
.auth-left-stat-label{font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ash);margin-top:3px;}

.auth-right{display:flex;align-items:center;justify-content:center;padding:60px 52px;border-left:1px solid rgba(201,150,42,.08);}
.auth-form-wrap{width:100%;max-width:400px;}
.auth-form-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(24px,2.5vw,36px);color:var(--ivory);letter-spacing:-1px;margin-bottom:8px;}
.auth-form-sub{font-family:'Crimson Pro',serif;font-size:16px;color:var(--ash);margin-bottom:36px;}
.auth-field{margin-bottom:18px;}
.auth-field-label{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--ash);display:block;margin-bottom:8px;}
.auth-field-input{width:100%;background:var(--mid2);border:1px solid rgba(201,150,42,.12);outline:none;font-family:'Crimson Pro',serif;font-size:17px;color:var(--ivory);padding:14px 16px;transition:border-color .25s;}
.auth-field-input::placeholder{color:rgba(158,151,170,.4);}
.auth-field-input:focus{border-color:rgba(201,150,42,.4);}
.auth-forgot{text-align:right;margin-top:-8px;margin-bottom:20px;}
.auth-forgot a{font-family:'Inter',sans-serif;font-size:12px;color:var(--ash);text-decoration:none;transition:color .2s;}
.auth-forgot a:hover{color:var(--goldl);}
.auth-submit{width:100%;font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:16px;background:var(--saffron);border:none;color:#fff;cursor:pointer;transition:background .25s,transform .2s;margin-bottom:28px;}
.auth-submit:hover{background:#cf730a;transform:translateY(-1px);}
.auth-submit:disabled{background:rgba(158,151,170,.2);color:var(--ash);cursor:not-allowed;transform:none;}
.auth-divider{display:flex;align-items:center;gap:16px;margin-bottom:24px;}
.auth-divider-line{flex:1;height:1px;background:rgba(201,150,42,.1);}
.auth-divider-text{font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(158,151,170,.45);}
.auth-google{display:flex;justify-content:center;margin-bottom:28px;}
.auth-footer{font-family:'Inter',sans-serif;font-size:12px;color:rgba(158,151,170,.6);text-align:center;}
.auth-footer a{color:var(--goldl);text-decoration:none;font-weight:600;transition:color .2s;}
.auth-footer a:hover{color:var(--ivory);}

@media(max-width:768px){
  .auth-page{grid-template-columns:1fr;}
  .auth-left{display:none;}
  .auth-right{padding:40px 24px;}
}
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((s) => s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => { e.preventDefault(); dispatch(loginUser({ email, password })); };

  useEffect(() => { if (userInfo) { toast.success("Login Successful 🎉"); navigate("/"); } }, [userInfo, navigate]);
  useEffect(() => { if (error) toast.error(error); }, [error]);

  return (
    <>
      <style>{CSS}</style>
      <div className="auth-page">
        {/* LEFT */}
        <div className="auth-left">
          <img className="auth-left-img" src="https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200&auto=format&fit=crop" alt="Temple"/>
          <div className="auth-left-ov"/>
          <div className="auth-left-content">
            <div className="auth-left-eyebrow"><div className="auth-left-eyebrow-line"/><span className="auth-left-eyebrow-text">Sacred Heritage</span></div>
            <h2 className="auth-left-title">Welcome <em>Back</em></h2>
            <p className="auth-left-sub">Continue your spiritual journey across India's most sacred temples and pilgrimage destinations.</p>
            <div className="auth-left-stats">
              <div><div className="auth-left-stat-num">500<span>+</span></div><div className="auth-left-stat-label">Temples Listed</div></div>
              <div><div className="auth-left-stat-num">12</div><div className="auth-left-stat-label">Pilgrimage Circuits</div></div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <h1 className="auth-form-title">Sign In</h1>
            <p className="auth-form-sub">Access your account to continue</p>

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-field-label">Email Address</label>
                <input className="auth-field-input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="auth-field">
                <label className="auth-field-label">Password</label>
                <input className="auth-field-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className="auth-forgot">
                <span style={{cursor:"pointer"}} onClick={() => navigate("/otp-generate")}>
                  <a>Forgot password?</a>
                </span>
              </div>
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Signing In…" : "Sign In"}
              </button>
            </form>

            <div className="auth-divider"><div className="auth-divider-line"/><span className="auth-divider-text">Or continue with</span><div className="auth-divider-line"/></div>
            <div className="auth-google">
              <GoogleLogin
                onSuccess={async (cr) => {
                  try {
                    const res = await fetch("https://india-temple-heritage-pilgrimage.onrender.com/api/users/google", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({token:cr.credential}) });
                    const data = await res.json();
                    if (!res.ok) { toast.error(data.message || "Google Login Failed"); return; }
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    dispatch(setCredentials(data));
                    toast.success("Login Successful 🎉");
                    navigate("/");
                  } catch { toast.error("Something went wrong"); }
                }}
                onError={() => toast.error("Google Login Failed")}
              />
            </div>
            <p className="auth-footer">Don't have an account? <Link to="/register">Create one</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;