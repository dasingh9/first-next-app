import {FetchGamesError, FetchGenresError} from "../../lib/errors/custom-errors";
import GamesTable from "../../components/GamesTable";

async function getGames() {
  const baseUrl = "http://localhost:3000";

  try {
    const response = await fetch(baseUrl + "/api/games", {
      'cache': 'no-cache'
    });
    const gamesArray = await response.json();
    return gamesArray;
  }
  catch (error) {
    throw new FetchGamesError("Unable to fetch games");
  }

}

async function getGenres() {
  //make API call
  throw new FetchGenresError("Unable to get Genres list");
  return ["Shooter", "Novel", "Other"];
}

export default async function Dashboard() {

  let gamesJSX;
  let genresJSX;

  try {
    const games = await getGames();
    gamesJSX = <GamesTable games={games}></GamesTable>;
  }
  catch(error) {
    gamesJSX = <span style={{color:"red"}}>Unable to load Games list</span>
  }

  try {
    const genres = await getGenres();
    genresJSX = <select>
        {genres.map(genre => (<option value={genre}>{genre}</option>))}
      </select>;
  }
  catch(error) {
    genresJSX = <span style={{color:"red"}}>Unable to load Genres list</span>
  }

  return (
    <>
      {genresJSX}
      {gamesJSX}
    </>
  )
}