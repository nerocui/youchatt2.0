import React from 'react';
import SearchResult from '../components/cards/SearchResult';
import { connect } from 'react-redux';

const SearchPage = ({results}) => {
	return (
		<div className='page'>
			{results.map(res => <SearchResult {...res}/>)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		results: state.contactSearchState.results
	};
}

export default connect(mapStateToProps)(SearchPage);
