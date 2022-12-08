import "./App.css";
import { HashRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import HomePage from "./pages/client/HomePage/HomePage";
import NotFoundPage from "./pages/global/NotFoundPage/NotFoundPage";
import Loading from "./components/Components/Loading/Loading";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import LoginPage from "./pages/global/LoginPage/LoginPage";
import RegisterPage from "./pages/global/RegisterPage/RegisterPage";
import ContactPage from "./pages/client/ContactPage/ContactPage";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import DetailPage from "./pages/client/DetailPage/DetailPage";
import CheckoutPage from "./pages/client/CheckoutPage/CheckoutPage";
import UserManagementPage from "./pages/admin/UserManagementPage/UserManagementPage";
import FilmManagementPage from "./pages/admin/FilmManagementPage/FilmManagementPage";
import ShowtimePage from "./pages/admin/ShowtimePage/ShowtimePage";
import DrawerHOC from "./HOC/Drawer/DrawerHOC";
import ProfilePage from "./pages/client/ProfilePage/ProfilePage";

export const history = createBrowserHistory();

function App() {
  return (
    <HashRouter history={history}>
      <Loading />
      <DrawerHOC />
      <Switch>
        <HomeTemplate path="/home" Component={HomePage} />
        <HomeTemplate path="/contact" exact Component={ContactPage} />
        <HomeTemplate path="/news" exact Component={ContactPage} />
        <HomeTemplate path="/details/:maPhim" exact Component={DetailPage} />
        <HomeTemplate path="/profile" exact Component={ProfilePage} />

        <CheckoutTemplate
          path="/checkout/:maLichChieu"
          exact
          Component={CheckoutPage}
        />

        <AdminTemplate
          path="/admin/films"
          exact
          Component={FilmManagementPage}
        />
        <AdminTemplate path="/admin/films/create" exact Component={HomePage} />
        <AdminTemplate
          path="/admin/films/edit/:filmId"
          exact
          Component={HomePage}
        />
        <AdminTemplate
          path="/admin/films/showtime/:filmId.:tenphim"
          exact
          Component={ShowtimePage}
        />
        <AdminTemplate
          path="/admin/users"
          exact
          Component={UserManagementPage}
        />
        <AdminTemplate path="/admin/showtimes" exact Component={ShowtimePage} />

        <UserTemplate exact path="/login" Component={LoginPage} />
        <UserTemplate exact path="/register" Component={RegisterPage} />

        <HomeTemplate exact path="/" Component={HomePage} />
        <HomeTemplate path="*" Component={NotFoundPage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
