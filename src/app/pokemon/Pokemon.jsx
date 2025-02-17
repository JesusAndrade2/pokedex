import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './styles/Pokemon.scss';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

function Pokemon() {
	const params = useParams();
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		if (params.name) {
			axios
				.get(`${POKEAPI_BASE}/pokemon/${params.name}`)
				.then(({ data }) => setPokemon(data));
		}
	}, [params]);

	const types = pokemon?.types?.map((t) => t.type.name);
	const ability = pokemon?.abilities?.map((a) => a.ability.name);
	const [hp, attack, defense, specialAttack, specialDefense, speed] =
		pokemon?.stats || [];

	return (
		<div className="pokemon">
			<div className="pokemon__head">
				<img
					className="pokemon__head--img"
					src={pokemon?.sprites?.other['official-artwork']?.front_default}
					alt={pokemon.name}
				/>
			</div>

			<div className="pokemon__info">
				<span className="pokemon__info--id">
					id: #{pokemon.id?.toString().padStart(3, 0)}
				</span>
				<div className="pokemon__info--name">
					<div className="pokemon__info--name-line"> </div>
					<h2>{pokemon?.name}</h2>
					<div className="pokemon__info--name-line"> </div>
				</div>
				<div className="pokemon__info--physical-dimensions">
					<div className="pokemon__info--physical-dimensions-box">
						<p>Weight</p> <p> {pokemon?.weight}</p>
					</div>
					<div className="pokemon__info--physical-dimensions-box">
						<p>Height </p> <p>{pokemon?.height}</p>
					</div>
				</div>

				<div className="pokemon__info--type-habilities">
					<div className="pokemon__info--type-habilities-box">
						<p className="pokemon__info--type-habilities-box-title">Types</p>{' '}
						<p> {types?.join(', ')}</p>
					</div>
					<div className="pokemon__info--type-habilities-box">
						<p className="pokemon__info--type-habilities-box-title">
							Abilities
						</p>{' '}
						<p> {ability?.join(', ')}</p>
					</div>
				</div>
			</div>
			<div className="pokemon__stats-movements">
				<div className="pokemon__stats">
					<h3>Stats</h3>
					<p>
						{hp?.stat.name}: <span>{hp?.base_stat}</span>
					</p>
					<p>
						{attack?.stat.name}: <span>{attack?.base_stat}</span>
					</p>
					<p>
						{defense?.stat.name}: <span>{defense?.base_stat}</span>
					</p>
					<p>
						{specialAttack?.stat.name}: <span>{specialAttack?.base_stat}</span>
					</p>
					<p>
						{specialDefense?.stat.name}:{' '}
						<span>{specialDefense?.base_stat}</span>
					</p>
					<p>
						{speed?.stat.name}: <span>{speed?.base_stat}</span>
					</p>
				</div>

				<div className="pokemon__movements">
					<h3>Movements</h3>
					<ul>
						{pokemon?.moves?.map((m) => (
							<li key={m.move.name}>{m.move.name}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
export default Pokemon;
