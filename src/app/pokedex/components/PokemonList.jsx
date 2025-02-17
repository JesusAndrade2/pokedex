import PokemonCard from './PokemonCard';
import '../styles/PokemonList.scss';

function PokemonList({ pokemons }) {
	return (
		<div className="pokelist">
			{pokemons.map((pokemon) => (
				<div className="pokelist__item">
					<PokemonCard key={pokemon.name} url={pokemon.url} />
				</div>
			))}
		</div>
	);
}
export default PokemonList;
