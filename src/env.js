const Cookies = require("js-cookie");

module.exports = {
  server: "http://143.110.181.191/api",

  config: {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      Cookie: `jwt=${Cookies.get("jwt")}`,
    },
  },

  checkAccess: (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        Cookies.remove("footprint");
        window.location.href = "/";
      }
    }
    return true;
  },
};
