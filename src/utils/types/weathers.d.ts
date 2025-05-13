export type TWeatherCard = {
  cityName: string;
  temperature: number;
  weatherType: string;
};

export type TCityWeatherCard = {
  data: TWeatherCard;
  colors: Record<string, string>;
};
