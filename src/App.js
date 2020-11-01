import {useEffect,useState} from "react";
import Recipe from './Recipe';

import './App.css';

const App = () =>{
  const APP_ID="569de39b";
  const APP_KEY="dddc0446c83d24115dcf9f8622c6526e";

  const[recipes,setRecipes]=useState([]);

  //state for our search
  const[search, setSearch]=useState([]);

  //after we click the submit
  const[query,setQuery]=useState('chicken');


  useEffect(() =>{
    getRecipes();
  },[query]);

  const getRecipes =async()=>{
    const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data= await response.json(); //will format it easily
    setRecipes(data.hits);
    console.log(data.hits);

  };

  const updateSearch= e =>{
    setSearch(e.target.value);
    

  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
      {/* <h1 onClick={()=> setCounter(counter +1)} >{counter}</h1> */}

    </div>
  );
};

export default App;
