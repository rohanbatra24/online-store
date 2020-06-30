const layout = require('../layout');

module.exports = function(user, products) {
	const productList = products
		.map((product) => {
			return `
        <tr>
            <td class="pv3 pr3 bb b--black-20">${product.title}</td>
            <td class="pv3 pr3 bb b--black-20">${product.name}</td>
            <td class="pv3 pr3 bb b--black-20">${product.price}</td>
            <td class="pv3 pr3 bb b--black-20"><form method='POST' action="/admin/deleteproduct/${product.id}"> <button type='submit' class="btn-sm btn-danger">Delete</button></form></td>
          </tr>`;
		})
		.join('');

	return layout(
		user,
		`
    
    
    
    <div class="d-flex flex-column align-items-center">
        <h1 class="mt2 mb0 f6 fw4 ttu tracked">ADMIN PANEL</h1>
              
        <div class="pa4">
        <div class="overflow-auto">
          <table class="f6 w-100 mw8 center" cellspacing="0">
            <thead>
              <tr>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Product</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Category</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Price</th>
                
              </tr>
            </thead>
            <tbody class="lh-copy">
            ${productList}
            <tr>
              <td class="pv3 pr3 bb b--black-20"><a href="/admin/addproduct" class="btn btn-info">Add a product</a></td>
              <td class="pv3 pr3 bb b--black-20"><a href="/admin/addcategory" class="btn btn-info">Add a category</a></td>
              <td class="pv3 pr3 bb b--black-20"></td>
              <td class="pv3 pr3 bb b--black-20"></td>
            </tr>
            </tbody>
      
            </table>
        </div>
        </div>
      </div>
        `
	);
};
