import useGroupedFilters from "../../../hooks/useGroupedFilters.jsx"

const CategoryLinks = ({ attribute , selectedCategory, setSelectedCategory }) => {
	const { items, refine, reset, search } = useGroupedFilters({ attribute: attribute })

	const filterMappings = {
		"Highlights": [],
  		"Classical": [
			"Klassisches Konzert",
			"Oper",
			"Operette",
			"Ballett",
			"Klassisches Ballett",
			"Kammermusik",
			"Konzert Klavier",
			"Konzert Streicher",
			"Sinfonische Musik",
			"Chormusik",
			"Kirchenmusik",
			"Alte Musik",
			"Barockmusik",
			"Orgelmusik",
			"Klassik",
		],
  		"Jazz Rock Pop": [
			"Rock",
			"Pop",
			"Jazz",
			"Blues",
			"Folk Rock",
			"Country",
			"Soul",
			"R'n'B",
			"Hip Hop / Rap",
			"Synthie Pop",
			"Indie Pop",
			"Classic Rock",
			"Deutschrock",
			"Alternative",
			"Metal",
			"Punk",
			"Hardcore",
		],
  		"Stage Events": [
    		"Bühnenshow",
			"Theater",
			"Varieté",
			"Musical",
			"Kabarett",
			"Satire",
			"Comedy",
			"Schauspiel",
			"Figurentheater",
			"Tanzveranstaltung",
			"Ballett",
			"Kindertheater",
			"Jugendtheater",
			"Lesung",
			"Lesung mit Musik",
			"Vortrag",
			"Talk",
		],
  		"Other": []
	}


	const getOtherCategories = () => {
		const other = items.filter((item) => 
			!filterMappings["Classical"].includes(item.name) && 
			!filterMappings["Jazz Rock Pop"].includes(item.name) && 
			!filterMappings["Stage Events"].includes(item.name)
		)
		other.forEach(item => filterMappings["Other"].push(item.name))
	}
	getOtherCategories()

	const handleClick = (newCategory) => {
		reset()
		setSelectedCategory("")
		if (newCategory !== selectedCategory) {
			refine(filterMappings[newCategory])
			setSelectedCategory(newCategory)
		}
		search()
	}
	
	return (
		<nav className="flex justify-center items-center gap-12 mt-3.5 text-brand-cream max-lg:flex-wrap max-lg:gap-y-5 max-lg:gap-x-7">
			{["Highlights","Classical","Jazz Rock Pop","Stage Events","Other"].map((label) => (
				<p
					key={label}
					className={`relative m-0 py-1.5 px-0.5 pb-2.5 font-medium text-[clamp(18px,2.1vw,28px)] leading-none cursor-pointer select-none transition-colors duration-150
						${selectedCategory === label
							? "font-bold text-white after:content-[''] after:absolute after:left-0 after:right-0 after:h-0.5 after:bottom-0 after:bg-white after:rounded-sm"
							: "text-white/92 hover:text-white hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bottom-0 hover:after:bg-white/60"
						}`}
					onClick={() => handleClick(label)}
				>
					{label}
				</p>
			))}
		</nav>
	)
	}

export default CategoryLinks