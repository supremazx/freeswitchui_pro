import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle click outside events for dropdowns, modals, and other UI elements
 * @param {Function} callback - Function to call when clicking outside
 * @param {boolean} isActive - Whether the click outside listener should be active
 * @returns {React.RefObject} - Ref to attach to the element that should detect outside clicks
 */
export const useClickOutside = (callback, isActive = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event) => {
      // Check if the click is outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [callback, isActive]);

  return ref;
};

export default useClickOutside;