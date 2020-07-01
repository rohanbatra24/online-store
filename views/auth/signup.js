const layout = require('../layout');

module.exports = function(user) {
	return layout(
		user,
		`
    
    <main class="d-flex flex-column align-items-center">
    <h2 class="text-center p-2">Sign up for an account!</h2>
    <form method='POST' action='/signup'>
        
    
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter name">
        </div>
    
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
        </div>

        <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password">
        </div>

        <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>

        <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
    </main>`
	);
};
