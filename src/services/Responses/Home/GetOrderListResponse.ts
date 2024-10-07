export interface GetOrederListResponse {
  count: number;
  success: number;
  specification: string;
  result: OrderListResult[];
}

export interface OrderListResult {
  address: Address;
  amount_paid: boolean;
  can_cancel: boolean;
  date: string;
  delivery_date: string;
  discount_amount: number;
  id: string;
  is_cancelable: boolean;
  is_invoices_available: boolean;
  items: OrderItems[];
  last_status: LastStatus;
  order_spendpoint_amount: number;
  order_subtotal: string;
  orderid: string;
  retailer: Retailer;
  status: string;
  total: string;
}

export interface Address {
  id: string;
  country_id: string;
  customer_id: string;
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

export interface OrderItems {
  image_url: string;
  name: string;
  product_id: string;
  qty: number;
  sku: string;
  total: number;
}

export interface LastStatus {
  reated_at: string;
  status: string;
  text_to_show_to_user: string;
}

export interface Retailer {
  id: string;
  location: string;
  name: string;
  profile_picture: string;
}
