// cart-bridge.js — Shared LocalStorage Manager for Vercel + Google Sites
const CART_STORAGE_KEY = 'aaraadh_cart_items';

// Get current cart items array
function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
  } catch (e) {
    console.error('Error reading cart state:', e);
    return [];
  }
}

// Get total count of items in cart
function getCartCount() {
  const items = getCartItems();
  return items.reduce((total, item) => total + (parseInt(item.qty, 10) || 1), 0);
}

// Save updated cart to localStorage & trigger a custom update event
function saveCartItems(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (e) {
    console.error('Error saving cart state:', e);
  }
}

// Add a new product or increment quantity if already exists
function addToCart(newItem) {
  const cart = getCartItems();
  const existingIndex = cart.findIndex(
    item => item.title === newItem.title && item.size === newItem.size && item.color === newItem.color
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += newItem.qty || 1;
  } else {
    cart.push({ ...newItem, qty: newItem.qty || 1 });
  }

  saveCartItems(cart);
}
