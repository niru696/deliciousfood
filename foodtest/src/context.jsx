import React, {useContext,useEffect, useState} from "react";
import axios from 'axios'

const AppContext =  React.createContext();
const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php'


const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchtext, setSearchText] = useState('');
    const [Mealscount, setMealscount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);

    const closeModal = () => {
        setShowModal(false)
      }
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    
      meal = meals.find((meal) => meal.idMeal === idMeal);
    
    setSelectedMeal(meal);
    setShowModal(true)
  }
    const fetRandomMeals = () => {
        fetchMeals(randomMealURL);
    }
    const refreshPage = () =>{
        fetchMeals(allMealUrl);
    }
    const fetchMeals = async (url) => {
        setLoading(true);
        try{
         const {data} = await axios(url);
         if(data.meals){
            setMealscount(data.meals.length)
            setMeals(data.meals);
         }else{
            setMeals([]);
         }
         
        }
        catch(error){
           console.log(error.response);
        }
        setLoading(false)
        }
        useEffect(() =>{
            fetchMeals(allMealUrl);
        },[])    
    useEffect(() =>{
        if(!searchtext) return
        fetchMeals(`${allMealUrl}${searchtext}`);
    },[searchtext])
    return(
        <AppContext.Provider value={{meals, loading,setSearchText, fetRandomMeals,refreshPage,
        Mealscount,showModal,selectedMeal,setSelectedMeal,closeModal,selectMeal}}>
           {children}
        </AppContext.Provider>
    )
}

export const useGlobalContex = () => {
    return useContext(AppContext);
}
export {AppContext, AppProvider}