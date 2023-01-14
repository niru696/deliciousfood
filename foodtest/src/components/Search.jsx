import React, {useState} from 'react'
import { useGlobalContex } from '../context'
import {BiRefresh} from 'react-icons/bi'
export const Search = () => {
  const {setSearchText,fetRandomMeals,refreshPage,Mealscount} = useGlobalContex()
  const [text,setText] = useState('');
  function handleOnChange(event){
    console.log(event.target.value);
    setText(event.target.value)
  }
  function handleSubmit(e){
      e.preventDefault();
      if(text){
        setSearchText(text);
      }
  }
  function handleSupriseClick(){
    setSearchText('');
    setText('');
    fetRandomMeals();
  }
  function handlerefresh(){
    setText('');
    setSearchText('');
    refreshPage();
  }
  return (
    <header className='search-container' >
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={handleOnChange} placeholder='type favorite meal' value={text} className='form-input' />
      <button type="submit" className="btn">search</button>
      <button type="button" className="btn btn-hipster" onClick={handleSupriseClick}>suprise me !</button>
      <button type='button' onClick={handlerefresh} className='btn'><BiRefresh /></button>
    </form>
    <h5 className=''>Number of items : {Mealscount}</h5>
  </header>
    
  )
}
