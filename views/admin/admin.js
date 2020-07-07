const layout = require('../layout');

module.exports = function(user, products, error) {
	const productList = products
		.map((product) => {
			return `
        <tr>
            <td class="pv3 pr3 bb b--black-20"><img src=${product.image} class="mw4-l" alt="night sky over water"></td>
            <td class="pv3 pr3 bb b--black-20">${product.title}</td>
            <td class="pv3 pr3 bb b--black-20">${product.name}</td>
            <td class="pv3 pr3 bb b--black-20">$${product.price}</td>
            <td class="pv3 bb b--black-20 pr5"><form method='POST' action="/admin/deleteproduct/${product.id}"> <button type='submit' class="btn-xs br-pill btn-danger">Delete</button></form></td>
          </tr>`;
		})
		.join('');

	const accessError = (error) => {
		if (error) {
			return `<p class='text-danger m-3'>Sorry! You do not have admin access. Please log in with the admin account.</p>`;
		}
		else return '';
	};

	return layout(
		user,
		`
    <div class="d-flex flex-column align-items-center">
        <h1 class="mt2 mb0 ttu tracked">ADMIN PANEL</h1>

        ${accessError(error)}
              
        <div class="pa4">
        <div class="overflow-auto">
        <tr>
        <div class='d-flex justify-content-center mb-3'>
          <td class="pv3 pr3 bb b--black-20"><a href="/admin/addproduct" class="btn btn-info ma3">Add a product</a></td>
          <td class="pv3 pr3 bb b--black-20"><a href="/admin/addcategory" class="btn btn-info ma3">Add a category</a></td>
          </div>
          
        </tr>
          <table class="f6 w-100 mw8 center" cellspacing="0">
            <thead>
              <tr>
              <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white "></th>

                <th class=" bb b--black-20 tl pb3 pr3 bg-white">Product</th>
                <th class=" bb b--black-20 tl pb3 pr3 bg-white">Category</th>
                <th class=" bb b--black-20 tl pb3 pr3 bg-white">Price</th>
                
              </tr>
            </thead>
            <tbody class="lh-copy">
            ${productList}
            </tbody>
      
            </table>
        </div>
        </div>
      </div>
        `
	);
};
