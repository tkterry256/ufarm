const sidebar = document.getElementById("sidebar")
const sidebarOffCanvas = new bootstrap.Offcanvas(sidebar);

window.addEventListener("resize", function (event) {
  sidebarOffCanvas.hide();
});
