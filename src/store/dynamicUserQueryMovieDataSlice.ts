import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IMovielist } from "../state/movie-list";

interface IMovieListState {
    results: IMovielist[];
  };
const initialState: IMovieListState = {
    results: []
  };

export const getMovieData = createAsyncThunk('movie/getMovieData', async (userSearch:string) => {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${userSearch}`);
    if(!response.ok){
        throw new Error('failed to load the data.');
    }
    return response.json();
})

export const DynamicMovieDataSlice = createSlice({
    name: 'dynamiceMovieData',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getMovieData.fulfilled, (state, action) => {
            const optionData = action.payload.map((item:any)=> { 
                return ({
                        id: item.show.id,
                        name: item.show.name,
                        image: (item?.show?.image?.medium === null ? '': item?.show?.image?.medium),
                        rating: (item.show.rating.average === null ? 0 : (item.show.rating.average/2)),
                        summary: item.show.summary,
                        })
                    });
            state.results = optionData;
          })
      },
})
export default DynamicMovieDataSlice.reducer;

 