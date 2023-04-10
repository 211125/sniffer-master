import React from 'react';
import Logo from '../styles/img/upchiapas.png';

const Buscar = ({ searchValue, handleSearchChange, fetchSniffData }) => {
  return (
    <nav>
      <a href="#" className="nav-link">Busca</a>
      <form onSubmit={(e) => {
          e.preventDefault();
          fetchSniffData();
          return false;
        }}>
        <div className="form-input">
          <input
            type="search"
            placeholder="fecha (YYYY-MM-DD)"
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
  );
};

export default Buscar;
