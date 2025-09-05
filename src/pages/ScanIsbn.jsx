import { useState } from 'react';
import { Camera, Zap } from 'lucide-react';

export default function ScanIsbn() {
  const [scannedIsbn, setScannedIsbn] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // In a real app, you would integrate a camera library here.
    // For this demo, we'll simulate a scan after a short delay.
    setTimeout(() => {
      const demoIsbn = '978-3-16-148410-0'; // A sample ISBN
      setScannedIsbn(demoIsbn);
      setIsScanning(false);
      alert(`Scanned ISBN: ${demoIsbn}`);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 md:p-8 max-w-2xl mx-auto text-center">
      <div className="space-y-4">
        <Camera className="mx-auto h-16 w-16 text-primary-500" />
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Scan Book ISBN</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Position the book's barcode inside the frame. The scan will start automatically.
        </p>

        {/* Placeholder for the camera feed */}
        <div className="w-full aspect-video bg-slate-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400">Camera view would appear here</p>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="btn btn-primary w-full sm:w-auto disabled:opacity-50"
        >
          {isScanning ? (
            <>Scanning...</>
          ) : (
            <><Zap className="inline-block mr-2 h-4 w-4" /> Start Scan</>
          )}
        </button>

        {scannedIsbn && (
          <div className="pt-4">
            <p className="text-slate-700 dark:text-slate-200">
              <strong>Scanned ISBN:</strong> {scannedIsbn}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
