import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Pagination, Input } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import AppContent from "../../components/AppContent";
import ContentHeaderBar from "../../components/AppContentHeaderBar";

import apis from "../../apis";

import './List.scss';

const { Search } = Input;

const mockShortLinks = [
  {
    id: 1,
    thumbnail: 'null',
    title: "Link 1",
    shorted_url: "https://google.com.vn",
    description: "Test link"
  },
  {
    id: 2,
    thumbnail: 'null',
    title: "Link 1",
    shorted_url: "https://google.com.vn",
    description: "Test link"
  },
  {
    id: 3,
    thumbnail: 'null',
    title: "Link 1",
    shorted_url: "https://google.com.vn",
    description: "Test link"
  }
]

export default () => {
  const dispatch = useDispatch();
  const api = apis(dispatch).shortLinkApi;
  const navigation = useNavigate();
  const { shortLinks, paginationOpts } = useSelector(state => state.shortLink)

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    api.getShortLinks({page: page, limit: limit});
  }, [limit, page])

  const handlePageChange = (page, pageSize) => {
    setPage(page);
  }

  const handleNew = () => {
    navigation("/short_links/new")
  }

  return (
    <>
      <ContentHeaderBar className="shortlink-content-header-bar">
        <Row>
          <Col xs={24} sm={12} className="search-form">
            <Search placeholder="input search text" size="medium" loading={false} />
          </Col>
          <Col xs={24} sm={12} className="actions-form">
            <Button type="primary" onClick={handleNew}>New</Button>
            <Button>Delete</Button>
            <Button><EllipsisOutlined /></Button>
          </Col>
        </Row>
      </ContentHeaderBar>
      <AppContent>
        <div className="list-container">
          {
            shortLinks.map( record => <ShortLink key={record.id} record={record} /> )
          }
          <Pagination defaultCurrent={1} current={page} total={paginationOpts.total} pageSize={paginationOpts.pageSize} onChange={handlePageChange} />
        </div>
      </AppContent>
    </>
  )
}

const ShortLink = ({record}) => {
  const redirectUrl = window.location.protocol + "//" + window.location.host + `/r/${record.url_string}`

  return (
    <div className="list-short-link-item">
      <div className="list-short-link-item-thumbnail">
        <Image 
          width={80}
          height={80}
          src={record.thumbnail}
          fallback="image_error.png"
        />
      </div>
      <div className="list-short-link-item-body">
        <div className="list-short-link-item-content">
          <div>{record.title || 'Untitled'}</div>
          <div>origin: {record.url}</div>
          <a href={redirectUrl}>{redirectUrl}</a>
          <div>{record.description}</div>
        </div>
        <div className="list-short-link-item-actions">
          <Button><EllipsisOutlined /></Button>
        </div>
      </div>
    </div>
  )
}
