flow.checkout.onPageView(flow.checkout.enums.pageView.ALL, function handlePageView(order) {
    console.log('*****EVERY', order);
});
flow.checkout.onPageView(flow.checkout.enums.pageView.CART, function handlePageView(order) {
    console.log('*****CART', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView(flow.checkout.enums.pageView.CONFIRMATION, function handlePageView(order) {
    console.log('*****CONFIRMATION', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView(flow.checkout.enums.pageView.CONTACT_INFO, function handlePageView(order) {
    console.log('*****CONTACT', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView(flow.checkout.enums.pageView.SHIPPING_METHOD, function handlePageView(order) {
    console.log('*****SHIPPING', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});
flow.checkout.onPageView(flow.checkout.enums.pageView.PAYMENT_INFO, function handlePageView(order) {
    console.log('*****PAYMENT', order);
    ga('send', {
        hitType: 'pageview',
        orderId: order.id
    });
});