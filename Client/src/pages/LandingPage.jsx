// pages/LandingPage.jsx
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { 
  MapPin, Sun, Moon, Cloud, Map, Users, UserPlus, Calendar, 
  Navigation, Compass, Shield, Leaf, Wifi, ArrowRight, ChevronDown
} from 'lucide-react';

import { auth } from '../Firebase/firebase.js'; 
import { GoogleAuthProvider } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import CyclistImage from '../assets/LandingPageImage.png'
import axios from 'axios';

const LandingPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      let authProvider
      authProvider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const response = await axios.post('http://localhost:3000/api/auth/google', { auth_token: idToken });
      localStorage.setItem('authToken', idToken);
      navigate('/dashboard')
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };


  // Force dark mode on landing page load but remember user preference
  useEffect(() => {
    const originalTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    document.documentElement.classList.add('dark');
    
    return () => {
      if (originalTheme === 'light') {
        document.documentElement.classList.remove('dark');
      }
    };
  }, []);

  const features = [
    {
      title: "Weather Integration",
      description: "Real-time weather updates with wind direction, precipitation levels, and temperature forecasts for your routes.",
      icon: <Cloud className="h-8 w-8 text-green-400" />
    },
    {
      title: "Road Compatibility",
      description: "Discover bike-friendly roads, gravel paths, and off-road trails with user ratings for conditions and safety.",
      icon: <Map className="h-8 w-8 text-green-400" />
    },
    {
      title: "Community Data",
      description: "Report road obstructions, potholes, or unsafe areas and suggest route improvements to fellow cyclists.",
      icon: <Users className="h-8 w-8 text-green-400" />
    },
    {
      title: "Personalized Routes",
      description: "Get route recommendations based on your preferences with detailed elevation profiles and difficulty ratings.",
      icon: <Compass className="h-8 w-8 text-green-400" />
    },
    {
      title: "Social Features",
      description: "Share routes, photos, ride statistics and find nearby cyclists for group adventures.",
      icon: <UserPlus className="h-8 w-8 text-green-400" />
    },
    {
      title: "Eco-Friendly Focus",
      description: "Find sustainable travel routes that avoid high-traffic areas and reduce environmental impact while cycling.",
      icon: <Leaf className="h-8 w-8 text-green-400" />
    },
    {
      title: "Offline Navigation",
      description: "Access offline maps and turn-by-turn navigation for remote areas or long-distance rides.",
      icon: <Navigation className="h-8 w-8 text-green-400" />
    },
    {
      title: "Events & Groups",
      description: "Organize group rides or participate in local cycling events with our community calendar feature.",
      icon: <Calendar className="h-8 w-8 text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
    {/* Green gradient background effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-transparent pointer-events-none"></div>
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

    {/* Header */}
    <header className="sticky top-0 z-10 backdrop-blur-md bg-black/70 border-b border-green-900/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
           <img src={Logo} alt="Veloxa Logo" className="ml-2 h-8 w-auto" />
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            {theme === 'dark' ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-200" />}
          </button>
          <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:shadow-md transition">
            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
               <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h147.2c-6.4 34.8-25.2 64.3-53.7 84.1v69h86.8c50.7-46.7 81.2-115.7 81.2-197.9z"/>
               <path fill="#34A853" d="M272 544.3c72.6 0 133.5-24 178-65.3l-86.8-69c-24.1 16.2-55 25.8-91.2 25.8-70.2 0-129.7-47.4-151-111.2h-89v70.2c44.6 87.3 136.6 149.5 240 149.5z"/>
               <path fill="#FBBC05" d="M121 324.6c-10.1-30-10.1-62.5 0-92.5v-70.2h-89c-39.4 77.9-39.4 168.7 0 246.6l89-70.2z"/>
               <path fill="#EA4335" d="M272 107.7c39.5-.6 77.1 13.9 105.9 39.7l79.4-79.4C409.5 24.2 342.7 0 272 0 168.6 0 76.6 62.2 32 149.5l89 70.2c21.3-63.8 80.8-111.2 151-111.2z"/>
           </svg>
             Sign in
         </button>

        </div>
      </div>
    </header>

    {/* Hero Section - Modified with proper spacing */}
    <section className="relative py-16 md:py-28 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          {/* Text Content - On left for desktop, above image for mobile */}
          <div className="w-full md:w-1/2 order-1 text-center md:text-left mb-10 md:mb-0 md:pl-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              Cycle Confidently with Veloxa
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto md:mx-0 text-gray-300">
              The ultimate companion for cycling enthusiasts. Smart routes, real-time weather, and a vibrant community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6">
              <Link 
                to="/register" 
                className="group px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Get Started 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <a 
                href="#features" 
                className="group px-8 py-4 text-lg font-medium text-green-400 bg-green-900/30 backdrop-blur-sm border border-green-500/30 rounded-lg hover:bg-green-900/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Explore Features
                  <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                </span>
              </a>
            </div>
          </div>
          
          {/* Image Container - On right for desktop, below text for mobile */}
          <div className="w-full md:w-1/2 order-2 mt-8 md:mt-0">
            <div className="relative max-w-lg mx-auto">
              {/* Multi-layered image with depth effect */}
              <div className="relative">
                {/* Background Cycling Path - slightly larger and offset */}
                <div className="absolute -top-6 -left-6 right-6 bottom-6 bg-green-900/30 rounded-2xl transform rotate-3"></div>
                
                {/* Green glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-transparent rounded-2xl blur-md"></div>
                
                {/* Main Image */}
                <div className="relative z-10">   
                 <img 
                    src={CyclistImage} 
                    alt="Cyclist on a trail" 
                    className="rounded-2xl shadow-2xl shadow-green-500/20 w-full h-auto object-cover border border-green-500/30"
                  /> 
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-1/4 -left-12 w-24 h-24 bg-green-500/30 rounded-full blur-xl animate-pulse" style={{animationDuration: "4s"}}></div>
                <div className="absolute bottom-1/3 -right-12 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse" style={{animationDuration: "6s", animationDelay: "2s"}}></div>
                
                {/* Bicycle wheel pattern - subtle decoration */}
                <div className="absolute bottom-8 left-8 w-16 h-16 border-4 border-green-500/20 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-green-400/20 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-1 h-16 bg-green-400/20 transform rotate-45"></div>
                <div className="absolute bottom-8 left-8 w-1 h-16 bg-green-400/20 transform -rotate-45"></div>
                
                {/* Subtle compass/navigation pattern */}
                <div className="absolute top-8 right-8 w-20 h-20">
                  <div className="absolute inset-0 border-2 border-green-500/10 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-green-500/10 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-16 bg-green-500/10 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
          What Veloxa Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 bg-gray-900/80 backdrop-blur-sm border border-green-900/50 rounded-xl hover:border-green-500/50 shadow-lg transition-all duration-500 hover:shadow-green-500/20 hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6 bg-gray-800/50 p-4 rounded-full w-16 h-16 mx-auto group-hover:bg-green-900/50 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-center group-hover:text-green-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* App Showcase Section */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Experience Veloxa in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how our platform transforms the way you plan, ride, and connect with fellow cyclists.
            </p>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-sm border border-green-900/50 rounded-2xl shadow-2xl overflow-hidden hover:shadow-green-500/20 transition-all duration-500">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
              <div className="text-center p-8">
                <div className="animate-pulse mb-4">
                  <MapPin className="h-16 w-16 text-green-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-2">App Demo</h3>
                <p className="text-gray-400">Interactive app preview would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-green-900/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
          What Cyclists Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Thompson",
              role: "Mountain Biker",
              quote: "Veloxa's offline navigation has been a game-changer for my trail rides. I never worry about losing my way!"
            },
            {
              name: "Sarah Chen",
              role: "Road Cyclist",
              quote: "The weather integration helps me plan perfect rides. The route recommendations are spot on for my preferences."
            },
            {
              name: "Marcus Johnson",
              role: "Daily Commuter",
              quote: "I love how the community reports hazards. It's made my daily commute safer and more enjoyable."
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="group p-8 bg-gray-900/80 backdrop-blur-sm border border-green-900/50 rounded-xl hover:border-green-500/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transform hover:-translate-y-1"
            >
              <p className="text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:from-green-400 group-hover:to-green-500 transition-colors duration-300">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Enhance Your Cycling Experience?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-green-100/80">
          Join thousands of cyclists who are discovering better routes, connecting with the community, and riding smarter.
        </p>
        <Link 
          to="/register" 
          className="group inline-flex items-center px-8 py-4 text-lg font-medium text-green-900 bg-gradient-to-r from-green-400 to-green-300 rounded-lg hover:from-green-300 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-green-400/30"
        >
          Create Your Account
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-black border-t border-green-900/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-green-500" />
              <span className="ml-2 text-xl font-bold">Veloxa</span>
            </div>
            <p className="text-gray-500">
              Your ultimate cycling companion for safer, smarter rides.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Features</h3>
            <ul className="space-y-2 text-gray-500">
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Weather Integration</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Route Recommendations</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Social Cycling</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Events & Groups</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Company</h3>
            <ul className="space-y-2 text-gray-500">
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">About Us</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Blog</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Careers</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Legal</h3>
            <ul className="space-y-2 text-gray-500">
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Terms of Service</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-900/30 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Veloxa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
);
};
export default LandingPage;