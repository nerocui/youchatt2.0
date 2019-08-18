import {QueryFile, IQueryFileOptions} from 'pg-promise';
import * as path from 'path';

const users = {
    create: sql('users/create.sql'),
	empty: sql('users/empty.sql'),
	init: sql('users/init.sql'),
    drop: sql('users/drop.sql'),
    add: sql('users/add.sql')
};


function sql(file: string): QueryFile {

    const fullPath: string = path.join(__dirname, file); // generating full path;

    const options: IQueryFileOptions = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true

        // See also property 'params' for two-step template formatting
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        console.error(qf.error);
    }

    return qf;

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

export {users};
