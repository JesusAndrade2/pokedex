import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useName } from '../../hooks/useName';
import './styles/Home.scss';

function Home() {
	const inputRef = useRef();
	const { setName } = useName();
	const navigate = useNavigate();

	const handleSetName = () => {
		if (!inputRef.current.value) return;
		setName(inputRef.current.value);
		navigate('/pokedex');
	};

	return (
		<div className="home">
			<div className="home__container">
				<h1 className="home__pokedex">
					<span className="home__pokedex-poke-o">O</span>KÉDEX
				</h1>
				<h2 className="home__subtitle">¡Hola entrenador!</h2>
				<p className="home__label">Para poder comenzar, dame tu nombre</p>
				<input
					type="text"
					className="home__input"
					placeholder="nombre"
					ref={inputRef}
					onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
				/>
				<button className="btn" onClick={handleSetName}>
					Comenzar
				</button>
			</div>
		</div>
	);
}
export default Home;
