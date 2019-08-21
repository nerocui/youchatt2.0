import React from 'react';
import SearchResult from '../components/cards/SearchResult';
import { connect } from 'react-redux';
import { sendRequest } from '../../action';

const SearchPage = ({results, sendRequest}) => {
	return (
		<div className='page'>
			{results.map(res => <SearchResult {...res} sendRequest={sendRequest}/>)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		results: state.contactSearchState.results
	};
}

export default connect(mapStateToProps, {sendRequest})(SearchPage);
