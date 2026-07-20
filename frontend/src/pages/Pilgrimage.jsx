import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTemples } from "../redux/slices/templeSlice";
import { MapPin, Star } from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
:root{--saffron:#E8820C;--gold:#C9962A;--goldl:#E8B84B;--night:#080612;--night2:#0F0C1E;--ivory:#F5EDD8;--ash:#9E97AA;--mid:#1A1630;--mid2:#120F24;}
*{box-sizing:border-box;}

.pg-page{background:var(--night);min-height:100vh;color:var(--ivory);}

.pg-hero{position:relative;height:68vh;min-height:480px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;}
.pg-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:pgZoom 14s ease-out forwards;}
@keyframes pgZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
.pg-hero-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,6,18,1) 0%,rgba(8,6,18,.6) 50%,rgba(8,6,18,.15) 100%);}
.pg-hero-content{position:relative;z-index:2;padding:0 8vw 8vh;max-width:1400px;margin:0 auto;width:100%;}
.pg-eyebrow{display:flex;align-items:center;gap:16px;margin-bottom:18px;}
.pg-eyebrow-line{width:40px;height:1px;background:var(--gold);}
.pg-eyebrow-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:var(--gold);}
.pg-hero-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(34px,5.5vw,76px);line-height:.95;color:var(--ivory);letter-spacing:-2px;margin-bottom:18px;}
.pg-hero-title em{font-style:italic;color:var(--goldl);font-family:'Crimson Pro',serif;font-weight:300;}
.pg-hero-sub{font-family:'Crimson Pro',serif;font-size:18px;color:rgba(245,237,216,.6);max-width:500px;line-height:1.65;}

.pg-content{max-width:1400px;margin:0 auto;padding:64px 8vw 100px;}
.pg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,150,42,.08);}
.pg-card{background:var(--night);overflow:hidden;cursor:pointer;position:relative;transition:transform .4s;}
.pg-card:hover{transform:translateY(-4px);}
.pg-card-img-wrap{height:240px;overflow:hidden;}
.pg-card-img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.25,.46,.45,.94),filter .4s;filter:saturate(.75) brightness(.88);}
.pg-card:hover .pg-card-img{transform:scale(1.08);filter:saturate(1) brightness(.95);}
.pg-rating{position:absolute;top:14px;right:14px;background:rgba(8,6,18,.82);backdrop-filter:blur(8px);border:1px solid rgba(201,150,42,.3);padding:5px 9px;display:flex;align-items:center;gap:4px;}
.pg-rating-num{font-family:'Cinzel',serif;font-size:10px;font-weight:700;color:var(--gold);}
.pg-card-body{padding:22px;}
.pg-card-loc{font-family:'Inter',sans-serif;font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:5px;margin-bottom:8px;}
.pg-card-name{font-family:'Cinzel',serif;font-size:16px;font-weight:700;color:var(--ivory);margin-bottom:14px;line-height:1.2;}
.pg-card-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px;}
.pg-card-tag{font-family:'Inter',sans-serif;font-size:8px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border:1px solid rgba(201,150,42,.2);color:var(--goldl);background:rgba(201,150,42,.05);}
.pg-card-btn{width:100%;font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;padding:12px;background:transparent;border:1px solid rgba(201,150,42,.15);color:var(--ash);cursor:pointer;transition:background .25s,color .25s,border-color .25s;}
.pg-card-btn:hover{background:var(--gold);color:var(--night);border-color:var(--gold);}

.pg-loading{text-align:center;padding:80px;font-family:'Cinzel',serif;font-size:24px;color:var(--gold);animation:pgPulse 1.4s ease-in-out infinite;}
@keyframes pgPulse{0%,100%{opacity:1}50%{opacity:.3}}
.pg-empty{text-align:center;padding:80px;font-family:'Cinzel',serif;font-size:18px;color:var(--ash);}

@media(max-width:1100px){.pg-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:760px){.pg-grid{grid-template-columns:repeat(2,1fr);}.pg-content,.pg-hero-content{padding-left:24px;padding-right:24px;}}
@media(max-width:480px){.pg-grid{grid-template-columns:1fr;}}
`;

const Pilgrimage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { temples, loading, error, totalPages } = useSelector((s) => s.temple);
  const [page, setPage] = useState(1);

  useEffect(() => { dispatch(fetchTemples({ page, category: "pilgrimage" })); }, [dispatch, page]);

  useEffect(() => {
    const fn = () => {
      const main = document.getElementById("main-content");
      if (!main) return;
      if (window.innerHeight + window.scrollY >= main.offsetTop + main.offsetHeight - 700 && !loading && page < totalPages)
        setPage((p) => p + 1);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [loading, page, totalPages]);

  return (
    <>
      <style>{CSS}</style>
      <div className="pg-page">
        <section className="pg-hero">
          <img className="pg-hero-img" src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/pilgrimage_matipf.jpg" alt="Pilgrimage"/>
          <div className="pg-hero-ov"/>
          <div className="pg-hero-content">
            <div className="pg-eyebrow"><div className="pg-eyebrow-line"/><span className="pg-eyebrow-text">Sacred Destinations</span></div>
            <h1 className="pg-hero-title">Pilgrimage <em>Temples</em></h1>
            <p className="pg-hero-sub">Discover India's most sacred spiritual journeys and divine pilgrimage destinations.</p>
          </div>
        </section>

        <div className="pg-content">
          {loading && <div className="pg-loading">Loading Temples…</div>}
          {error && <p style={{color:"rgba(230,100,100,.8)",textAlign:"center",padding:"40px",fontFamily:"'Inter'"}}>{error}</p>}
          {!loading && temples?.length === 0 && <div className="pg-empty">No pilgrimage temples found.</div>}
          {temples?.length > 0 && (
            <div className="pg-grid">
              {temples.map((temple) => (
                <div key={temple._id} className="pg-card" onClick={() => navigate(`/templeDetails/${temple._id}`)}>
                  <div className="pg-card-img-wrap">
                    <img className="pg-card-img" src={temple.images?.[0]?.url || temple.images?.[0]} alt={temple.templeName}/>
                  </div>
                  {temple.rating && (
                    <div className="pg-rating">
                      <Star size={10} fill="#C9962A" color="#C9962A"/>
                      <span className="pg-rating-num">{temple.rating}</span>
                    </div>
                  )}
                  <div className="pg-card-body">
                    <div className="pg-card-loc"><MapPin size={10}/>{temple.city}</div>
                    <div className="pg-card-name">{temple.templeName}</div>
                    <div className="pg-card-tags">
                      {temple.categories?.slice(0,3).map((c,i) => <span key={i} className="pg-card-tag">{c}</span>)}
                    </div>
                    <button className="pg-card-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pilgrimage;