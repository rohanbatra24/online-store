const layout = require(__dirname + "../layout");

module.exports = function (user, categories) {
  const categoryList = categories
    .map((category) => {
      return `
    <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <img src=${category.image} class="db w-100 br2 br--top" alt="">
        <div class="pa2 ph3-ns pb3-ns">
          <div class="dt w-100 mt1">
            <div class="dtc">
              <h1 class="f5 f4-ns mv0">${category.name}</h1>
            </div>
          </div>
          <p class="f6 lh-copy measure mt2 mid-gray">
            If it fits, i sits burrow under covers. Destroy couch leave hair everywhere,
            and touch water with paw then recoil in horror.
          </p>
          <div class="ph3 mb4">
        <form method='GET' action='/categories/${category.id}'>
        <button type='submit' class="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-green">See all products</button>
        </form>
        </div>
        </div>
        
    </article>`;
    })
    .join("");

  return layout(
    user,
    `<div class="tc">
        <ul class="flex flex-wrap justify-around">${categoryList}</ul>
    </div>`
  );
};
