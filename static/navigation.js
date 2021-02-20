const navigationContent = [
  {
    name: "Home",
    icon: "fas fa-home",
    link: "/"
  },
  {
    name: "Site Administration",
    icon: "fas fa-cog",
    subItems: [
      {
        name: "Process",
        icon: "fas fa-file-alt",
        link: "/site-administration/process",
      },
      {
        name: "Directory",
        icon: "fas fa-map-signs",
        link: "/site-administration/directory",
      }
    ] 
  },
  {
    name: "Display Administration",
    icon: "fas fa-tv",
    subItems: [
      {
        name: "Layout ",
        icon: "fas fa-shapes",
        link: "/display-administration/layout",
      },
      {
        name: "Advertisement",
        icon: "fas fa-map-signs",
        link: "/display-administration/advertisement",
      }
    ]
  },
  {
      name: "Inventory",
      icon: "fas fa-archive",
      subItems: [
          {
              name: "Item",
              icon: "fas fa-box-open",
              children: [
                  {
                      name: "Create",
                      icon: "fas fa-plus",
                      link: "/inventory/item/create",
                  },
                  {
                      name: "Management",
                      icon: "fas fa-toolbox",
                      link: "/inventory/item",
                  }
              ]
          },
          {
              name: "Warehouse",
              icon: "fas fa-warehouse",
              children: [
                {
                  name: "Create",
                  icon: "fas fa-plus",
                  link: "/inventory/item/create",
                },
                {
                  name: "Management",
                  icon: "fas fa-toolbox",
                  link: "/inventory/item",
                }
              ]
          },
          {
              name: "Stock",
              icon: "fas fa-boxes",
              children: [
                  {
                      name: "Create",
                      icon: "fas fa-plus",
                      link: "/inventory/item/create",
                  },
                  {
                      name: "Management",
                      icon: "fas fa-toolbox",
                      link: "/inventory/item",
                  }
              ]
          }
      ]
  },
  {
    name: "Report",
    icon: "fas fa-file-invoice",
    link: "/report",
  },
  {
    name: "Media",
    icon: "fas fa-image",
    link: "/media",
  }
];

export default navigationContent;