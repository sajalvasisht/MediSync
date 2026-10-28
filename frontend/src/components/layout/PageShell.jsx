import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './PageShell.css';

/** Root layout wrapper — rendered for every route */
const PageShell = () => (
  <div className="page-shell">
    <Navbar />
    <main className="page-shell__main" id="main-content" tabIndex={-1}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PageShell;
