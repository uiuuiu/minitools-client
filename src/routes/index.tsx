import { ReactElement } from "react";
import type { RootState } from '../store';
import { useSelector } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter, Route, Routes, Navigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import RedirectShortLink from "../pages/ShortLinks/RedirectShortLink";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ShortLinks from "../pages/ShortLinks";
import NewShortLink from "../pages/ShortLinks/New";
import PublicNewShortLink from "../pages/PublicShortLink/New";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({ window })

type RouteProps = {
  element: ReactElement
  publicElement?: ReactElement
}

const PrivateRoute = ({ element, publicElement }: RouteProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (token) {
    return <PageLayout>{element}</PageLayout>;
  }
  return publicElement ? <PageLayout>{publicElement}</PageLayout> : <Navigate to="/sign_in" />;
}

const PublicRoute = ({ element }: RouteProps) => {
  return <PageLayout>{element}</PageLayout>
}

export default (
  <HistoryRouter history={history}>
    <Routes>
      <Route path="/" element={<PublicRoute element={<Home />} />} />
      <Route path="/sign_in" element={<Signin />} />
      <Route path="/sign_up" element={<Signup />} />
      <Route path="/r/:token" element={<RedirectShortLink />} />

      <Route path="/short_links" element={<PrivateRoute element={<ShortLinks />} publicElement={<PublicNewShortLink />} />} />
      <Route path="/short_links/new" element={<PrivateRoute element={<NewShortLink />} />} />
      <Route path="*" element={<Navigate to="/" />} />
      {/* <Route path="/login" exact element={<Login />} />
      <Route path="/trades" exact element={<PrivateRoutes><Trades /></PrivateRoutes>} />
      <Route path="/settings" exact element={<PrivateRoutes><Settings /></PrivateRoutes>} /> */}
    </Routes>
  </HistoryRouter>
);
