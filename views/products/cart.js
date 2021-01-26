const layout = require(__dirname + "../layout");

module.exports = function (user, cart) {
  let GrandTotal = 0;

  const cartList = cart
    .map((item) => {
      GrandTotal +=
        Number(item.price.replace(/[^0-9\.-]+/g, "")) * item.quantity;
      return `
      <tr>
      <td class="pv3 pr3 bb b--black-20"><img src=${
        item.image
      } class="mw3-l" alt="night sky over water"></td>

	      <td class="pv3 pr3 bb b--black-20">${item.title}</td>
	      <td class="pv3 pr3 bb b--black-20">${item.price}</td>
	      <td class="pv3 pr3 bb b--black-20">${item.quantity}</td>
	      <td class="pv3 pr3 bb b--black-20">${item.price} x ${
        item.quantity
      } = $<span class='font-weight-bold'>${
        Number(item.price.replace(/[^0-9\.-]+/g, "")) * item.quantity
      }</span></td>
      <td class="pv3 pr3 bb b--black-20"><form method='POST' action="/removecartitem/${
        item.id
      }"> <button type='submit' class="btn-xs btn-danger br-pill ml-2">Remove</button></form></td>
	    </tr>
    `;
    })
    .join("");

  return layout(
    user,
    `
    
    <h1 class="mt2 mb0 ttu tracked text-center">Your Cart</h1>
  <div class="pa4">
  <div class="overflow-auto">
    
    <table class="f6 w-100 mw8 center" cellspacing="0">
      <thead>
        <tr>
        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white"></th>

          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Product</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Price</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Quantity</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Total</th>
          <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white"></th>
        </tr>
      </thead>
      <tbody class="lh-copy">
      ${cartList}
      <tr>
      <td class="pv3 pr3 bb b--black-20"></td>
        <td class="pv3 pr3 bb b--black-20 font-weight-bold ttu">Grand total</td>
      <td class="pv3 pr3 bb b--black-20"></td>
      <td class="pv3 pr3 bb b--black-20"></td>
      <td class="pv3 pr3 bb b--black-20 font-weight-bold">$${GrandTotal}</td>
      <td class="pv3 pr3 bb b--black-20"><button type='submit' class="btn-sm btn-success ">Checkout</button></td>

    </tr>
    </tbody>

      </table>
  </div>
  </div>
  `
  );
};
