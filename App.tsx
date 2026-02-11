
import React, { useState, useEffect } from 'react';
import { Page, Skill, Project } from './types';
import { getCareerInsight } from './services/geminiService';
import { Input } from './components/Input';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [careerTip, setCareerTip] = useState("Empowering the digital future through code.");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Skill Data
  const skills: Skill[] = [
    { name: 'React / Frontend', level: 90 },
    { name: 'Node.js / Backend', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Python / ML', level: 70 },
  ];

  // Project Data
  const projects: Project[] = [
    { title: 'E-Commerce Platform', description: 'A full-stack modern shopify-like experience.', tags: ['React', 'Node', 'MongoDB'], link: '#' },
    { title: 'AI Resume Analyzer', description: 'Uses LLMs to optimize resumes for ATS.', tags: ['Python', 'Gemini API', 'Flask'], link: '#' },
    { title: 'Portfolio Pro', description: 'Next-gen glassmorphism portfolio templates.', tags: ['React', 'Tailwind', 'Framer'], link: '#' },
  ];

  // Theme Sync
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // AI Career Insight
  useEffect(() => {
    const fetchInsight = async () => {
      let topic = 'general software engineering';
      if (currentPage === 'about') topic = 'professional growth';
      if (currentPage === 'projects') topic = 'innovative project building';
      if (currentPage === 'login') topic = 'cybersecurity';
      
      const insight = await getCareerInsight(topic);
      setCareerTip(insight);
    };
    fetchInsight();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const NavLink = ({ to, label }: { to: Page, label: string }) => (
    <button
      onClick={() => handlePageChange(to)}
      className={`nav-link text-sm font-medium transition-colors ${currentPage === to ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => handlePageChange('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform bg-indigo-600 flex items-center justify-center text-white font-bold">
              UK
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block dark:text-white">Uttam <span className="text-indigo-600 dark:text-indigo-500">Kumar</span></span>
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="home" label="Home" />
            <NavLink to="about" label="About & Resume" />
            <NavLink to="projects" label="Projects & Contact" />
            
            <div className="flex items-center gap-4 ml-4 pl-8 border-l border-slate-200 dark:border-white/10">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-all border border-slate-200 dark:border-white/5"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M4 9h1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              <button
                onClick={() => handlePageChange('login')}
                className="px-5 py-2 rounded-full bg-indigo-600 text-white dark:bg-indigo-600/10 dark:border dark:border-indigo-500/20 dark:text-indigo-400 font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 shadow-md dark:shadow-none"
              >
                Client Login
              </button>
            </div>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-600 dark:text-slate-300 p-2">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] glass backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-slate-600 dark:text-slate-300"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
          <button onClick={() => handlePageChange('home')} className="text-2xl font-bold">Home</button>
          <button onClick={() => handlePageChange('about')} className="text-2xl font-bold">About</button>
          <button onClick={() => handlePageChange('projects')} className="text-2xl font-bold">Projects</button>
          <div className="flex gap-4">
             <button onClick={toggleTheme} className="p-4 rounded-full bg-slate-100 dark:bg-white/10">{theme === 'dark' ? '☀️' : '🌙'}</button>
             <button onClick={() => handlePageChange('login')} className="px-8 py-4 rounded-full bg-indigo-600 text-white font-bold">Client Login</button>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="pt-24 pb-20">
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
                Computer Science Engineer
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-slate-900 dark:text-white">
                Hi, I'm <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Uttam Kumar</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
                Building robust digital experiences through modern engineering and creative problem solving.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => handlePageChange('projects')} className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-600/20">
                  Explore Projects
                </button>
                <button onClick={() => handlePageChange('about')} className="px-8 py-4 bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
                  Read Resume
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-square lg:aspect-auto lg:h-[600px] w-full max-w-lg mx-auto bg-slate-200 dark:bg-slate-800 transition-colors">
                <img 
                  src="https://raw.githubusercontent.com/the-muda-coder/storage/main/uttam_profile.png" 
                  alt="Er. Uttam Kumar" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-[#0f172a] via-transparent to-transparent opacity-60 z-20"></div>
                <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/20 z-30">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg">UK</div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Er. Uttam Kumar</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Computer Science Engineer</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 dark:bg-indigo-600/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-600/20 dark:bg-violet-600/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                 <div className="w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden glass-card p-2">
                    <img 
                      src="https://raw.githubusercontent.com/the-muda-coder/storage/main/uttam_profile.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/img.jpeg";
                      }}
                    />
                 </div>
                 <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">About Me</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      As a passionate Computer Science Engineer, I specialize in JAVA & C language, DSA, Oops, OS, CSO, SQL, DE, CWS and Web dev etc. I enjoy bridging the gap between technical requirements and user-centric design.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="glass p-4 rounded-xl border border-slate-200 dark:border-white/5">
                          <span className="text-xs text-slate-500 block mb-1">Email</span>
                          <span className="text-sm font-medium break-all">uttamkumarchilous123@gmail.com</span>
                       </div>
                       <div className="glass p-4 rounded-xl border border-slate-200 dark:border-white/5">
                          <span className="text-xs text-slate-500 block mb-1">Mobile</span>
                          <span className="text-sm font-medium">+91 6207749605</span>
                       </div>
                    </div>
                 </div>
              </div>
              {/* Other sections omitted for brevity but they remain in the full file */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                   <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                   Technical Expertise
                </h3>
                <div className="grid gap-8">
                  {skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="skill-bar h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-lg shadow-indigo-500/20" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                   <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                   Education & Career
                </h3>
                <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-slate-800">
                   {[
                     { year: '2020 - Present', title: 'B.Tech in Computer Science', sub: 'Engineering University' },
                     { year: '2023 Summer', title: 'Full Stack Intern', sub: 'Tech Innovations Inc.' }
                   ].map((item, i) => (
                     <div key={i} className="pl-10 relative">
                        <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-indigo-600/20 border-4 border-slate-50 dark:border-[#0f172a] ring-1 ring-indigo-500/50"></div>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 block uppercase tracking-widest">{item.year}</span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-slate-500 dark:text-slate-400">{item.sub}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'projects' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-4xl font-bold mb-12 text-center text-slate-900 dark:text-white">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {projects.map((project, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300">
                  <div className="h-48 rounded-xl bg-slate-100 dark:bg-slate-800 mb-6 overflow-hidden relative border border-slate-200 dark:border-white/5">
                     <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-700 font-bold text-2xl tracking-widest uppercase">
                        {project.title}
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">{tag}</span>
                    ))}
                  </div>
                  <a href={project.link} className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80">
                    VIEW DETAILS <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
               <h2 className="text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">Get In Touch</h2>
               <p className="text-slate-500 dark:text-slate-400 text-center mb-10">Have a project in mind? Let's talk engineering.</p>
               <form 
                 onSubmit={(e) => {
                   e.preventDefault();
                   alert("Thank you! Your message has been sent to uttamkumarchilous123@gmail.com (Simulation)");
                 }}
                 className="glass-card p-8 rounded-3xl space-y-6"
               >
                 <Input label="Name" placeholder="Your Name" required />
                 <Input label="Email" type="email" placeholder="Your Email" required />
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Message</label>
                    <textarea 
                      rows={4} 
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 shadow-inner"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                 </div>
                 <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                   Send Message
                 </button>
               </form>
            </div>
          </div>
        )}

        {currentPage === 'login' && (
          <div className="max-w-md mx-auto px-6 py-10 animate-fade-in">
             <div className="glass-card p-10 rounded-[2.5rem] border-slate-200 dark:border-white/10">
                <div className="text-center mb-10">
                   <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 mb-6 transform -rotate-12 overflow-hidden p-3 font-bold text-2xl">
                      UK
                   </div>
                   <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Client Portal</h2>
                   <p className="text-slate-500">Secure access for project tracking.</p>
                </div>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); handlePageChange('dashboard'); }}>
                   <Input label="Email" type="email" placeholder="client@company.com" required />
                   <Input label="Password" type="password" placeholder="••••••••" required />
                   <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                     Log In
                   </button>
                </form>
                <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
                  Secured by Er. uttam kumar
                </p>
             </div>
          </div>
        )}

        {currentPage === 'dashboard' && (
          <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in text-center">
             <div className="glass-card p-12 rounded-[3rem]">
                <div className="w-24 h-24 bg-green-500/20 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Welcome to Your Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto">This is a secure area for clients to view project timelines and documents.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                   <div className="p-6 glass rounded-2xl border border-slate-200 dark:border-white/5">
                      <span className="text-slate-500 text-sm block mb-1">Active Projects</span>
                      <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">12</span>
                   </div>
                   <div className="p-6 glass rounded-2xl border border-slate-200 dark:border-white/5">
                      <span className="text-slate-500 text-sm block mb-1">Upcoming Deadlines</span>
                      <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
                   </div>
                   <div className="p-6 glass rounded-2xl border border-slate-200 dark:border-white/5">
                      <span className="text-slate-500 text-sm block mb-1">Invoices Paid</span>
                      <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">98%</span>
                   </div>
                </div>
                <button onClick={() => { setIsLoggedIn(false); handlePageChange('home'); }} className="text-sm font-bold text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-white transition-colors">
                  LOG OUT
                </button>
             </div>
          </div>
        )}
      </main>

      {/* Dynamic Career Tip Bar */}
      <div className="fixed bottom-0 w-full z-40 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-t border-slate-200 dark:border-white/5 py-3 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse"></span>
            wellcome
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium italic truncate max-w-full">
            "{careerTip}"
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 py-16 px-6 border-t border-slate-200 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
            <div className="text-center md:text-left">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">Er. Uttam <span className="text-indigo-600 dark:text-indigo-500">Kumar</span></span>
              <p className="text-slate-500 text-sm mt-2">Computer Science Engineer & Modern Architect</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.linkedin.com/in/uttam-kumar-5a564a224?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <style>{`
                .social-icon {
                  @apply w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white transition-all hover:-translate-y-1 border border-slate-200 dark:border-white/5;
                }
                .social-icon:nth-child(1):hover { background: #0077b5; }
                .social-icon:nth-child(2):hover { background: #333; }
                .social-icon:nth-child(3):hover { background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7); }
                .social-icon:nth-child(4):hover { background: #1877f2; }
                .social-icon:nth-child(5):hover { background: #1da1f2; }
              `}</style>
              <a href="https://github.com/uttamkumar7291" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-icon">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.841 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.instagram.com/vedavirus?igsh=NGdxaXA0b3pyNnI1" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1D125x3Qm4/" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-icon">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://x.com/UttamKumar85332" target="_blank" rel="noopener noreferrer" title="Twitter" className="social-icon">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>

            <div className="flex gap-4">
              <a href="mailto:uttamkumarchilous123@gmail.com" className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-indigo-600 transition-all shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
              <a href="tel:6207749605" className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-indigo-600 transition-all shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </a>
            </div>
          </div>
          
          <div className="text-slate-400 dark:text-slate-600 text-xs text-center border-t border-slate-200 dark:border-white/5 pt-8 w-full">
            &copy; {new Date().getFullYear()} Uttam Kumar. Built with Me ❤️ All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
