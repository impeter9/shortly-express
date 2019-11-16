const parseCookies = (req, res, next) => {

  let cookieMonster = {};
  if (req.headers.cookie) {
    if (req.headers.cookie.includes(';')) {
      let chocolateChipCookie = req.headers.cookie.split('; ');
      chocolateChipCookie.forEach(cookie => {
        let snickerdoodle = cookie.split('=');
        cookieMonster[snickerdoodle[0]] = snickerdoodle[1];
      });
    } else {
      let snickerdoodle = req.headers.cookie.split('=');
      cookieMonster[snickerdoodle[0]] = snickerdoodle[1];
    }
  }
  req.cookies = cookieMonster;
  next();
};

module.exports = parseCookies;