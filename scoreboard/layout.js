import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, MenuBook } from '@material-ui/icons';
import Head from 'next/head';

const drawerWidth = 238;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: -2,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: -1,
    padding: theme.spacing(4),
  },
}));

export default function BaseLayout(props) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Panvala Scoreboard{props.title ? ` ${props.title}` : ''}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* Sidebar Nav */}
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <Box mr={2}>
              <img src='/panvala-logo.png' width='36' />
            </Box>
            <Typography variant='h6' noWrap>
              Panvala Scoreboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button key='Overview'>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Overview' />
              </ListItem>
              <ListItem button disabled key='Donations'>
                <ListItemText inset primary='Donations' />
              </ListItem>
              <ListItem button disabled key='Staking'>
                <ListItemText inset primary='Staking' />
              </ListItem>
              <ListItem button disabled key='History'>
                <ListItemText inset primary='Funding History' />
              </ListItem>
              <ListItem button disabled key='Inflation'>
                <ListItemText inset primary='Net Inflation' />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                component='a'
                href='https://handbook.panvala.com/'
                key='Handbook'
              >
                <ListItemIcon>
                  <MenuBook />
                </ListItemIcon>
                <ListItemText primary='Handbook' />
              </ListItem>
              <ListItem
                button
                component='a'
                href='https://discord.gg/yZmYZbf'
                key='Discord'
              >
                <ListItemText inset primary='Discord' />
              </ListItem>
              <ListItem
                button
                component='a'
                href='https://twitter.com/PanvalaHQ'
                key='Twitter'
              >
                <ListItemText inset primary='Twitter' />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          {props.children}
        </main>
      </div>
    </>
  );
}
