import { AuthInterceptor } from './auth.interceptor';

describe('Auth', () => {
  it('should create an instance', () => {
    expect(new AuthInterceptor()).toBeTruthy();
  });
});
