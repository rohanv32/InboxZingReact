import React, { useContext, useEffect, useState } from 'react';
import { useUserActions } from './UserContext';
import { UserContext } from './UserContext';
import axios from 'axios';

function Preferences({ onUpdateComplete, username }) {
  const { preferences, setPreferences } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [error, setError] = useState('');

  // Predefined options based on your logic
  const COUNTRY_OPTIONS = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'fr', name: 'France' }
  ];

  const CATEGORY_OPTIONS = ['business', 'sports', 'entertainment', 'technology', 'health'];

  const LANGUAGE_OPTIONS = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' }
  ];

  const SUMMARY_STYLE_OPTIONS = ['brief', 'detailed', 'humorous', 'eli5'];

  const handleSelection = (field, value) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleNext = async () => {
    switch (step) {
      case 1:
        if (!localPreferences.country) {
          setError('Please select a country');
          return;
        }
        break;
      case 2:
        if (!localPreferences.category) {
          setError('Please select a category');
          return;
        }
        break;
      case 3:
        if (!localPreferences.language) {
          setError('Please select a language');
          return;
        }
        break;
      case 4:
        if (!localPreferences.summaryStyle || !localPreferences.frequency) {
          setError('Please complete all preferences');
          return;
        }

        try {
          // Update preferences in the database
          await axios.put(`/preferences/${username}`, {
            country: localPreferences.country,
            category: localPreferences.category,
            language: localPreferences.language,
            summaryStyle: localPreferences.summaryStyle,
            frequency: localPreferences.frequency
          });

          setPreferences(localPreferences);
          onUpdateComplete();
        } catch (error) {
          console.error("Error updating preferences:", error);
          setError("Failed to update preferences. Please try again.");
        }
        return;
    }
    setStep(step + 1);
    setError('');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-xl text-center mb-8">Select your country</h2>
            <div className="space-y-3">
              {COUNTRY_OPTIONS.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelection('country', country.code)}
                  className={`w-full flex items-center bg-[#E8E8E8] rounded-sm py-3 px-4 ${
                    localPreferences.country === country.code ? 'border-2 border-[#D5C3C6]' : ''
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    localPreferences.country === country.code ? 'bg-[#D5C3C6]' : 'border-2 border-[#D5C3C6]'
                  }`}></div>
                  {country.name}
                </button>
              ))}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-xl text-center mb-8">Select a news category</h2>
            <div className="space-y-3">
              {CATEGORY_OPTIONS.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelection('category', category)}
                  className={`w-full flex items-center bg-[#E8E8E8] rounded-sm py-3 px-4 ${
                    localPreferences.category === category ? 'border-2 border-[#D5C3C6]' : ''
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    localPreferences.category === category ? 'bg-[#D5C3C6]' : 'border-2 border-[#D5C3C6]'
                  }`}></div>
                  {category}
                </button>
              ))}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-xl text-center mb-8">Select your language</h2>
            <div className="space-y-3">
              {LANGUAGE_OPTIONS.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleSelection('language', language.code)}
                  className={`w-full flex items-center bg-[#E8E8E8] rounded-sm py-3 px-4 ${
                    localPreferences.language === language.code ? 'border-2 border-[#D5C3C6]' : ''
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    localPreferences.language === language.code ? 'bg-[#D5C3C6]' : 'border-2 border-[#D5C3C6]'
                  }`}></div>
                  {language.name}
                </button>
              ))}
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-xl text-center mb-8">Final Preferences</h2>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-center">Summary Style</p>
                <select 
                  value={localPreferences.summaryStyle || ''}
                  onChange={(e) => handleSelection('summaryStyle', e.target.value)}
                  className="w-full bg-[#E8E8E8] rounded-sm py-3 px-4"
                >
                  <option value="">Select style</option>
                  {SUMMARY_STYLE_OPTIONS.map(style => (
                    <option key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-3 text-center">Delivery Frequency (hours)</p>
                <select 
                  value={localPreferences.frequency || ''}
                  onChange={(e) => handleSelection('frequency', parseInt(e.target.value))}
                  className="w-full bg-[#E8E8E8] rounded-sm py-3 px-4"
                >
                  <option value="">Select frequency</option>
                  <option value="1">Every 1 Hour</option>
                  <option value="3">Every 3 Hours</option>
                  <option value="6">Every 6 Hours</option>
                  <option value="12">Every 12 Hours</option>
                  <option value="24">Daily</option>
                </select>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8">Update your News Preferences</h1>
        
        {renderStep()}

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        <button
          onClick={handleNext}
          className="w-full bg-[#D5C3C6] rounded-sm py-3 text-black mt-8"
        >
          {step === 4 ? 'Complete Setup' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

export default Preferences;