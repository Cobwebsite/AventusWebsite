import { prepareMd } from './prepareMd.mjs'
import { prepareSearch} from './prepareSearch.mjs'
import { resolve } from 'path';

const __dirname = import.meta.dirname;

await prepareMd('http://127.0.0.1:8080', resolve(__dirname, '../src/static/docs'));
await prepareSearch('http://127.0.0.1:8080', resolve(__dirname, '../src/static/pagefind'));