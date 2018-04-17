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
          //{
          //    title: 'Roles',
          //    routerLink: 'admin-console/roles',
          //},
          {
              title: 'AHS',
              //routerLink: 'admin-console/orgs',
              //routerLink: 'admin-console/orgs/orgmain',
              routerLink: 'admin-console/orgs/orgmain/680b4638-e23c-4bd6-72cd-08d58e2d9e43',
              //routerLink: "['admin-console/orgs/orgmain','680b4638-e23c-4bd6-72cd-08d58e2d9e43']",
          },
          //{
          //    title: 'AHS Users',
          //    routerLink: 'admin-console/org-users',
          //},
          {
              title: 'Labs',
              routerLink: 'admin-console/labs',
          },
          //{
          //    title: 'Lab Preferences',
          //    routerLink: 'admin-console/lab-preferences',
          //},
          //{
          //    title: 'Lab Users',
          //    routerLink: 'admin-console/lab-users',
          //},
          {
              title: 'Medical Practice',
              routerLink: 'admin-console/mp-profile',
          }
          //{
          //    title: 'MP Locations',
          //    routerLink: 'admin-console/mp-locations',
          //},
          //{
          //    title: 'MP Users',
          //    routerLink: 'admin-console/mp-users',
          //},
      ]
  },
];
