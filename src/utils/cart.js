export function getCart() {
    // Vite hydration safety check
    if (typeof window === "undefined") return [];

    let cartInString = localStorage.getItem("cart");

    if (!cartInString) {
        const emptyCart = [];
        localStorage.setItem("cart", JSON.stringify(emptyCart));
        return emptyCart;
    }

    try {
        return JSON.parse(cartInString);
    } catch {
        // If corrupted data exists, reset cart
        const emptyCart = [];
        localStorage.setItem("cart", JSON.stringify(emptyCart));
        return emptyCart;
    }
}

export function addToCart(product, qty) {
    if (typeof window === "undefined") return;

    const cart = getCart();

    const existingProductIndex = cart.findIndex(
        (item) => item.productId === product.productId
    );

    if (existingProductIndex === -1) {
        cart.push({
            productId: product.productId,
            quantity: qty,
            price: product.price,
            name: product.name,
            altNames: product.altNames,
            image: product.images[0],
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        const newQty = cart[existingProductIndex].quantity + qty;

        if (newQty <= 0) {
            const newCart = cart.filter((_, i) => i !== existingProductIndex);
            localStorage.setItem("cart", JSON.stringify(newCart));
        } else {
            cart[existingProductIndex].quantity = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}

export function getTotal() {
    if (typeof window === "undefined") return 0;

    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}
