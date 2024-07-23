async function getGames() {
    const response = await fetch("https://games-api-orpin.vercel.app/api/games");
    const gamesArray = await response.json();
    return gamesArray;
}

export default async function Dashboard() {

    const games = await getGames();

    return (
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Platform</th>
              <th>Publisher</th>
              <th>Developer</th>
              <th>Release Date</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td><img src={game.thumbnail} alt={game.title} width="100" /></td>
                <td>{game.id}</td>
                <td>{game.title}</td>
                <td>{game.genre}</td>
                <td>{game.platform}</td>
                <td>{game.publisher}</td>
                <td>{game.developer}</td>
                <td>{game.release_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    
}