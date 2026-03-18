/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CVBuilder from './pages/CVBuilder';
import AITools from './pages/AITools';
import BackgroundRemover from './pages/BackgroundRemover'; // Trigger TS server update

import ContentWriter from './pages/ContentWriter';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cv-builder" element={<CVBuilder />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/ai-tools/bg-remover" element={<BackgroundRemover />} />
            <Route path="/ai-tools/content-writer" element={<ContentWriter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
