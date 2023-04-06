import React, { useState, useEffect } from 'react';
import Logo from '../styles/img/upchiapas.png';
import { CSVLink } from 'react-csv';
import Swal from 'sweetalert2';


const Table = () => {
	const [csvData, setCsvData] = useState([]);

	const [sniffData, setSniffData] = useState([]);

	const [searchValue, setSearchValue] = useState("");

	const [time, setTime] = useState(new Date().toLocaleTimeString());


	const today = new Date();
	const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
			<section id="content">
				<nav>
					<i className='bx bx-menu' ></i>
					<a href="#" className="nav-link">Busca</a>
					<form onSubmit={(e) => {
						e.preventDefault();
						fetchSniffData();
						return false;
					}}>
						<div className="form-input">
							<input
								type="search"
								placeholder="fecha (YYYY-MM-DD) o MAC "
								value={searchValue}
								onChange={handleSearchChange}
							/>
							<button type="submit" className="search-btn" >
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
								</svg>
							</button>
						</div>
					</form>
					<input type="checkbox" id="switch-mode" hidden />
					<label for="switch-mode" className="switch-mode"></label>

					<a href="#" className="profile">
						<img src={Logo}></img>
					</a>
				</nav>
			</section>
			<section id="content">
				<main>
					<div className="head-title">
						<div className="left">
							<h1>Sniffer</h1>

						</div>
						<a onClick={startSniffer} href="#" className="btn-download">
							<i className='bx bxs-cloud-download' ></i>
							<span className="text">Escanear red</span>
						</a>
						<a href="#" className="btn-download">
							<i className='bx bxs-cloud-download' ></i>
							<CSVLink data={csvData} filename={'sniff-data.csv'} className="link">
								<span className="link-text">Download </span>
								<svg className="link-text" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" clas="bi bi-cloud-download" viewBox="0 0 16 16">
									<path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
									<path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
								</svg>
							</CSVLink>
						</a>

					</div>

					<ul className="box-info">
						<li>
							<i className='bx -check' >
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
									<path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
									<path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
								</svg></i>
							<span className="text">
								<h3>Hora</h3>
								<p>{time}</p>
							</span>
						</li>

						<li>
							<i className='bx bxs-dollar-circle' >
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-calendar2-week" viewBox="0 0 16 16">
									<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
									<path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
								</svg></i>

							<span className="text">
								<h3>Fecha </h3>
								<p>{date}</p>
							</span>
						</li>
					</ul>


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
										{sniffData.map((data) => (
											<tr key={data.id}>
												<td>{data.mac_src}</td>
												<td>{data.ip_src}</td>
												<td>{data.tam_src}</td>
												<td>{data.fecha}</td>
												<td>{data.hora}</td>
											</tr>
										))}
									</tbody>
								</table>

							</div>
						</div>

					</div>
				</main>
			</section>
		</>
	)
}
export default Table;