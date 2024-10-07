export interface BasketListResponse {
  success: number;
  specification: string;
  baskets_list: BasketsList[];
  subscription_params: SubscriptionParams;
}

export interface BasketsList {
  id: string;
  name: string;
  products: Product[];
}

export interface Product {
  price: number;
  product_type: string;
  name: string;
  sku: string;
  locationid: number;
  id: string;
  pricing: string;
  status: string;
  description: null | string;
  url_key: string;
  qty: number;
  stock: number;
  small_image: string;
  special_price: number;
  special_to_date: string;
  new_p: number;
  loyality_points: null | string;
}

export interface SubscriptionParams {
  billing_frequence: string[];
}
