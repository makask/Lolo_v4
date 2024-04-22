import React from 'react'

function FilterComponent({ allFilters, appliedFilters, onFilterChange }) {

    const[articles, setArticles] = useState([]);
    const[filteredArticles, setFilteredArticles] = useState([]);
    const[allFilters, setAllFilters] = useState([]);
    const[appliedFilters, setAppliedFilters] = useState([]);

    const updateAllFilters = (articles) => {
        const categories = articles.flatMap(article => article.categories);
        const uniqueFilters = Array.from(new Set(categories));
        setAllFilters(uniqueFilters);
    }

    const applyFilters = (articles) => {
        const filtered = articles.filter(article => 
            appliedFilters.some(filter => article.categories.includes(filter)));
        setFilteredArticles(filtered);
    }

    const handleFilterChange = (filter) => {
        const index = appliedFilters.indexOf(filter);
        if(index === -1){
            setAppliedFilters([...appliedFilters, filter]);
        }else{
            setAllFilters(appliedFilters.filter(item => item !== filter));
        }
        applyFilters(articles);
    }

    <FilterComponent 
        allFilters={allFilters}
        appliedFilters={appliedFilters}
        onFilterChange={handleFilterChange}
    />

  return (
    <div>
        {allFilters.map(filter => (
            <label key={filter}>
                <input
                    type="checkbox"
                    value={filter}
                    checked={appliedFilters.includes(filter)}
                    onChange={() => onFilterChange(filter)}
                />
            </label>
        ))}
    </div>
  )
}

export default FilterComponent