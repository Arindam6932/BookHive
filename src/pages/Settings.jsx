import React, { useState, useMemo } from 'react';
import { Search, User, Palette, Bell, Shield, HelpCircle, Sun, Moon, Type, Paintbrush } from 'lucide-react';

// Data for settings categories and individual settings
const settingsData = [
  {
    category: 'Account',
    icon: <User className="w-5 h-5 mr-3 text-slate-500" />,
    settings: [
      { name: 'Edit Profile', description: 'Update your name, photo, and bio.', keywords: 'name photo bio' },
      { name: 'Change Password', description: 'Update your security credentials.', keywords: 'security login credentials' },
      { name: 'Email Address', description: 'Manage your email addresses.', keywords: 'contact notifications' },
      { name: 'Phone Numbers', description: 'Add or remove phone numbers for verification.', keywords: 'sms verification contact' },
    ],
  },
  {
    category: 'Appearance',
    icon: <Palette className="w-5 h-5 mr-3 text-slate-500" />,
    settings: [
      { name: 'Theme', description: 'Switch between light and dark mode.', icon: <Sun className="w-5 h-5 mr-2" />, keywords: 'dark light mode color' },
      { name: 'Primary Color', description: 'Customize the main color of the interface.', icon: <Paintbrush className="w-5 h-5 mr-2" />, keywords: 'theme style color' },
      { name: 'Font Size', description: 'Adjust the text size for better readability.', icon: <Type className="w-5 h-5 mr-2" />, keywords: 'text accessibility size' },
    ],
  },
  {
    category: 'Notifications',
    icon: <Bell className="w-5 h-5 mr-3 text-slate-500" />,
    settings: [
      { name: 'Push Notifications', description: 'Enable or disable browser notifications.', keywords: 'alerts updates messages' },
      { name: 'Email Notifications', description: 'Choose which emails you want to receive.', keywords: 'newsletter updates marketing' },
      { name: 'SMS Alerts', description: 'Get critical alerts via text message.', keywords: 'text phone security' },
    ],
  },
  {
    category: 'Privacy & Security',
    icon: <Shield className="w-5 h-5 mr-3 text-slate-500" />,
    settings: [
      { name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account.', keywords: '2fa security login' },
      { name: 'Login History', description: 'View recent sign-in activity.', keywords: 'sessions devices security' },
      { name: 'Data & Privacy', description: 'Manage your data and privacy settings.', keywords: 'export download gdpr' },
    ],
  },
   {
    category: 'Help & Support',
    icon: <HelpCircle className="w-5 h-5 mr-3 text-slate-500" />,
    settings: [
      { name: 'Contact Support', description: 'Get help with any issues.', keywords: 'help contact us assistance' },
      { name: 'FAQ', description: 'Find answers to frequently asked questions.', keywords: 'help questions answers' },
      { name: 'Terms of Service', description: 'Read our terms and conditions.', keywords: 'legal policy rules' },
    ],
  },
];

export default function Settings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Memoize the filtered settings to avoid re-calculating on every render
  const filteredSettings = useMemo(() => {
    if (!searchTerm.trim()) {
      return settingsData;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    
    return settingsData.map(category => {
      const filtered = category.settings.filter(
        setting =>
          setting.name.toLowerCase().includes(lowercasedTerm) ||
          setting.description.toLowerCase().includes(lowercasedTerm) ||
          (setting.keywords && setting.keywords.toLowerCase().includes(lowercasedTerm))
      );
      return { ...category, settings: filtered };
    }).filter(category => category.settings.length > 0);

  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-200">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={isFocused ? '' : 'Search settings...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
          />
        </div>
      </div>

      {filteredSettings.length > 0 ? (
        <div className="space-y-10">
          {filteredSettings.map((category) => (
            <div key={category.category}>
              <div className="flex items-center mb-4">
                 {category.icon}
                <h2 className="text-xl font-semibold">{category.category}</h2>
              </div>
              <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm divide-y divide-slate-200 dark:divide-slate-700">
                {category.settings.map((setting) => (
                  <div key={setting.name} className="p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                    <div>
                      <h3 className="text-md font-medium text-slate-900 dark:text-white flex items-center">{setting.icon}{setting.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{setting.description}</p>
                    </div>
                    <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <Search className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-lg font-medium">No settings found</h3>
            <p className="mt-1 text-sm text-slate-500">
                Your search for "{searchTerm}" did not match any settings. Try a different search.
            </p>
        </div>
      )}
    </div>
  );
}
