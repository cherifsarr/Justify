export const menuItems = [
  {
    title: 'Dashboard',
    routerLink: 'dashboard',
    icon: 'fa-home',
    selected: false,
    expanded: false,
    order: 0
    }, 

  {
      title: 'Justify',
      routerLink: 'justify',
      icon: 'fa-thumbs-up',
      selected: false,
      expanded: false,
      order: 100,
      subMenu: [
          {
              title: 'PGx',
              routerLink: 'justify/pgx',
          },
          {
              title: 'Toxicology',
              routerLink: 'justify/toxicology',
          },
          {
              title: 'Cancer',
              routerLink: 'justify/cancer',
          },
      ]
  },
  {
      title: 'Patients',
      routerLink: 'patients',
      icon: 'fa-wheelchair',
      selected: false,
      expanded: false,
      order: 200
  },

  {
      title: 'Admin Console',
      routerLink: 'admin-console',
      icon: 'fa-suitcase',
      selected: false,
      expanded: false,
      order: 300,
      subMenu: [
          {
              title: 'Features',
              routerLink: 'admin-console/features',
          },
          {
              title: 'Roles',
              routerLink: 'admin-console/roles',
          },
          {
              title: 'AHS Profile',
              routerLink: 'admin-console/org-profile',
          },
          {
              title: 'AHS Users',
              routerLink: 'admin-console/org-users',
          },
          {
              title: 'Lab Profile',
              routerLink: 'admin-console/lab-profile',
          },
          {
              title: 'Lab Preferences',
              routerLink: 'admin-console/lab-preferences',
          },
          {
              title: 'Lab Users',
              routerLink: 'admin-console/lab-users',
          },
          {
              title: 'Medical Practice Profile',
              routerLink: 'admin-console/mp-profile',
          },
          {
              title: 'MP Locations',
              routerLink: 'admin-console/mp-locations',
          },
          {
              title: 'MP Users',
              routerLink: 'admin-console/mp-users',
          },
      ]
  },
];
