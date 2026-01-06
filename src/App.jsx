import { useState } from 'react';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setExplanation('');

    try {
      // Call our Netlify Function
      const response = await fetch('/.netlify/functions/explain', {
        method: 'POST',
        body: JSON.stringify({ topic }),
      });
      
      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      setExplanation("Oops! Something went wrong.");
    }
    
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>👶 Explain Like I'm Five</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a topic (e.g., Blockchain)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Explain!'}
        </button>
      </form>
      
      {explanation && (
        <div className="result-box">
          <h3>Here is the explanation:</h3>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;