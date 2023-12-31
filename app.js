const express = require('express');

const app = express();
const port = 3000;

app.get('/triangle', (req, res) => {
  const  {a, b, c} = req.query;

  if(!a || !b || !c) {
    return res.status(500).send('Missing arguments');
  }

  const sideA = parseFloat(a);
  const sideB = parseFloat(b);
  const sideC = parseFloat(c);

  if(isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) {
    return res.status(500).send('The value of the side must be a number');
  }

  if(sideA === sideB && sideB === sideC) {
    return res.send('EQUILATERAL');
  } else if(sideA === sideB || sideA === sideC || sideB === sideC) {
    return res.send('ISOCELES ');
  } else {
    return res.send('SCALENE');
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});