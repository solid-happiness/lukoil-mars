import { makeRequest } from 'client/features/request';

export const getCSRFToken = async (): Promise<string> => {
  const response = await makeRequest.get<{ csrfToken: string }>('/api/csrf/');

  return response.data.csrfToken;
};
