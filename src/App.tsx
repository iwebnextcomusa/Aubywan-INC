import { useState, useEffect, FormEvent } from 'react';
import { 
  Home as HomeIcon, 
  Building2, 
  Hammer, 
  ChefHat, 
  ShowerHead, 
  Layers, 
  Scissors, 
  Sun, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp, 
  Check, 
  CheckCircle2, 
  Star, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Award, 
  Users, 
  HardHat,
  ArrowRight,
  Info,
  Calendar,
  ThumbsUp,
  Sliders,
  Sparkles
} from 'lucide-react';
import { ServiceItem, ProjectItem, TestimonialItem, FAQItem, InquiryFormData } from './types';
import { SERVICES, PROJECTS, TESTIMONIALS, FAQS } from './data';
// @ts-ignore
import heroFramingImg from './assets/images/hero_construction_framing_1782761355884.jpg';
import Chatbot from './components/Chatbot';

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sticky header shadow state
  const [scrolled, setScrolled] = useState(false);
  
  // Project filter state
  const [projectFilter, setProjectFilter] = useState<'all' | 'residential' | 'commercial' | 'renovation' | 'exterior' | 'interior'>('all');
  
  // Selected project for lightbox modal
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  // Draggable before/after slider position (percentage 0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  
  // Expanded FAQ items tracker
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  
  // Show scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Contact form submission states
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Construction',
    message: '',
    newsletterSignup: false,
  });
  const [formErrors, setFormErrors] = useState<Partial<InquiryFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Stats numbers for animated counter look
  const [projectsCount, setProjectsCount] = useState(120);
  const [yearsCount, setYearsCount] = useState(1);
  const [satisfactionCount, setSatisfactionCount] = useState(85);

  useEffect(() => {
    // Scroll event listeners
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animate statistics counter slightly on load
    const interval = setInterval(() => {
      setProjectsCount((prev) => (prev < 342 ? prev + 6 : 342));
      setYearsCount((prev) => (prev < 15 ? prev + 1 : 15));
      setSatisfactionCount((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Map dynamic icon helper
  const getIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Home': return <HomeIcon className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'ChefHat': return <ChefHat className={className} />;
      case 'ShowerHead': return <ShowerHead className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Scissors': return <Scissors className={className} />;
      case 'Sun': return <Sun className={className} />;
      default: return <Hammer className={className} />;
    }
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Form validation & submission
  const validateForm = () => {
    const errors: Partial<InquiryFormData> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) errors.message = 'Message details are required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate real database submission / secure webhook trigger
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Residential Construction',
        message: '',
        newsletterSignup: false,
      });
    }, 1500);
  };

  const filteredProjects = projectFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === projectFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-orange selection:text-white">
      
      {/* HEADER / NAVIGATION BAR */}
      <header 
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-slate-200 ${
          scrolled 
            ? 'shadow-md py-3' 
            : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-brand-orange p-2 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 6h4m-4 4h4m1 4h1m-7 4h1" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-slate-950 underline decoration-brand-orange decoration-4 underline-offset-4">
              Aubywan <span className="text-brand-orange">INC</span>
            </span>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold uppercase tracking-wider">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('before-after')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Transformations
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('faqs')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Call / Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="tel:4387634122" 
              className="bg-slate-950 text-white px-6 py-2.5 text-sm font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors"
              title="Click to Call Construction Aubywan"
            >
              438-763-4122
            </a>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-brand-orange text-white text-sm font-bold uppercase tracking-wider px-6 py-2.5 hover:bg-slate-950 transition-colors cursor-pointer"
            >
              Free Estimate
            </button>
          </div>

          {/* Hamburger Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="w-6 h-6 text-slate-900" />
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl py-4 px-6 space-y-3.5 absolute top-full left-0 right-0 animate-in fade-in slide-in-from-top-5 duration-200">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('before-after')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              Transformations
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('faqs')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left font-semibold text-slate-800 py-1.5 hover:text-brand-orange"
            >
              Contact
            </button>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2.5">
              <a 
                href="tel:4387634122" 
                className="flex items-center justify-center space-x-2 text-sm font-mono font-bold bg-slate-950 text-white py-3 rounded-xl"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>438-763-4122</span>
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-brand-orange text-white text-center py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md cursor-pointer"
              >
                Request Free Estimate
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative bg-slate-950 text-white pt-24 pb-16 lg:pt-36 lg:pb-32 overflow-hidden min-h-screen flex items-center"
      >
        {/* Background Image Layer with Heavy Dark Overlay */}
        <div className="absolute inset-0 z-0 opacity-45">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
            alt="Construction Site" 
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6 text-left animate-in fade-in slide-in-from-left-10 duration-500">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-brand-orange/30 rounded-none px-3 py-1 text-xs text-brand-orange font-mono">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-ping"></span>
              <span className="font-semibold uppercase tracking-wider">Saint-Eustache & North Shore Specialists</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4">
              Building Quality. <br />
              <span className="text-brand-orange">Delivering Excellence.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Your trusted general contractor in Saint-Eustache, QC. We specialize in premium residential framing, 
              commercial partition walls, custom home builds, and exquisite renovations driven by master craftsmanship.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-900">
              <div>
                <span className="block font-mono font-bold text-2xl text-brand-orange">RBQ</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Licensed Builder</span>
              </div>
              <div>
                <span className="block font-mono font-bold text-2xl text-brand-orange">100%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Insured Cover</span>
              </div>
              <div>
                <span className="block font-mono font-bold text-2xl text-brand-orange">Local</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Saint-Eustache QC</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-brand-orange text-white px-8 py-4 font-bold uppercase tracking-wider shadow-lg shadow-orange-950/40 hover:bg-white hover:text-slate-950 transition-colors rounded-none text-center cursor-pointer"
              >
                Request Free Estimate
              </button>
              
              <button
                onClick={() => scrollToSection('projects')}
                className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-slate-950 transition-colors rounded-none text-center cursor-pointer"
              >
                Our Portfolio
              </button>
            </div>
          </div>

          {/* Hero Render Right - Professional Construction Imaging Card */}
          <div className="lg:col-span-5 h-[350px] lg:h-[450px] bg-slate-950 rounded-none border-2 border-slate-950 relative overflow-hidden shadow-[8px_8px_0px_0px_#ea580c] group animate-in fade-in slide-in-from-right-10 duration-500">
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <div className="bg-slate-950 border-2 border-slate-900 rounded-none p-2.5 shadow-md">
                <div className="text-[10px] font-mono font-black text-brand-orange flex items-center gap-1.5 uppercase tracking-wider">
                  <div className="w-2.5 h-2.5 bg-brand-orange rounded-none animate-pulse"></div>
                  Aubywan Custom Structural Framing
                </div>
              </div>
            </div>
            
            <img 
              src={heroFramingImg} 
              alt="Construction Aubywan professional wood framing" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Subtle overlay card at the bottom to describe what they are seeing */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 border border-slate-800 p-3 rounded-none backdrop-blur-sm">
              <span className="text-[9px] font-mono font-bold text-brand-orange uppercase block mb-0.5 tracking-wider">Active Project Study</span>
              <p className="text-[11px] text-slate-300 font-normal leading-tight">
                Laser-aligned wooden framing and load-bearing timber installations for a custom residential build.
              </p>
            </div>
          </div>

        </div>

        {/* Floating Years of Service Badge from theme design */}
        <div className="absolute bottom-0 right-0 bg-brand-orange p-8 text-white hidden lg:block z-10">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black">15+</div>
            <div className="text-xs uppercase font-bold leading-tight">Years of<br />Service in QC</div>
          </div>
        </div>
      </section>

      {/* QUICK STATS COUNTER BAR */}
      <section className="bg-slate-50 border-y border-slate-200 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            <div className="pt-4 md:pt-0">
              <div className="flex items-center justify-center space-x-2 text-brand-orange mb-2">
                <HardHat className="w-6 h-6 shrink-0" />
                <span className="font-extrabold text-5xl text-slate-950 tracking-tighter">{projectsCount}+</span>
              </div>
              <p className="text-slate-900 text-xs font-black uppercase tracking-[0.15em]">Completed Projects</p>
            </div>

            <div className="pt-6 md:pt-0">
              <div className="flex items-center justify-center space-x-2 text-brand-orange mb-2">
                <Award className="w-6 h-6 shrink-0" />
                <span className="font-extrabold text-5xl text-slate-950 tracking-tighter">{yearsCount}+ Years</span>
              </div>
              <p className="text-slate-900 text-xs font-black uppercase tracking-[0.15em]">Service in QC</p>
            </div>

            <div className="pt-6 md:pt-0">
              <div className="flex items-center justify-center space-x-2 text-brand-orange mb-2">
                <Users className="w-6 h-6 shrink-0" />
                <span className="font-extrabold text-5xl text-slate-950 tracking-tighter">{satisfactionCount}%</span>
              </div>
              <p className="text-slate-900 text-xs font-black uppercase tracking-[0.15em]">Client Satisfaction</p>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Grid Columns Left */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-none overflow-hidden shadow-xl border-4 border-slate-200 aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" 
                  alt="Construction Aubywan INC Team on site" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlapping small visual highlight */}
              <div className="absolute -bottom-6 -right-6 z-20 bg-slate-950 text-white p-6 rounded-none border border-slate-800 shadow-xl max-w-xs hidden sm:block">
                <p className="text-brand-orange font-mono text-xs uppercase tracking-widest font-semibold mb-2">Our Promise</p>
                <p className="text-slate-300 text-xs leading-relaxed font-light">
                  "No shortcuts. No compromises. We build every joint, studs, and beam as if it were holding up our own homes."
                </p>
                <div className="text-xs font-mono font-bold mt-3 text-right text-white">— Construction Aubywan Team</div>
              </div>

              {/* Back framing decorative box */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-brand-orange -z-0"></div>
            </div>

            {/* About us Content Right */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">Who We Are</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Trusted Construction Specialists Serving Saint-Eustache, Quebec
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm font-normal">
                At <strong>Construction Aubywan INC</strong>, we have earned an enviable reputation as premier builders and renovators on the North Shore of Montreal. 
                Based in Saint-Eustache, we combine deep structural engineering passion with premium carpentry techniques. 
                Whether we are rough-framing a modern customized residence, building commercial walls, finishing a spacious basement, or remodeling a high-end luxury kitchen, our team delivers high precision.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm font-normal">
                Our approach centers strictly on integrity, clear billing, and customer satisfaction. 
                We understand that construction is a major investment. That is why we provide complete oversight, 
                guaranteed materials compliance, and regular status check-ins, keeping your project stress-free from framing to finishing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-4 bg-slate-50 border-l-4 border-brand-orange shadow-sm">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-950 uppercase tracking-wide">Licensed General Contractor</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Fully registered RBQ operation in Quebec.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 border-l-4 border-brand-orange shadow-sm">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-950 uppercase tracking-wide">Civil Liability Insurance</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Comprehensive site protection & cover.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 border-l-4 border-brand-orange shadow-sm">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-950 uppercase tracking-wide">Bilingual Support</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Service seamless in French or English.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 border-l-4 border-brand-orange shadow-sm">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-950 uppercase tracking-wide">Detailed Written Estimates</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Transparent milestones, no surprise fees.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-brand-orange text-white text-xs font-black uppercase tracking-wider px-8 py-4 hover:bg-slate-950 transition-colors cursor-pointer rounded-none"
                >
                  Request a Free Estimate
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider px-8 py-4 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer rounded-none"
                >
                  Explore Services
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 lg:py-28 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Premium Construction & General Contracting Services
            </h2>
            <div className="h-1 w-16 bg-brand-orange mx-auto"></div>
            <p className="text-slate-600 text-sm font-normal leading-relaxed">
              We specialize in full-service construction. From solid foundational timber framing to level-5 drywall finishing, 
              we manage structural builds, bespoke kitchen modeling, and luxurious outdoor deck setups.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv) => (
              <div 
                key={srv.id}
                className="bg-white rounded-none p-6 border-2 border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-900 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon wrap */}
                  <div className="w-12 h-12 bg-slate-950 text-brand-orange rounded-none flex items-center justify-center mb-5 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                    {getIcon(srv.iconName)}
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-950 mb-2 uppercase tracking-tight">
                    {srv.name}
                  </h3>

                  <p className="text-slate-600 text-xs font-normal leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Details sub-list */}
                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key capabilities:</span>
                    <ul className="space-y-1">
                      {srv.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-slate-600 text-xs">
                          <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mr-1.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    scrollToSection('contact');
                    // auto fill project type
                    setFormData(prev => ({ ...prev, projectType: srv.name }));
                  }}
                  className="w-full text-center bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-700 text-xs font-bold uppercase py-2.5 rounded-none border border-slate-200 group-hover:border-slate-900 transition-colors cursor-pointer"
                >
                  Get a Quote
                </button>
              </div>
            ))}
          </div>

          {/* Quick extra services list */}
          <div className="mt-12 p-8 bg-slate-950 rounded-none border border-slate-800 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold block">Need Something Specific?</span>
              <h3 className="font-extrabold text-lg">We also specialize in Roofing, Drywall, Framing, custom finishes, and general contracting.</h3>
              <p className="text-slate-400 text-xs font-light max-w-3xl">
                Our versatile team consists of licensed carpenters, drywall experts, and structural engineers. We execute custom carpentry, decks, structural wall removals, siding and more.
              </p>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-brand-orange hover:bg-white hover:text-slate-950 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-none shrink-0 transition-colors cursor-pointer"
            >
              Consult an Expert
            </button>
          </div>

        </div>
      </section>

      {/* PORTFOLIO / GALLERY SECTION */}
      <section id="projects" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">Our Masterpieces</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Featured Work & Portfolio
              </h2>
              <div className="h-1 w-16 bg-brand-orange"></div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-wide">
              {['all', 'residential', 'commercial', 'renovation', 'exterior', 'interior'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat as any)}
                  className={`px-4 py-2 rounded-none border-2 transition-all cursor-pointer uppercase text-xs font-bold tracking-wider ${
                    projectFilter === cat 
                      ? 'bg-slate-950 border-slate-950 text-white shadow-sm' 
                      : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <span className="capitalize">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-white rounded-none overflow-hidden border-2 border-slate-200 shadow-md hover:shadow-2xl hover:border-slate-950 transition-all duration-300 cursor-pointer group"
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-xs text-brand-orange font-mono font-bold flex items-center gap-1">
                      View Project Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 bg-slate-950/95 border border-slate-800 text-brand-orange font-mono font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-none backdrop-blur-sm">
                    {proj.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span>{proj.location}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Client: <strong className="text-slate-700">{proj.client}</strong></span>
                    <span>Year: <strong className="text-slate-700">{proj.year}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DRAGGABLE BEFORE-AND-AFTER TRANSFORMATIONS SECTION */}
      <section id="before-after" className="py-20 lg:py-28 bg-slate-950 text-white border-t border-slate-900 relative overflow-hidden">
        {/* Decorative Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left explanation info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">Before & After</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Stunning Transformations Realized by Our Taping & Framing Crews
              </h2>
              <div className="h-1 w-16 bg-brand-orange"></div>

              <p className="text-slate-300 text-sm font-normal leading-relaxed">
                Take command of our interactive transformation lens. Slide the central slider left or right to inspect the precise structural renovations executed by Construction Aubywan INC. 
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-slate-900/85 p-4 rounded-none border border-slate-800">
                  <h4 className="text-sm font-semibold text-brand-orange mb-1">Project: Tremblay Kitchen Expansion</h4>
                  <p className="text-slate-400 text-xs font-light">
                    We removed standard dividing partitions, structural wall support, replaced load lines, inserted engineered timber beams, finished drywall, and laid premium ceramic tiling.
                  </p>
                </div>
                
                <div className="bg-slate-900/85 p-4 rounded-none border border-slate-800">
                  <h4 className="text-sm font-semibold text-slate-300 mb-1">Interactive Instruction</h4>
                  <p className="text-slate-400 text-xs font-light">
                    Click and drag the glowing slider handles on the right to examine the before state (dark traditional structure) vs the completed, bright, open-concept layout.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Slider Container */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* Slider Wrapper */}
              <div className="w-full max-w-2xl aspect-[16/10] bg-slate-900 rounded-none overflow-hidden relative border-4 border-slate-900 shadow-2xl group select-none">
                
                {/* BEFORE Image (Base layer) */}
                <img 
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop" 
                  alt="Kitchen Remodeling Before state" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 bg-black/80 px-2.5 py-1 rounded-none text-[10px] font-mono tracking-widest text-white uppercase z-10">
                  Before renovation
                </div>

                {/* AFTER Image (Top sliding layer) */}
                <div 
                  className="absolute inset-y-0 right-0 overflow-hidden"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop" 
                    alt="Kitchen Remodeling After state" 
                    className="absolute inset-y-0 right-0 w-full h-full object-cover max-w-none pointer-events-none"
                    style={{ width: '100%', left: `-${sliderPosition}%` }}
                  />
                  <div className="absolute bottom-4 right-4 bg-brand-orange px-2.5 py-1 rounded-none text-[10px] font-mono tracking-widest text-white uppercase z-10">
                    After custom build
                  </div>
                </div>

                {/* SLIDER BAR / HANDLE */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white hover:bg-brand-orange cursor-ew-resize z-20 flex items-center justify-center transition-colors"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-none bg-slate-900 border-2 border-white text-white flex items-center justify-center shadow-lg pointer-events-none select-none group-hover:scale-110 transition-transform">
                    <Sliders className="w-3.5 h-3.5 text-brand-orange" />
                  </div>
                </div>

                {/* HTML RANGE INPUT OVERLAY for robust drag controls */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPosition} 
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Before and After Slider Control"
                />

              </div>

              <div className="mt-4 flex items-center space-x-6 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-slate-700 rounded-none"></span>
                  Before (Traditional)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-brand-orange rounded-none"></span>
                  After (Construction Aubywan)
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              What Our Clients Say About Construction Aubywan INC
            </h2>
            <div className="h-1 w-16 bg-brand-orange mx-auto"></div>
            <p className="text-slate-600 text-sm font-normal">
              We are honored to have transformed homes and offices for amazing residents across Saint-Eustache and Quebec. Read real feedback about our projects.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="bg-slate-50 rounded-none p-6 border-2 border-slate-200 flex flex-col justify-between shadow-sm relative group hover:bg-slate-950 hover:text-white hover:border-slate-950 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Quotes background decor */}
                  <span className="absolute top-4 right-6 font-serif text-slate-200 group-hover:text-slate-800 text-6xl pointer-events-none">“</span>

                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-4 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-slate-600 group-hover:text-slate-300 text-xs leading-relaxed font-normal mb-6 italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="border-t border-slate-200/60 group-hover:border-slate-800 pt-4 mt-2">
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-white uppercase tracking-tight">
                    {t.name}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 flex flex-col">
                    <span>Project: <strong>{t.projectType}</strong></span>
                    <span>Location: <strong>{t.location}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PORTFOLIO LIGHTBOX CASE MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-none max-w-4xl w-full overflow-hidden shadow-2xl relative border-2 border-slate-950 flex flex-col md:flex-row max-h-[90vh] md:max-h-none">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 bg-slate-900 hover:bg-brand-orange text-white p-2 rounded-none z-20 transition-colors cursor-pointer"
              title="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View */}
            <div className="md:w-1/2 bg-slate-950 relative min-h-[300px] md:min-h-0">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              {selectedProject.beforeImage && (
                <div className="absolute bottom-4 left-4 bg-brand-orange/95 border border-brand-orange/30 text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-none">
                  Active Site Case Study
                </div>
              )}
            </div>

            {/* Right content view */}
            <div className="md:w-1/2 p-8 overflow-y-auto space-y-6 text-left">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-orange">
                  {selectedProject.category} Project Study
                </span>
                <h3 className="font-extrabold text-2xl text-slate-950 uppercase tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange mr-1" />
                  <span>{selectedProject.location}</span>
                </div>
              </div>

              <div className="h-0.5 w-16 bg-brand-orange"></div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Overview</h4>
                <p className="text-slate-600 text-xs font-normal leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Metadata list */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 font-mono text-[11px] text-slate-600">
                <div>
                  <span className="block text-[9px] text-slate-400 uppercase">Client Profile</span>
                  <strong>{selectedProject.client}</strong>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-400 uppercase">Completion Year</span>
                  <strong>{selectedProject.year}</strong>
                </div>
                {selectedProject.duration && (
                  <div className="col-span-2">
                    <span className="block text-[9px] text-slate-400 uppercase">Project Timeline Duration</span>
                    <strong className="text-brand-orange">{selectedProject.duration} (Framing to Taping)</strong>
                  </div>
                )}
              </div>

              {selectedProject.highlights && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Project Milestones</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {selectedProject.highlights.map((high, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mr-1.5" />
                        <span>{high}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    scrollToSection('contact');
                    setFormData(prev => ({ ...prev, projectType: selectedProject.title }));
                  }}
                  className="w-full text-center bg-slate-950 text-white hover:bg-brand-orange py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Consult on similar design
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* FAQ SECTION */}
      <section id="faqs" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="h-1 w-16 bg-brand-orange mx-auto"></div>
            <p className="text-slate-600 text-sm font-normal">
              Here are direct, honest answers to common questions about our free estimate policy, warranties, structural timelines, and RBQ licensing in Quebec.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-none border-2 border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between text-slate-900 hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    <span className="font-extrabold text-slate-950 text-sm sm:text-base leading-snug uppercase tracking-tight">
                      {faq.question}
                    </span>
                    <span className="shrink-0 p-1 rounded-none bg-slate-50 border border-slate-200 text-slate-400 hover:text-brand-orange ml-4">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-orange' : ''}`} />
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[300px] border-t border-slate-200 p-5 bg-slate-50' : 'max-h-0 opacity-0 pointer-events-none'
                    } overflow-hidden`}
                  >
                    <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Contact CTA */}
          <div className="mt-12 text-center p-6 bg-orange-100/50 rounded-none border-2 border-brand-orange/20 text-slate-800 max-w-2xl mx-auto">
            <span className="font-semibold text-xs text-brand-orange uppercase font-mono tracking-widest block mb-2">Have a Custom Inquiry?</span>
            <p className="text-xs text-slate-600 font-normal mb-4">
              Our AI estimator in the bottom corner is ready to chat instantly 24/7! Alternatively, book a site visit with our team.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-slate-950 hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-none transition-colors cursor-pointer"
            >
              Ask Our Estimators
            </button>
          </div>

        </div>
      </section>

      {/* SERVICE AREA MAP SECTION */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">Service Areas</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Proudly Serving Saint-Eustache & Surrounding Communities
              </h2>
              <div className="h-1 w-16 bg-brand-orange"></div>

              <p className="text-slate-600 text-sm font-normal leading-relaxed">
                We are a local general contracting company rooted in Saint-Eustache, QC. 
                Our rapid dispatch crews regularly service custom construction and remodeling clients across a 40km radius.
              </p>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Service Radius:</h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-brand-orange shrink-0"></span>
                    <strong>Saint-Eustache (HQ)</strong>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-slate-950 shrink-0"></span>
                    <strong>Laval</strong>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-slate-950 shrink-0"></span>
                    <strong>Deux-Montagnes</strong>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-slate-950 shrink-0"></span>
                    <strong>Blainville</strong>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-slate-950 shrink-0"></span>
                    <strong>Mirabel</strong>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-slate-950 shrink-0"></span>
                    <strong>Boisbriand</strong>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-slate-950 shrink-0"></span>
                    <strong>Sainte-Thérèse</strong>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-2 h-2 bg-slate-950 shrink-0"></span>
                    <strong>North Shore Area</strong>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-l-4 border-brand-orange flex items-start space-x-3 mt-4">
                  <Info className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs font-normal leading-relaxed">
                    Living slightly outside this radius? Contact our estimators. We regularly execute custom projects further out in the Laurentians depending on project scale.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side Vector Map mockup with professional custom CSS styling */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-none p-6 border-2 border-slate-800 text-white relative shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between">
                
                {/* Background geometric design representing a stylized vector map */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
                
                {/* Simulated service coordinates rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-brand-orange/15 rounded-full animate-ping duration-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-slate-800 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-slate-700 rounded-full"></div>

                {/* Map Labels representing Cities around Saint-Eustache */}
                <div className="absolute top-[18%] left-[45%] bg-slate-950 border border-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-none shadow-md z-10">
                  Mirabel QC
                </div>
                
                <div className="absolute top-[35%] left-[18%] bg-slate-950 border border-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-none shadow-md z-10">
                  Deux-Montagnes
                </div>

                <div className="absolute top-[68%] left-[70%] bg-slate-950 border border-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-none shadow-md z-10">
                  Laval (Nord)
                </div>

                <div className="absolute top-[32%] left-[72%] bg-slate-950 border border-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-none shadow-md z-10">
                  Blainville QC
                </div>

                {/* Central HQ Marker (Saint-Eustache) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                  <div className="w-10 h-10 bg-brand-orange text-white rounded-none flex items-center justify-center shadow-lg border-2 border-white animate-bounce relative">
                    <MapPin className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-none flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-none"></span>
                    </span>
                  </div>
                  <span className="mt-2 bg-slate-950 text-brand-orange font-mono font-bold text-xs px-2.5 py-1 rounded-none border border-brand-orange/30 shadow-md">
                    Saint-Eustache (HQ)
                  </span>
                </div>

                {/* Map Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3.5 h-3.5 bg-brand-orange rounded-none animate-pulse"></div>
                    <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">Interactive Dispatch Radar</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">RADIUS: 40KM</span>
                </div>

                {/* Map Footer controls */}
                <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-4 rounded-none border border-slate-800">
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 font-mono">NORTH SHORE LAT/LONG</div>
                    <div className="text-xs font-mono font-bold text-white">45.5577° N, 73.8964° W</div>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Saint-Eustache,+QC" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-brand-orange hover:bg-white hover:text-slate-950 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-none text-center cursor-pointer transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT & ESTIMATE REQUEST SECTION */}
      <section id="contact" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left side: Business detail card */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-orange block">Get in Touch</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Let's Discuss Your Next Construction Project
                </h2>
                <div className="h-1 w-16 bg-brand-orange"></div>
                <p className="text-slate-300 text-sm font-normal leading-relaxed max-w-md">
                  Whether you have architectural blueprints ready or just a sketch on a napkin, our general contracting experts are ready to consult.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-5">
                
                <a 
                  href="tel:4387634122" 
                  className="flex items-center space-x-4 p-4 bg-slate-950 rounded-none border-2 border-slate-800 hover:border-brand-orange transition-all group text-left"
                >
                  <div className="w-10 h-10 bg-brand-orange/15 rounded-none flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none mb-1">Direct Call (Estimator)</span>
                    <strong className="text-base font-mono text-white tracking-wide">438-763-4122</strong>
                  </div>
                </a>

                <a 
                  href="mailto:constructionaubywan@gmail.com" 
                  className="flex items-center space-x-4 p-4 bg-slate-950 rounded-none border-2 border-slate-800 hover:border-brand-orange transition-all group text-left"
                >
                  <div className="w-10 h-10 bg-brand-orange/15 rounded-none flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none mb-1">General Office Email</span>
                    <strong className="text-sm font-mono text-white tracking-wide break-all">constructionaubywan@gmail.com</strong>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-4 bg-slate-950 rounded-none border-2 border-slate-800 hover:border-brand-orange transition-all group text-left">
                  <div className="w-10 h-10 bg-brand-orange/15 rounded-none flex items-center justify-center shrink-0 text-brand-orange">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none mb-1">Business Hours</span>
                    <strong className="text-xs text-slate-300 font-mono">Mon - Fri: 7:00 AM - 6:00 PM</strong>
                  </div>
                </div>

              </div>

              {/* Trust certification labels */}
              <div className="bg-slate-950 p-5 rounded-none border-2 border-slate-800">
                <div className="flex items-center space-x-2 text-brand-orange mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Quality Guarantee Certificate</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  Construction Aubywan INC executes works under strict construction parameters. Our estimates provide solid pricing quotes that are transparent and fully audited.
                </p>
              </div>

            </div>

            {/* Right side: Interactive Form with validation and checks */}
            <div className="lg:col-span-7 bg-white text-slate-800 rounded-none p-8 border-2 border-slate-200 shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-none border-2 border-green-500 flex items-center justify-center text-green-600 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-2xl text-slate-950 uppercase tracking-tight">Estimate Request Received!</h3>
                    <p className="text-sm text-slate-600 font-normal max-w-md">
                      Thank you for contacting <strong>Construction Aubywan INC</strong>. Our senior framing and remodeling estimators are reviewing your parameters immediately.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-none text-left max-w-md font-mono text-xs text-slate-600">
                    <div><strong>TICKET REF:</strong> AW-{Math.floor(Math.random() * 90000) + 10000}</div>
                    <div><strong>STATUS:</strong> ESTIMATOR DISPATCH SCHEDULED</div>
                    <div><strong>RESPONSE TIMELINE:</strong> Within 12 business hours</div>
                  </div>

                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-slate-950 hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-none transition-colors cursor-pointer"
                  >
                    Submit Another Quote Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-950 uppercase tracking-tight">Request a Free Estimate</h3>
                    <p className="text-slate-500 text-xs font-normal">Fill out your parameters to reserve your site visit slots.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label htmlFor="name-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name *</label>
                      <input 
                        id="name-input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                        }}
                        placeholder="John Doe"
                        className={`w-full bg-slate-50 border-2 ${formErrors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-orange'} rounded-none px-4 py-3 text-sm focus:bg-white focus:outline-none transition-colors`}
                      />
                      {formErrors.name && <span className="text-[10px] text-red-500 font-mono">{formErrors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label htmlFor="email-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email Address *</label>
                      <input 
                        id="email-input"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        placeholder="john@example.com"
                        className={`w-full bg-slate-50 border-2 ${formErrors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-orange'} rounded-none px-4 py-3 text-sm focus:bg-white focus:outline-none transition-colors`}
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 font-mono">{formErrors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label htmlFor="phone-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Phone Number *</label>
                      <input 
                        id="phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        placeholder="438-763-4122"
                        className={`w-full bg-slate-50 border-2 ${formErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-orange'} rounded-none px-4 py-3 text-sm focus:bg-white focus:outline-none transition-colors`}
                      />
                      {formErrors.phone && <span className="text-[10px] text-red-500 font-mono">{formErrors.phone}</span>}
                    </div>

                    {/* Project Type */}
                    <div className="space-y-1">
                      <label htmlFor="project-type-select" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Project Category *</label>
                      <select 
                        id="project-type-select"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-none px-4 py-3 text-sm focus:bg-white focus:border-brand-orange focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Residential Construction">Residential Construction</option>
                        <option value="Commercial Construction">Commercial Construction</option>
                        <option value="Full Renovations">Full Renovations</option>
                        <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                        <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                        <option value="Basement Finishing">Basement Finishing</option>
                        <option value="Framing & Structural">Framing & Structural</option>
                        <option value="Decks & Patios">Decks & Patios</option>
                        <option value="Drywall & Taping">Drywall & Taping</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="message-textarea" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Describe your Project Parameters *</label>
                    <textarea 
                      id="message-textarea"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                      }}
                      placeholder="Please include details (e.g. kitchen square footage, structural load changes, framing needs, etc.)"
                      className={`w-full bg-slate-50 border-2 ${formErrors.message ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-orange'} rounded-none px-4 py-3 text-sm focus:bg-white focus:outline-none transition-colors`}
                    />
                    {formErrors.message && <span className="text-[10px] text-red-500 font-mono">{formErrors.message}</span>}
                  </div>

                  {/* Newsletter Signup */}
                  <div className="flex items-start space-x-2.5 pt-1">
                    <input 
                      id="newsletter-signup-check"
                      type="checkbox"
                      checked={formData.newsletterSignup}
                      onChange={(e) => setFormData({ ...formData, newsletterSignup: e.target.checked })}
                      className="w-4.5 h-4.5 rounded-none border-2 border-slate-300 text-brand-orange focus:ring-brand-orange shrink-0 mt-0.5"
                    />
                    <label htmlFor="newsletter-signup-check" className="text-xs text-slate-500 leading-normal">
                      Yes! Add me to Construction Aubywan's newsletter for seasonal home remodeling checklists and localized Quebec builder guides.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-orange hover:bg-slate-950 text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-none hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-none animate-spin"></div>
                          <span>Dispatching parameters...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request (Free Site visit Quote)</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="app-footer" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
          
          {/* Logo & details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-orange text-slate-950 border-2 border-slate-950 rounded-none flex items-center justify-center font-bold text-base shadow-[2px_2px_0px_#020617]">
                AW
              </div>
              <span className="font-extrabold text-base tracking-tight text-white uppercase">
                AUBYWAN
              </span>
            </div>
            <p className="text-slate-400 text-xs font-normal leading-relaxed">
              Construction Aubywan INC is Saint-Eustache's premier residential framer, commercial builder, and remodeler. We turn plans into structures.
            </p>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              RBQ License Registered
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-brand-orange transition-colors cursor-pointer">
                  Top of page
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-brand-orange transition-colors cursor-pointer">
                  About Construction Aubywan
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-brand-orange transition-colors cursor-pointer">
                  What we specialize in
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('projects')} className="hover:text-brand-orange transition-colors cursor-pointer">
                  Portfolio Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('before-after')} className="hover:text-brand-orange transition-colors cursor-pointer">
                  Transformations
                </button>
              </li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Specialties</h4>
            <ul className="space-y-2 text-xs">
              <li>Residential & Timber Framing</li>
              <li>Commercial Metal Partitioning</li>
              <li>Luxury Kitchen Refitting</li>
              <li>Custom Glass Tile Bathrooms</li>
              <li>Basement Suite Renovations</li>
              <li>Multi-level Cedar Decks</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Central Hub</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Saint-Eustache, Quebec, Canada</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="tel:4387634122" className="hover:text-white transition-colors">438-763-4122</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="mailto:constructionaubywan@gmail.com" className="hover:text-white transition-colors break-all">constructionaubywan@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line & requested credits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Construction Aubywan INC. All rights reserved. Registered in Quebec.
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
          </div>

          {/* MANDATORY CREDITS CENTER ALIGNED */}
          <div className="font-mono text-xs tracking-wider">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="text-brand-orange hover:underline font-bold">iWebNext</a>
          </div>
        </div>
      </footer>

      {/* FLOAT SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-40 bg-slate-950 text-brand-orange hover:text-white hover:bg-brand-orange p-3.5 rounded-none border-2 border-slate-950 hover:border-brand-orange shadow-[4px_4px_0px_0px_#020617] transition-all hover:-translate-y-1 cursor-pointer flex items-center justify-center group"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        </button>
      )}

      {/* CHATBOT INTEGRATION */}
      <Chatbot />

    </div>
  );
}
