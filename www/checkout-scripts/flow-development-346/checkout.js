flow.checkout.onPageView('all', function handlePageView(order) {
    console.log('*****EVERY', order);
});
flow.checkout.onPageView('cart', function handlePageView(order) {
    console.log('*****CART', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView('confirmation', function handlePageView(order) {
    console.log('*****CONFIRMATION', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView('contactInfo', function handlePageView(order) {
    console.log('*****CONTACT', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView('shippingMethod', function handlePageView(order) {
    console.log('*****SHIPPING', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView('paymentInfo', function handlePageView(order) {
    console.log('*****PAYMENT', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});