import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Swal from 'sweetalert2';
import Buscar from './Buscar';
import Logo from '../styles/img/upchiapas.png';

const Aceptar = () => {
	const [csvData, setCsvData] = useState([]);

	const [sniffData, setSniffData] = useState([]);

	const [searchValue, setSearchValue] = useState("");

	const [time, setTime] = useState(new Date().toLocaleTimeString());



	const today = new Date();
	const year = today.getFullYear();
	const month = (today.getMonth() + 1).toString().padStart(2, '0');
	const day = today.getDate().toString().padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		return () => clearInterval(interval);
	}, []);
	const startSniffer = () => {
		Swal.fire({
			title: 'Escaneando red...',
			html: 'Este proceso puede tardar unos momentos.',
			allowOutsideClick: false,
			didOpen: async () => {
				Swal.showLoading();
				await fetch('http://localhost:5000/sniff', { method: 'POST' });
				Swal.close();
				window.location.reload();

			}
		});

	};

	useEffect(() => {
		fetch('http://localhost:5000/sniff')
			.then(response => response.json())
			.then(data => {
				setSniffData(data);
				setCsvData(data);
			})
			.catch(error => console.log(error));
	}, []);

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};
	const fetchSniffData = async () => {
		let url;
		if (searchValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
			url = `http://localhost:5000/sniff/${searchValue}`;
		} else if (searchValue.match(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)) {
			url = `http://localhost:5000/sniff/mac/${searchValue}`;
		} else {
			return;
		}

		const response = await fetch(url);
		const data = await response.json();
		setSniffData(data);
		setCsvData(data);
	};


	return (

		<>
			 <nav>
     
      <a href="#" className="profile">
        <img src={Logo}></img>
      </a>
    </nav>
			<main>
				
				

				<div className="table-data">
					<div className="order">
						<div className="head">
							<h3>Datos</h3>
							<i className='bx bx-search' ></i>
							<i className='bx bx-filter' ></i>
						</div>
						<div style={{ height: '400px', overflow: 'scroll' }}>
							<table id="my-table">
								<thead>
									<tr>
										<th>mac_src</th>
										<th>ip_src</th>
										<th>tam_src</th>
										<th>fecha</th>
										<th>hora</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>

						</div>
					</div>

				</div>
			</main>
		</>
	)
}
export default Aceptar;