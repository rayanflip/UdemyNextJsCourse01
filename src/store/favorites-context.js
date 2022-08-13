import { createContext, useState } from "react";
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorites: (favoriteMeetup) => {}, //adding this here is just for autocompletion purpose
  removeFavorite: (meetupId) => {},
  isItemFavorite: (meetupId) => {}
}); // the object created by createContext is actually a react component. createContext expects an initial value, that could be an object

//this component will allow to changing the values of the context.
//the component created by createContext comes with a built in provider component.
// Wrap the contextprovider component around other components to provide the context.
export function FavoritesContextProvider(props) {
  //useState is used to make sure that whenever the context is changed this context provider component re-renders and hence updates all dependent components
  const [userFavorites, setUserFavorites] = useState([]);
  function addUserFavoritesHandler(favoriteMeetup) {
    //setUserFavorites(userFavorites.concat(favoriteMeetup)); it works this way, however it will not update immediately as react schedules state updates and not execute immediately
    // this will also mean that it "might" update a state snapshot that is not the latest...
    // pass a function instead that automatically receives the previous snapshot as arg, that way react executes it immediately
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }
  function removeUserFavoriteHandler(meetupId) {
    // the filter function expects a function as argument that iterates through each object in the array and returns true if the object is to keep or false to remove
    // the obj1 !== obj2 returns true if the obj does not match or false otherwise
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  function isItemFavoriteHandler(meetupId) {
    //some expects a function as argument that iterates through the array and returns true or false, if one true is returned then it returns true.
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }
  // pass the objects + pointers to respective functions that handle the objects.
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorites: addUserFavoritesHandler,
    removeFavorite: removeUserFavoriteHandler,
    isItemFavorite: isItemFavoriteHandler
  };
  //Provider component expects a value of context
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContext;
//two exports here as we need to interact with both objects/components.
