import createClient from 'openapi-fetch';
import type { paths } from '../../../types/schema';

const fetchClient = createClient<paths>({ baseUrl: import.meta.env.VITE_BACKEND_URL });

export default fetchClient;
