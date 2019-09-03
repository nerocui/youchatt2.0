import React from 'react';
import SearchResult from '../components/cards/SearchResult';
import { connect } from 'react-redux';
import { sendRequest, searchContacts } from '../../action';
import { Page, Navbar, Subnavbar, Searchbar, NavLeft, NavTitle } from 'framework7-react';

const SearchPage = ({results, sendRequest, searchContacts}) => {

	const [term, setTerm] = React.useState('');

	function onChange(e) {
		setTerm(e.target.value);
	}

	function onSubmit() {
		searchContacts(term);
		setTerm('');
	}

	return (
		<Page>
			<Navbar>
				<NavLeft backLink="Back"></NavLeft>
				<NavTitle>Search</NavTitle>
				<Subnavbar inner={false}>
					<Searchbar
						customSearch
						placeholder="Start typing to search..."
						value={term}
						onChange={onChange}
						onSubmit={onSubmit}
					></Searchbar>
				</Subnavbar>
			</Navbar>
			{results.map(res => <SearchResult key={res.id} {...res} sendRequest={sendRequest}/>)}
		</Page>
	);
}

function mapStateToProps(state) {
	return {
		results: state.contactSearchState.results,
	};
}

export default connect(mapStateToProps, {sendRequest, searchContacts})(SearchPage);
