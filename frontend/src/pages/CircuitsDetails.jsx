import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, ArrowRight, Star, Landmark, Mountain } from "lucide-react";
import { fetchTemples } from "../redux/slices/templeSlice";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
:root{--saffron:#E8820C;--gold:#C9962A;--goldl:#E8B84B;--night:#080612;--night2:#0F0C1E;--ivory:#F5EDD8;--ash:#9E97AA;--mid:#1A1630;--mid2:#120F24;}

.cd-page{background:var(--night);min-height:100vh;color:var(--ivory);}

.cd-hero{position:relative;height:50vh;min-height:400px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;}
.cd-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:cdZoom 14s ease-out forwards;}
@keyframes cdZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
.cd-hero-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,6,18,1) 0%,rgba(8,6,18,.6) 50%,rgba(8,6,18,.15) 100%);}
.cd-hero-content{position:relative;z-index:2;padding:0 8vw 7vh;max-width:1400px;margin:0 auto;width:100%;}
.cd-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.cd-eyebrow-line{width:36px;height:1px;background:var(--gold);}
.cd-eyebrow-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);}
.cd-hero-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(30px,5vw,68px);color:var(--ivory);letter-spacing:-1.5px;margin-bottom:16px;line-height:.95;}
.cd-hero-sub{font-family:'Crimson Pro',serif;font-size:17px;color:rgba(245,237,216,.55);max-width:500px;line-height:1.65;}

.cd-main{max-width:1400px;margin:0 auto;padding:80px 8vw 100px;}

.cd-state-loading{text-align:center;padding:80px;font-family:'Cinzel',serif;font-size:24px;color:var(--gold);animation:cdPulse 1.4s ease-in-out infinite;}
@keyframes cdPulse{0%,100%{opacity:1}50%{opacity:.3}}
.cd-state-error{border:1px solid rgba(220,60,60,.3);padding:24px;font-family:'Inter',sans-serif;font-size:14px;color:rgba(230,100,100,.9);text-align:center;}
.cd-state-empty{border:1px solid rgba(201,150,42,.1);padding:60px;text-align:center;}
.cd-state-empty-icon{color:rgba(201,150,42,.3);margin-bottom:20px;}
.cd-state-empty-title{font-family:'Cinzel',serif;font-size:22px;color:var(--ivory);margin-bottom:8px;}
.cd-state-empty-sub{font-family:'Crimson Pro',serif;font-size:16px;color:var(--ash);}

.cd-section-header{margin-bottom:52px;}
.cd-section-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
.cd-section-eyebrow-line{width:28px;height:1px;background:var(--gold);}
.cd-section-eyebrow-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);}
.cd-section-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(26px,3vw,44px);color:var(--ivory);letter-spacing:-1px;line-height:1.05;}

