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
                  link: "/inventory/item/management",
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
              link: "/inventory/warehouse/create",
            },
            {
              name: "Management",
              icon: "fas fa-toolbox",
              link: "/inventory/warehouse/management",
            }
          ]
        }
      ]
  },
  {
    name: "Product",
    icon: "fab fa-buffer",
    subItems: [
      {
        name: "Model",
        icon: "fab fa-buromobelexperte",
        children: [
          {
            name: "Create",
            icon: "fas fa-plus",
            link: "/product/model/create/",
          },
          {
              name: "Management",
              icon: "fas fa-toolbox",
              link: "/product/model/management",
          }
        ]
      },
      {
        name: "Attribute",
        icon: "fas fa-cogs",
        children: [
          {
            name: "Create",
            icon: "fas fa-plus",
            link: "/product/attribute/create/",
          },
          {
              name: "Management",
              icon: "fas fa-toolbox",
              link: "/product/attribute/management",
          }
        ]
      },
      {
        name: "Variant",
        icon: "fas fa-hard-hat",
        children: [
          {
            name: "Create",
            icon: "fas fa-plus",
            link: "/product/attribute/create/",
          },
          {
            name: "Management",
            icon: "fas fa-toolbox",
            link: "/product/attribute/management",
          }
        ]
      },
      {
        name: "Create",
        icon: "fas fa-plus",
        link: "/product/create"
      },
      {
        name: "Management",
        icon: "fas fa-toolbox",
        link: "/product/management"
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