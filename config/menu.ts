export interface ManuItem {
  label: string;
  href: string;
}

export type MenuConfig = ManuItem[];

export const menuConfig: MenuConfig = [
  {
    label: 'Latest',
    href: '/latest',
  },
  {
    label: 'Connectors',
    href: '/connectors',
  },
  {
    label: 'Browse',
    href: '/browse',
  },
  {
    label: 'Packs',
    href: '/packs',
  },
];
