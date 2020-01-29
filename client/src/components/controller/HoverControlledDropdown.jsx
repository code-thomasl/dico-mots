import React, { useState } from 'react';
import { Dropdown } from 'reactstrap';

export default function HoverControlledDropdown(props) {
  const [isOpen, updateIsOpen] = useState(false);

  return (
    <Dropdown
      {...props}
      onMouseOver={() => updateIsOpen(true)}
      onFocus={() => updateIsOpen(true)}
      onMouseLeave={() => updateIsOpen(false)}
      onBlur={() => updateIsOpen(false)}
      toggle={() => updateIsOpen(!isOpen)}
      isOpen={isOpen}
    />
  );
}