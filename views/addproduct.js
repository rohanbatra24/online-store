module.exports = function() {
	return `
    <!DOCTYPE html>
    <html lang="en">    
    <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ecommerce app</title>
        
    </head>
    <header class="bg-white black-80 tc pv4 avenir">
  <a href="" class="bg-black-80 ba b--black dib pa3 w2 h2 br-100">
    <svg class="white" data-icon="skull" viewBox="0 0 32 32" style="fill:currentcolor"><title>skull icon</title><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></svg>
  </a>
  <h1 class="mt2 mb0 baskerville i fw1 f1">E-Commerce App</h1>
  <h2 class="mt2 mb0 f6 fw4 ttu tracked">one-stop shop</h2>
  <nav class="bt bb tc mw7 center mt4">
    <a class="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/">Home</a>
    <a class="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" href="/shop">Products</a>
    <a class="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/about">About</a>
    <a class="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/cart">Cart</a>
    <a class="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/login">Login</a>
    <a class="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/logout">Logout</a>


  </nav>
  
</header>

<h1>ADMIN PANEL</h1>

<h3 class="text-info">Add a new product</h3>
    
  <body class="d-flex flex-column align-items-center">
  <form class="w-50">
  <div class="form-group">
    <label for="exampleInputEmail1">Product Title</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Price (CAD)</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Category</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    
    </body>
    <footer class="pv4 ph3 ph5-m ph6-l mid-gray">
    <small class="f6 db tc">© 2016 <b class="ttu">SOME COMPANY Inc</b>., All Rights Reserved</small>
    <div class="tc mt3">
      <a href="/language/" title="Language" class="f6 dib ph2 link mid-gray dim">Language</a>
      <a href="/terms/"    title="Terms" class="f6 dib ph2 link mid-gray dim">Terms of Use</a>
      <a href="/privacy/"  title="Privacy" class="f6 dib ph2 link mid-gray dim">Privacy</a>
    </div>
  </footer>
    </html>`;
};
