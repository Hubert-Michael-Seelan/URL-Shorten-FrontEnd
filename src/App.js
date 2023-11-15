import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://url-shorten-fc2x.onrender.com/shorturl',
        {
          url: url,
        }
      );
      if (response.data.shortURL) {
        setShortUrl(response.data.shortURL);
        setUrl('');
      }
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <div className='container'>
      <div>
        <h1 className='center-text'>URL SHORTENER</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='url'
            id='url'
            placeholder='Url Here...'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className='btn btn-primary mr-1 ml-1' type='submit'>
            Shorten
          </button>
        </form>
        <div className='mt-4 '>
          {shortUrl && (
            <div className='link-box'>
              <p>Short URL:</p>
              <a href={shortUrl} target='_blank' rel='noopener noreferrer'>
                {shortUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
