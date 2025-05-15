import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import MovieFilterUI, { genreFilter, titleFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};
const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
};

const TrendingMoviePage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery("trending", getTrendingMovies);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [titleFiltering, genreFiltering]
    );

    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        const errorMessage = (error as Error).message;
        return <h1>{errorMessage}</h1>;
    }

    const movies = data?.results || [];
    const filteredMovies = filterFunction(movies);

    return (
        <>
            <PageTemplate
                title="Trending Movies"
                movies={filteredMovies}
                action={(movie) => <AddToFavouritesIcon {...movie} />}
            />
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
            />
        </>
    );
};

export default TrendingMoviePage;