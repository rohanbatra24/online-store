const layout = require('./layout');

module.exports = function(cart) {
	let GrandTotal = 0;

	const cartList = cart
		.map((item) => {
			GrandTotal += Number(item.price.replace(/[^0-9\.-]+/g, '')) * item.quantity;
			return `
	    <tr>
	      <td class="pv3 pr3 bb b--black-20">${item.title}</td>
	      <td class="pv3 pr3 bb b--black-20">${item.price}</td>
	      <td class="pv3 pr3 bb b--black-20">${item.quantity}</td>
	      <td class="pv3 pr3 bb b--black-20">${item.price} x ${item.quantity} = $${Number(
				item.price.replace(/[^0-9\.-]+/g, '')
			) * item.quantity}</td>
      <td class="pv3 pr3 bb b--black-20"><button class="btn">Remove</button></td>
	    </tr>
    `;
		})
		.join('');

	return layout(`
  <div class="pa4">
  <div class="overflow-auto">
    <table class="f6 w-100 mw8 center" cellspacing="0">
      <thead>
        <tr>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Product</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Price</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Quantity</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Total</th>
        </tr>
      </thead>
      <tbody class="lh-copy">
      ${cartList}
      <tr>
        <td class="pv3 pr3 bb b--black-20">Grand total</td>
      <td class="pv3 pr3 bb b--black-20"></td>
      <td class="pv3 pr3 bb b--black-20"></td>
      <td class="pv3 pr3 bb b--black-20">$${GrandTotal}</td>
    </tr>
    </tbody>

      </table>
  </div>
  </div>
  `);
};
