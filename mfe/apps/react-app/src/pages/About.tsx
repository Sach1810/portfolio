import React from 'react'

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="hero">
        <h1>About React Microfrontend</h1>
        <p>This is the About page of the React app</p>
      </div>
      
      <div className="content">
        <div className="info-card">
          <h3>About This App</h3>
          <p>
            This React microfrontend is designed to be dynamically loaded by the main Vue host application.
            It demonstrates internal routing capabilities while being part of a larger microfrontend architecture.
          </p>
        </div>
        
        <div className="info-card">
          <h3>Technical Stack</h3>
          <ul>
            <li>React 18 with TypeScript</li>
            <li>React Router for internal navigation</li>
            <li>Vite for fast development and building</li>
            <li>Module Federation for microfrontend integration</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About 