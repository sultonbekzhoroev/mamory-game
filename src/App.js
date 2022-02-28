import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import "./App.css";

const URL = "https://api.unsplash.com/photos/?client_id=";
const KEY = "m0RooCLx5iuF9obcp7iAMURrMoLWwJA0uUNv3GnYG2E";
function App() {
  const [photos, setPhotos] = useState([]);
  const fetchingFromServer = async () => {
    try {
      // const req = await fetch(URL + KEY + "&page=2");
      // const data = await req.json();

      const [page1, page2] = await axios.all([
        axios.get(URL + KEY + "&page=2"),
        axios.get(URL + KEY + "&page=3"),
      ]);

      let data = [
        ...page1.data,
        ...page1.data,
        ...page2.data.slice(0, 2),
        ...page2.data.slice(0, 2),
      ];

      data = data.map((image) => {
        return { ...image, unique: nanoid() };
      });

      const shuffle = (array) => {
        for (let i = 0; i < array.length; i++) {
          let temp = Math.floor(Math.random() * array.length);
          let curr = array[temp];
          array[temp] = array[i];
          array[i] = curr;
        }

        return array;
      };
      data = shuffle(data);

      setPhotos(data);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    fetchingFromServer();
  }, []);

  return (
    <div className="App">
      {photos.map((photo) => {
        return (
          <div className="card" key={photo.unique}>
            <img src={photo.urls.thumb} alt={photo.alt_description} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
