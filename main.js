var shoppingCartButton = document.getElementsByClassName('view-cart')[0]
var cartView = document.getElementsByClassName('shopping-cart')[0]
var products = document.getElementsByClassName('products')[0];
var addedProducts = []
var renderCart;


shoppingCartButton.addEventListener('click', function(event) {
  if (cartView.classList.contains('show')) {
    cartView.classList.remove('show');
  } else if (!cartView.classList.contains('show')) {
    cartView.classList.add('show')
  }
})

products.addEventListener('click', function(e) {
  //if user clicks add to cart button, create object of item properties and push to cart array
  if (e.target.classList.contains('add-to-cart')) {
    var item = e.target.closest('.item')
    var itemObj = {};
    itemObj.name = item.dataset.name;
    itemObj.price = item.dataset.price;
    itemObj.quantity = 1;
    var containsItem = addedProducts.filter(function(obj) {
      return obj.name === item.dataset.name;
    });
    if (containsItem.length === 1) {
      var i = addedProducts.findIndex(function(obj) {
        return obj.name === item.dataset.name;
      });
      addedProducts[i].price = Number(addedProducts[i].price) + Number(item.dataset.price);
      addedProducts[i].quantity += 1;
    } else {
      addedProducts.push(itemObj);
    }

    //clear cart list and total

    var total = document.getElementsByClassName('total')[0]



    //add clicked items to html of cart list and update total
    renderCart = function() {
      var count = 0;
      var itemHTML = '';
      total.innerHTML = '0';
      document.getElementsByClassName('cart-list')[0].innerHTML = '';
      addedProducts.forEach(function(item) {
        itemHTML += '<div><span id="' + item.name + '">(-) </span><span>' + item.name + " (" + item.quantity + ")" + ' - $' + item.price + '</span></div>';
        count += Number(item.price);
        total.innerHTML = count;
      });
      document.getElementsByClassName('cart-list')[0].innerHTML = itemHTML;
    }
    renderCart();
  }


});

clearButton = document.getElementsByClassName('clear-cart')[0];

clearButton.addEventListener('click', function(event) {
  document.getElementsByClassName('cart-list')[0].innerHTML = '';
  document.getElementsByClassName('total')[0].innerHTML = '0';
  addedProducts.splice(0);
});

var cartItem = document.getElementsByClassName('cart-list')[0];

cartItem.addEventListener('click', function(event) {
  if (event.target.getAttribute('id')) {
    var name = event.target.getAttribute('id');
    var i = addedProducts.findIndex(function(obj) {
      return obj.name === name;
    });
    addedProducts.splice(i, 1);
    renderCart();
  }
});
