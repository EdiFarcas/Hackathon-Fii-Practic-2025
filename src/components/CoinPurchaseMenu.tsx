import React from 'react';

interface CoinPurchaseMenuProps {
  isOpen: boolean;
  onClose: () => void;
  requiredCoins: number;
}

const CoinPurchaseMenu: React.FC<CoinPurchaseMenuProps> = ({ isOpen, onClose, requiredCoins }) => {
  // Fix: Render only once, always centered, and avoid duplicate overlays
  if (!isOpen) return null;

  // Prevent scroll and interaction with background when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const purchaseOptions = [
    { coins: 50, price: 2, label: '50 coins', bestValue: false },
    { coins: 300, price: 10, label: '300 coins', bestValue: false },
    { coins: 1000, price: 35, label: '1000 coins', bestValue: true },
  ];

  const handlePurchase = (coins: number, price: number) => {
    // TODO: Implement purchase logic
    console.log(`Purchasing ${coins} coins for $${price}`);
    onClose();
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with high z-index to ensure it's on top of everything */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal content with even higher z-index */}
      <div className="bg-gray-900 p-8 rounded-2xl border-2 border-red-700 max-w-lg w-full mx-4 relative text-white text-center space-y-6 shadow-2xl transition-all duration-300 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-300 hover:text-white text-xl font-bold transition-colors duration-200"
        >
          ✖
        </button>

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-red-300">Need more coins?</h2>
          <p className="text-gray-300 mt-2">
            You need {requiredCoins} more coins for this purchase
          </p>
        </div>

        {/* Purchase options */}
        <div className="space-y-3">
          {purchaseOptions.map((option) => (
            <div
              key={option.coins}
              onClick={() => handlePurchase(option.coins, option.price)}
              className="group relative overflow-hidden bg-gray-800/50 rounded-lg border border-red-900/30 p-4 transition-all duration-200 hover:border-red-700/50 hover:bg-gray-800/70 cursor-pointer hover:scale-105"
            >
              
              {/* Option content */}
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl">🪙</span>
                    <span className="text-xl font-bold text-yellow-300">{option.coins}</span>
                  </div>
                  <p className="text-sm text-gray-400">coins</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">${option.price}</p>
                  <p className="text-sm text-gray-400">USD</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <p className="text-sm text-gray-500">
          Purchases will be added to your account immediately
        </p>
      </div>
    </div>
  );
};

export default CoinPurchaseMenu;