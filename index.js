const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'x.x.x.x',
  user: 'xxx',
  password: 'xxxxx',
  database: 'xxxxx'
});

app.get('/', (req, res) => {
    res.send('hello world')
}
) 


app.get('/test-connection', (req, res) => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      res.status(500).json({ error: 'Failed to connect to the database' });
    } else {
      console.log('Connected to MySQL');
      res.json({ message: 'Connection to database successful' });
    }
  });
});

app.post('/create-row', async (req, res) => {
    try {
    //     console.log(req.body)
    //   const { id, name } = req.body;
  
      const query = 'INSERT INTO productos (id, name) VALUES (?, ?)';
      const values = [2, "nombre"];
  
      await connection.execute(query, values);
  
      await connection.end();
  
      res.json({ message: 'Row created successfully' });
    } catch (error) {
      console.error('Error creating row:', error);
      res.status(500).json({ error: 'Failed to create row' });
    }
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
