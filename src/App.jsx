import { useState } from "react"
import Button from "./Button"
import { useEffect } from "react";
const App = () => {

  const [joke, setJoke] = useState("");

  const [loading, setLoading] = useState(true);

  const generateJoke = () => {
    fetch('https://v2.jokeapi.dev/joke/Any')
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        console.log(data);
        data.joke ? setJoke(data.joke) : setJoke(`${data.setup} ${data.delivery}`);
      }
      else {
        setJoke("Error");
      }
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    generateJoke();
  }, [])

  return (
    <main>
        <h1>Joke Generator</h1>
        <Button onClick={generateJoke} />
        <p>{ loading ? "Loading..." : joke}</p>
    </main>
  )
}

export default App