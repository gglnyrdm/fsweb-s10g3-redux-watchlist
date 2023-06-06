import { movies } from '../movies'
import { SONRAKI_FILM, ONCEKI_FILM, LISTEYE_EKLE, LISTEDEN_CIKAR } from "../actions/action"

const initialState = {
    movies: movies,
    sira: 0,
    favMovies: [],
}

export default function reducer(state =initialState, action ) {
    switch(action.type) {
        case SONRAKI_FILM:
            return {...state, sira: state.sira + 1 };
        case ONCEKI_FILM:
            return {...state, sira: state.sira - 1 };
        case LISTEYE_EKLE:
            const activeMovie = state.movies[state.sira];
            return {
                ...state,
                favMovies: [...state.favMovies, activeMovie],
                sira: state.movies.length - state.sira === 1 ?
                state.sira === 0 ? 0 : state.sira -1 : state.sira,
            };
        case LISTEDEN_CIKAR:
            return {
                ...state,
                favMovies: state.favMovies.filter((movie) => movie.id !== action.payload ),
                movies: [
                    ...state.movies,
                    state.favMovies.find((movie) => movie.id === action.payload),
                ],
            };
        default:
            return state;
    }
}