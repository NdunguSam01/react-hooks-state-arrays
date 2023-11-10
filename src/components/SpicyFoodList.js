import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() 
{
  const [foods, setFoods] = useState(spicyFoods);

  //Adding a state that will be used to filter the foods based on the cuisine selected by the user using the select tag inside the component
  const [filterBy, setFilterBy] = useState("All");

  //Function to add a new food to the foods array
  function handleAddFood()
  {
    //Invoking the getNewRandomSpicyFood from the data file that fetches a new random food
    const newFood = getNewRandomSpicyFood();

    //Using the spread operator to copy the original foods array and adds the new food generated above
    const newFoodArray=[...foods, newFood]

    //Setting the state of the foods array to the newly created array that contains the original array items and the new food
    setFoods(newFoodArray)
  }

  //Function to handle deletion of a specific food
  const deleteFood = id =>
  {
    //Here, we use the .filter method to loop over the array and return all the elements except the one that was clicked (this is where the ID that was passed comes in)
    const newFoodArray = foods.filter( food => food.id !== id)

    //Setting the state to the new array after the filter is done
    setFoods(newFoodArray)
  }

  //Function to handle adding the heat level (updating an array in state)
  const addHeatLevel = (id) =>
  {
    //Mapping through the array and returning a new array (newFoodArray) that contains the updated heatLevel of the element clicked
    const newFoodArray = foods.map((food) => 
    {
      //Checking if the id passed matches with any id in the foods array
      if (food.id === id)
      {
        //Updating the individual food by copying the original array and updating the heatLevel of the clicked food
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      }
      else 
      {
        return food;
      }
    });

    //Setting the state to equal the newly created array after maping was done
    setFoods(newFoodArray);
  }

  //Function that listens to the change in the select tag
  function handleFilterChange(event) 
  {
    //Updating the filter state to the value selected by the user
    setFilterBy(event.target.value);
  }

  //Filtering through the foods array and displaying only the foods who's cuisine matches the value of the select tag
  const foodsToDisplay = foods.filter((food) => 
  {
    //Displaying all the foods
    if (filterBy === "All") 
    {
      return true;
    } 
    //Displaying the foods based on the value of the filterBy state
    else 
    {
      return food.cuisine === filterBy;
    }
  });

  //Displaying the foods based on the value of the filtered foods array instead of the original array
  const foodList = foodsToDisplay.map((food) => (
  <li key={food.id}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}

      {/* Adding a button to each item for updating purposes and passing in the id as the parameter */}
      <button onClick={()=> addHeatLevel(food.id)}>Add heat level</button>

      {/* Adding a button to each item for deletion purposes and passing in the id as the parameter */}
      <button onClick={()=>deleteFood(food.id)}>Delete Food</button>
  </li>
    
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>

      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
