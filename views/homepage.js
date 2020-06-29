module.exports = function(products) {
	const productList = products
		.map((product) => {
			return `
    <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <img src="https://picsum.photos/200" class="db w-100 br2 br--top" alt="">
        <div class="pa2 ph3-ns pb3-ns">
          <div class="dt w-100 mt1">
            <div class="dtc">
              <h1 class="f5 f4-ns mv0">${product.title}</h1>
            </div>
            <div class="dtc tr">
              <h2 class="f5 mv0">${product.price}</h2>
            </div>
          </div>
          <p class="f6 lh-copy measure mt2 mid-gray">
            If it fits, i sits burrow under covers. Destroy couch leave hair everywhere,
            and touch water with paw then recoil in horror.
          </p>
          <div class="ph3 mb4">
        <form method='POST' action='/addtocart/${product.id}'>
        <button type='submit' class="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-green">Add to Cart</button>
        </form>
        </div>
        </div>
        
    </article>`;
		})
		.join('');

	return `<!DOCTYPE html>
    <html lang="en">    
    <head>
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
    <body>
    <div class="tc">
        <ul class="flex justify-around">${productList}</ul>
    </div>
    
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
