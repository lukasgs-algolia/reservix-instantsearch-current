import { useMenu } from 'react-instantsearch';

const majorCities = [
		'Berlin', 'Hamburg', 'München', 'Köln', 'Stuttgart', 'Dresden',
		'Frankfurt am Main', 'Nürnberg', 'Essen', 'Erfurt', 'Flensburg',
		'Freiburg im Breisgau'
];

const MajorCityNavigation = ({ attribute, selectedCity, setSelectedCity }) => {
	const { refine } = useMenu({ attribute })
	const handleClick = (e) => {
		if (e.target.dataset.city !== selectedCity) {
			refine(e.target.dataset.city)
			setSelectedCity(e.target.dataset.city)
		} else {
			refine("")
			setSelectedCity("")
		}
	}

	return (
		<div className="flex-1 min-w-0">
			<ul className="flex flex-wrap gap-y-[18px] gap-x-[22px] list-none p-0 m-0 mt-3">
				{majorCities.map((city) => {
					return (
						<li key={city} onClick={handleClick} className="cursor-pointer">
							<span
								data-city={city}
								className="text-brand-cream-light text-xs opacity-95 hover:underline hover:opacity-100 transition-opacity"
							>
								{city}
							</span>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const DropDownMenu = ({attribute, limit, sortBy, selectedCity, setSelectedCity}) => {
	const { items, refine } = useMenu({ attribute, limit, sortBy})
	const { value: selectedValue } = items.find(
		(item) => item.isRefined) || {value: ""}

	const handleChange = (e) => {
		if (e.target.value == selectedCity || e.target.value == "Other cities") {
			refine("")
			setSelectedCity("")
		} else {
			refine(e.target.value)
			setSelectedCity(e.target.value)
		}
	}

	const minorCities = items.filter((item) => !majorCities.includes(item.label))
	const createCityOptions = () => {
		return (minorCities.map((city) => (
			<option key={city.value} value={city.value} className="text-gray-text text-center">
				{city.label}
			</option>
		))
	)
	}

	return (
		<select
			className="appearance-none bg-transparent border border-white/35 text-brand-cream-light text-xs font-thin rounded-lg py-2 px-3 relative top-2 cursor-pointer hover:border-white/50 transition-colors w-[180px] flex-shrink-0 text-center"
			value={selectedValue}
			onChange={handleChange}
		>
			<option className="text-gray-text text-center">Other cities</option>
			{createCityOptions()}
		</select>
	  );
}

const CityLinks = ({selectedCity, setSelectedCity}) => {
	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<MajorCityNavigation
					attribute="venue.city"
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
				/>
				<DropDownMenu
					attribute="venue.city"
					limit={25}
					sortBy={["name:asc", "count:desc"]}
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
				/>
			</div>
		</div>
	);
}

export default CityLinks