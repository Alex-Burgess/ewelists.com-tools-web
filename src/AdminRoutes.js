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
import Loyalty from '@material-ui/icons/Loyalty';
import AddBox from '@material-ui/icons/AddBox';
import Edit from '@material-ui/icons/Edit';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import GiftsToUpdatePage from "views/UpdateUsersGifts/DisplayGiftsPage.js";
import UpdateGiftPage from "views/UpdateUsersGifts/UpdateGiftPage.js";
import SearchUrl from "views/CreateNewProduct/SearchUrl.js";
import SearchProduct from "views/UpdateProduct/SearchProductPage.js";

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
    path: "/create-product",
    name: "Create New Product",
    icon: AddBox,
    component: SearchUrl,
    layout: "/admin",
    header: true
  },
  {
    path: "/update-product",
    name: "Update Product",
    icon: Edit,
    component: SearchProduct,
    layout: "/admin",
    header: true
  },
  {
    path: "/update-users-gifts",
    name: "Update Users Gifts",
    icon: Loyalty,
    component: GiftsToUpdatePage,
    layout: "/admin",
    header: true
  },
  {
    path: "/update-users-gifts/:id",
    name: "Update Users Gifts",
    icon: Loyalty,
    component: UpdateGiftPage,
    layout: "/admin",
    header: false
  }
];

export default dashboardRoutes;
