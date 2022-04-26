import React from "react";
import { unstable_HistoryRouter as HistoryRouter, Route, Routes, Navigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import RedirectShortLink from "../pages/ShortLinks/RedirectShortLink";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ShortLinks from "../pages/ShortLinks";
import NewShortLink from "../pages/ShortLinks/New";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({ window })

const PrivateRoute = ({element}) => {
  const token = localStorage.getItem('token');
  return token ? <PageLayout>{element}</PageLayout> : <Navigate to="/sign_in" />
}

const PublicRoute = ({element}) => {
  return <PageLayout>{element}</PageLayout>
}

export default (
  <HistoryRouter history={history}>
    <Routes>
      <Route path="/" exact element={<PublicRoute element={<Home />}/>} />
      <Route path="/sign_in" exact element={<Signin />} />
      <Route path="/sign_up" exact element={<Signup />} />
      <Route path="/r/:token" element={<RedirectShortLink />} />

      <Route path="/short_links" element={<PrivateRoute element={<ShortLinks />}/>} />
      <Route path="/short_links/new" element={<PrivateRoute element={<NewShortLink />}/>} />
      <Route path="*" element={<Navigate to="/" />} />
      {/* <Route path="/login" exact element={<Login />} />
      <Route path="/trades" exact element={<PrivateRoutes><Trades /></PrivateRoutes>} />
      <Route path="/settings" exact element={<PrivateRoutes><Settings /></PrivateRoutes>} /> */}
    </Routes>
  </HistoryRouter>
);
