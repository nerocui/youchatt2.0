import * as algoliasearch from 'algoliasearch';
import { key } from '../config/api_key';


export default class SearchEngine {
	public client: algoliasearch.Client;
	public userIndex: algoliasearch.Index;
	
	public init() {
		this.client = algoliasearch(key.algoliaApplicationID, key.algoliaAdminKey);
		this.userIndex = this.client.initIndex('dev_USERS');
	}
}
