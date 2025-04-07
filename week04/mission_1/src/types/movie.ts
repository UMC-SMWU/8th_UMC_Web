export type Movie = {
    "adult": boolean;
    "backdrop_path": string;
    "genre_ids": number[];
    "id": number;
    "original_language": string;
    "original_title": string;
    "overview": string;
    "popularity": number;
    "poster_path": string;
    "release_date": string;
    "title": string;
    "video": boolean;
    "vote_average": number;
    "vote_count": number;
};
export type MovieResponse = {
page:number;
results:Movie[];
total_pages:number;
total_results:number;
dates: {
    maximum: string;
    minimum: string;
}
};
type Genre = {
    id: number;
    name:string;
}
type ProductionCompany = {
    id : number;
    logo_path:string;
    name:string;
    origin_country:string;
}
type ProductionCountries = {
    iso_3166_1:string;
    name:string;
}
type SpokenLanguages = {
    english_name:string;
    iso_639_1:string;
    name:string;
}
export type MovieDetailResponse = {
  "adult": boolean,
  "backdrop_path": string,
  "belongs_to_collection": {
    "id": number,
    "name": string,
    "poster_path": string,
    "backdrop_path": string
  },
  "budget": number,
  "genres": Genre[],
  "homepage": string,
  "id": number,
  "imdb_id": number,
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_title": "Mufasa: The Lion King",
  "overview": "Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.",
  "popularity": 176.5402,
  "poster_path": "/lurEK87kukWNaHd0zYnsi3yzJrs.jpg",
  "production_companies": ProductionCompany[],
  "production_countries": ProductionCountries[],
  "release_date": string
  "revenue": number
  "runtime": number
  "spoken_languages": SpokenLanguages[],
  "status": string
  "tagline": string
  "title": string
  "video": boolean
  "vote_average": number,
  "vote_count": number
};