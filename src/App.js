import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import "./App.css";
const URL = "https://api.unsplash.com/photos/?client_id=";
const KEY = "-uUrwXu0sdpIuzY-TZCp-uuZ22r6uH8eQgUAZGOnH7g";
function App() {
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reset, setReset] = useState(false);
  const fetchingFromServer = async () => {
    try {
      /*  const req=await fetch(URL+KEY+'&page=2')
    const data=await req.json() */
      const [page1, page2] = await axios.all([
        axios.get(URL + KEY + "&page=13"),
        axios.get(URL + KEY + "&page=14"),
      ]);
      //console.log(page1)
      let data = [
        ...page1.data,
        ...page1.data,
        ...page2.data.slice(0, 2),
        ...page2.data.slice(0, 2),
      ];
      //console.log(...page2.data.slice(0,2))
      //console.log(data)
      data = data.map((image) => {
        //console.log({unique:nanoid()})
        return { ...image, unique: nanoid() };
      });
      // console.log(data)
      const shuffle = (array) => {
        for (let i = 0; i < array.length; i++) {
          let temp = Math.floor(Math.random() * array.length); //14
          //console.log(temp)
          let curr = array[temp]; //curr=14;
          // console.log(curr)
          array[temp] = array[i]; //14=0
          array[i] = curr; //0=14
        }
        return array;
      };
      data = shuffle(data);
      setPhotos(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (index) => {
    //console.log(index)
    let newPhotos = [...photos];
    newPhotos[index].mark = true;
    setPhotos(newPhotos);
    if (selected === null) {
      setSelected(index);
      return;
    } else {
      if (newPhotos[index].unique === newPhotos[selected].unique) {
        console.log("the same phot clicked");
        return;
      } else {
        if (newPhotos[index].id !== newPhotos[selected].id) {
          console.log("they are different");
          setTimeout(() => {
            newPhotos[index].mark = false;
            newPhotos[selected].mark = false;
            setPhotos(newPhotos);
            setSelected(null);
          }, 500);
        } else {
          console.log("they are have the same id");
          setSelected(null);
        }
      }
      //newPhotos[index]
    }
  };
  useEffect(() => {
    fetchingFromServer();
  }, [reset]);
  return (
    <div>
      <div className="wrapper">
        <button type="reset" onClick={() => setReset(!reset)}>
          New Game
        </button>
      </div>
      <div className="App">
        {photos.map((photo, index) => {
          return (
            <div
              className="card"
              key={photo.unique}
              onClick={() => handleClick(index)}
            >
              <img
                src={photo.urls.thumb}
                alt={photo.alt_description}
                className={photo.mark ? "show" : "notShow"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
