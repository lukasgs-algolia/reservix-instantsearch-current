import Searchbar from './Searchbar/Searchbar.jsx';
import CityLinks from './CityLinks/CityLinks.jsx';
import CategoryLinks from './CategoryLinks/CategoryLinks.jsx';

const Hero = ({ searchbarClient, selectedCategory, setSelectedCategory, selectedCity, setSelectedCity }) => {

	return (
		<section className="bg-gradient-to-b from-hero-start via-hero-mid to-hero-end py-5">
			<div className="max-w-container mx-auto px-6 text-brand-cream">
				<p className="text-sm mb-0">Tickets, concert tickets &amp; admission tickets</p>
				<Searchbar
					searchbarClient={searchbarClient}
				/>
				<CityLinks
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
				/>
				<CategoryLinks
					attribute="showData.genres"
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			</div>
		</section>
	);
}

export default Hero