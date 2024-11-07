import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

function Preferences({ onUpdateComplete }) {
  const { preferences, setPreferences } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [error, setError] = useState('');

  const MEDIA_OUTLETS = [
    'Axios',
    'The New York Times',
    'Bloomberg',
    'Reuters',
    'Financial Times',
    'The Guardian'
  ];

  const TOPICS = [
    'Artificial Intelligence',
    'Politics',
    'Finance',
    'Sports',
    'Entertainment',
    'Sustainability'
  ];

  const COUNTRY_OPTIONS = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'fr', name: 'France' },
  ];

  const LANGUAGE_OPTIONS = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' }
  ];

  const SUMMARY_STYLE_OPTIONS = ['brief', 'detailed', 'humorous', 'eli5'];

  const handleMultiSelection = (field, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [field]: prev[field]?.includes(value)
        ? prev[field].filter(item => item !== value)
        : [...(prev[field] || []), value]
    }));
    setError('');
  };

  const handleSelection = (field, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleNext = () => {
    switch(step) {
      case 1:
        if (!localPreferences.mediaOutlets?.length) {
          setError('Please select at least one media outlet');
          return;
        }
        break;
      case 2:
        if (!localPreferences.country || !localPreferences.language) {
          setError('Please select both country and language');
          return;
        }
        break;
      case 3:
        if (!localPreferences.topics?.length) {
          setError('Please select at least one topic of interest');
          return;
        }
        break;
      case 4:
        if (!localPreferences.agenda || !localPreferences.frequency || !localPreferences.summaryStyle) {
          setError('Please complete all preferences');
          return;
        }
        setPreferences(localPreferences);
        onUpdateComplete();
        return;
    }
    setStep(step + 1);
    setError('');
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h2 className="text-xl text-center mb-8">
              Choose your media outlets!
            </h2>
            <div className="space-y-3">
              {MEDIA_OUTLETS.map((outlet) => (
                <button
                  key={outlet}
                  onClick={() => handleMultiSelection('mediaOutlets', outlet)}
                  className={`w-full flex items-center bg-[#E8E8E8] rounded-sm py-3 px-4 ${
                    localPreferences.mediaOutlets?.includes(outlet) ? 'border-2 border-[#D5C3C6]' : ''
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    localPreferences.mediaOutlets?.includes(outlet) ? 'bg-[#D5C3C6]' : 'border-2 border-[#D5C3C6]'
                  }`}></div>
                  {outlet}
                </button>
              ))}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-xl text-center mb-8">
              Choose your country and language
            </h2>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-center">Country</p>
                <select 
                  value={localPreferences.country || ''}
                  onChange={(e) => handleSelection('country', e.target.value)}
                  className="w-full bg-[#E8E8E8] rounded-sm py-3 px-4"
                >
                  <option value="">Select country</option>
                  {COUNTRY_OPTIONS.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-3 text-center">Language</p>
                <select 
                  value={localPreferences.language || ''}
                  onChange={(e) => handleSelection('language', e.target.value)}
                  className="w-full bg-[#E8E8E8] rounded-sm py-3 px-4"
                >
                  <option value="">Select language</option>
                  {LANGUAGE_OPTIONS.map(language => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-xl text-center mb-8">
              Choose your topics of Interest!
            </h2>
            <div className="space-y-3">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleMultiSelection('topics', topic)}
                  className={`w-full flex items-center bg-[#E8E8E8] rounded-sm py-3 px-4 ${
                    localPreferences.topics?.includes(topic) ? 'border-2 border-[#D5C3C6]' : ''
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    localPreferences.topics?.includes(topic) ? 'bg-[#D5C3C6]' : 'border-2 border-[#D5C3C6]'
                  }`}></div>
                  {topic}
                </button>
              ))}
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-xl text-center mb-8">
              Final Preferences
            </h2>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-center">What is your agenda of use?</p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleSelection('agenda', 'Stay Up To Date')}
                    className={`w-full flex items-center bg-[#E8E8E8] rounded-sm py-3 px-4 ${
                      localPreferences.agenda === 'Stay Up To Date' ? 'border-2 border-[#D5C3C6]' : ''
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mr-4 ${
                      localPreferences.agenda === 'Stay Up To Date' ? 'bg-[#D5C3C6]' : 'border-2 border-[#D5C3C6]'
                    }`}></div>
                    Stay Up To Date
                  </button>
                  <button
                    onClick={() => handleSelection('agenda', 'Deep Dive Into Topics')}
                    className={`w-full flex items-center bg-[#E8E8E8] rounded-sm py-3 px-4 ${
                      localPreferences.agenda === 'Deep Dive Into Topics' ? 'border-2 border-[#D5C3C6]' : ''
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mr-4 ${
                      localPreferences.agenda === 'Deep Dive Into Topics' ? 'bg-[#D5C3C6]' : 'border-2 border-[#D5C3C6]'
                    }`}></div>
                    Deep Dive Into Topics
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-3 text-center">Delivery Frequency</p>
                <select 
                  value={localPreferences.frequency || ''}
                  onChange={(e) => handleSelection('frequency', e.target.value)}
                  className="w-full bg-[#E8E8E8] rounded-sm py-3 px-4"
                >
                  <option value="">Select frequency</option>
                  <option value="6">Every 6 Hours</option>
                  <option value="12">Every 12 Hours</option>
                  <option value="24">Daily</option>
                </select>
              </div>

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
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          THE INBOX ZING!
        </h1>
        
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