const displayHomePage = (req, res, next) => {
  res.render('index', { title: 'Home'});
};

module.exports = { displayHomePage };
