const layout = require('../layout');

module.exports = function(user, errors) {
	const displayErrors = (err, field) => {
		try {
			return `<p class='m-2 text-danger'>${err[field].msg}</p>`;
		} catch (err) {
			return '';
		}
	};

	return layout(
		user,
		`
    
    <main class="d-flex flex-column align-items-center">
    <h2 class="text-center p-2">Please log in</h2>
    <form method='POST' action='/login'>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
        </div>

        ${displayErrors(errors, 'email')}

        <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password">
        </div>

        ${displayErrors(errors, 'password')}

        <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>



        <button type="submit" class="btn btn-primary m-4">Sign In</button>
        <button type="submit" class="btn btn-primary">Register</button>

    </form>
    </main>`
	);
};
