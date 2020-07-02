module.exports = function(user, coreView) {
	function renderAuth() {
		if (user) {
			console.log('user', user);
			return `
            <div>
            <span>Logged in as ${user}</span>
            <a href='../logout'><button type="button" class="btn btn-info btn-sm m-4">
          <span class="glyphicon glyphicon-log-out" id='logoutBtn'></span> Log out
        </button></a>
            </div>
            `;
		}
		else {
			return `
            <div>
            <a href='/login'><button type="button" class="btn btn-info btn-sm m-2">
          <span class="glyphicon glyphicon-log-out" id='loginBtn'></span> Log In
        </button></a>
        <a href='/signup'><button type="button" class="btn btn-info btn-sm m-2">
          <span class="glyphicon glyphicon-log-out" id='loginBtn'></span> Register
        </button></a>
        </div>`;
		}
	}

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
            

            <div class='d-flex justify-content-between align-items-center'>

            <div class="dropdown m-4">
            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/admin">Admin Panel</a>
                <a class="dropdown-item" href="/admin">Edit Products</a>
                <a class="dropdown-item" href="/admin/categories">Edit Categories</a>
            </div>
            </div>

            
            
            <div class='d-flex flex-column'>
            <h1 class="mt2 mb0 baskerville i fw1 f1">E-Commerce App</h1>
            
            <h2 class="mt2 mb0 f6 fw4 ttu tracked">one-stop shop</h2>
            
            <nav class="bt bb tc mw7 center mt4">
            <a class="text-decoration-none f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/">Home</a>
            <a class="text-decoration-none f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/categories">Categories</a>
            <a class="text-decoration-none f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/cart">Cart</a>
            <a class="text-decoration-none f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/contact">Locations</a>
            <a class="text-decoration-none f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" href="/about">About Us</a>

            
            </nav>
            
            </div>
            
            ${renderAuth()}
        

        

        </div>
        </header>

        <body>
        ${coreView}



        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
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
