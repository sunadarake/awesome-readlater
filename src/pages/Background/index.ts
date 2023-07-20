import { Item } from "../../containers/item";

const listener = () => {
    chrome.storage.sync.get({ items: [] }, (data) => {
        const items: Item[] = data.items;

        chrome.action.setBadgeText({ text: (items || []).length.toString() });
    });
}

chrome.runtime.onStartup.addListener(listener);
chrome.runtime.onInstalled.addListener(listener);