import { useEffect, useState } from 'react';
import axios from 'axios';
import { useName } from '../../hooks/useName';
import PokemonList from './components/PokemonList';
import { Link } from 'react-router';
import './styles/pokedex.scss';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

function Pokedex() {
	const [pokemons, setPokemons] = useState([]);
	const [fitleredPokemons, setFilteredPokemons] = useState(pokemons);
	const [search, setSearch] = useState('');
	const [types, setTypes] = useState([]);
	const [selectedType, setSelectedType] = useState('all');
	const [singlePokemon, setSinglePokemon] = useState(null);

	const { name, clearName } = useName();

	// Función para cargar los primeros 150 pokémon
	const getInitialPokemons = () => {
		axios.get(`${POKEAPI_BASE}/pokemon?limit=150`).then(({ data }) => {
			setPokemons(data.results);
			setFilteredPokemons(data.results);
			setSinglePokemon(null);
		});
	};

	useEffect(() => {
		getInitialPokemons();
	}, []);

	// Cargar los tipos de pokémon
	useEffect(() => {
		axios
			.get(`${POKEAPI_BASE}/type?limit=18`)
			.then(({ data }) => setTypes(data.results));
	}, []);

	// Filtrar por nombre en tiempo real mientras se escribe en el input
	useEffect(() => {
		if (!search) {
			setFilteredPokemons(pokemons);
			setSinglePokemon(null);
			return;
		}

		setFilteredPokemons(
			pokemons.filter((p) =>
				p.name.toLowerCase().includes(search.toLowerCase()),
			),
		);
	}, [search, pokemons]);

	// Cargar pokemón según el tipo seleccionado
	useEffect(() => {
		if (selectedType === 'all') {
			getInitialPokemons();
			return;
		}

		axios.get(`${POKEAPI_BASE}/type/${selectedType}`).then(({ data }) => {
			const typePokemons = data.pokemon.map((p) => p.pokemon);
			setPokemons(typePokemons);
			setFilteredPokemons(typePokemons);
			setSinglePokemon(null);
		});
	}, [selectedType]);

	// Buscar un pokemón por nombre o id
	const searchPokemon = () => {
		if (!search) {
			getInitialPokemons();
			return;
		}

		axios
			.get(`${POKEAPI_BASE}/pokemon/${search}`)
			.then(({ data }) => {
				if (selectedType !== 'all') {
					const isOfType = data.types.some((t) => t.type.name === selectedType);
					if (!isOfType) {
						setSinglePokemon(null);
						alert('El pokemón no es del tipo seleccionado');
						return;
					}
				}
				setSinglePokemon(data);
			})
			.catch(() => {
				alert('Pokemón no encontrado');
				setSinglePokemon(null);
			});
	};

	return (
		<div className="pokedex__container">
			<h1 className="pokedex">
				<span className="pokedex-poke-o">O</span>KÉDEX
			</h1>
			{name && (
				<div className="pokedex__welcome">
					<p>Bienvenido {name}, aquí podrás encontrar a tu pokemón favorito</p>
					<button onClick={clearName} className="pokedex__welcome-btn">
						Salir
					</button>
				</div>
			)}
			<div className="pokedex__search">
				<input
					className="pokedex__search-input"
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Buscar por nombre o id"
					onKeyDown={(e) => e.key === 'Enter' && searchPokemon()}
				/>
				<button onClick={searchPokemon} className="pokedex__search-btn">
					Buscar
				</button>
				<select
					className="pokedex__search-select"
					value={selectedType}
					onChange={(e) => setSelectedType(e.target.value)}
				>
					<option value="all">Todos</option>
					{types.map((type) => (
						<option key={type.name} value={type.name}>
							{type.name}
						</option>
					))}
				</select>
			</div>
			{singlePokemon ? (
				<Link to={`/pokedex/${singlePokemon.name}`}>
					<h2>{singlePokemon?.name}</h2>
					<img
						src={
							singlePokemon?.sprites?.other['official-artwork']?.front_default
						}
						alt={singlePokemon.name}
					/>
				</Link>
			) : (
				<PokemonList pokemons={fitleredPokemons} />
			)}
		</div>
	);
}
export default Pokedex;
