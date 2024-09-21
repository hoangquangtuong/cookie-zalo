let imeiNotificationShown = false;
let cookiesNotificationShown = false;

function captureRequests() {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      const url = details.url;
      let imeiFound = false;
      let imeiValue = 'Not Found';
      
      // check if IMEI param is present in the URL
      if (url.includes('/api/login/getServerInfo') && url.indexOf('imei=') > -1) {
        const params = new URLSearchParams(new URL(url).search);
        imeiFound = true;
        imeiValue = params.get('imei');
        chrome.runtime.sendMessage({ action: 'IMEIValue', imei: imeiValue });

        if (!imeiNotificationShown) {
          const options = {
            type: 'basic',
            title: 'IMEI Found',
            message: 'Successfully get IMEI',
            iconUrl: '/images/success.png'
          };

          chrome.notifications.create('imei_notification', options);
          imeiNotificationShown = true;
        }
      }
      
      // if IMEI is found and URL is chat.zalo.me, get cookies
      if (imeiFound && url.includes('chat.zalo.me')) {
        chrome.cookies.getAll({ url: url }, function(cookies) {
          const cookiesDict = {};

          for (let i = 0; i < cookies.length; i++) {
            cookiesDict[cookies[i].name] = cookies[i].value;
          }

          chrome.runtime.sendMessage({ action: 'CookiesValue', cookies: JSON.stringify(cookiesDict) });

          if (!cookiesNotificationShown) {
            const options = {
              type: 'basic',
              title: 'Cookies Found',
              message: 'Successfully get Cookies',
              iconUrl: '/images/success.png'
            };

            chrome.notifications.create('cookies_notification', options);
            cookiesNotificationShown = true;
          }
        });
      }
    },
    { urls: ["<all_urls>"] },
    ["requestBody"]
  );
}

chrome.action.onClicked.addListener((tab) => {
  // Kiểm tra xem tab có phải là trang đã được tải chưa
  if (tab.url) {
    // Tải lại trang hiện tại
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => {
        location.reload();
      }
    });
  }
});

captureRequests();
