const request = require("request");
const rp = require("request-promise");

function syncRequest(url) {
  return request(url, (error, response, body) => {
    return body;
  });
}

async function asyncRequest(url) {
  const htmlBody = await rp(url);
  return htmlBody;
}

module.exports = {
  asyncRequest,
  syncRequest
};
