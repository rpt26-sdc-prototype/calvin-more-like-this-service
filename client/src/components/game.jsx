import {StyledGames, GameImage, GameTitle, GamePrice} from '../styledComponents/styled.game.jsx';

const Game = ({game}) => {

  return (
    <StyledGames>
      <GameImage src={game.headerImage}/>
      <GameTitle>{game.title}</GameTitle>
      <GamePrice>{game.price}</GamePrice>
    </StyledGames>
  );
};

export default Game;