"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function App() {
    const [longUrl, setLongUrl] = (0, react_1.useState)('');
    const [shortUrl, setShortUrl] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ longUrl }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setShortUrl(data.shortUrl);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          URL Shortener
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Shorten your links instantly
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter long URL here..." className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500" required/>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {error && (<div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-sm text-center">
            {error}
          </div>)}

        {shortUrl && (<div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600 animate-fade-in">
            <p className="text-sm text-gray-400 mb-1">Your short URL:</p>
            <div className="flex items-center gap-2">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 break-all flex-1 font-medium">
                {shortUrl}
              </a>
              <button onClick={() => navigator.clipboard.writeText(shortUrl)} className="p-2 hover:bg-gray-600 rounded-md transition-colors text-gray-300" title="Copy to clipboard">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>)}
      </div>

      <div className="mt-8 text-gray-500 text-sm">
        Built with React, Vite & Tailwind CSS
      </div>
    </div>);
}
exports.default = App;
