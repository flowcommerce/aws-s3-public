# Flow Server-side rendering with "fat" metafields

To increase the efficientcy of synchronizing product variants data, Flow now offers a metafield containing all experience data for a single variant into one "fat" metafield. The Flow team have created two Liquid snippets to leverage these metafields in rendering localized variant information in a concise and flexible manner.

## A "fat" metafield

Previously a metafield would be created for each price in each experience for every variant in a Shopify store. These metafields would be grouped by namespace, one per experience. For example,

```json
{
  "namespace": "example-namespace",
  "key": "prices_currency",
  "value": "EUR",
},
{
  "namespace": "example-namespace",
  "key": "prices_item",
  "value": "162,40 €",
},
{
  "namespace": "example-namespace",
  "key": "prices_compare_at",
  "value": "220,95 €",
},
{
  "namespace": "example-namespace",
  "key": "prices_includes",
  "value": "Includes VAT",
},
{
  "namespace": "example-namespace",
  "key": "prices_status",
  "value": "included",
}
```

To increase efficiency in the time required to synchronize a catalog, we have combined all prices for all experiences for a single variant into one metafield namespaced `flow_detail`. For example,

```json
{
  "namespace": "flow_detail",
  "value": "1||flow_ivxxpbremn;flow_c17phumisl;flow_q3azvr4jyh;flow_ug5whsyxom;flow_gb3b497r6b;flow_u1vfevsl7n;flow_p6xa9fkqcv;flow_akyorqtxmn;flow_zew5ybvzpj;flow_fwkkjwppio;flow_ghqlur8m2m;flow_lbvk2vbzlg;flow_rk0ijzexzl;flow_xh7fv20xzm;flow_xj9zleh3tr|ARS;7.270,50 ARS;Includes VAT;9.825,00 ARS;;;2.101,45 ARS;i;|ARS;7.265,31 ARS;Includes VAT;9.818,00 ARS;;;;i;|AUD;A$256.78;Includes VAT and duty;A$347.00;;;;i;|BRL;R$579,42;;R$783,00;;;;i;|XOF;CFA88,823;Includes VAT;CFA120,031;;;;i;|CAD;CA$231.17;Includes VAT;CA$314.99;;;CA$36.42;i;|CNY;CN¥1,185.48;Includes VAT;CN¥1,602.00;;;;i;|EUR;166,75 €;Includes VAT;226,95 €;;;;i;|EUR;146,48 €;;197,95 €;32,81 €;VAT;17,58 €;i;|EUR;165,33 €;Includes VAT;224,95 €;;;;i;|JPY;¥27,700;Includes VAT;;;;;i;|EUR;168,18 €;Includes VAT;228,95 €;;;;i;|PHP;8,140.00 PHP;;11,000.00 PHP;;;;i;|GBP;£118.39;;£159.99;£26.52;VAT;;i;|USD;US$148.00;;US$200.00;US$0.00;ST;US$0.00;i;",
}
```

What we have gained in efficiency, we have lost in ease of use. To alleviate this, Flow offers a pair of snippets to provide easy access to the varaiant localization data.

## flow_localized_price snippet

The `flow_localized_price` snippet can be leveraged to render Flow formatted markup for localization data.

```liquid
  {% include 'flow_localized_price', flow_tag_display: 'item_price' %}
```

would render

```html
<span class="flow-price flow-price__item flow-localized " flow-variant="32353637185" flow-selector="prices.item.label" flow-default="$148.00">7.270,50 ARS</span>
```

## Usage

```
{% include 'flow_localized_price' with [variant], flow_tag_display: [string], classnames: [string] %}
```

## with [variant]

If no variant is provided to `flow_localized_price`, the snippet will use [`product.selected_or_first_available_variant`](https://help.shopify.com/en/themes/liquid/objects/product#product-selected_or_first_available_variant). If another variant should be used, it can be passed using `with`.

**Example**

```
{% include 'flow_localized_price' with selectedVariant %}
```

## variables

### `flow_tag_display`

`flow_localized_price` can be provided with a varaible named `flow_tag_display` as a string parameter indicating which piece of localization data to render. Valid values for `flow_tag_display` are,
+ item_price - the localized item price of the variant
+ price_includes - included cost in the item price (tax and or duty)
+ compare_at - the localized compare_at price of the variant
+ tax - the localized tax for a variant including tax amount and tax name
+ duty - the localized duty for a variant including the amount and duty name

If no `flow_tag_display` is provided, the snippet will default to `item_price`.

**Examples**

`item_price`

---

liquid:
```liquid
  {% include 'flow_localized_price', flow_tag_display: 'item_price' %}
```
rendered markup:
```html
<span class="flow-price flow-price__item flow-localized " flow-variant="32353637185" flow-selector="prices.item.label" flow-default="$148.00">
  7.270,50 ARS
</span>
```

`price_includes`

---

liquid:
```liquid
  {% include 'flow_localized_price', flow_tag_display: 'price_includes' %}
```
rendered markup:
```html
<span class="flow-price flow-price__includes flow-localized " flow-variant="32353637185" flow-selector="prices.includes.label">
  Includes VAT and duty
</span>
```

`compare_at`

---

liquid:
```liquid
  {% include 'flow_localized_price', flow_tag_display: 'compare_at' %}
```
rendered markup:
```html
<span class="flow-price flow-price__compare-at flow-localized " flow-variant="32353637185" flow-selector="prices.compare_at.label" flow-default="$200.00">
  A$347.00
</span>
```

`tax`

---

liquid:
```liquid
  {% include 'flow_localized_price', flow_tag_display: 'tax' %}
```
rendered markup:
```html
<span>
  <span class="flow-price flow-price__vat flow-localized " flow-variant="32353637185" flow-selector="prices.vat.label">
    25,00 €
  </span>
  <span class="flow-price flow-price__vat-name flow-localized " flow-variant="32353637185" flow-selector="prices.vat.name">
    VAT
  </span>
</span>
```

`duty`

---

liquid:
```liquid
  {% include 'flow_localized_price', flow_tag_display: 'duty' %}
```
rendered markup:
```html
  <span>
    <span class="flow-price flow-price__duty flow-localized " flow-variant="32353637185" flow-selector="prices.duty.label">
      CA$40.00
    </span>
    <span class="flow-price flow-price__duty-name flow-localized " flow-variant="32353637185" flow-selector="prices.duty.name">
      Duty
    </span>
  </span>
```

### `classnames`

`classnames` can be provided to `flow_localized_snippet` if additional class names need to be applied to the rendered markup output from the snippet. For example,

```liquid
  {% include 'flow_localized_price', classnames: 'foo bar baz' %}
```

would render

```html
  <span class="flow-price flow-price__item flow-localized foo bar baz" flow-variant="32353637185" flow-selector="prices.item.label" flow-default="$148.00">
    7.270,50 ARS
  </span>
```
