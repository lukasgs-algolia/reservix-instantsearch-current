const Topbar = () => {
	return (
		<header className="bg-white">
			<div className="flex items-center justify-between px-6 py-2.5 max-w-container mx-auto">
				<div className="flex items-end gap-2">
					<img className="h-9 block" src="/reservix-logo.png" alt="reservix" />
				</div>
				<nav className="flex gap-5">
					<a
						href="#"
						className="flex items-center text-gray-utility no-underline font-medium transition-colors hover:text-brand-orange"
					>
						<svg className="w-[18px] h-[18px] mr-2" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
							<path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.13-8 4.76V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.24C20 16.13 16.42 14 12 14Z"/>
						</svg>
						Login
					</a>
					<a
						href="#"
						className="flex items-center text-gray-utility no-underline font-medium transition-colors hover:text-brand-orange"
					>
						<svg className="w-[18px] h-[18px] mr-2" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
							<path d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2ZM6.2 6l.3 2H20a1 1 0 0 1 1 .78l.74 3.7A2 2 0 0 1 19.8 15H8.4a2 2 0 0 1-2-1.62L5 6.8A1 1 0 0 1 6 6Z"/>
						</svg>
						Shopping Cart
					</a>
				</nav>
			</div>
			<div className="h-1 bg-brand-orange"></div>
		</header>
	);
}

export default Topbar


