const urllocal = "http://34.68.6.184:4001";
const urlprod = "https://sentimusic.herokuapp.com";

let appurl =
  process.env.NODE_ENV === "production"
    ? urlprod + "/login"
    : urllocal + "/login";
let appurl_refresh =
  process.env.NODE_ENV === "production"
    ? urlprod + "/refresh_token/"
    : urllocal + "/refresh_token/";

export { appurl, appurl_refresh };
