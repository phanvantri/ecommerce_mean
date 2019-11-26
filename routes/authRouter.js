const passport = require('passport');
module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
  app.get('/auth/google/callback',  
  passport.authenticate('google', 

  { failureRedirect: '/', session: false }), (req, res) => {

    const htmlWithEmbeddedJWT = `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('access_token', '${req.user.password}');
        window.localStorage.setItem('user', '${req.user.name}');
        window.localStorage.setItem('id', '${req.user._id}');
        // Redirect browser to root of application
        window.location.href = '/';
      </script>
    </html>
    `;

    res.send(htmlWithEmbeddedJWT);
   
});
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',  
  passport.authenticate('facebook', 

  { failureRedirect: '/', session: false }), (req, res) => {

    const htmlWithEmbeddedJWT = `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('access_token', '${req.user.password}');
        window.localStorage.setItem('user', '${req.user.name}');
        window.localStorage.setItem('id', '${req.user._id}');
        // Redirect browser to root of application
        window.location.href = '/';
      </script>
    </html>
    `;

    res.send(htmlWithEmbeddedJWT);
   
});
 
  
  app.get('/api/current_user', (req, res) => {
    console.log(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
};