chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request, sender, sendResponse);
  console.log('content script works art');

  if (request == "getData") {
    const target = document.getElementsByTagName('main')[0];

    if (target.className.indexOf('page-container') >= 0) {
      const allText = document.body.innerText.split('\n');

      let contacts = '';
      allText.map((item) => {
        if (item.indexOf("@") > -1) {
          contacts = item;
        }
      });
      console.log(contacts);

      // let portfolio = '';
      // allText.map((item) => {
      //   if (item.indexOf("http") > -1 || item.indexOf("www") > -1) {
      //     console.log(item);
      //     portfolio = item;
      //   }
      // });

      const portfolio = window.location.origin + window.location.pathname;
      console.log(portfolio);

      // const images = $('img');
      // const avatar = images[1].src.indexOf('ribbon') > -1 ? images[0].src : images[1].src;
      // console.log(avatar);

      const data = {
        avatar: $('meta[property="og:image"]').attr("content"),
        source: 'https://www.behance.net/',
        name: $('meta[property="og:title"]').attr("content"),
        portfolio: portfolio,
        contacts: contacts,
      };

      sendResponse({
        status: 'success',
        data: data
      });
    } else {
      sendResponse({
        status: 'error',
        message: MESSAGE_WRONG_PAGE
      });
    }
  }
});
