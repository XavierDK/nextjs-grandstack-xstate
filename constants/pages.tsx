import React, { ReactElement } from 'react';
import { Home as HomeIcon } from '@material-ui/icons';

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
  }
];

export default pages;
