import { useEffect, useState } from 'react';

const highlights = ['Full Stack Development', 'Java & React', 'DSA & Problem Solving'];
const skills = ['Java', 'C', 'DSA', 'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Git', 'GitHub', 'Linux'];
const education = [
  'B.Tech – • CGPA: 8.74 • 4th Semester',
  '12th – TPS College, Patna • 84%',
  '10th – DAV Public School • 80%',
];
const balloonItems = ['React', 'Java', 'Design', 'Logic', 'API', 'Git', 'UI', 'Cloud', 'Dream'];
const balloonLayout = [
  { x: -138, y: -78 },
  { x: -70, y: 16 },
  { x: -6, y: -86 },
  { x: 50, y: 10 },
  { x: 112, y: -62 },
  { x: 80, y: 72 },
  { x: -104, y: 72 },
  { x: 18, y: 92 },
  { x: 142, y: 28 },
];
const projects = [
  {
    title: 'MyMart',
    description: 'Built a responsive e-commerce website using React.js, Node.js, Express.js, HTML, CSS, and JavaScript.',
  },
  {
    title: 'Amazon Clone',
    description: 'Developed a frontend clone inspired by Amazon UI with a responsive design and polished layout.',
  },
  {
    title: 'Student Management System',
    description: 'Created an admin dashboard for student records with CRUD operations and clean data handling.',
  },
  {
    title: 'Food Delivery Website',
    description: 'Designed a responsive food ordering site with an attractive interface and modern UX.',
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [balloonOffsets, setBalloonOffsets] = useState({});
  const [portraitMode, setPortraitMode] = useState('idle');
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setLoading(false), 2500);
    const cycleTimer = window.setInterval(() => {
      setHighlightIndex((current) => (current + 1) % highlights.length);
    }, 1200);

    const handlePointerMove = (event) => {
      setPointer({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handlePointerMove);

    return () => {
      window.clearTimeout(loaderTimer);
      window.clearInterval(cycleTimer);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  const handleBalloonMove = (event, index) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = cursorX - centerX;
    const deltaY = cursorY - centerY;
    const distance = Math.hypot(deltaX, deltaY) || 1;
    const force = Math.max(0, 1 - distance / 110) * 34;
    const pushX = (deltaX / distance) * force;
    const pushY = (deltaY / distance) * force;

    setBalloonOffsets((current) => ({
      ...current,
      [index]: { x: pushX, y: pushY },
    }));
  };

  const handleBalloonLeave = (index) => {
    setBalloonOffsets((current) => ({
      ...current,
      [index]: { x: 0, y: 0 },
    }));
  };

  const handlePortraitMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;

    setPortraitMode('walking');
    setPortraitTilt({
      x: (0.5 - offsetY) * 18,
      y: (offsetX - 0.5) * 18,
    });
  };

  const handlePortraitLeave = () => {
    setPortraitMode('idle');
    setPortraitTilt({ x: 0, y: 0 });
  };

  const handlePortraitDown = () => {
    setPortraitMode('dancing');
  };

  const handlePortraitUp = () => {
    setPortraitMode('walking');
  };

  return (
    <div className={`app-shell ${loading ? 'loading-active' : ''}`}>
      <div className={`loader ${loading ? 'visible' : 'hidden'}`}>
        <div className="loader-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" role="img">
            <path d="M32 6c-5 0-9 4-9 9 0 3 2 6 4 8l-5 2c-3 1-5 4-5 7v6c0 2 1 4 3 5l4 3c2 1 3 3 3 5v2h14v-2c0-2 1-4 3-5l4-3c2-1 3-3 3-5v-6c0-3-2-6-5-7l-5-2c2-2 4-5 4-8 0-5-4-9-9-9Z" />
          </svg>
        </div>
        <h1>Welcome Mittar</h1>
        <p>Preparing your digital experience</p>
        <div className="loader-bar" aria-hidden="true">
          <span></span>
        </div>
      </div>

      <div
        className="cursor-dot"
        style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }}
        aria-hidden="true"
      />

      <main className={`content ${loading ? 'hidden' : 'visible'}`}>
        <header className="topbar">
          <a href="#about" className="brand" aria-label="Portfolio home">
            <span className="brand-mark">P</span>
            <span className="brand-name">Portfolio</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#projects">Project</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section id="about" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Welcome to my universe</p>
            <h2>Hi, I’m Ravi Kumar — a B.Tech student building modern web solutions with Java, React, and full-stack skills.</h2>
            <p>
              Motivated and enthusiastic B.Tech student with strong interest in Full Stack Development and Software Engineering. Skilled in Java, Web Development, and Data Structures & Algorithms.
            </p>
            <div className="actions">
              <a href="#resume" className="btn primary">View Resume</a>
              <a href="#contact" className="btn secondary">Contact Me</a>
            </div>
            <div className="highlight-pill">{highlights[highlightIndex]}</div>
          </div>

          <div className="hero-card">
            <div
              className={`hero-portrait-wrap ${portraitMode !== 'idle' ? 'hero-portrait-active' : ''} ${portraitMode === 'dancing' ? 'hero-portrait-dancing' : ''}`}
              onPointerMove={handlePortraitMove}
              onPointerLeave={handlePortraitLeave}
              onPointerDown={handlePortraitDown}
              onPointerUp={handlePortraitUp}
              onPointerCancel={handlePortraitLeave}
              style={{
                '--tilt-x': `${portraitTilt.x}deg`,
                '--tilt-y': `${portraitTilt.y}deg`,
              }}
            >
              <div className="hero-portrait-inner">
                <img
                  src="./Mypic.png"
                  alt="Ravi Kumar portrait"
                  className="hero-portrait"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="resume" className="resume-section">
          <div className="resume-card resume-intro-card">
            <p className="eyebrow">Resume Snapshot</p>
            <h3>Full Stack Development • Software Engineering • Civil Services ambition</h3>
            <p>
              Seeking opportunities to apply technical skills, gain industry experience, and build impactful software solutions while pursuing long-term goals in civil services.
            </p>
          </div>

          <div className="resume-grid">
            <div className="resume-card resume-list-card">
              <h4>Education</h4>
              <ul>
                {education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="resume-card resume-list-card">
              <h4>Core Skills</h4>
              <div className="skill-tags">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="balloon-showcase" aria-label="interactive balloon showcase">
          <div className="balloon-scene">
            <div className="balloon-cluster">
              {balloonItems.map((item, index) => {
                const offset = balloonOffsets[index] || { x: 0, y: 0 };

                return (
                  <span
                    key={item}
                    className="balloon"
                    onMouseMove={(event) => handleBalloonMove(event, index)}
                    onMouseLeave={() => handleBalloonLeave(index)}
                    style={{
                      '--base-x': `${balloonLayout[index].x}px`,
                      '--base-y': `${balloonLayout[index].y}px`,
                      '--push-x': `${offset.x}px`,
                      '--push-y': `${offset.y}px`,
                      '--delay': `${index * 0.08}s`,
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="section-title">
            <p className="eyebrow">Selected work</p>
            <h3>Web projects that reflect my growth in frontend and full-stack development.</h3>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-card">
          <div className="contact-intro">
            <p className="eyebrow">Let’s build something impactful</p>
            <h3>Open to meaningful opportunities and collaborations.</h3>
            <p>I’m currently exploring full-stack development roles, internships, and impactful projects.</p>
          </div>

          <div className="contact-details">
            <a href="tel:+917209795722" className="contact-item">
              <span className="contact-label">Phone</span>
              <span className="contact-value">+91 72097 95722</span>
            </a>
            <a href="mailto:ravikumar117284@gmail.com" className="contact-item">
              <span className="contact-label">Email</span>
              <span className="contact-value">ravikumar117284@gmail.com</span>
            </a>
          </div>

          <div className="social-grid">
            <a href="https://www.linkedin.com/in/ravi-kumar-ab394a321" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="social-link">Instagram</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="social-link">Facebook</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
          </div>
        </section>

        <div className="sticky-resume-actions">
          <a href="./resume.html" target="_blank" rel="noreferrer" className="btn secondary small">View Resume</a>
          <a href="./resume.pdf" download="Ravi_Kumar_Resume.pdf" className="btn primary small">Download Resume</a>
        </div>
      </main>
    </div>
  );
}

export default App;
