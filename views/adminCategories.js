const layout = require('./layout');

module.exports = function(categories) {
	const categoryList = categories
		.map((category) => {
			return `
        <tr>
            <td class="pv3 pr3 bb b--black-20">${category.name}</td>
            <td class="pv3 pr3 bb b--black-20"># of items</td>
            <td class="pv3 pr3 bb b--black-20"><form method='POST' action="/admin/deleteproduct/${category.id}"> <button type='submit' class="btn-sm btn-danger">Delete</button></form></td>
          </tr>`;
		})
		.join('');

	return layout(`
    <body class="d-flex flex-column align-items-center">
  <h1 class="mt2 mb0 f6 fw4 ttu tracked">ADMIN PANEL</h1>
        
  <div class="pa4">
  <div class="overflow-auto">
    <table class="f6 w-100 mw8 center" cellspacing="0">
      <thead>
        <tr>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Category</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white"># of items</th>
          
        </tr>
      </thead>
      <tbody class="lh-copy">
      ${categoryList}
      <tr>
        <td class="pv3 pr3 bb b--black-20"><a href="/admin/addcategory" class="btn-sm btn-info">Add a Category</a></td>
        <td class="pv3 pr3 bb b--black-20"></td>
        <td class="pv3 pr3 bb b--black-20"></td>
      </tr>
      </tbody>

      </table>
  </div>
  </div>


        
        
    </body>
    `);
};
