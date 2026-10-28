import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Badge from '../../components/common/Badge';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <Badge variant="sage" className="not-found-badge">
          404 ERROR &bull; CLINICAL PAGE NOT FOUND
        </Badge>
        <h1 className="not-found-code text-display">404</h1>
        <h2 className="not-found-title">Path Not Registered</h2>
        <p className="not-found-desc">
          The consultation chamber or resource you are looking for doesn't exist or has been relocated to another clinical wing.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-home-btn">
            <Home size={15} />
            <span>Return to Studio Home</span>
          </Link>
          <Link to="/doctors" className="not-found-sub-btn">
            Browse Specialists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
