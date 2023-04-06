import '../styles/styles.css'

const Menu = () => {
    return (
        <>

            <section id="sidebar">
                <a href="#" className="brand">
                    <i className='bx bxs-smile'></i>
                    <span className="text">Sniffer</span>
                </a>
                <ul className="side-menu top">
                    <li className="active">
                        <a href="#">
                            <i className='bx bxs-dashboard' ></i>
                            <span className="text">Table</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-shopping-bag-alt' ></i>
                            <span className="text">Sniffer</span>
                        </a>
                    </li>
                   </ul>
                <ul className="side-menu">
                    <li>
                        <a href="#">
                            <i className='bx bxs-cog' ></i>
                            <span className="text">Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="logout">
                            <i className='bx bxs-log-out-circle' ></i>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </section>
        </>
    )
}
export default Menu;