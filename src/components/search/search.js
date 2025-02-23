import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions} from "../../api";
const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (searchInputValue) => {
        return fetch(
          `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${searchInputValue}`,
         geoApiOptions
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.langitude}`,
                  label: `${city.name} ${city.countryCode}`,
                };
              }),
            };
          })
          .catch((error) => console.error(error));
      };
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };
    return (
        <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        />
    );
}
export default Search;