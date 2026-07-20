import React from "react";
import { Landmark, MapPin, Star, Mountain, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
:root{--saffron:#E8820C;--gold:#C9962A;--goldl:#E8B84B;--night:#080612;--night2:#0F0C1E;--ivory:#F5EDD8;--ash:#9E97AA;--mid:#1A1630;--mid2:#120F24;}
*{box-sizing:border-box;}

.ab-page{background:var(--night);color:var(--ivory);overflow-x:hidden;}

/* HERO */
.ab-hero{position:relative;height:75vh;min-height:500px;display:flex;flex-direction:column;justify-content:flex-end;}
.ab-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:abZoom 14s ease-out forwards;}
@keyframes abZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
.ab-hero-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,6,18,1) 0%,rgba(8,6,18,.65) 45%,rgba(8,6,18,.15) 100%);}
.ab-hero-content{position:relative;z-index:2;padding:0 8vw 9vh;max-width:1400px;margin:0 auto;width:100%;}
.ab-eyebrow{display:flex;align-items:center;gap:16px;margin-bottom:20px;}
.ab-eyebrow-line{width:40px;height:1px;background:var(--gold);}
.ab-eyebrow-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:var(--gold);}
.ab-hero-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(34px,5.5vw,78px);line-height:.95;color:var(--ivory);letter-spacing:-2px;margin-bottom:22px;max-width:16ch;}
.ab-hero-title em{font-style:italic;color:var(--goldl);font-family:'Crimson Pro',serif;font-weight:300;}
.ab-hero-sub{font-family:'Crimson Pro',serif;font-size:19px;color:rgba(245,237,216,.6);max-width:540px;line-height:1.65;}

/* SECTIONS */
.ab-section{max-width:1400px;margin:0 auto;padding:100px 8vw;}
.ab-section-alt{background:var(--mid2);}
.ab-section-alt .ab-section{padding:100px 8vw;}

/* ABOUT SPLIT */
.ab-split{display:grid;grid-template-columns:1fr 1fr;gap:90px;align-items:center;}
.ab-img-wrap{position:relative;}
.ab-img{width:100%;height:580px;object-fit:cover;}
.ab-img-frame{position:absolute;inset:-14px;border:1px solid rgba(201,150,42,.2);pointer-events:none;z-index:1;}
.ab-img-frame::before{content:'';position:absolute;inset:9px;border:1px solid rgba(201,150,42,.07);}
.ab-img-badge{position:absolute;bottom:28px;left:-28px;background:var(--night);border:1px solid rgba(201,150,42,.25);padding:20px 28px;z-index:10;display:flex;gap:18px;align-items:center;}
.ab-badge-icon{color:var(--gold);}
.ab-badge-num{font-family:'Cinzel',serif;font-size:28px;font-weight:900;color:var(--ivory);line-height:1;}
.ab-badge-label{font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ash);margin-top:4px;}
.ab-eyebrow2{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.ab-eyebrow2-line{width:32px;height:1px;background:var(--gold);}
.ab-eyebrow2-text{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);}
.ab-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(26px,3vw,46px);color:var(--ivory);letter-spacing:-1px;line-height:1.05;margin-bottom:20px;}
.ab-body{font-family:'Crimson Pro',serif;font-size:18px;color:rgba(245,237,216,.55);line-height:1.75;margin-bottom:16px;}
.ab-feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:36px;}
.ab-feat{border:1px solid rgba(201,150,42,.1);padding:22px;transition:border-color .3s;}
.ab-feat:hover{border-color:rgba(201,150,42,.35);}
.ab-feat-icon{color:var(--gold);margin-bottom:12px;}
.ab-feat-title{font-family:'Cinzel',serif;font-size:13px;font-weight:700;color:var(--ivory);margin-bottom:7px;letter-spacing:.5px;}
.ab-feat-desc{font-family:'Crimson Pro',serif;font-size:14px;color:rgba(245,237,216,.5);line-height:1.6;}

