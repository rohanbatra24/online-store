const layout = require('./layout');

module.exports = function(user, categories) {
	const categoriesList = categories.map((category) => {
		return `
    <option value="${category}">${category}</option>`;
	});

	return layout(
		user,
		`
  


  <div class="d-flex flex-column align-items-center">
  <h1>ADMIN PANEL</h1>
  <h3 class="text-info">Add a new product</h3>

  
  <form class='w-50'method='post' action='/admin/addproduct' enctype='multipart/form-data'>

 

    <div class='form-group'>
    <label for="product">Product Title</label>
    <input type="text" name='title' class="form-control" placeholder="">
    </div>

    <div class="form-group">
    <label for="price">Price (CAD)</label>
    <input type="number" name='price' class="form-control" id="price" placeholder="">
    </div>

    <div class="form-group">
    <label for="image  upload">Image (URL)</label>
    <input type="url" name='image' class="form-control" id="image" placeholder="">
    </div>

    <div class="form-group">
    <label for="image  upload">Image (upload)</label>
    <input type="file" name='' class="form-control" id="image" placeholder="">
    </div>

    <div class="form-group">
    <label for="category">Category</label>
    <select name="category" id="category">
    <option value="" disabled selected>Select one..</option>
    ${categoriesList}
    </select>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
    
  </form>


  </div>
    

  `
	);
};
