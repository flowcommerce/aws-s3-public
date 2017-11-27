flow.checkout.onPageView('all', function handlePageView(order) {
    console.log('*****EVERY', order);
});
flow.checkout.onPageView('cart', function handlePageView(order) {
    console.log('*****CART', order);
});
flow.checkout.onPageView('confirmation', function handlePageView(order) {
    console.log('*****CONFIRMATION', order);
});
flow.checkout.onPageView('contactInfo', function handlePageView(order) {
    console.log('*****CONTACT', order);
});
flow.checkout.onPageView('shippingMethod', function handlePageView(order) {
    console.log('*****SHIPPING', order);
});
flow.checkout.onPageView('paymentInfo', function handlePageView(order) {
    console.log('*****PAYMENT', order);
});