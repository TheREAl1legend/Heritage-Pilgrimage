import React from "react";
import { Map, Mountain, Landmark, ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
:root{--saffron:#E8820C;--gold:#C9962A;--goldl:#E8B84B;--night:#080612;--night2:#0F0C1E;--ivory:#F5EDD8;--ash:#9E97AA;--mid:#1A1630;--mid2:#120F24;}

.pc-page{background:var(--night);min-height:100vh;}

/* HERO */
.pc-hero{position:relative;height:65vh;min-height:480px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;}
.pc-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:pcZoom 14s ease-out forwards;}
@keyframes pcZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
.pc-hero-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,6,18,1) 0%,rgba(8,6,18,.65) 45%,rgba(8,6,18,.15) 100%);}
.pc-hero-content{position:relative;z-index:2;padding:0 8vw 8vh;max-width:1400px;margin:0 auto;width:100%;}
.pc-eyebrow{display:flex;align-items:center;gap:16px;margin-bottom:20px;}
.pc-eyebrow-line{width:40px;height:1px;background:var(--gold);}
.pc-eyebrow-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:var(--gold);}
.pc-hero-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(34px,5.5vw,76px);line-height:.95;color:var(--ivory);letter-spacing:-2px;margin-bottom:20px;}
.pc-hero-title em{font-style:italic;color:var(--goldl);font-family:'Crimson Pro',serif;font-weight:300;}
.pc-hero-sub{font-family:'Crimson Pro',serif;font-size:18px;color:rgba(245,237,216,.6);max-width:520px;line-height:1.65;}

/* GRID */
.pc-content{max-width:1400px;margin:0 auto;padding:80px 8vw 100px;}
.pc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(201,150,42,.08);}
.pc-card{background:var(--night);overflow:hidden;cursor:pointer;position:relative;transition:transform .4s;}
.pc-card:hover{transform:translateY(-4px);}
.pc-card-img-wrap{height:260px;overflow:hidden;position:relative;}
.pc-card-img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.25,.46,.45,.94),filter .4s;filter:saturate(.7) brightness(.85);}
.pc-card:hover .pc-card-img{transform:scale(1.08);filter:saturate(1) brightness(.95);}
.pc-card-icon{position:absolute;top:18px;left:18px;background:rgba(8,6,18,.7);backdrop-filter:blur(8px);border:1px solid rgba(201,150,42,.3);padding:10px;color:var(--goldl);}
.pc-card-num{position:absolute;bottom:14px;right:18px;font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(201,150,42,.5);}
.pc-card-body{padding:24px 24px 28px;}
.pc-card-name{font-family:'Cinzel',serif;font-size:19px;font-weight:700;color:var(--ivory);margin-bottom:10px;line-height:1.15;}
.pc-card-desc{font-family:'Crimson Pro',serif;font-size:15px;color:rgba(245,237,216,.5);line-height:1.6;margin-bottom:20px;}
.pc-card-cta{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--ash);display:flex;align-items:center;gap:6px;transition:color .2s;}
.pc-card:hover .pc-card-cta{color:var(--goldl);}

@media(max-width:900px){.pc-grid{grid-template-columns:1fr 1fr;}.pc-content,.pc-hero-content{padding-left:24px;padding-right:24px;}}
@media(max-width:580px){.pc-grid{grid-template-columns:1fr;}.pc-hero{height:55vh;}}
`;

const PilgrimageCircuits = () => {
  const navigate = useNavigate();

  const pilgrimageCircuits = [
    { name:"Char Dham", description:"Explore the sacred Himalayan pilgrimage of Yamunotri, Gangotri, Kedarnath and Badrinath.", icon:<Mountain size={20}/>, image:"https://images.unsplash.com/photo-1627894483216-2138af692e32" },
    { name:"Chota Char Dham", description:"One of the most important spiritual journeys in Uttarakhand's Himalayan heartland.", icon:<Landmark size={20}/>, image:"https://images.unsplash.com/photo-1599661046289-e31897846e41" },
    { name:"Jyotirlinga", description:"Discover the 12 sacred Jyotirlinga temples dedicated to Lord Shiva across India.", icon:<Sparkles size={20}/>, image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca" },
    { name:"Shakti Peeth", description:"Visit divine temples dedicated to Goddess Shakti spread across the subcontinent.", icon:<Map size={20}/>, image:"https://images.unsplash.com/photo-1583391733981-8498401540c3" },
    { name:"Sapta Puri", description:"Seven sacred cities believed to grant moksha and ultimate spiritual liberation.", icon:<Landmark size={20}/>, image:"https://images.unsplash.com/photo-1514222134-b57cbb8ce073" },
    { name:"Panch Kedar", description:"Sacred Shiva temples located in the breathtaking Garhwal Himalayas.", icon:<Mountain size={20}/>, image:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23" },
    { name:"Pancha Bhoota Sthalams", description:"Five famous Shiva temples representing nature's five primordial elements.", icon:<Sparkles size={20}/>, image:"https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/pilgrimage_matipf.jpg" },
    { name:"Divya Desam", description:"108 sacred Vishnu temples praised by the twelve Alvar saints in their hymns.", icon:<Landmark size={20}/>, image:"https://images.unsplash.com/photo-1577083165633-14ebcdb0f658" },
    { name:"Ashtavinayak", description:"Eight holy temples of Lord Ganesha located across the sacred land of Maharashtra.", icon:<Sparkles size={20}/>, image:"https://images.unsplash.com/photo-1605649487212-47bdab064df7" },
    { name:"Kanwar Yatra", description:"Annual pilgrimage devoted to Lord Shiva observed during the auspicious Shravan month.", icon:<Map size={20}/>, image:"https://images.unsplash.com/photo-1609766857041-ed402ea8069a" },
    { name:"Amarnath Yatra", description:"Sacred Himalayan pilgrimage to the holy Amarnath cave shrine in Kashmir.", icon:<Mountain size={20}/>, image:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23" },
    { name:"Kumbh Mela Circuit", description:"World's largest spiritual gathering celebrated at four sacred river confluences.", icon:<Sparkles size={20}/>, image:"https://images.unsplash.com/photo-1577083552431-6e5fd01aa342" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="pc-page">

        {/* HERO */}
        <section className="pc-hero">
          <img className="pc-hero-img" src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/pilgrimage_matipf.jpg" alt="Pilgrimage"/>
          <div className="pc-hero-ov"/>
          <div className="pc-hero-content">
            <div className="pc-eyebrow"><div className="pc-eyebrow-line"/><span className="pc-eyebrow-text">Sacred India</span></div>
            <h1 className="pc-hero-title">Pilgrimage <em>Circuits</em> of India</h1>
            <p className="pc-hero-sub">Discover India's most sacred spiritual journeys, ancient temple routes, and divine pilgrimage destinations.</p>
          </div>
        </section>

        {/* GRID */}
        <div className="pc-content">
          <div className="pc-grid">
            {pilgrimageCircuits.map((circuit, index) => (
              <div key={index} className="pc-card" onClick={() => navigate(`/travel/${encodeURIComponent(circuit.name)}`)}>
                <div className="pc-card-img-wrap">
                  <img className="pc-card-img" src={circuit.image} alt={circuit.name}/>
                  <div className="pc-card-icon">{circuit.icon}</div>
                  <div className="pc-card-num">{String(index + 1).padStart(2, "0")}</div>
                </div>
                <div className="pc-card-body">
                  <div className="pc-card-name">{circuit.name}</div>
                  <div className="pc-card-desc">{circuit.description}</div>
                  <div className="pc-card-cta">Explore Circuit <ArrowRight size={12}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PilgrimageCircuits;