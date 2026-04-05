//  'use client';
// import { useState, useEffect } from 'react';
 
// export default function useTheme() {
//  const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     require('bootstrap/dist/js/bootstrap.bundle.min.js');
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-bs-theme', savedTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-bs-theme', newTheme);
//   };

//   return {
//     theme,
//     toggleTheme,
//   }
// }

'use client';
import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme); // ✅ زيادة دي
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme); // ✅ زيادة دي
  };

  return { theme, toggleTheme };
}