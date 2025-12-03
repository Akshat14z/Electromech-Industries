import { useEffect, useState } from "react";
import Loader from "./loader";
import "./index.css";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.section:not(#hero)');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loading]);

  // Close mobile menu when clicking outside or scrolling
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e) => {
      const mobileMenu = document.querySelector('.nav-mobile-menu');
      const toggleButton = document.querySelector('.nav-mobile-toggle');
      
      if (mobileMenu && toggleButton && 
          !mobileMenu.contains(e.target) && 
          !toggleButton.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (loading) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    document.body.appendChild(spotlight);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      spotlight.style.left = `${clientX}px`;
      spotlight.style.top = `${clientY}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (spotlight.parentNode) {
        spotlight.parentNode.removeChild(spotlight);
      }
    };
  }, [loading]);

  // Close mobile menu when a mobile nav link is clicked (let anchors handle scrolling)
  useEffect(() => {
    if (loading) return;

    const handler = (e) => {
      const el = e.target;
      const anchor = el.closest('a');
      if (!anchor) return;

      const inMobileNav = anchor.closest('.nav-mobile-menu');
      if (!inMobileNav) return;

      // let the browser handle scrolling to the hash target,
      // just make sure we close the hamburger menu
      setMobileMenuOpen(false);
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <div className="nav-logo">
            <img src="final.png" alt="Electromech Industries" className="nav-logo-img" />
            <span>Electromech Industries</span>
          </div>
          <nav className="nav-links">
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#facilities">Facilities</a>
            <a href="#projects">Projects</a>
            <a href="#clients">Clients</a>
            <a href="#quality">Quality</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="nav-right">
          <a 
            href="https://www.google.com/maps/place/ELECTROMECH+INDUSTRIES/@22.2858226,73.2085824,17z/data=!3m1!4b1!4m6!3m5!1s0x395fc5f7fd2851d3:0x372597f913749b1a!8m2!3d22.2858226!4d73.2111573!16s%2Fg%2F11q9_phnnk?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-location-link"
            aria-label="Get directions to Electromech Industries"
          >
            📍 Location
          </a>
          <button 
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <nav className={`nav-mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <a href="#about">About Us</a>
        <a href="#services">Services</a>
        <a href="#facilities">Facilities</a>
        <a href="#projects">Projects</a>
        <a href="#clients">Clients</a>
        <a href="#quality">Quality</a>
        <a href="#contact">Contact</a>
        <a 
          href="https://www.google.com/maps/place/ELECTROMECH+INDUSTRIES/@22.2858226,73.2085824,17z/data=!3m1!4b1!4m6!3m5!1s0x395fc5f7fd2851d3:0x372597f913749b1a!8m2!3d22.2858226!4d73.2111573!16s%2Fg%2F11q9_phnnk?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-location-link"
        >
          📍 Location
        </a>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="hero section visible">
          <div className="hero-inner">
            {/* TOP-LEFT: Electromech Industries */}
            <div className="hero-company hero-company-top-left">
              <div className="hero-company-card">
                <h2 className="hero-company-name">Electromech Industries</h2>
                <p className="hero-company-since">Since 2014</p>
                <p className="hero-company-desc">Authorized Service Center for Kishor Pumps</p>
                <div className="hero-company-divider"></div>
              </div>
            </div>

            {/* BOTTOM-RIGHT: Ganesh Electricals */}
            <div className="hero-company hero-company-bottom-right">
              <div className="hero-company-card">
                <h2 className="hero-company-name">Ganesh Electricals</h2>
                <p className="hero-company-since">Since 1977</p>
                <p className="hero-company-desc">Efficient Repair and High Performance Services</p>
                <div className="hero-company-divider"></div>
              </div>
            </div>

            {/* CENTER CONTENT */}
            <div className="hero-center">
              <p className="hero-tagline-main">
                Trusted name for Excellence, Honesty and Performance
              </p>
              <p className="hero-description">
                We render our service to many esteemed organizations, both large and medium industries. 
                Our electrical workshop has been serving since 1977 with many years of wide experience 
                in electrical machine repair and rewinding.
              </p>
            </div>
          </div>

          {/* GLASSMORPHISM 3D SHAPES */}
          <div className="hero-glassmorphism">
            <div className="glass-shape glass-shape-1"></div>
            <div className="glass-shape glass-shape-2"></div>
            <div className="glass-shape glass-shape-3"></div>
            <div className="glass-shape glass-shape-4"></div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="section section-muted">
          <div className="content">
            <h2>About Us</h2>
            <div className="about-grid">
              <div className="about-card">
                <h3>Ganesh Electricals</h3>
                <p className="about-year">Since 1977</p>
                <p className="about-slogan">Efficient Repair and High Performance Services</p>
                <div className="about-details">
                  <p><strong>GSTIN:</strong> 24AD0PP2090GIZG</p>
                  <p><strong>MSME:</strong> UDYAM-GJ-24-0020541</p>
                </div>
              </div>
              <div className="about-card">
                <h3>Electromech Industries</h3>
                <p className="about-year">Since 2014</p>
                <p className="about-slogan">Authorized Service Center for Kishor Pumps</p>
                <div className="about-details">
                  <p><strong>GSTIN:</strong> 24APLPP9376GIZB</p>
                  <p><strong>MSME:</strong> UDYAM-GJ-24-0020572</p>
                </div>
                <p className="about-note">
                  Electromech Industries provides service contracts of electrical machines and 
                  manufactures all types of MCC, PCC, and AMF panels as well as synchronized 
                  AMF panels of any capacity of DG.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="section">
          <div className="content">
            <h2>Our Services</h2>
            <p className="section-intro">We repair and serve following types of Electrical Machines</p>
            <div className="services-grid">
              <div className="service-item">All types of AC/DC Motors</div>
              <div className="service-item">All types of Alternators / Generators</div>
              <div className="service-item">AC/DC Traction, Fork-lift motors. All Starters</div>
              <div className="service-item">AC Servo Motors. Transformers. Panel Board</div>
              <div className="service-item">Solenoid / Burner Valve, Molded Clutch Coils</div>
              <div className="service-item">High Pressure pump, HCF pump, Sewage Pump</div>
              <div className="service-item">Welding Rectifiers, Welding Machine</div>
              <div className="service-item">All type of Hand Tools and Many more...</div>
            </div>
            <div className="services-note">
              <p><strong>Ask for ARC/AMC.</strong> We also arrange carting.</p>
            </div>
          </div>
        </section>

        {/* FACILITIES SECTION */}
        <section id="facilities" className="section section-muted">
          <div className="content">
            <h2>In-House Facilities</h2>
            <div className="facilities-list">
              <div className="facility-item">
                <span className="facility-number">1</span>
                <span>EOT 5T Crane for loading and unloading the heavy-duty equipment</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">2</span>
                <span>Baking Oven facility</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">3</span>
                <span>High voltage Surge Comparison test and breakdown tester for winding test</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">4</span>
                <span>Graullar testing</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">5</span>
                <span>DC motors testing facility</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">6</span>
                <span>Coil making machine (heavy and light duty)</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">7</span>
                <span>Drilling, grinding, Lathe machine</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">8</span>
                <span>All kind of variable parameter measuring test equipment</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">9</span>
                <span>Different size of Hydraulic puller</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">10</span>
                <span>Hydraulic horizontal and vertical press arrangement</span>
              </div>
              <div className="facility-item">
                <span className="facility-number">11</span>
                <span>All type of separately stored insulating materials and copper materials</span>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIALIZED PROJECTS SECTION */}
        <section id="projects" className="section">
          <div className="content">
            <h2>Specialized Projects</h2>
            <p className="section-intro">Highlight of some Specialized jobs we have done</p>
            <div className="projects-grid">
              <div className="project-item">800 hp Skoda Lawrence Scott makes A.C. variable speed motor</div>
              <div className="project-item">Anton pilar make A.C. variable speed motor</div>
              <div className="project-item">720 hp Kirlosker make slip ring motor</div>
              <div className="project-item">425kW KEC make D.C. motor</div>
              <div className="project-item">1000 hp GE make D.C. motor</div>
              <div className="project-item">Main sub-station panel</div>
              <div className="project-item">Cable laying</div>
              <div className="project-item">Nikkiso / Taikoku Japan make non-seal pump</div>
              <div className="project-item">Baumuller Germany make AC syn Torque motor 92/118kw 100hz 300rpm</div>
              <div className="project-item">1050 kva Alternator set</div>
              <div className="project-item">DC Traction motor</div>
              <div className="project-item">2.5MW Bhel make 3000 rpm DC Exciter Unit</div>
              <div className="project-item">All major range of Aqua, Pullen, MBH, Kishor pump</div>
            </div>
          </div>
        </section>

        {/* CLIENTS SECTION */}
        <section id="clients" className="section section-muted">
          <div className="content">
            <h2>Our Valuable Clients</h2>
            <p className="section-intro">We are proud to serve these esteemed organizations</p>
            <div className="clients-grid">
              <div className="client-item">Transpek Silox ind. Ltd., Baroda</div>
              <div className="client-item">Transpek Industry Ltd. - Ekalbara, Baroda</div>
              <div className="client-item">Apollo Tyres Ltd.</div>
              <div className="client-item">Munjal Auto Ind. Ltd.</div>
              <div className="client-item">Siltap (Supreme Ind.) chemicals Ltd. - Halol</div>
              <div className="client-item">Bundy India Ltd. - Baroda</div>
              <div className="client-item">Super salts P. Ltd. - Jambusar</div>
              <div className="client-item">Sardar Sarovar Nigam Ltd.</div>
              <div className="client-item">Deccan polymer</div>
              <div className="client-item">Pennuwalt agro plast Ltd. - Manjusar, Baroda</div>
              <div className="client-item">Vimal services Ltd. - Por</div>
              <div className="client-item">Industrial oxygen co. Ltd. - Karajan</div>
              <div className="client-item">S.I. quarry works - Timba</div>
              <div className="client-item">Bansidhar metal - Narmada</div>
              <div className="client-item">R.K. construction - Godhara</div>
              <div className="client-item">Jost's engineering</div>
              <div className="client-item">Reliance industry - Hajira</div>
              <div className="client-item">Unilift cargo system - Birla cellulosic - Kosamba</div>
              <div className="client-item">J.B chemical and pharmaceutical - Panoli</div>
              <div className="client-item">Jct industry - Karjan</div>
              <div className="client-item">Century steel balls pvt. Ltd. - Baroda</div>
              <div className="client-item">Jewel Consumer care P. Ltd. - Baroda</div>
              <div className="client-item">Diamond cables Ltd. - Halol</div>
              <div className="client-item">Enviro control associates p.ltd. - Surat</div>
              <div className="client-item">Indo amines Ltd. - Savali</div>
              <div className="client-item">Voltamp transformers Ltd. - Vadodara/Savli</div>
              <div className="client-item">Godrej boycee - Por</div>
              <div className="client-item">Flexatherm - Vadodara</div>
              <div className="client-item">Allied Electricals and Eng. Co. - Vadodara</div>
              <div className="client-item">Shah Alloys Ltd. - Ahmedabad</div>
              <div className="client-item">Popular Marketing (Kirlosker Auth.) - Vadodara</div>
              <div className="client-item">Jaac Services (Mahindra Gen set. Auto.) - Vadodara</div>
              <div className="client-item">Aerzen Machines India - Manjusar Gidc, Vadodara</div>
              <div className="client-item">Indsur Cast Steel Co - Baska, Halol</div>
              <div className="client-item">Indo Amines Ltd. - Tundav, Savli</div>
              <div className="client-item">RPG cables Ltd. - Savli</div>
              <div className="client-item">K.S.Industry - Chhani, Vadodara</div>
              <div className="client-item">Dev Quarry works P. Ltd. - Savli</div>
              <div className="client-item">Rajkamal Infra P. Ltd. (VMC Contractor)</div>
              <div className="client-item">Rahi engineers and contractor (Guj. Water Supply Contractor)</div>
              <div className="client-item">Umia Engineers (VMC contractor)</div>
              <div className="client-item">Laxminarayan and Puja engineers (VMC contractor)</div>
              <div className="client-item">Axar Precision Tubes - Rania, Vadodara</div>
              <div className="client-item">Shree Billeshwar Sugar - Kodinar</div>
              <div className="client-item">Bilaspur Mining Industries</div>
            </div>
          </div>
        </section>

        {/* QUALITY SECTION */}
        <section id="quality" className="section">
          <div className="content">
            <h2>Quality Assurance</h2>
            <div className="quality-content">
              <p className="quality-intro">
                We are using 100% Genuine and Original materials. Reputed brand Super Enameled 
                F class Copper wire, F class Nomex insulation of Duratherm / Flexatherm etc. 
                Fiber Glass cable, Kapton and Mica for Class H insulation. Dr. Beck insulating 
                Varnish and reputed make bearings.
              </p>
              <div className="quality-features">
                <div className="quality-feature">
                  <span className="quality-icon">✓</span>
                  <span>100% Genuine Materials</span>
                </div>
                <div className="quality-feature">
                  <span className="quality-icon">✓</span>
                  <span>F Class Insulation</span>
                </div>
                <div className="quality-feature">
                  <span className="quality-icon">✓</span>
                  <span>Reputed Brand Components</span>
                </div>
                <div className="quality-feature">
                  <span className="quality-icon">✓</span>
                  <span>Quality Tested Equipment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGES GALLERY SECTION */}
        <section id="gallery" className="section section-muted">
          <div className="content">
            <h2>Our Workshop & Facilities</h2>
            <p className="section-intro">A glimpse of our infrastructure and work</p>
            <div className="gallery-grid">
              <div className="gallery-item">
                <div className="gallery-placeholder">
                  <span>Workshop Image</span>
                  <p>Light blue workshop building with GE logo</p>
                </div>
              </div>
              <div className="gallery-item">
                <div className="gallery-placeholder">
                  <span>Motor Winding</span>
                  <p>Detailed copper windings of electric motor</p>
                </div>
              </div>
              <div className="gallery-item">
                <div className="gallery-placeholder">
                  <span>Facility Image</span>
                  <p>Industrial facility and equipment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="content">
            <h2>Contact Us</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <h3>Get in Touch</h3>
                <div className="contact-item">
                  <span className="contact-icon">👤</span>
                  <div>
                    <strong>MEHUL PATEL</strong>
                    <p>98 244 38936</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">👤</span>
                  <div>
                    <strong>MANUBHAI PATEL</strong>
                    <p>98 244 38957</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <p>ganeshelectricals@hotmail.com</p>
                    <p>electromech.vadodara@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <p>Ranmuteshwar road, Nr. Dutt Temple,</p>
                    <p>Pratapnagar, Vadodara-390004, Gujarat</p>
                  </div>
                </div>
              </div>
              <div className="contact-card">
                <h3>Service Information</h3>
                <p>We have experienced and skilled workforce for providing efficient and prompt services. 
                We sincerely hope that you will find our particulars to your requirements and give us 
                a chance to serve with you & prove our working abilities to the best.</p>
                <p className="contact-note">
                  <span className="service-line">
                    <strong>Authorized Service Center for Kishor Pumps</strong>
                    <img src="kishor.jpg" alt="Kishor Pumps" className="kishor-badge" />
                  </span>
                  <span className="service-line">
                    <strong>Authorized Service Center for LUBI Pumps</strong>
                    <img src="lubi.jpg" alt="LUBI Pumps" className="kishor-badge" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ganesh Electricals</h3>
            <p>Since 1977</p>
            <p>Repairer and Rewinders</p>
            <p className="footer-tagline">Efficient Repair and High Performance Services</p>
            <div className="footer-details">
              <p>GSTIN: 24AD0PP2090GIZG</p>
              <p>MSME: UDYAM-GJ-24-0020541</p>
            </div>
          </div>
          <div className="footer-section">
            <h3>Electromech Industries</h3>
            <p>Since 2014</p>
            <p>Authorized Service Center for Kishor Pumps</p>
            <div className="footer-details">
              <p>GSTIN: 24APLPP9376GIZB</p>
              <p>MSME: UDYAM-GJ-24-0020572</p>
            </div>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Mehul Patel: 98 244 38936</p>
            <p>Manubhai Patel: 98 244 38957</p>
            <p>ganeshelectricals@hotmail.com</p>
            <p>electromech.vadodara@gmail.com</p>
          </div>
          <div className="footer-section">
            <h3>Address</h3>
            <p>Ranmuteshwar road, Nr. Dutt Temple,</p>
            <p>Pratapnagar, Vadodara-390004,</p>
            <p>Gujarat, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ganesh Electricals & Electromech Industries. All rights reserved.</p>
          <p className="footer-tagline-main">Trusted name for Excellence, Honesty and Performance</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
