import './App.css';
import { useEffect, useState } from 'react';
import VehiclesComponent from './components/VehiclesComponent';

function App() {
    const [fetchedData, setFetchedData] = useState([]);
    const [filterKeywordValue, setFilterKeywordValue] = useState('');
    const [filterPagesValue, setFilterPagesValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        let url;
        if (filterKeywordValue !== '') {
            url = `https://search.outdoorsy.com/rentals?filter[keywords]=${filterKeywordValue}&page[limit]=${filterPagesValue}`;
        } else {
            url = `https://search.outdoorsy.com/rentals?page[limit]=${filterPagesValue}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                setFetchedData(res.data);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        fetchData();
    };

    return (
        <div className='App'>
            <form className='searchForm' onSubmit={handleSubmit}>
                <div className='searchElements'>
                    <input className='searchKeyword' onChange={(e) => setFilterKeywordValue(e.target.value)} type='text' placeholder='Enter desired vehicle'></input>
                    <select className='searchPages' onChange={(e) => setFilterPagesValue(e.target.value)}>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <button className='searchBtn' type='submit'>
                        Search
                    </button>
                </div>
            </form>
            {isLoading ? (
                <div className='loaderContainer'>
                    <div className='loader'></div>
                </div>
            ) : (
                <VehiclesComponent fetchedData={fetchedData} />
            )}
        </div>
    );
}

export default App;
