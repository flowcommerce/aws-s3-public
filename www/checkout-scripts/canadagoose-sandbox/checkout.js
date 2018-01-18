flow.checkout.onPageView(flow.checkout.enums.pageView.CONFIRMATION, function handlePageView(data) {
  var items = [];
  var prices = data.getOrderPrices();

  data.order.items.forEach((orderItem) => {
    var contentItem = data.content.getItem(orderItem.number);

    if (contentItem) {
      items.push({
        brand: 'Canada Goose',
        category: contentItem.categories.join(),
        dimension6: contentItem.attributes['modelSize-x-default'],
        dimension7: `${contentItem.attributes['product_id']}${contentItem.attributes['color']}-${contentItem.attributes['modelSize-x-default']}`,
        id: contentItem.attributes['product_id'],
        name: contentItem.name,
        price: contentItem.price.amount,
        quantity: orderItem.quantity,
        variant: contentItem.attributes['colorName-en-CA']
      });
    }
  });

  dataLayer.push({
    pageTitle: 'Checkout: Order Confirmation',
    pageCategory: 'checkout',
    visitorLoginState: 'flow',
    customerEmail: data.order.customer.email,
    customerOrders: null,
    customerValue: 0,
    Country: data.order.destination.country,
    State: data.order.destination.province,
    event: 'gtm.click',
    ecommerce: {
      purchase: {
        actionField: {
          id: data.order.number,
          revenue: prices.subtotal ? prices.subtotal.base.amount : -1,
          shipping: prices.shipping ? prices.shipping.base.amount : -1,
          tax: prices.duty ? prices.duty.base.amount : -1
        },
        products: items
      },
      currencyCode: data.order.total.base.currency
    },
    gtm: {
      uniqueEventId: 257,
      start: Date.now(),
      element: document.createElement('div'),
      elementClasses: '',
      elementId: '',
      elementTarget: '',
      elementUrl: ''
    }
  });
});

flow.checkout.onPageView(flow.checkout.enums.pageView.CONTACT_INFO, function handlePageView(data) {
  var items = [];

  data.order.items.forEach((orderItem) => {
    var contentItem = data.content.getItem(orderItem.number);

    if (contentItem) {
      items.push({
        brand: 'Canada Goose',
        category: contentItem.categories.join(),
        dimension6: contentItem.attributes['modelSize-x-default'],
        dimension7: `${contentItem.attributes['product_id']}${contentItem.attributes['color']}-${contentItem.attributes['modelSize-x-default']}`,
        id: contentItem.attributes['product_id'],
        name: contentItem.name,
        price: contentItem.price.amount,
        quantity: orderItem.quantity,
        variant: contentItem.attributes['colorName-en-CA']
      });
    }
  });

  dataLayer.push({
    pageTitle: 'Checkout: Shipping and Billing Address',
    pageCategory: 'checkout',
    visitorLoginState: 'flow',
    customerEmail: data.order.customer.email,
    customerOrders: null,
    customerValue: 0,
    Country: data.order.destination.country,
    State: data.order.destination.province,
    event: 'gtm.click',
    ecommerce: {
      checkout: {
        actionField: { step: 2 },
        products: items
      },
      currencyCode: data.order.total.base.currency
    },
    gtm: {
      uniqueEventId: 111,
      start: Date.now(),
      element: document.createElement('div'),
      elementClasses: '',
      elementId: '',
      elementTarget: '',
      elementUrl: ''
    }
  });
});

flow.checkout.onPageView(flow.checkout.enums.pageView.SHIPPING_METHOD, function handlePageView(data) {
  var items = [];

  data.order.items.forEach((orderItem) => {
    var contentItem = data.content.getItem(orderItem.number);

    if (contentItem) {
      items.push({
        brand: 'Canada Goose',
        category: contentItem.categories.join(),
        dimension6: contentItem.attributes['modelSize-x-default'],
        dimension7: `${contentItem.attributes['product_id']}${contentItem.attributes['color']}-${contentItem.attributes['modelSize-x-default']}`,
        id: contentItem.attributes['product_id'],
        name: contentItem.name,
        price: contentItem.price.amount,
        quantity: orderItem.quantity,
        variant: contentItem.attributes['colorName-en-CA']
      });
    }
  });

  dataLayer.push({
    pageTitle: 'Checkout: Shipping method',
    pageCategory: 'checkout',
    visitorLoginState: 'flow',
    customerEmail: data.order.customer.email,
    customerOrders: null,
    customerValue: 0,
    Country: data.order.destination.country,
    State: data.order.destination.province,
    event: 'gtm.click',
    ecommerce: {
      checkout: {
        actionField: { step: 3 },
        products: items
      },
      currencyCode: data.order.total.base.currency
    },
    gtm: {
      uniqueEventId: 165,
      start: Date.now(),
      element: document.createElement('div'),
      elementClasses: '',
      elementId: '',
      elementTarget: '',
      elementUrl: ''
    }
  });
});

flow.checkout.onPageView(flow.checkout.enums.pageView.PAYMENT_INFO, function handlePageView(data) {
  var items = [];

  data.order.items.forEach((orderItem) => {
    var contentItem = data.content.getItem(orderItem.number);

    if (contentItem) {
      items.push({
        brand: 'Canada Goose',
        category: contentItem.categories.join(),
        dimension6: contentItem.attributes['modelSize-x-default'],
        dimension7: `${contentItem.attributes['product_id']}${contentItem.attributes['color']}-${contentItem.attributes['modelSize-x-default']}`,
        id: contentItem.attributes['product_id'],
        name: contentItem.name,
        price: contentItem.price.amount,
        quantity: orderItem.quantity,
        variant: contentItem.attributes['colorName-en-CA']
      });
    }
  });

  dataLayer.push({
    pageTitle: 'Checkout: Payment',
    pageCategory: 'checkout',
    visitorLoginState: 'flow',
    customerEmail: data.order.customer.email,
    customerOrders: null,
    customerValue: 0,
    Country: data.order.destination.country,
    State: data.order.destination.province,
    event: 'gtm.click',
    ecommerce: {
      checkout: {
        actionField: { step: 4 },
        products: items
      },
      currencyCode: data.order.total.base.currency
    },
    gtm: {
      uniqueEventId: 250,
      start: Date.now(),
      element: document.createElement('div'),
      elementClasses: '',
      elementId: '',
      elementTarget: '',
      elementUrl: ''
    }
  });
});