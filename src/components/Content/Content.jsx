import { InfiniteHits, Snippet } from "react-instantsearch";

const Hit = ({ hit }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-150">
      <div className="relative w-full pt-[100%] bg-gray-bg">
        <img
          src={hit.images?.[0]?.url}
          alt={hit.name}
          className="absolute inset-0 w-full h-full object-cover block"
        />
      </div>
      <div className="p-3 pb-3.5">
        <h3 className="m-0 text-xs text-gray-card">
          <Snippet hit={hit} attribute="name" />
        </h3>
      </div>
    </article>
  );
};

const Content = ({ selectedCategory, selectedCity }) => {
  return (
    <section className="mt-6 mb-10">
      <div className="max-w-container mx-auto px-6 text-brand-cream">
        {selectedCity && (
          <h1 className="text-center text-black text-xl font-medium my-4">
            events in {selectedCity} and the surrounding area
          </h1>
        )}
        <InfiniteHits
          hitComponent={Hit}
          showPrevious={false}
          classNames={{
            root: "hits",
            list: "list-none m-0 p-0 grid grid-cols-4 gap-[22px] max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1",
            item: "m-0",
          }}
        />
      </div>
    </section>
  );
};

export default Content;
