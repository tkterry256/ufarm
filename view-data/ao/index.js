const navLinks = require("./nav-links");

module.exports = (basePath, routerPath) => {
  return { activeLink: `${basePath}${routerPath}`, navLinks: navLinks(basePath) };
};
