chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showStockInfo") {
        console.log('收到股票信息请求，股票代码:', request.stockCode);
        // 这里可以添加显示股票信息的逻辑
        sendResponse({ message: '已收到股票信息请求' });
    }
    return true;
});
 
// 创建右键菜单 
chrome.runtime.onInstalled.addListener(()  => {
    chrome.contextMenus.create({ 
        id: "searchStock",
        title: "查询股票: %s", 
        contexts: ["selection"]
    });
});
 
// 处理右键菜单点击 
chrome.contextMenus.onClicked.addListener((info,  tab) => {
    console.log('右键菜单被点击，菜单项 ID:', info.menuItemId);
    if (info.menuItemId  === "searchStock") {
        const selectedText = info.selectionText.trim(); 
        console.log('检测到查询股票的右键菜单点击，选中的文本:', selectedText);
        chrome.tabs.sendMessage(tab.id,  {
            action: "processSelection",
            text: selectedText 
        });
        console.log('已向标签页发送 processSelection 消息，目标标签页 ID:', tab.id);
    }
});