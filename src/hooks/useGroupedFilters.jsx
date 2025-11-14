import { useConnector } from 'react-instantsearch'

/* Connector Function. Takes a render and unmount function */
function connectGroupedFilters(renderFn, unmountFn) {
	/* Widget Factory. Takes widget parameters / props (in the case of React) */
	return (widgetParams) => {
		/* This widget only uses the attribute parameter */
	  	const { attribute } = widgetParams;
	  	const connectorState = {};

	  /* Widget Instance */
	  	return {
			$$type: "algolia.groupedFilters",
			
			/* Life-cycle function to manage the widget's API (methods and properties) */
			getWidgetRenderState(renderOptions) {
				/* Consumes results and helper functions from InstantSearch */
				const { results, helper } = renderOptions

				/* Refine the search with helper function from algoliasearch-helper */
				/* https://instantsearchjs.netlify.app/algoliasearch-helper-js/reference.html#methods */
				if (!connectorState.refine) {
					connectorState.refine = (values) => {
						values.forEach(value => helper.addDisjunctiveFacetRefinement(attribute, value));
					}
				}

				if (!connectorState.reset) {
					connectorState.reset = () =>
						helper.clearRefinements(attribute);
				}

				if (!connectorState.search) {
					connectorState.search = () =>
						helper.search();
				}

				/* Fetch available facet values for the given attribute */
				/* https://instantsearchjs.netlify.app/algoliasearch-helper-js/reference.html#facets-and-filters-methods */
				const items = results?.getFacetValues(attribute, {
					sortBy: ["name:asc"],
				}) || []

				return {
					...widgetParams,
					items,
					refine: connectorState.refine,
					reset: connectorState.reset,
					search: connectorState.search
				}
			},

			/* Life-cycle function to update global render state of all widgets */
			getRenderState(renderState, renderOptions) {
				return {
					...renderState,
					groupedFilters: {
						...renderState.groupedFilters,
						[attribute]: this.getWidgetRenderState(renderOptions)
					}
				}
			},

			/* Life-cycle function invoked when InstantSearch initializes */
			/* Calls render function with isFirstRender: true to control its flow */
			/* widgetRenderState argument contains: widgetParams, items and refine function of the widget */
			init(initOptions) {
				const { instantSearchInstance } = initOptions
				renderFn({...this.getWidgetRenderState(initOptions), instantSearchInstance}, true)
			},

			/* Life-cycle function invoked when InstantSearch renders the widget */
			/* Calls render function with isFirstRender: false to control its flow */
			/* Render state argument contains: widgetParams, items and refine function of the widget */
			render(renderOptions) {
				const { instantSearchInstance } = renderOptions
				renderFn({...this.getWidgetRenderState(renderOptions), instantSearchInstance}, false)
			},

			/* Life-cycle function invoked when InstantSearch removes the widget */
			dispose(disposeOptions) {
				unmountFn()
			},

			/* Life-cycle function to convert search parameters into uiState */
			/* uiState is used by InstantSearch to derive the URL for routing and is itself derived from the URL*/
			getWidgetUiState(uiState, { searchParameters }) {
				return {
					...uiState,
					groupedFilters: {
						[attribute]: searchParameters.getDisjunctiveRefinements(attribute)
					}
				}
			},

			/* Life-cycle function to convert uiState into search parameters */
			/* uiState is used by InstantSearch to derive the URL for routing and is itself derived from the URL */ 
			getWidgetSearchParameters(searchParameters, { uiState }) {
				const state = searchParameters.addDisjunctiveFacet(attribute)
				const values = uiState.groupedFilters?.[attribute];
				if (Array.isArray(values) && values.length > 0) {
					return values.reduce(
						(acc, curr) => acc.addDisjunctiveFacetRefinement(attribute, curr),
						state
					)
				}
				return state
			}
	  };
	};
}

/* Turn connector into a React hook */
const useGroupedFilters = (props, additionalWidgetProperties) => {
	return useConnector(
		connectGroupedFilters,
		props,
		additionalWidgetProperties,
	)
}

export default useGroupedFilters