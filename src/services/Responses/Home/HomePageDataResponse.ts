export interface HomePageDataResponse {
  success: number;
  message: string;
  result: Result;
}

export interface Result {
  sliders: Slider[];
  home_hot_deals_banner: Home[];
  home_footer_banner_1: Home[];
  home_footer_banner_2: Home[];
  home_rectangle_banner: Home[];
  home_product_of_the_day: HomeProductOfTheDay[];
}

export interface Home {
  image: string;
  type: string;
  link: string;
  title?: string;
  button?: string;
}

export interface HomeProductOfTheDay {
  image: string;
  type: string;
  link: string;
  title: string;
  name: string;
  price: number;
  spl_price: number;
  button: string;
}

export interface Slider {
  banner: string;
  type: null | string;
  link: string;
}
