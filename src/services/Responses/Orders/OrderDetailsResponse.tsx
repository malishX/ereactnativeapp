export interface OrderDetailsResponse {
  success: number;
  specification: string;
  result: Result;
}

export interface Result {
  order_date: string;
  delivery_date: Date;
  order_id: string;
  service_charge_percentage: number;
  increment_id: string;
  status: string;
  is_invoices_available: boolean;
  discount_amount: any;
  tax_amount: any;
  subtotal: any;
  grand_total: any;
  shipping_amount: any;
  shipping_method: string;
  service_charge: number;
  amount_paid: boolean;
  time_slot: null;
  payment_method: string;
  name: string;
  rewards: Rewards;
  address: Address;
  retailer: Retailer;
  is_cancelable: boolean;
  history: History[];
  items: Item[];
}

export interface Address {
  id: string;
  country_id: string;
  customer_id: null;
  firstname: string;
  lastname: string;
  street: string;
  telephone: string;
  postcode: string;
  region: Region;
  city: string;
  country_name: string;
  address_type: string;
  latlng: string;
}

export interface Region {
  region_code: string;
  region: string;
  region_id: string;
}

export interface History {
  status: string;
  created_at: string;
  text_to_show_to_user: string;
}

export interface Item {
  product_id: string;
  name: string;
  sku: string;
  image_url: string;
  qty: number;
  total: number;
  order_item_id: string;
  rma_status: null;
}

export interface Retailer {
  id: string;
  name: string;
  location: string;
  profile_picture: string;
}

export interface Rewards {
  points: any;
  amount: number;
  message: null;
  earn: number;
}
