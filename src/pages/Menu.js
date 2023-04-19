
import React, { useState, useEffect } from 'react';
import Table from '../pages/Table';
import { Link } from 'react-router-dom';
import Aceptar from './Aceptar';

const Menu = () => {
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };
  useEffect(() => {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach((item, index) => {
      const li = item.parentElement;
      item.addEventListener('click', () => {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
        handleMenuItemClick(index);
      });
    });
  }, []);

  return (
    <div>
      <section id="sidebar" className={sidebarHidden ? 'hide' : ''}>
        <a href="#" className="brand">
          <i className='bx bx-menu' onClick={handleSidebarToggle} ></i>
          <span className="text">Sniffer</span>

        </a>
        <div className="side-menu top">
        <li>
            <a href="#" className={activeMenuItem === 0 ? 'active' : ''}>
              <i className='bx bxs-dashboard' ></i>
              <span className="text">Sniffer</span>
            </a>

          </li>
          <li>
            <a href="#" className={activeMenuItem === 1 ? 'active' : ''}>
              <i className='bx bxs-cog' ></i>
              <span className="text">Settings</span>
            </a>
          </li>

        </div>
        <div className="side-menu" >
          
          <li>
            <a href="#" className="logout" >
              <i className='bx bxs-log-out-circle' ></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </div>
      </section>



      <section id="content" >
        {activeMenuItem === 1 ? <Aceptar /> : <Table></Table>} 
      </section>

    </div>

  )
}
export default Menu;