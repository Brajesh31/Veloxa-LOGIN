import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, Award, BarChart2, Calendar, Cloud, MapPin, 
  TrendingUp, UserPlus, Users, AlertTriangle 
} from 'lucide-react';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const user = {
    name: "Alex Rider",
    totalDistance: 1254,
    ridesCompleted: 86,
    achievements: 14,
    profileImage: "/api/placeholder/150/150"
  };

  // Mock notifications
  const notifications = [
    { id: 1, type: "event", message: "Citywide Bike Marathon this weekend!", time: "2 hours ago" },
    { id: 2, type: "route", message: "New bike lane opened on Oak Street", time: "1 day ago" },
    { id: 3, type: "community", message: "Sarah shared a new route: Mountain Loop", time: "2 days ago" },
    { id: 4, type: "alert", message: "Construction reported on Pine Avenue", time: "3 days ago" }
  ];

  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, name: "Sunday Group Ride", date: "Apr 14", participants: 12 },
    { id: 2, name: "Charity Bike Marathon", date: "Apr 21", participants: 156 },
    { id: 3, name: "Mountain Trail Exploration", date: "Apr 28", participants: 8 }
  ];

  // Mock recent routes
  const recentRoutes = [
    { id: 1, name: "Morning Commute", distance: "7.2 km", date: "Today" },
    { id: 2, name: "Riverside Loop", distance: "15.4 km", date: "Yesterday" },
    { id: 3, name: "Mountain View Trail", distance: "22.8 km", date: "Apr 8" }
  ];


  // Simulated weather API fetch
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setWeatherData({
            location: "San Francisco",
            temperature: 18,
            condition: "Partly Cloudy",
            wind: {
              speed: 12,
              direction: "NW"
            },
            precipitation: 10
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation sidebar */}
      <Navigation/>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your cycling dashboard with the latest updates.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Distance</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.totalDistance} km</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Rides Completed</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.ridesCompleted}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Achievements</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.achievements}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Community Rank</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">#42</p>
            </div>
          </div>
        </div>

        {/* Weather Section */}
        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
            <div className="ml-4">
              <p>Loading weather data...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
            <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-full">
              <Cloud className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Current Weather</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {weatherData.location}: {weatherData.temperature}°C, {weatherData.condition}
              </p>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Notifications</h2>
          <ul>
            {notifications.map(notification => (
              <li key={notification.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm">{notification.type}</p>
                <p className="text-gray-800 dark:text-white">{notification.message}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{notification.time}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Upcoming Events</h2>
          <ul>
            {upcomingEvents.map(event => (
              <li key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm">{event.name}</p>
                <p className="text-gray-800 dark:text-white">{event.date} | {event.participants} participants</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Routes */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Recent Routes</h2>
          <ul>
            {recentRoutes.map(route => (
              <li key={route.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm">{route.name}</p>
                <p className="text-gray-800 dark:text-white">{route.distance} | {route.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