.cd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(201,150,42,.08);}
.cd-card{background:var(--night);overflow:hidden;cursor:pointer;transition:transform .4s;}
.cd-card:hover{transform:translateY(-4px);}
.cd-card-img-wrap{height:280px;overflow:hidden;position:relative;}
.cd-card-img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.25,.46,.45,.94),filter .4s;filter:saturate(.75) brightness(.88);}
.cd-card:hover .cd-card-img{transform:scale(1.08);filter:saturate(1) brightness(.95);}
.cd-card-badge{position:absolute;top:16px;left:16px;font-family:'Cinzel',serif;font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;background:var(--saffron);color:#fff;padding:5px 12px;}
.cd-card-rating{position:absolute;top:16px;right:16px;background:rgba(8,6,18,.8);backdrop-filter:blur(8px);border:1px solid rgba(201,150,42,.3);padding:5px 10px;display:flex;align-items:center;gap:5px;}
.cd-card-rating-num{font-family:'Cinzel',serif;font-size:11px;font-weight:700;color:var(--gold);}
.cd-card-body{padding:24px;}
.cd-card-loc{font-family:'Inter',sans-serif;font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:5px;margin-bottom:10px;}
.cd-card-name{font-family:'Cinzel',serif;font-size:19px;font-weight:700;color:var(--ivory);line-height:1.15;margin-bottom:10px;}
.cd-card-history{font-family:'Crimson Pro',serif;font-size:14px;color:rgba(245,237,216,.45);line-height:1.6;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.cd-card-meta{display:flex;flex-direction:column;gap:7px;margin-bottom:20px;padding-top:16px;border-top:1px solid rgba(201,150,42,.08);}
.cd-card-meta-item{font-family:'Inter',sans-serif;font-size:11px;color:var(--ash);display:flex;align-items:center;gap:7px;letter-spacing:.3px;}
.cd-card-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:20px;}
.cd-card-tag{font-family:'Inter',sans-serif;font-size:8px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border:1px solid rgba(201,150,42,.2);color:var(--goldl);background:rgba(201,150,42,.05);}
.cd-card-btn{width:100%;font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;padding:13px;background:transparent;border:1px solid rgba(201,150,42,.2);color:var(--ash);cursor:pointer;transition:background .25s,color .25s,border-color .25s;display:flex;align-items:center;justify-content:center;gap:8px;}
.cd-card-btn:hover{background:var(--gold);color:var(--night);border-color:var(--gold);}

@media(max-width:900px){.cd-grid{grid-template-columns:1fr 1fr;}.cd-main,.cd-hero-content{padding-left:24px;padding-right:24px;}}
@media(max-width:580px){.cd-grid{grid-template-columns:1fr;}.cd-hero{height:45vh;}}
`;

const CircuitsDetails = () => {
  const { pilgrimage } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { temples = [], loading, error } = useSelector((s) => s.temple);

  useEffect(() => { dispatch(fetchTemples({ page: 1, keyword: pilgrimage })); }, [dispatch, pilgrimage]);

  return (
    <>
      <style>{CSS}</style>
      <div className="cd-page">
        <section className="cd-hero">
          <img className="cd-hero-img" src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/pilgrimage_matipf.jpg" alt="Pilgrimage"/>
          <div className="cd-hero-ov"/>
          <div className="cd-hero-content">
            <div className="cd-eyebrow"><div className="cd-eyebrow-line"/><span className="cd-eyebrow-text">Sacred Pilgrimage Circuit</span></div>
            <h1 className="cd-hero-title">{decodeURIComponent(pilgrimage)}</h1>
            <p className="cd-hero-sub">Explore divine temples, spiritual destinations, and sacred heritage connected with this pilgrimage circuit.</p>
          </div>
        </section>

        <div className="cd-main">
          {loading && <div className="cd-state-loading">Loading Temples…</div>}
          {error && <div className="cd-state-error">{error}</div>}
          {!loading && temples?.length === 0 && (
            <div className="cd-state-empty">
              <Landmark size={60} className="cd-state-empty-icon"/>
              <div className="cd-state-empty-title">No Temples Found</div>
              <div className="cd-state-empty-sub">No temples are available for this pilgrimage circuit.</div>
            </div>
          )}
          {!loading && temples?.length > 0 && (
            <>
              <div className="cd-section-header">
                <div className="cd-section-eyebrow"><div className="cd-section-eyebrow-line"/><span className="cd-section-eyebrow-text">Divine Destinations</span></div>
                <h2 className="cd-section-title">Temples in {decodeURIComponent(pilgrimage)}</h2>
              </div>
              <div className="cd-grid">
                {temples.map((temple) => (
                  <div key={temple._id} className="cd-card">
                    <div className="cd-card-img-wrap">
                      <img className="cd-card-img" src={temple?.images?.[0]} alt={temple.templeName}/>
                      <div className="cd-card-badge">Sacred Temple</div>
                      <div className="cd-card-rating">
                        <Star size={10} fill="#C9962A" color="#C9962A"/>
                        <span className="cd-card-rating-num">{temple.rating || 4.5}</span>
                      </div>
                    </div>
                    <div className="cd-card-body">
                      <div className="cd-card-loc"><MapPin size={10}/>{temple.city}, {temple.state}</div>
                      <div className="cd-card-name">{temple.templeName}</div>
                      <div className="cd-card-history">{temple.history}</div>
                      <div className="cd-card-meta">
                        <div className="cd-card-meta-item"><Landmark size={11}/>{temple.deity}</div>
                        <div className="cd-card-meta-item"><Mountain size={11}/>{temple.architectureStyle || "Ancient Architecture"}</div>
                      </div>
                      <div className="cd-card-tags">
                        {temple.categories?.slice(0,4).map((c,i)=><span key={i} className="cd-card-tag">{c}</span>)}
                      </div>
                      <button className="cd-card-btn" onClick={() => navigate(`/templeDetails/${temple._id}`)}>
                        Explore Temple <ArrowRight size={11}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CircuitsDetails;