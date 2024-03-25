import createClient from 'openapi-fetch';
import type { paths } from '../../../types/schema';

const fetchClient = createClient<paths>({ baseUrl: import.meta.env.VITE_BACKEND_URL });

export default fetchClient;

// TODO: might not be used idk
export function objectToFormData(object: object, existingFormData?: FormData, namespace?: string) {
  const formData = existingFormData || new FormData();

  Object.keys(object).forEach((property) => {
    if (Object.hasOwn(object, property)) {
      const formKey = namespace ? namespace + '[' + property + ']' : property;

      // if the property is an object, but not a File,
      // use recursivity.
      const value = object[property];
      if (typeof value === 'object' && !(value instanceof File)) {
        objectToFormData(value, formData, property);
      } else {
        // if it's a string or a File object
        formData.append(formKey, value);
      }
    }
  });

  return formData;
}
