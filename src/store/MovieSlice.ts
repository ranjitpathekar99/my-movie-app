import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IMovieList {
    name:string,
    id:number,
    image:string,
    rating: number,
    summary: string,
}

interface IMovieListState {
    movies: IMovieList[]
}

const initialState:IMovieListState ={
    movies: []
}

export const MovieSlice = createSlice({
    name: 'selectedmovie',
    initialState,
    reducers:{
        addRemoveSelectedMovie: (state, action: PayloadAction<{data:IMovieList[]}>) =>{
            state.movies = action.payload.data;
        },
        removeMoviefromSelectedMovie: (state, action: PayloadAction<{data:IMovieList}>) =>{
            state.movies = state.movies.filter(item => item.id !== action.payload.data?.id);
        },
    }
});

export default MovieSlice.reducer;
export const { addRemoveSelectedMovie, removeMoviefromSelectedMovie} = MovieSlice.actions;


