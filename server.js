const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const saltRounds = 10;
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }
}));

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
  db.run("CREATE TABLE wishlist (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, movie_title TEXT)");

});

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth.html'));
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const insert = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(insert, [username, hashedPassword], function(err) {
    if (err) {
      console.error(err.message);
      res.send('Error occurred during signup.');
    } else {
      console.log(`User created successfully with id ${this.lastID}`);
      res.send(`Signup successful! <script>setTimeout(function(){ window.location.href = '/'; }, 3000);</script>`);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error(err.message);
      res.send('Login error.');
    } else if (row && bcrypt.compareSync(password, row.password)) {
      req.session.username = username; 
      req.session.userId = row.id;
      req.session.save(err => {
        if(err) {
          console.error(err);
          res.status(500).send('Error saving session.');
        } else {
          res.redirect('/'); 
        }
      });
    } else {
      res.send('Invalid username or password.');
    }
  });
});

app.get('/', (req, res) => {
  if (req.session.username) {
    res.render('index', { username: req.session.username });
  } else {
    res.render('index', { username: null });
  }
});

app.get('/users', (req, res) => {
  db.all("SELECT id, username FROM users", [], (err, rows) => {
    if (err) {
      res.send("An error occurred while fetching users.");
      console.error(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.get('/delete-users', (req, res) => {
  db.run("DELETE FROM users", [], (err) => {
    if (err) {
      res.send("An error occurred while deleting users.");
      console.error(err.message);
    } else {
      res.send("All users deleted successfully.");
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/'); 
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/myWishlist/add', (req, res) => {
  const user_id = req.session.userId;
  const { movieTitle } = req.body;

  if (!user_id) {
    return res.status(401).json({ success: false, message: 'User must be logged in.' });
  }

  const insert = 'INSERT INTO wishlist (user_id, movie_title) VALUES (?, ?)';
  db.run(insert, [user_id, movieTitle], function(err) {
    if (err) {
      console.error(err.message);
      res.json({ success: false, message: 'Error occurred while adding to wishlist.' });
    } else {
      console.log(`Wishlist item created successfully with id ${this.lastID}`);
      res.json({ success: true, message: 'Item added to wishlist.' });
    }
  });
});

app.get('/myWishlist', (req, res) => {
  const user_id = req.session.userId;

  if (!user_id) {
    return res.status(401).json({ success: false, message: 'User must be logged in.' });
  }

  const query = 'SELECT movie_title FROM wishlist WHERE user_id = ?';
  db.all(query, [user_id], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.json({ success: false, message: 'Error occurred while fetching wishlist.' });
    } else {
      res.json({ success: true, data: rows });
    }
  });
});
