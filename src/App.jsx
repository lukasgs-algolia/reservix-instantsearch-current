import Topbar from "./components/Topbar/Topbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Content from "./components/Content/Content.jsx";

import { InstantSearch } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import { useState } from "react";

const navigationClient = algoliasearch(
  import.meta.env.VITE_APPLICATION_ID,
  import.meta.env.VITE_API_KEY
);

const searchbarClient = algoliasearch(
  import.meta.env.VITE_APPLICATION_ID,
  import.meta.env.VITE_API_KEY
);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <div>
      <InstantSearch indexName="reservix_trial" searchClient={navigationClient}>
        <Topbar />
        <Hero
          searchbarClient={searchbarClient}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <Content
          selectedCategory={selectedCategory}
          selectedCity={selectedCity}
        />
      </InstantSearch>
    </div>
  );
}
