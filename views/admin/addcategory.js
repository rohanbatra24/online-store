const layout = require('../layout');

module.exports = function(user) {
	return layout(
		user,
		`
  <body class="d-flex flex-column align-items-center">
    
    <form method='post' action='/admin/addCategory' class="w-50">
  <div class="form-group">
    <label for="product">Category Name</label>
    <input type="text" name='name' class="form-control" placeholder="">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</body>

    `
	);
};
