import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

	//Citas en Local Storage
	let citasIniciales = JSON.parse(localStorage.getItem('citas'));
	if(!citasIniciales){
		citasIniciales = [];
	}

	//Arreglo de citas
	const [citas, setCitas] = useState([]);

	//Use Effect para realizar ciertas operaciones cuando el state cambia
	useEffect( () => {
		let citasIniciales = JSON.parse(localStorage.getItem('citas'));

		if(citasIniciales){
			localStorage.setItem('citas', JSON.stringify(citas));
		}else{
			localStorage.setItem('citas', JSON.stringify([]));
		}
	}, [citas]);

	//Funcion que agrega la cita nueva al listado de citas
	const crearCita = cita => {
		setCitas([ ...citas, cita ]);
	}

	//Funcion que elimina una cita por su id
	const eliminarCita = id => {
		const nuevasCitas = citas.filter( cita => cita.id !== id );
		setCitas(nuevasCitas);
	}

	//Mensaje condicional
	const titulo = citas.length === 0 ? 'No hay citas' : 'Adiministra tus Citas'

	return (
		<Fragment>
			<h1>Administrador de Pacientes</h1>
			
			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Formulario 
							crearCita={crearCita}
						/>
					</div>
					<div className="one-half column">
						<h2>{titulo}</h2>
						{citas.map( cita => (
							<Cita
								key={cita.id}
								cita={cita}
								eliminarCita={eliminarCita}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
