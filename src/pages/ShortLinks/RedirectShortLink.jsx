import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apis from "../../apis";

import { Spin } from 'antd';

import "./RedirectShortLink.scss";

export default () => {
  let { token } = useParams();
  const dispatch = useDispatch();
  const api = apis(dispatch).shortLinkApi;
  const { shortLink } = useSelector(state => state.shortLink);

  const [counter, setCounter] = useState(3);

  useEffect(() => {
    api.getRedirectLink(token)
  }, [])

  useEffect(() => {
    if (shortLink) {
      window.setInterval(() => setCounter(counter => counter - 1), 1000);
    }
  }, [shortLink])

  if(counter === 0) window.location.href = shortLink.url

  return (
    <>
      <RedirectSpin loading={!shortLink} counter={counter} />
    </>
  )
}

const RedirectSpin = ({loading, counter}) => {
  const TipMessage = () => loading ? <span>loading...</span> : <div><span>redirect after </span><span className="redirect-short-link-counter">{counter}</span> seconds ...`</div>;

  return (
    <div className="redirect-short-link-container">
      <Spin className="redirect-short-link-spin"><TipMessage /></Spin>
    </div>
  )
}
