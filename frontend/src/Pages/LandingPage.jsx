import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Edit3, 
  Clock, 
  Users, 
  Share2, 
  BarChart3,
  UserPlus,
  Search,
  PenTool,
  ArrowRight,
  Menu,
  X,
  Star,
  Play,
  Check,
  Zap,
  Crown,
  Users as UsersIcon,
  Calendar,
  Target,
  Headphones,
  BookOpen
} from 'lucide-react';
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import hero_bg from '../assets/hero_bg.svg';

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Arvyax Wellness</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => navigate('/Account_Signing')} className="text-teal-600 hover:text-teal-700 px-4 py-2 text-sm font-medium transition-colors duration-200">
              Login
            </button>
            <button onClick={() => navigate('/Account_Signing')} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <button onClick={() => navigate('/Account_Signing')} className="text-teal-600 hover:text-teal-700 px-4 py-2 text-sm font-medium transition-colors duration-200">
                  Login
                </button>
                <button onClick={() => navigate('/Account_Signing')} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Component
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-teal-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="lg:pr-8">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Design Your Path to{' '}
                <span className="text-teal-600 relative">
                  Digital Wellness
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-teal-200 rounded animate-pulse"></div>
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Create, share, and experience personalized wellness sessions in a secure, tech-forward environment
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/Account_Signing')} className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>
                <button className="flex items-center justify-center px-8 py-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 group">
                  <Play size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0">
            <div className="rounde">
                <img src={hero_bg} alt="" className="rounded-xl border-4 border-teal-500" />
            </div>
        </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "JWT-based login system for your peace of mind",
      color: "teal"
    },
    {
      icon: Edit3,
      title: "Intuitive Session Editor",
      description: "Create and customize wellness sessions with ease",
      color: "teal"
    },
    {
      icon: Clock,
      title: "Real-time Autosave",
      description: "Never lose your progress with automatic saving",
      color: "blue"
    },
    {
      icon: Users,
      title: "Custom Wellness Paths",
      description: "Design personalized wellness journeys",
      color: "purple"
    },
    {
      icon: Share2,
      title: "Community Sharing",
      description: "Connect and share with wellness enthusiasts",
      color: "pink"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your wellness progress and insights",
      color: "indigo"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Digital Wellness
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, manage, and track your wellness journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`inline-flex p-3 rounded-xl bg-${feature.color}-100 text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your secure account",
      step: "01"
    },
    {
      icon: Search,
      title: "Explore Sessions",
      description: "Browse curated wellness content",
      step: "02"
    },
    {
      icon: PenTool,
      title: "Create Content",
      description: "Design your own sessions",
      step: "03"
    },
    {
      icon: Share2,
      title: "Share & Grow",
      description: "Connect with the community",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with your wellness journey in just four simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="text-teal-600" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2">
                    <div className="w-0 h-full bg-teal-600 transition-all duration-1000 group-hover:w-full"></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Component
const Pricing = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for individuals getting started with wellness",
      features: [
        "Up to 5 sessions per month",
        "Basic session editor",
        "Community access",
        "Email support",
        "Mobile app access"
      ],
      icon: UsersIcon,
      color: "teal",
      popular: false
    },
    {
      name: "Professional",
      price: "$19",
      period: "per month",
      description: "For wellness professionals and content creators",
      features: [
        "Unlimited sessions",
        "Advanced session editor",
        "Analytics dashboard",
        "Priority support",
        "Custom branding",
        "Session templates",
        "Export capabilities"
      ],
      icon: Crown,
      color: "purple",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      description: "For organizations and wellness businesses",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Advanced analytics",
        "API access",
        "White-label options",
        "Dedicated support",
        "Custom integrations",
        "Training sessions"
      ],
      icon: Zap,
      color: "yellow",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your wellness journey. Start free, upgrade when you're ready.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl' 
                  : 'border-gray-200 bg-white hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-xl bg-${plan.color}-100 text-${plan.color}-600 mb-4`}>
                  <plan.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => navigate('/Account_Signing')}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.price === "Free" ? "Get Started Free" : "Start Free Trial"}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial</p>
          <p className="text-sm text-gray-500">No credit card required • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Wellness Coach",
      content: "Arvyax has transformed how I approach my wellness journey. The platform is intuitive and the community is amazing.",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Yoga Instructor",
      content: "The session editor is incredibly powerful yet user-friendly. I can create professional wellness content in minutes.",
      avatar: "MC",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Meditation Teacher",
      content: "As a meditation teacher, Arvyax has helped me reach more students and create engaging content.",
      avatar: "ED",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Hear from wellness professionals who trust Arvyax
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-400">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Join the Future of Digital Wellness
        </h2>
        <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
          Start creating your wellness journey today
        </p>
        <button 
          onClick={() => navigate('/Account_Signing')}
          className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Get Started Free
        </button>
        <p className="text-teal-200 text-sm mt-4">No credit card required</p>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Resources'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    'Stay Updated': ['Newsletter', 'Social Media']
  };

const icons = {
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
  instagram: <FaInstagram />,
  github: <FaGithub />
};

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Arvyax Wellness</h3>
            <p className="text-gray-400 mb-6">
              Revolutionizing digital wellness through technology and community.
            </p>
                <div className="flex space-x-4">
                {['twitter', 'linkedin', 'instagram', 'github'].map((social) => (
                    <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors duration-200 text-white"
                    >
                    <span className="sr-only">{social}</span>
                    {icons[social]}
                    </a>
                ))}
                </div>

          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Arvyax Wellness. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Floating CTA Button
const FloatingCTA = () => {
  
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-16'
    }`}>
      <button onClick={() => navigate('/Account_Signing')} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center space-x-2 group">
        <span className="font-semibold">Join Now</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
};

// Main LandingPage Component
const LandingPage = () => {
  return (
    <div className="LandingPage">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.3s both;
        }
      `}</style>
      
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTASection />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default LandingPage;