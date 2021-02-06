import {
  Divider,
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import clsx from 'clsx';
import Link from '../Link';
import pages from '../../constants/pages';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

type Props = {
  drawerOpen: boolean;
};

const Drawer = ({ drawerOpen }: Props): ReactElement => {
  const classes = useStyles();
  return (
    <MUIDrawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose)
      }}
      open={drawerOpen}
    >
      <Toolbar />
      <List>
        {pages.map((page) => (
          <Link key={page.id} href={page.href} className={classes.navLink} underline="none">
            <ListItem button>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </MUIDrawer>
  );
};

export default Drawer;
