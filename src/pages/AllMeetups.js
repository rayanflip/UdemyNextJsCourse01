import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
/*const DUMMY_DATA = [
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!"
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!"
  }
];*/

function AllMeetupsPage(props) {
  //this function returns a promise, and js does not wait for it to complete. We cannot use await/async as this will
  //not qualitfy as react component (react components are synchronous). Hence we need to change the screen to loading spinner
  // and once the loading finishes we change it back, this can be achieved using useState.
  // BEWARE of infinite loops, as everytime set functions are called it will re-execute the component function so it should be handled in the code using useEffect.
  const [isLoading, setIsLoading] = useState(true); //set it to true initially as we expect that when this component is loading data is being fetched and loaded.
  const [loadedData, setLoadedData] = useState([]); // another useState to set the data.
  // useEffect to handle infinite loop scenario of useState.
  // The first argument is a function that will be executed by react on our behalf undre certain circumstances.
  // the second argument is the condition under which react will execute the function.
  // If not provided at all, it same as if executes everytime hence no need to use useEffect.
  // if provided but empty [], that means react will run it once.
  // if provided, react will check the values and compare them to the same variables of the last run, if it changed then it runs the function
  // as a rule of thumb, the arguments should be external values that require re-execution of the function.
  useEffect(() => {
    setIsLoading(true); //weird
    fetch(
      "https://reactjs-tutorial-cca75-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key] // copies the key value pairs of the data[key] object into the meetup object
          };
          meetups.push(meetup);
        }
        setIsLoading(false); //we got the data here, set is loading to false which in turn tells react to change the state and reload.
        setLoadedData(meetups); //be careful here of possible infinite loop as this will also instruct react to change state and reload (triggering the previous useState as well)
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <div>
      <h1>All Meetups</h1>
      {/*
      you can render an array inline such as {[<li>item1</li>, <li>item2</li>]}
      <ul>
        {DUMMY_DATA.map((meetup) => {
          return <li key={meetup.id}>{meetup.title}</li>;
        })}
      </ul>*/}
      <MeetupList meetups={loadedData} />
    </div>
  );
}

export default AllMeetupsPage;
