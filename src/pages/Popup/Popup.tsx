import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, Form } from "react-bootstrap";
import { Item } from "../../containers/item";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Popup.css";

const Popup: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get({ items: [] }, (data) => {
      setItems(data.items);
    });
  }, []);

  const saveURL = (url: string, favicon?: string, title?: string) => {
    chrome.storage.sync.get({ items: [] }, (data) => {
      const items: Item[] = data.items;
      const filterItems = items.filter(it => it.url !== url);
      const newItems = [{ url, favicon, title }, ...filterItems];

      chrome.storage.sync.set({ items: newItems });
      setItems(newItems);

      chrome.action.setBadgeText({ text: (newItems || []).length.toString() });
    });
  };

  const handleAddURL = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const currentTab = tabs[0];
        const currentURL = currentTab.url;
        const pageTitle = currentTab.title;
        const faviconURL = currentTab.favIconUrl;

        if (currentURL) {
          saveURL(currentURL, faviconURL, pageTitle);
        }
      }
    });
  };

  const handleDeleteURL = (url: string) => {
    const updateItems = items.filter(it => it.url !== url);
    setItems(updateItems);
    chrome.storage.sync.set({ items: updateItems.map(it => ({ url: it.url, title: it.title })) });
    chrome.action.setBadgeText({ text: (updateItems || []).length.toString() });
  };

  const filteredItems = searchKeyword
    ? items.filter((it) => it.title?.toLowerCase().includes(searchKeyword.toLowerCase()))
    : items;

  return (
    <Container className="p-3 bg-white rl-width">
      <h1 className="fs-3">Read Later</h1>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="fw-bold fs-6">Total: {items.length}</span>

        <Button variant="success" className="btn-sm" onClick={() => handleAddURL()}>
          Add <i className="bi bi-plus"></i>
        </Button>
      </div>

      <Form className="mt-4 mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Form>
      <ListGroup>
        {filteredItems.map(({ url, favicon, title }) => (
          <ListGroup.Item key={url} className="p-1 d-flex justify-content-between align-items-center">
            <a href={url} target="_blank" rel="noopener noreferrer" className="fs-6 text-decoration-none">
              {favicon && <img src={favicon} alt="Favicon" className="favicon-size" />} {title || url}
            </a>
            <Button variant="danger" size="sm" onClick={() => handleDeleteURL(url)}>
              <i className="bi bi-trash"></i>
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container >
  );
};

export default Popup;