import * as React from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import './MovieDetailsPage.css';
import Parser  from 'html-react-parser';
import { Button } from 'primereact/button';
import { Rating } from "primereact/rating";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate, useParams } from "react-router";
import { removeMoviefromListMovie } from "../store/MovieListSlice";
import { removeMoviefromSelectedMovie } from "../store/MovieSlice";
import { IMovielist } from "../state/movie-list";

export const MovieDetailsPage: React.FC = () => {
    const {movieId} = useParams<{movieId?: string}>();
    const id : number | undefined = movieId ? parseInt(movieId, 10) : undefined;
    const [movieData, setMovieData] = React.useState<IMovielist>({name:"",image:"",rating:0,summary:"",id:0});
    
    const selectedMovie = useAppSelector(state=>state.movielist.listMovies);
    const dispatch  = useAppDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        let filterMovie = selectedMovie.filter(item=> item.id === id);
        setMovieData(filterMovie[0]);
    },[selectedMovie,id]);

   const handleRemoveMovieClick = (item:IMovielist) => {
    dispatch(removeMoviefromListMovie({data :item}));
    dispatch(removeMoviefromSelectedMovie({data: item}));
    navigateToHome();
   }
   const navigateToHome = () => {
    navigate('/');
   }
    return (
        <>
            <div className="container">
                <div className="detail-card">
                    <div className="back-button"><Button size="large" icon="pi pi-arrow-left" rounded aria-label="Back" onClick={navigateToHome}/></div>
                    <div>
                        <div className="movie-title">{movieData?.name}</div>
                        <div className="detail-container">
                            <div className="movie-poster">
                                <img alt={movieData?.name + ' movie poster'} src={movieData?.image} width="100px" className="img-poster"/>
                            </div>
                            <div className="desc-rating">
                                <div className="movie-description">{Parser(movieData?.summary)}</div>
                                <div className="rating"><Rating value={movieData?.rating} readOnly cancel={false}/></div>
                            </div>
                        </div>
                        <div className="remove-button">
                            <Button tooltip="Remove movie from list" tooltipOptions={{ position: 'top' }} onClick={()=> handleRemoveMovieClick(movieData)} label="Remove" />
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}