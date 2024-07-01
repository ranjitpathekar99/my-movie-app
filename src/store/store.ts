import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { MovieSlice } from "./MovieSlice";
import { MovieListSlice } from "./MovieListSlice";
import { DynamicMovieDataSlice } from "./dynamicUserQueryMovieDataSlice";

export const store = configureStore({
    reducer: {
        getMovieData: DynamicMovieDataSlice.reducer,
        selectedMovies: MovieSlice.reducer,
        movielist: MovieListSlice.reducer,
    }
})

export const useAppDispatch: ()=> typeof store.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook< ReturnType<typeof store.getState>>=useSelector;
