import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'sans-serif' }}>
      {/* Error code */}
      <h1 style={{ fontSize: '3rem', color: '#ff4040' }}>404 😕</h1>

      {/* Error message */}
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
        The page you are looking for doesn't exist.
      </p>

      {/* Go back link */}
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: '5px',
          textDecoration: 'none'
        }}
      >
        Go back to Home
      </Link>
    </div>
  );
}