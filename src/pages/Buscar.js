import Logo from '../styles/img/upchiapas.png';

const Buscar = () => {
    return (
        <>
          

                <nav>
                    <i className='bx bx-menu' ></i>
                    <a href="#" className="nav-link">Busca</a>
                    <form action="#">
                        <div className="form-input">
                            <input type="search" placeholder="Search..." />
                            <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    <label for="switch-mode" className="switch-mode"></label>
                   
                    <a href="#" className="profile">
                        <img src={Logo}></img>
                    </a>
                </nav>
        </>
    )
}
export default Buscar;