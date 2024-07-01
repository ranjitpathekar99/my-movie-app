import {useState, useEffect, useRef} from "react";
import  "./MovieDashboard.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { useClickOutside } from "primereact/hooks";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addRemoveListMovie, removeMoviefromListMovie } from "../store/MovieListSlice";
import { addRemoveSelectedMovie, removeMoviefromSelectedMovie } from "../store/MovieSlice";
import { useNavigate } from "react-router-dom";
import { IMovielist } from "../state/movie-list";
import { getMovieData } from "../store/dynamicUserQueryMovieDataSlice";
import useDebounce from "../hooks/useDebounce";

export const MovieDashboard: React.FC = () => {
    const [userSearchList, setUserSearchList] = useState<ListBoxChangeEvent | null>(null);
    const [userSearch, setUserSearch] = useState<string>("");
    const debounceValue = useDebounce(userSearch, 500);
    const overlayRef = useRef(null);
    const navigate = useNavigate();

    const selectedMovie = useAppSelector(state => state.selectedMovies.movies);
    const listMoviesData = useAppSelector(state => state.movielist.listMovies);
    const movieData = useAppSelector(state=> state.getMovieData.results);
    const dispatch  = useAppDispatch();

    useEffect(()=>{
            dispatch(getMovieData(debounceValue));
        },[debounceValue,dispatch])
    
    useClickOutside(overlayRef, () => {
        setUserSearch("");
        setUserSearchList(null);
    });

    const nameBodyTemplatelink = (item:IMovielist) => {
        return <Button label={item.name} link onClick={() => navigate(`${item.id}`)  }/>
    };
    const imageBodyTemplate = (item:IMovielist) => {
        return <img src={`${item.image}`} alt={item.name} width="100px" className="w-6rem shadow-2 border-round" />;
    };

    const ratingBodyTemplate = (item:IMovielist) => {
        return <Rating value={item.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (item:IMovielist) => {
        return  <div><Button label="Remove" onClick={()=> handleRemoveMovie(item)}/></div>
    };
    
    const handleChange = (evt:ListBoxChangeEvent) => {
        dispatch(addRemoveSelectedMovie({data: evt.value}));
        dispatch(addRemoveListMovie({data: evt.value}));
    };
    const handleRemoveMovie = (item:IMovielist) => {
        dispatch(removeMoviefromListMovie({data :item}));
        dispatch(removeMoviefromSelectedMovie({data: item}));
    }
    const handleUserSerachQuery = (evt:ListBoxChangeEvent) => {
        setUserSearch(evt.value);
        setUserSearchList(evt);
    };
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Movie List</span>
        </div>
    );
    const footer = `In total there are ${listMoviesData ? listMoviesData.length : 0} Movies.`;

    return (
        <>  
            <div className="Movie-container">        
                <div ref={overlayRef} className="card flex justify-content-center">
                    <ListBox
                        filter
                        multiple
                        filterInputProps={userSearchList}
                        onFilterValueChange={handleUserSerachQuery}
                        filterPlaceholder="Search by Movie name"
                        value={selectedMovie}
                        onChange={handleChange}
                        options={movieData}
                        optionLabel="name"
                        className="w-full md:w-14rem"
                        emptyMessage="No movie found"
                        />
                </div>
                <div className="card">
                    <DataTable 
                        value={listMoviesData} 
                        header={header} 
                        footer={footer} 
                        tableStyle={{ minWidth: "60rem" }}
                        paginator 
                        rows={5} 
                        rowsPerPageOptions={[5, 10, 25, 50]} >
                        <Column body={nameBodyTemplatelink} header="Name"></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="rating" header="Rating" body={ratingBodyTemplate}></Column>
                        <Column header="Remove" body={statusBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )    
}
