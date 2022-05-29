import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col, Button, Image, Pagination, Input, Popover, Switch } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { EllipsisOutlined, CheckCircleOutlined, PlusCircleTwoTone, DeleteTwoTone, CloudSyncOutlined, MoreOutlined } from "@ant-design/icons";
import AppContent from "../../components/AppContent";
import ContentHeaderBar from "../../components/AppContentHeaderBar";

import apis from "../../apis";
import { ShortLinkData } from "../../types/data/ShortLinkData";

import './List.scss';
import { RootState } from "../../store";

const { Search } = Input;

type searchData = {
  page: string
  limit: string
  search?: string
}

export default () => {
  const dispatch = useDispatch();
  const api = apis(dispatch).shortLinkApi;
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dataSearchParams = Object.fromEntries(searchParams);

  const { shortLinks, paginationOpts } = useSelector((state: RootState) => state.shortLink)

  const [page, setPage] = useState(dataSearchParams.page || "1");
  const [limit, setLimit] = useState(dataSearchParams.limit || "10");
  const [searchString, setSearchString] = useState(dataSearchParams.search);

  useEffect(() => {
    let data: searchData = { page: page, limit: limit };
    if (searchString) data['search'] = searchString;

    api.getShortLinks(data);
    setSearchParams(data);
  }, [limit, page, searchString])

  const handlePageChange = (page: number, pageSize: number) => {
    localStorage.setItem('page', `${page}`);
    localStorage.setItem('limit', `${pageSize}`);
    setPage(`${page}`);
    setLimit(`${pageSize}`);
  }

  const handleNew = () => {
    navigation("/short_links/new")
  }

  const handleSync = () => {

  }

  const onSearch = (value: string) => {
    setSearchString(value);
  }

  return (
    <>
      <ContentHeaderBar className="shortlink-content-header-bar">
        <Row>
          <Col xs={24} sm={12} className="search-form">
            <Search allowClear onSearch={onSearch} placeholder="input search text" size={"medium" as SizeType} loading={false} />
          </Col>
          <Col xs={24} sm={12} className="actions-form">
            <div>
              <Button type="link" onClick={handleNew} icon={<PlusCircleTwoTone style={{ fontSize: '25px' }} />} />
              <Button type="link" icon={<DeleteTwoTone style={{ fontSize: '25px' }} />} />
              {/* <Button shape="circle" icon={<EllipsisOutlined style={{ fontSize: '25px'}} />} /> */}
              <SyncLinksButton handleSync={handleSync} />
            </div>
          </Col>
        </Row>
      </ContentHeaderBar>
      <AppContent>
        <div className="list-container">
          {
            shortLinks.map((record: ShortLinkData) => <ShortLink key={record.id} record={record} />)
          }
          <Pagination defaultCurrent={1} current={parseInt(page)} total={paginationOpts.total} pageSize={paginationOpts.pageSize} onChange={handlePageChange} showSizeChanger={true} />
        </div>
      </AppContent>
    </>
  )
}

const SyncLinksButton = ({ handleSync }: { handleSync: () => void }) => {
  const localLinks = JSON.parse(localStorage.getItem('localShortLinks') || JSON.stringify([]));
  if (localLinks.length == 0) return <></>

  return (
    <Button type="link" onClick={handleSync} icon={<CloudSyncOutlined style={{ fontSize: '25px' }} title="There are some shortened links can sync to your account" />} />
  )
}

const ShortLink = ({ record }: { record: ShortLinkData }) => {
  const [copied, setCopied] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const redirectUrl = window.location.protocol + "//" + window.location.host + `/r/${record.url_string}`;

  const copyToClipBoard = (data: string) => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000)
  }

  const handleMoreButton = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
  }

  const hidePopup = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    setPopupVisible(false);
  }

  const handlePopupVisibleChange = (visible: boolean) => {
    setPopupVisible(visible);
  }

  return (
    <div className="list-short-link-item" onClick={() => copyToClipBoard(redirectUrl)}>
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
          <div className="list-short-link-item-content-title">{record.title || 'Untitled'}</div>
          <div className="list-short-link-item-content-url">origin: {record.url}</div>
          <a href={redirectUrl}>{redirectUrl}</a>
          <div>{record.description}</div>
        </div>
        <div className={copied ? "url-copied-success showing" : "url-copied-success not-showing"}><span><CheckCircleOutlined /></span><span>Copied</span></div>
        <div className="list-short-link-item-actions">
          <Popover
            content={<PopupMoreButton record={record} />}
            title={<a onClick={(e) => hidePopup(e)}>Close</a>}
            trigger="click"
            visible={popupVisible}
            onVisibleChange={handlePopupVisibleChange}
            placement="bottomLeft"
          >
            <Button type="link" onClick={(e) => handleMoreButton(e)} ><MoreOutlined style={{ fontSize: '16px' }} /></Button>
          </Popover>
        </div>
      </div>
    </div>
  )
}

const PopupMoreButton = ({ record }: { record: ShortLinkData }) => {
  const dispatch = useDispatch();
  const api = apis(dispatch).shortLinkApi;

  const switchActive = (value: boolean) => {
    api.updateShortLink({
      id: record.id,
      data: {
        title: record.title,
        description: record.description,
        active: value
      }
    })
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div>
        <Switch defaultChecked={record.active} onChange={switchActive} />
      </div>
    </div>
  )
}
