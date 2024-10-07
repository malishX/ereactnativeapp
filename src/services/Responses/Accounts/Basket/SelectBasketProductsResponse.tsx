export interface SelectBasketProductsResponse {
  success: number;
  specification: string;
  cart_items: number;
  data: Data;
  quote_id: string;
}

export interface Data {
  coupon_applied: null;
  items: Item[];
  cashondelivery: Cashondelivery;
  ccavenuepay: Cashondelivery;
  spotiipay: Cashondelivery;
}

export interface Cashondelivery {
  grand_total: number;
  subtotal: number;
  shipping_amount: number;
  tax_amount: number;
  discount_amount: number;
  service_charge: number;
  service_charge_percentage: number;
}

export interface Item {
  item_id: string;
  sku: string;
  qty: number;
  name: string;
  price: number;
  small_image: string;
  product_type: string;
  quote_id: string;
  is_stock: number;
  cat_id: string;
}