/* FEATURES GRID */
.ab-features-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,150,42,.08);}
.ab-feat-card{background:var(--night);padding:40px 28px;transition:background .3s;}
.ab-feat-card:hover{background:var(--mid2);}
.ab-feat-card-icon{color:var(--gold);margin-bottom:20px;}
.ab-feat-card-title{font-family:'Cinzel',serif;font-size:15px;font-weight:700;color:var(--ivory);margin-bottom:12px;letter-spacing:.3px;}
.ab-feat-card-desc{font-family:'Crimson Pro',serif;font-size:15px;color:rgba(245,237,216,.5);line-height:1.65;}

/* STATS */
.ab-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,150,42,.08);}
.ab-stat{background:var(--night2);padding:52px 32px;text-align:center;}
.ab-stat-num{font-family:'Cinzel',serif;font-size:clamp(36px,4vw,58px);font-weight:900;color:var(--goldl);line-height:1;margin-bottom:10px;}
.ab-stat-label{font-family:'Inter',sans-serif;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--ash);}

/* DEVELOPER */
.ab-dev{text-align:center;max-width:700px;margin:0 auto;}
.ab-dev-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(24px,3vw,42px);color:var(--ivory);letter-spacing:-1px;margin-bottom:20px;}
.ab-dev-body{font-family:'Crimson Pro',serif;font-size:18px;color:rgba(245,237,216,.55);line-height:1.75;}

