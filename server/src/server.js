const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Your Api Testing is Working!');
});

app.get('/info', (req, res) =>{
  res.send('Your First Information!');
})

app.get('/home', (req, res) => {
  res.status(200).send ({
    message: 'Your First Server!',
    status: 'success',
    data: {
      name: 'John Doe',
      age: 30,
      city: 'New York'
    }
  });
})

app.get('/products', (req, res)=>{
  res.status(200).send({
    message: 'Your First Products!',
    status: 'success',
    data: {
      productId: 1,
      productName: 'Laptop',
      price: 1200
    }
  })
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});