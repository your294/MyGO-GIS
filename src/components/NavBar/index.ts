import NavBar from "./NavBar.vue";

NavBar.name = "mygo-navbar";

NavBar.install = (app: any) => {
  app.component(NavBar.name, NavBar);
};

export default NavBar;