/* CTA */
.ab-cta{background:var(--mid2);border-top:1px solid rgba(201,150,42,.1);border-bottom:1px solid rgba(201,150,42,.1);position:relative;overflow:hidden;}
.ab-cta-inner{max-width:1400px;margin:0 auto;padding:100px 8vw;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center;}
.ab-cta-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(26px,3.2vw,48px);color:var(--ivory);letter-spacing:-1px;line-height:1.05;margin-bottom:16px;}
.ab-cta-sub{font-family:'Crimson Pro',serif;font-size:18px;color:rgba(245,237,216,.5);line-height:1.65;}
.ab-cta-bg{position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:'Cinzel',serif;font-size:180px;font-weight:900;color:rgba(201,150,42,.03);pointer-events:none;user-select:none;}
.ab-btn-primary{font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:16px 36px;background:var(--saffron);border:none;color:#fff;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:10px;transition:background .25s,transform .2s;white-space:nowrap;}
.ab-btn-primary:hover{background:#cf730a;transform:translateY(-1px);}

@media(max-width:900px){
  .ab-split{grid-template-columns:1fr;}.ab-img-wrap{order:-1;}.ab-img-badge{left:0;}
  .ab-features-grid{grid-template-columns:1fr 1fr;}
  .ab-stats-grid{grid-template-columns:1fr 1fr;}
  .ab-cta-inner{grid-template-columns:1fr;}
  .ab-section,.ab-section-alt .ab-section,.ab-cta-inner,.ab-hero-content{padding-left:24px;padding-right:24px;}
}
@media(max-width:580px){
  .ab-features-grid{grid-template-columns:1fr;}
  .ab-feat-grid{grid-template-columns:1fr;}
}
`;

const About = () => (
  <>
    <style>{CSS}</style>
    <div className="ab-page">

      {/* HERO */}
      <section className="ab-hero">
        <img className="ab-hero-img" src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/architecture_heoavc.jpg" alt="Temple"/>
        <div className="ab-hero-ov"/>
        <div className="ab-hero-content">
          <div className="ab-eyebrow"><div className="ab-eyebrow-line"/><span className="ab-eyebrow-text">Spiritual Heritage Of India</span></div>
          <h1 className="ab-hero-title">About Our Temple <em>Heritage</em> Portal</h1>
          <p className="ab-hero-sub">Explore India's sacred temples, pilgrimage destinations, architectural wonders, spiritual traditions, and timeless divine heritage.</p>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <div className="ab-section">
        <div className="ab-split">
          <div className="ab-img-wrap">
            <div className="ab-img-frame"/>
            <img className="ab-img" src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/pilgrimage_matipf.jpg" alt="Temple"/>
            <div className="ab-img-badge">
              <Star size={26} className="ab-badge-icon"/>
              <div>
                <div className="ab-badge-num">500+</div>
                <div className="ab-badge-label">Famous Temples</div>
              </div>
            </div>
          </div>
          <div>
            <div className="ab-eyebrow2"><div className="ab-eyebrow2-line"/><span className="ab-eyebrow2-text">About Platform</span></div>
            <h2 className="ab-title">Preserving India's Spiritual & Cultural Heritage</h2>
            <p className="ab-body">India Temple Heritage & Pilgrimage Portal is a digital platform dedicated to showcasing the rich spiritual culture, ancient temples, sacred pilgrimage routes, and architectural beauty of India.</p>
            <p className="ab-body">From Jyotirlingas and Shakti Peethas to magnificent South Indian temple architecture and Himalayan pilgrimage sites, this platform helps devotees, travelers, and history lovers explore India's divine heritage in one place.</p>
            <div className="ab-feat-grid">
              {[
                {icon:<Landmark size={22}/>,title:"Sacred Pilgrimage",desc:"Discover holy pilgrimage destinations across India."},
                {icon:<Building2 size={22}/>,title:"Ancient Architecture",desc:"Explore incredible carvings, sculptures, and temple designs."},
              ].map((f,i)=>(
                <div key={i} className="ab-feat">
                  <div className="ab-feat-icon">{f.icon}</div>
                  <div className="ab-feat-title">{f.title}</div>
                  <div className="ab-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="ab-section-alt">
        <div className="ab-section">
          <div className="ab-eyebrow2" style={{justifyContent:"center",marginBottom:32}}><div className="ab-eyebrow2-line"/><span className="ab-eyebrow2-text">Portal Features</span><div className="ab-eyebrow2-line"/></div>
          <h2 className="ab-title" style={{textAlign:"center",marginBottom:56}}>What You Can Explore</h2>
          <div className="ab-features-grid">
            {[
              {icon:<Landmark size={36}/>,title:"Temple Directory",desc:"Browse famous temples across different states of India."},
              {icon:<Mountain size={36}/>,title:"Pilgrimage Tours",desc:"Discover sacred pilgrimage destinations and spiritual routes."},
              {icon:<Building2 size={36}/>,title:"Temple Architecture",desc:"Explore ancient Indian architecture and temple artistry."},
              {icon:<MapPin size={36}/>,title:"Location Details",desc:"Find temple locations, timings, festivals, and more."},
            ].map((f,i)=>(
              <div key={i} className="ab-feat-card">
                <div className="ab-feat-card-icon">{f.icon}</div>
                <div className="ab-feat-card-title">{f.title}</div>
                <div className="ab-feat-card-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="ab-stats-grid">
        {[["500+","Temples Listed"],["28","States Covered"],["1000+","Temple Images"],["Ancient","Heritage Stories"]].map(([n,l],i)=>(
          <div key={i} className="ab-stat">
            <div className="ab-stat-num">{n}</div>
            <div className="ab-stat-label">{l}</div>
          </div>
        ))}
      </div>

      {/* DEVELOPER */}
      <div className="ab-section-alt">
        <div className="ab-section">
          <div className="ab-dev">
            <div className="ab-eyebrow2" style={{justifyContent:"center",marginBottom:24}}><div className="ab-eyebrow2-line"/><span className="ab-eyebrow2-text">Creator</span><div className="ab-eyebrow2-line"/></div>
            <h2 className="ab-dev-title">Developed By Gurpratik</h2>
            <p className="ab-dev-body">A passionate Full Stack Developer focused on building modern, scalable, and visually engaging web applications inspired by Indian spirituality, culture, and heritage.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ab-cta">
        <div className="ab-cta-bg">ॐ</div>
        <div className="ab-cta-inner">
          <div>
            <h2 className="ab-cta-title">Begin Your Spiritual Journey Across India</h2>
            <p className="ab-cta-sub">Explore sacred temples, divine traditions, and the timeless beauty of India's spiritual heritage.</p>
          </div>
          <Link to="/templeList" className="ab-btn-primary">Explore Temples <ArrowRight size={14}/></Link>
        </div>
      </div>

    </div>
  </>
);

export default About;