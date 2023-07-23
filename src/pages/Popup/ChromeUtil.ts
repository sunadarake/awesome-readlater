import { Item } from "../../containers/item";

/**
 * https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
 * 
 * @param updateItems
 */
export const chromeStorageSet = (updateItems: Item[]) => {
    chrome.storage.sync.set({ items: updateItems });
}

/**
 * https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
 * 
 * @returns
 */
export const chromeStorageGet = () => {
    return chrome.storage.sync.get({ items: [] });
}

/**
 * https://developer.chrome.com/docs/extensions/reference/action/#method-setBadgeText
 * 
 * @param newItems 
 */
export const chromeSetBadgeText = (newItems: Item[]) => {
    chrome.action.setBadgeText({ text: (newItems || []).length.toString() });
};

/**
 * https://developer.chrome.com/docs/extensions/reference/tabs/#method-query
 * 
 * @returns 
 */
export const chromeTabsQuery = () => {
    return chrome.tabs.query({ active: true, currentWindow: true });
};