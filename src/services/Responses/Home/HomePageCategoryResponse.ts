export interface HomePageCategoryDataResponse {
  success: number;
  message: string;
  mode: string;
  data: CategroyData[];
}

export interface CategroyData {
  id: string;
  name: string;
  thumbnail: string;
}
