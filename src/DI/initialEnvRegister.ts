import {initialRegister} from './registration';

export const initialEnvRegister = (): void => {
  if (process.env.NODE_ENV !== 'test') {
    initialRegister();
  }
};
