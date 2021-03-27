import React from 'react';
import './Header.css';

interface Props {
  title: string;
}

const Header: React.FC<Props> = (props) => {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
};

export default Header;
