// 监听股票信息请求
console.log('开始监听股票信息请求');
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showStockInfo") {
        console.log('收到股票信息请求:', request);
        const stockCode = request.stockCode;
        console.log('处理股票代码:', stockCode);
        // 构建K线图图片URL
        const minUrl = `https://image2.sinajs.cn/newchart/min/n/${stockCode}.gif`;
        const dailyUrl = `https://image2.sinajs.cn/newchart/daily/n/${stockCode}.gif`;
        const weeklyUrl = `https://image2.sinajs.cn/newchart/weekly/n/${stockCode}.gif`;
        console.log('构建K线图URLs:', {minUrl, dailyUrl, weeklyUrl});
        // 设置图片源
        document.getElementById('minImg').src = minUrl;
        document.getElementById('dailyImg').src = dailyUrl;
        document.getElementById('weeklyImg').src = weeklyUrl;
        console.log('已设置iframe源');
        // 显示弹窗
        document.getElementById('klinePopup').style.display = 'flex';
        console.log('弹窗已显示');
    }
});

// 关闭弹窗逻辑
document.getElementById('klinePopup').addEventListener('click', (e) => {
    if (e.target === document.getElementById('klinePopup')) {
        console.log('用户点击弹窗背景，准备关闭弹窗');
        document.getElementById('klinePopup').style.display = 'none';
        console.log('弹窗已关闭');
    }
});

// 为测试按钮添加点击事件监听器
document.getElementById('testBtn').addEventListener('click', function() {
    console.log('测试功能按钮被点击');
    // 示例：模拟显示 K 线图弹窗
    const fakeStockCode = 'sh601888'; // 替换为实际的股票代码
    console.log('使用测试股票代码:', fakeStockCode);
    // 构建三种K线图图片URL
    const minUrl = `https://image2.sinajs.cn/newchart/min/n/${fakeStockCode}.gif`;
    const dailyUrl = `https://image2.sinajs.cn/newchart/daily/n/${fakeStockCode}.gif`;
    const weeklyUrl = `https://image2.sinajs.cn/newchart/weekly/n/${fakeStockCode}.gif`;
    console.log('构建K线图URLs:', {minUrl, dailyUrl, weeklyUrl});
    
    const klinePopup = document.getElementById('klinePopup');
    if (klinePopup) {
        // 设置图片源
        document.getElementById('minImg').src = minUrl;
        document.getElementById('dailyImg').src = dailyUrl;
        document.getElementById('weeklyImg').src = weeklyUrl;
        console.log('已设置图片源');
        klinePopup.style.display = 'flex';
        console.log('弹窗已显示');
    } else {
        console.error('未找到弹窗元素');
    }
});