const toggleUImode = (UImode: string, setUImode: any) => {
  const newMode = UImode && UImode.toLowerCase() === 'dark-mode' ? 'light-mode' : 'dark-mode';
  setUImode(newMode);
  localStorage.setItem('edaUImode', newMode);
  return newMode;
};
export default toggleUImode;