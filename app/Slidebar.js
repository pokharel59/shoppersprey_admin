import React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard as DashboardIcon, ShoppingBasket as ShoppingBasketIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

const Slidebar = () => {
  return (
    <div className='bg-slate-400 w-1/5 flex flex-col min-h-screen'>
      <List className="flex-1">
        <Link href={'/about'}>
          <ListItem className="flex items-center">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Divider />
        <Link href={'/viewProduct'}>
          <ListItem className="flex items-center">
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Divider />
        <Link href={'/order'}>
          <ListItem className="flex items-center">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </Link>
        <Divider />
      </List>
    </div>
  );
};

export default Slidebar;
