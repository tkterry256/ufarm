module.exports = (basePath) => {
  return [
    {
      text: "Dashboard",
      faIcon: "gauge",
      link: `${basePath}/`,
    },
    {
      text: "FarmerOne Management",
      faIcon: "people-roof",
      link: `${basePath}/farmer-one-manage`,
    },
    {
      text: "Create FarmerOne",
      faIcon: "circle-plus",
      link: `${basePath}/create-farmer-one`,
    },
    {
      text: "Communication",
      faIcon: "comment",
      link: `${basePath}/communication`,
    },
    {
      text: "Market",
      faIcon: "store",
      link: `${basePath}/market`,
    },
    {
      text: "Statistics",
      faIcon: "chart-simple",
      link: `${basePath}/statistics`,
    },
  ]
};
