export interface MarketProductDetailsResponse {
  success: number;
  specification: string;
  category_name: string;
  result: Result[];
  count: number;
}

export interface Result {
  price: number;
  product_type: string;
  name: string;
  sku: string;
  retailer_id: string;
  locationid: number;
  id: string;
  pricing: string;
  status: string;
  description: string;
  url_key: string;
  qty: number;
  stock: number;
  favourite: number;
  small_image: string;
  special_price: number;
  special_to_date: string;
  new_p: number;
  loyality_points: string;
  tier_price: TierPrice[];
}

export interface TierPrice {
  price_id: string;
  website_id: string;
  all_groups: string;
  cust_group: number;
  price: string;
  price_qty: string;
  percentage_value: null;
  website_price: string;
  "min-quantity": number;
  "max-quantity": number | null;
}
