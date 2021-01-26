const layout = require(__dirname + "/../layout");

module.exports = function (user, error) {
  const accessError = (error) => {
    if (error) {
      return `<p class='text-danger m-3'>Sorry! You do not have admin access. Please log in with the admin account.</p>`;
    } else return "";
  };

  return layout(
    user,
    `
    ${accessError(error)}

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
