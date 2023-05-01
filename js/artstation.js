// import * as Const from 'constants';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('content script works art');

  if (request == "getData") {
    if ($('body').hasClass("ArtistController")) {
      const allText = document.body.innerText.split('\n');

      let contacts = '';
      allText.map((item) => {
        if (item.indexOf("@") > -1) {
          contacts = item;
        }
      });
      console.log(contacts);

      // const portfolio = allText[15] || '';
      const portfolio = window.location.origin + window.location.pathname;
      console.log(portfolio);

      const images = $('.avatar img');
      const avatar = images[0].src || '';
      console.log(avatar);

      const data = {
        avatar: avatar,
        source: 'https://www.artstation.com/',
        name: images[0].alt,
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