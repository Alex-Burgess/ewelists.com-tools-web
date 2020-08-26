/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import ProductUpdates from "views/ProductUpdates/ProductUpdates.js";
import UpdatePage from "views/ProductUpdates/UpdatePage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    header: true
  },
  {
    path: "/product-updates",
    name: "Product Updates",
    icon: FormatListBulletedIcon,
    component: ProductUpdates,
    layout: "/admin",
    header: true
  },
  {
    path: "/product-updates/:id",
    name: "Product Updates",
    icon: FormatListBulletedIcon,
    component: UpdatePage,
    layout: "/admin",
    header: false
  }
];

export default dashboardRoutes;
