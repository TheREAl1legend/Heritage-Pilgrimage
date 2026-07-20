import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemples } from "../redux/slices/templeSlice";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, ArrowRight, Pencil } from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
:root{--saffron:#E8820C;--gold:#C9962A;--goldl:#E8B84B;--night:#080612;--night2:#0F0C1E;--ivory:#F5EDD8;--ash:#9E97AA;--mid:#1A1630;--mid2:#120F24;}
*{box-sizing:border-box;}

.tl-page{background:var(--night);min-height:100vh;color:var(--ivory);}

/* PAGE HEADER */
.tl-header{padding:72px 8vw 0;max-width:1400px;margin:0 auto;}
.tl-header-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.tl-header-eyebrow-line{width:32px;height:1px;background:var(--gold);}
.tl-header-eyebrow-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);}
.tl-header-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(32px,5vw,68px);color:var(--ivory);letter-spacing:-2px;line-height:.95;margin-bottom:16px;}
.tl-header-title em{font-style:italic;color:var(--goldl);font-family:'Crimson Pro',serif;font-weight:300;}
.tl-header-sub{font-family:'Crimson Pro',serif;font-size:18px;color:rgba(245,237,216,.5);max-width:480px;line-height:1.65;margin-bottom:48px;}

/* SEARCH */
.tl-search-bar{border:1px solid rgba(201,150,42,.15);background:var(--mid2);display:flex;align-items:center;gap:14px;padding:0 20px;margin-bottom:56px;}
.tl-search-icon{color:var(--gold);flex-shrink:0;}
.tl-search-input{flex:1;background:transparent;border:none;outline:none;font-family:'Crimson Pro',serif;font-size:18px;color:var(--ivory);padding:16px 0;}
.tl-search-input::placeholder{color:rgba(158,151,170,.45);}

/* GRID */
.tl-main{max-width:1400px;margin:0 auto;padding:0 8vw 100px;}
.tl-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,150,42,.08);}
.tl-card{background:var(--night);overflow:hidden;cursor:pointer;transition:transform .4s;}
.tl-card:hover{transform:translateY(-4px);}
.tl-card-img-wrap{height:220px;overflow:hidden;position:relative;}
.tl-card-img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.25,.46,.45,.94),filter .4s;filter:saturate(.75) brightness(.88);}
.tl-card:hover .tl-card-img{transform:scale(1.08);filter:saturate(1) brightness(.95);}
.tl-card-rating{position:absolute;top:12px;right:12px;background:rgba(8,6,18,.82);backdrop-filter:blur(8px);border:1px solid rgba(201,150,42,.3);padding:4px 9px;display:flex;align-items:center;gap:4px;}
.tl-card-rating-num{font-family:'Cinzel',serif;font-size:10px;font-weight:700;color:var(--gold);}
.tl-card-body{padding:20px;}
.tl-card-loc{font-family:'Inter',sans-serif;font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:5px;margin-bottom:8px;}
.tl-card-name{font-family:'Cinzel',serif;font-size:16px;font-weight:700;color:var(--ivory);line-height:1.2;margin-bottom:12px;}
.tl-card-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:16px;}
.tl-card-tag{font-family:'Inter',sans-serif;font-size:8px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:3px 8px;border:1px solid rgba(201,150,42,.18);color:var(--goldl);background:rgba(201,150,42,.05);}
.tl-card-actions{display:flex;flex-direction:column;gap:6px;}
.tl-card-btn{width:100%;font-family:'Cinzel',serif;font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:11px;background:transparent;border:1px solid rgba(201,150,42,.18);color:var(--ash);cursor:pointer;transition:background .25s,color .25s,border-color .25s;display:flex;align-items:center;justify-content:center;gap:6px;}
.tl-card-btn:hover{background:var(--gold);color:var(--night);border-color:var(--gold);}
.tl-card-btn.edit{border-color:rgba(100,150,220,.2);color:rgba(120,170,255,.7);}
.tl-card-btn.edit:hover{background:rgba(100,150,220,.15);color:rgba(160,200,255,.9);border-color:rgba(100,150,220,.5);}

/* STATES */
.tl-loading{text-align:center;padding:80px;font-family:'Cinzel',serif;font-size:24px;color:var(--gold);animation:tlPulse 1.4s ease-in-out infinite;}
@keyframes tlPulse{0%,100%{opacity:1}50%{opacity:.3}}
.tl-empty{text-align:center;padding:80px;font-family:'Cinzel',serif;font-size:18px;color:var(--ash);}

@media(max-width:1100px){.tl-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:760px){.tl-grid{grid-template-columns:repeat(2,1fr);}.tl-header,.tl-main{padding-left:24px;padding-right:24px;}}
@media(max-width:480px){.tl-grid{grid-template-columns:1fr;}}
`;

const Temples = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { temples, loading, error, totalPages } = useSelector((s) => s.temple);
  const { userInfo } = useSelector((s) => s.auth);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { dispatch(fetchTemples({ page, keyword: search })); }, [dispatch, page, search]);
  useEffect(() => { setPage(1); }, [search]);
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
      <div className="tl-page">
        <div className="tl-header">
          <div className="tl-header-eyebrow"><div className="tl-header-eyebrow-line"/><span className="tl-header-eyebrow-text">Sacred Destinations</span></div>
          <h1 className="tl-header-title">Explore <em>Temples</em></h1>
          <p className="tl-header-sub">Discover famous temples across India — search by name, city, or state.</p>
          <div className="tl-search-bar">
            <Search size={20} className="tl-search-icon"/>
            <input className="tl-search-input" placeholder="Search temple, city or state…" value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
        </div>

        <div className="tl-main">
          {loading && <div className="tl-loading">Loading Temples…</div>}
          {error && <div className="tl-empty" style={{color:"rgba(230,100,100,.8)"}}>{error}</div>}
          {!loading && temples?.length === 0 && <div className="tl-empty">No temples found</div>}
          <div className="tl-grid">
            {temples?.map((temple) => (
              <div key={temple._id} className="tl-card">
                <div className="tl-card-img-wrap">
                  <img className="tl-card-img" src={temple.images?.[0]} alt={temple.templeName}/>
                  {temple.rating && (
                    <div className="tl-card-rating">
                      <Star size={10} fill="#C9962A" color="#C9962A"/>
                      <span className="tl-card-rating-num">{temple.rating}</span>
                    </div>
                  )}
                </div>
                <div className="tl-card-body">
                  <div className="tl-card-loc"><MapPin size={10}/>{temple.city}</div>
                  <div className="tl-card-name">{temple.templeName}</div>
                  <div className="tl-card-tags">
                    {temple.categories?.slice(0,3).map((c,i) => <span key={i} className="tl-card-tag">{c}</span>)}
                  </div>
                  <div className="tl-card-actions">
                    <button className="tl-card-btn" onClick={() => navigate(`/templeDetails/${temple._id}`)}>
                      View Details <ArrowRight size={11}/>
                    </button>
                    {userInfo?.role === "admin" && (
                      <button className="tl-card-btn edit" onClick={() => navigate(`/admin/editTemple/${temple._id}`)}>
                        <Pencil size={11}/> Edit Temple
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Temples;