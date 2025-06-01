import React, { useState } from 'react';

const plans = [
	{
		name: 'Free Plan',
		price: 'Free',
		color: 'text-yellow-300',
		features: [
			'Up to 5 players per lobby',
			'Access to basic stories',
			'Basic theme',
		],
		icon: '🟢',
	},
	{
		name: 'Pro Plan',
		price: '$4.99/month',
		color: 'text-blue-400',
		features: [
			'Up to 8 players per lobby',
			'Access to all stories',
			'3 free hints per day',
			'Ability to publish AI-assisted stories on the Market',
		],
		icon: '💎',
	},
	{
		name: 'Exclusive Plan',
		price: '$19.99/month',
		color: 'text-purple-400',
		features: [
			'Up to 15 players per lobby',
			'5 free hints per day',
			'5 x2 questions per day',
			'Ability to publish your own created stories on the Market',
			'Custom themes',
		],
		icon: '👑',
	},
];

const MarketPlaceMenu: React.FC<{
	onClose: () => void;
	setUserPlan?: (plan: string) => void;
}> = ({ onClose, setUserPlan }) => {
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleChoosePlan = (plan: string) => {
		if (plan === 'Pro Plan') {
			setSelectedPlan('Pro Plan');
			setTimeout(() => {
				setSuccess(true);
				if (setUserPlan) setUserPlan('Pro Plan');
			}, 800);
		}
	};

	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
				onClick={onClose}
			/>
			<div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl border-4 border-red-700 max-w-2xl w-full mx-4 text-white shadow-2xl z-10">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-red-300 hover:text-white text-2xl font-bold transition-colors duration-200"
				>
					✖
				</button>
				<h2 className="text-4xl font-extrabold text-red-300 mb-8 text-center">
					MarketPlace
				</h2>
				{success ? (
					<div className="flex flex-col items-center justify-center min-h-[200px]">
						<div className="text-5xl mb-4 animate-bounce">🎉</div>
						<p className="text-2xl font-bold text-green-400 mb-2">
							Pro Plan activated!
						</p>
						<p className="text-gray-200">
							You now have access to all stories, 3 free hints per day, and more.
						</p>
						<button
							className="mt-6 px-6 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg"
							onClick={onClose}
						>
							Close
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{plans.map((plan) => (
							<div
								key={plan.name}
								className="bg-gray-800/70 rounded-xl p-6 border-2 border-red-900/50 flex flex-col items-center shadow-xl transform transition-transform duration-300 hover:scale-105 hover:border-yellow-400"
							>
								<div className="text-4xl mb-2">{plan.icon}</div>
								<h3
									className={`text-2xl font-bold mb-2 ${plan.color}`}
								>
									{plan.name}
								</h3>
								<p className="text-gray-300 text-base mb-3">
									Price:{' '}
									<span className={`font-semibold ${plan.color}`}>
										{plan.price}
									</span>
								</p>
								<ul className="list-disc list-inside text-gray-200 text-sm mb-4 text-left space-y-1">
									{plan.features.map((f) => (
										<li
											key={f}
											className="transition-all duration-200 hover:text-yellow-300"
										>
											{f}
										</li>
									))}
								</ul>
								<button
									className={`mt-auto px-4 py-2 rounded bg-gradient-to-r from-red-700 to-red-500 hover:from-yellow-400 hover:to-yellow-600 text-white font-semibold transition-all duration-300 shadow-lg ${
										plan.price === 'Free'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}
									disabled={plan.price === 'Free'}
									onClick={() => handleChoosePlan(plan.name)}
								>
									{plan.price === 'Free'
										? 'Activated'
										: plan.name === 'Pro Plan' && selectedPlan ===
										  'Pro Plan'
										? 'Activating...'
										: 'Choose Plan'}
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MarketPlaceMenu;