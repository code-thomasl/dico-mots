import React from 'react';
import useDarkMode from 'use-dark-mode';

import Toggle from './Toggle';
import { NavItem } from 'reactstrap';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <NavItem>
      <button type="button" onClick={darkMode.disable} className="darkmode-button">
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable} className="darkmode-button">
        ☾
      </button>
    </NavItem>
  );
};

export default DarkModeToggle;