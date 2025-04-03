const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



const isLoggedIn = (req, res, next) => {
  // console.log('You LoggedIn');
  const login = true;
  if(login) {
    req.body.id = 101;
    next();
  } else {
    res.status(401).send({
      message: "please Login First"
    })
  }
}
const isLoggedOut = (req, res, next) => {
  console.log('You LoggedOut');
  next();
}

app.get('/', (req, res) => {
  res.send('Your Api Testing is Working!');
});

// app.use(isLoggedIn);

// app.get('/api/user', isLoggedIn, isLoggedOut, (req, res) => {
//   console.log('first')
//   res.status(200).send({
//     message: "Your profile is ready"
//   })
// })
app.get('/api/user', isLoggedIn, (req, res) => {
  // console.log('first')
  console.log(req.body.id);
  res.status(200).send({
    message: "Your profile is ready"
  })
})

app.delete('/info', (req, res) =>{
  res.send('Your First Information!');
})

app.post('/home', (req, res) => {
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

app.put('/products', (req, res)=>{
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

// client error handling
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route is not found"
  });
  next();
})

// server error handling
app.use((err, req, res, next) => {
  console.err(err.stack)
  res.status(500).send('something broke')
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});