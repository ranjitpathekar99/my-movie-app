import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IMovielist {
    name:string,
    id:number,
    image:string,
    rating: number,
    summary: string,
}

interface IMovieListState {
    listMovies: IMovielist[]
}

const initialState:IMovieListState = {
    listMovies: []
}

export const MovieListSlice = createSlice({
    name: "MovieList",
    initialState,
    reducers:{
        addRemoveListMovie: (state, action: PayloadAction<{data:IMovielist[]}>) =>{
            let descList = action.payload.data;
            state.listMovies = [...descList].reverse();
        },
        removeMoviefromListMovie: (state, action: PayloadAction<{data:IMovielist}>) =>{
            state.listMovies = state.listMovies.filter(item => item.id !== action.payload.data?.id);
        },
    }
})

export default MovieListSlice.reducer;
export const { addRemoveListMovie, removeMoviefromListMovie} = MovieListSlice.actions;

