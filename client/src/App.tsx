import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, Check, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import Background from './components/Background';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    let urlToSubmit = longUrl.trim();
    if (!/^https?:\/\//i.test(urlToSubmit)) {
      urlToSubmit = 'https://' + urlToSubmit;
    }

    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl: urlToSubmit }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden relative">
          {/* Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm"></div>

          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4 ring-1 ring-blue-500/20"
            >
              <Link2 className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-b from-white to-white/60 text-transparent bg-clip-text tracking-tight">
              URL Shortener
            </h1>
            <p className="text-gray-400 text-lg">
              Transform long links into powerful short URLs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder-gray-600 text-gray-200"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={twMerge(
                "w-full py-4 rounded-xl font-semibold text-lg relative overflow-hidden group",
                loading ? "cursor-not-allowed opacity-80" : "hover:shadow-lg hover:shadow-blue-500/25"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300 group-hover:scale-105"></div>
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Shorten Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </motion.button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8"
              >
                <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <div className="bg-gray-900/90 backdrop-blur-md rounded-xl p-5 border border-white/5">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Your Short Link</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-blue-400 hover:text-blue-300 font-medium truncate transition-colors"
                      >
                        {shortUrl}
                      </a>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCopy}
                        className={clsx(
                          "p-2.5 rounded-lg transition-all",
                          copied
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                        )}
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Designed with <span className="text-red-500">♥</span> by Antigravity
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
