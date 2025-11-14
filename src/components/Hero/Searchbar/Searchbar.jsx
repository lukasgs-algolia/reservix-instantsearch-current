import {
  InstantSearch,
  useInstantSearch,
  SearchBox,
  Index,
  Hits,
} from "react-instantsearch";

const ConditionalHits = ({ type }) => {
  const Hit = ({ hit }) => {
    if (hit.__position > 5) return null;
    if (type == "EVENTS") {
      return (
        <div className="flex justify-between items-center py-1.5 px-1 text-gray-text text-xs border-b border-gray-border-light last:border-b-0 hover:text-white hover:bg-black hover:rounded-md cursor-pointer transition-colors">
          <span className="flex-1">{hit.name}</span>
          <span className="whitespace-nowrap ml-8 text-xs">
            {hit.venue.city}
          </span>
        </div>
      );
    } else if (type == "CONTAINER") {
      return (
        <div className="flex justify-between items-center py-1.5 px-1 text-gray-text text-xs border-b border-gray-border-light last:border-b-0 hover:text-white hover:bg-black hover:rounded-md cursor-pointer transition-colors">
          <span className="flex-1">{hit.name}</span>
          <span className="whitespace-nowrap ml-8 text-xs">
            {hit.upcomingEventCount} event(s)
          </span>
        </div>
      );
    }
  };

  const { results } = useInstantSearch();
  const hasResults = results?.hits && results.hits.length > 0;

  if (hasResults) {
    return (
      <div className="mb-4 last:mb-0">
        <h2 className="text-[#ff8c00] text-xs font-light tracking-wider m-0 mb-1 px-1">
          {type}{" "}
          {results.nbHits == 1 ? "(1 result)" : `(${results.nbHits} results)`}
        </h2>
        <Hits
          hitComponent={Hit}
          classNames={{
            root: "w-full",
            list: "list-none m-0 p-0",
            item: "m-0 p-0",
          }}
        />
      </div>
    );
  }
};

const SearchResultsOverlay = ({ parentIndexName }) => {
  const { uiState, results } = useInstantSearch();
  const query = uiState[parentIndexName].query || "";
  const hasResults = results?.hits && results.hits.length > 0;

  if (hasResults && query.length >= 3) {
    return (
      <div className="absolute top-[calc(100%+0.15rem)] left-0 right-0 z-[1000] bg-white shadow-overlay max-h-[70vh] overflow-y-auto">
        <div className="p-2">
          <Index indexName="reservix_trial" indexId="events">
            <ConditionalHits type="EVENTS" />
          </Index>
          <Index indexName="ema_branded_containers" indexId="container">
            <ConditionalHits type="CONTAINER" />
          </Index>
        </div>
      </div>
    );
  }
};

const Searchbar = ({ searchbarClient }) => {
  const parent_index_name = "reservix_trial";
  return (
    <div>
      {/* InstantSearch instance */}
      <InstantSearch
        indexName={parent_index_name}
        searchClient={searchbarClient}
      >
        <div className="relative w-full">
          <SearchBox
            /* Placeholer text when no query is typed */
            placeholder="Search for artist, location, event"
            /* Send a new search request for each keystroke. If set to false, search will execute only upon submitting */
            searchAsYouType={true}
            /* Callback function to preprocess the query before executing a search */
            /* Only executes a search when query is empty or 3 characters have been typed */
            queryHook={(query, search) => {
              if (query.length >= 3) {
                search(query);
              } else if (query.length === 0) {
                search(query);
              }
            }}
            /* Callback function when user submits the search. */
            /* Placeholder. Should be replaced with a listing page powered by Algolia */
            onSubmit={() => (window.location.href = "https://www.algolia.com")}
            /* Replace default classes of the widget with your own */
            classNames={{
              form: "grid grid-cols-search gap-0 max-w-container mx-auto mt-4",
              input:
                "py-[18px] px-[22px] border border-gray-border border-r-0 rounded-l-md bg-white text-[22px] text-black outline-none shadow-search placeholder:text-gray-placeholder",
              submit:
                "border-none bg-brand-orange text-white font-bold text-lg rounded-r-md cursor-pointer hover:bg-opacity-90 transition-all",
              submitIcon: "text-inherit",
              reset: "hidden",
              loadingIcon: "hidden",
            }}
            /* Component that replaces the submit icon */
            submitIconComponent={({ classNames }) => (
              <div className={classNames.submitIcon}>Search</div>
            )}
            /* Component that replaces the reset button */
            resetIconComponent={({ classNames }) => (
              <div className={classNames.reset}>Reset Search</div>
            )}
            /* Component that replaces the loading indicator */
            loadingIconComponent={({ classNames }) => (
              <div className={classNames.loadingIcon}>Loading</div>
            )}
          />
          <SearchResultsOverlay parentIndexName={parent_index_name} />
        </div>
      </InstantSearch>
    </div>
  );
};

export default Searchbar;
