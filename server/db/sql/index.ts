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
    const fullPath: string = path.join(__dirname, file);
    const options: IQueryFileOptions = {
        minify: true
    };
    const qf: QueryFile = new QueryFile(fullPath, options);
    if (qf.error) {
        console.error(qf.error);
    }
    return qf;
}

export {users};
