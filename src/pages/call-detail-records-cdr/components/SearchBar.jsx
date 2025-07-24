import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onAdvancedSearch, searchHistory, onClearHistory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    transcriptionContent: '',
    sentiment: '',
    keywords: '',
    speaker: '',
    language: ''
  });
  const searchRef = useRef(null);

  const searchSuggestions = [
    { type: 'recent', text: 'failed calls last week', icon: 'Clock' },
    { type: 'recent', text: 'high cost calls ABC Corp', icon: 'Clock' },
    { type: 'suggestion', text: 'calls with negative sentiment', icon: 'Search' },
    { type: 'suggestion', text: 'transcriptions containing "refund"', icon: 'Search' },
    { type: 'suggestion', text: 'calls longer than 10 minutes', icon: 'Search' },
    { type: 'suggestion', text: 'AI analysis completed today', icon: 'Search' }
  ];

  const sentimentOptions = [
    { value: '', label: 'Any Sentiment' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' }
  ];

  const languageOptions = [
    { value: '', label: 'Any Language' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleAdvancedSearch = () => {
    onAdvancedSearch(advancedFilters);
    setShowAdvanced(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      transcriptionContent: '',
      sentiment: '',
      keywords: '',
      speaker: '',
      language: ''
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="space-y-4">
        {/* Main Search Bar */}
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search calls, transcriptions, or use natural language queries..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10 pr-24"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs"
              >
                <Icon name="SlidersHorizontal" size={14} className="mr-1" />
                Advanced
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSearch()}
                disabled={!searchQuery.trim()}
              >
                <Icon name="Search" size={14} />
              </Button>
            </div>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (searchQuery.length > 0 || searchSuggestions.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-1001 max-h-64 overflow-y-auto">
              {searchQuery.length > 0 && (
                <div className="p-2 border-b border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSearch()}
                    className="w-full justify-start"
                  >
                    <Icon name="Search" size={14} className="mr-2" />
                    Search for "{searchQuery}"
                  </Button>
                </div>
              )}
              
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  Suggestions
                </div>
                {searchSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full justify-start mb-1"
                  >
                    <Icon name={suggestion.icon} size={14} className="mr-2 text-muted-foreground" />
                    <span className="text-left">{suggestion.text}</span>
                    {suggestion.type === 'recent' && (
                      <span className="ml-auto text-xs text-muted-foreground">Recent</span>
                    )}
                  </Button>
                ))}
              </div>

              {searchHistory.length > 0 && (
                <div className="p-2 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground px-2">
                      Recent Searches
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearHistory}
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                  {searchHistory.slice(0, 3).map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionClick({ text: item })}
                      className="w-full justify-start mb-1"
                    >
                      <Icon name="Clock" size={14} className="mr-2 text-muted-foreground" />
                      {item}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Advanced Search Panel */}
        {showAdvanced && (
          <div className="border border-border rounded-lg p-4 bg-muted/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">Advanced AI Search</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAdvancedFilters}
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Transcription Content
                </label>
                <Input
                  type="text"
                  placeholder="Search within call transcriptions..."
                  value={advancedFilters.transcriptionContent}
                  onChange={(e) => setAdvancedFilters(prev => ({
                    ...prev,
                    transcriptionContent: e.target.value
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sentiment
                </label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={advancedFilters.sentiment}
                  onChange={(e) => setAdvancedFilters(prev => ({
                    ...prev,
                    sentiment: e.target.value
                  }))}
                >
                  {sentimentOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Keywords
                </label>
                <Input
                  type="text"
                  placeholder="Comma-separated keywords..."
                  value={advancedFilters.keywords}
                  onChange={(e) => setAdvancedFilters(prev => ({
                    ...prev,
                    keywords: e.target.value
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Speaker
                </label>
                <Input
                  type="text"
                  placeholder="Search by speaker name..."
                  value={advancedFilters.speaker}
                  onChange={(e) => setAdvancedFilters(prev => ({
                    ...prev,
                    speaker: e.target.value
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Language
                </label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={advancedFilters.language}
                  onChange={(e) => setAdvancedFilters(prev => ({
                    ...prev,
                    language: e.target.value
                  }))}
                >
                  {languageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAdvancedSearch}
              >
                <Icon name="Search" size={14} className="mr-2" />
                Search with AI
              </Button>
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div className="text-xs text-muted-foreground">
          <Icon name="Lightbulb" size={12} className="inline mr-1" />
          <strong>Tips:</strong> Use natural language like "show me failed calls from ABC Corp last week" or search transcriptions with "calls mentioning refund"
        </div>
      </div>
    </div>
  );
};

export default SearchBar;