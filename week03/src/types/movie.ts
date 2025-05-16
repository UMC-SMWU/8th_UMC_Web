export type Movie = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
};

export type MovieResponse = {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number,
};

export type MovieDetail = {
    id: number,
    original_title: string,
    overview: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    runtime: number,
    tagline: string,
    title: string,
    vote_average: number,
};

export type MovieCast = {
    id: number,
    name: string,
    original_name: string,
    character: string,
    profile_path: string,
}

export type MovieCrew = {
    id: number,
    credit_id: string,
    name: string,
    original_name: string,
    job: string,
};

export type MovieCredits = {
    id: number,
    cast: MovieCast[],
    crew: MovieCrew[],
};
