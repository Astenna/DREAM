import React, {CSSProperties} from 'react';

export interface NavbarItem {
  key: string
  icon?: React.ReactNode
  node: React.ReactNode
  action: (() => void),
  hidden?: boolean
}

export interface NavbarProperties {
  menuItems: NavbarItem[],
  menuBarProperties?: CSSProperties
}

export interface SiderNavbarProperties extends NavbarProperties {
  logo: NavbarItem,
}
