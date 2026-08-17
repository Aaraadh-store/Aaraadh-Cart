const CART_KEY = 'aaraadh_cart';

function getCartItems() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveCartItems(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (e) {}
}

function addToCart(newItem) {
  const cart = getCartItems();
  const existingIndex = cart.findIndex(item => 
    item.sku === newItem.sku && 
    item.color === newItem.color && 
    item.size === newItem.size
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += newItem.qty;
  } else {
    cart.push(newItem);
  }

  saveCartItems(cart);
}

function getCartCount() {
  const cart = getCartItems();
  return cart.reduce((sum, item) => sum + item.qty, 0);
}
