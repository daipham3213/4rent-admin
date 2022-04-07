import { useMutation } from 'react-query';

import { api } from '../Client';
import { ErrorResponse } from '../type';

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expireIn: number;
}

const useLogin = () => {
  return useMutation<LoginResponse, ErrorResponse, LoginVariables>(
    async (variables) => {
      const { data } = await api.post('/auth/login', variables);
      return data;
    }
  );
};

export default useLogin;
