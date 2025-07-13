import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to React Microfrontend</h1>
        <p>This is the Home page of the React app with internal routing</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>React Features</h3>
          <ul>
            <li>Built with React 18</li>
            <li>TypeScript support</li>
            <li>Internal routing with React Router</li>
            <li>Module Federation ready</li>
          </ul>
        </div>
        
        <div className="feature-card">
          <h3>Navigation</h3>
          <p>Use the navigation above to switch between Home and About pages within this React app.</p>
        </div>
      </div>
    </div>
  )
}

export default Home 