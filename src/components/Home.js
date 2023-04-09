import React, { useState, useEffect } from 'react';
import Buscar from '../pages/Buscar';
import Table from '../pages/Table';

function Home() {
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

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
	<section id="sidebar"  className={sidebarHidden ? 'hide' : ''}>
		<a href="#" class="brand">
            <i class='bx bx-menu'onClick={handleSidebarToggle} ></i>
			<span class="text">Sniffer</span>
            
		</a>
		<div class="side-menu top">
			<li class="active"  className={activeMenuItem === 0 ? 'active' : ''}>
				<a href="#">
					<i class='bx bxs-dashboard' ></i>
					<span class="text">Sniffer</span>
				</a>
			</li>
			
		
		
		</div>
		<ul class="side-menu">
			<li>
				<a href="#">
					<i class='bx bxs-cog' ></i>
					<span class="text">Settings</span>
				</a>
			</li>
			<li>
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul>
	</section>



	<section id="content" >
		
	
			<Table></Table>
	</section>
    </div>

            )
}
          export default Home;    
