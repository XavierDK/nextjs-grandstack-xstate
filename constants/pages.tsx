import React, { ReactElement } from 'react';
import { Home as HomeIcon, Info as AboutIcon } from '@material-ui/icons';

type Page = {
  id: string;
  name: string;
  href: string;
  icon: ReactElement;
};

const pages: Page[] = [
  {
    id: '_HOME_',
    name: 'Home',
    href: '/',
    icon: <HomeIcon />
  },
  {
    id: '_ABOUT_',
    name: 'About',
    href: '/about',
    icon: <AboutIcon />
  }
];

export default pages;
