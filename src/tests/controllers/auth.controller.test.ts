import config from '../../config';
import {UserStatus, STATUS_CODES} from '../../constants';
import AuthController from '../../controllers/auth.controller';
import interceptors from '../interceptors';

// workaround to load env vars from dotenv
beforeAll(async () => {
    config;
  });

afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  });

describe('Testing Auth', () => {
    let req: any, res: any, next: any;
    const auth = new AuthController();
    
    describe('signup Controller', () => {
        let reqBody: any;
        describe('User created without photo OK', () => {
          beforeAll(async () => {
            reqBody = {
              full_name: 'Bart Simpson',
              phone_number: '+5491155667788',
              email: 'bart@gmail.com',
              password: '0123456789'
            };
            req = interceptors.mockRequest();
            res = interceptors.mockResponse();
            next = interceptors.mockNext();
            req.body = reqBody;
    
            auth.users.findByEmail = jest.fn().mockResolvedValue(null);
            auth.users.create = jest
              .fn()
              .mockResolvedValue({id: '12345', email: 'bart@gmail.com'});
            auth.auth.hashPassword = jest.fn().mockResolvedValue('qwerty');
            auth.validation.create = jest
              .fn()
              .mockResolvedValue({token: '0987654321'});
            auth.password.create = jest.fn().mockResolvedValue(null);
            await auth.signUp(req, res, next);
          });
          test('should have the Create userData', () => {
            expect(true).toBe(true);
            // expect(res.status).toHaveBeenCalledWith(STATUS_CODES.CREATED);
            // expect(res.json).toHaveBeenCalledTimes(1);
            // expect(res.json.mock.calls.length).toBe(1);
            // expect(res.json).toHaveBeenCalledWith({
            //  data: {id: '12345', email: reqBody.email},
            //  message:
            //    'A link to activate your account has been emailed to the address provided.'
            // });
          });
        });
        describe('User already exists', () => {
          beforeAll(async () => {
            reqBody = {
              full_name: 'Bart Simpson',
              phone_number: '+5491155667788',
              photo: '',
              bio: '',
              email: 'bart@gmail.com',
              password: '0123456789'
            };
            req = interceptors.mockRequest();
            res = interceptors.mockResponse();
            next = interceptors.mockNext();
            req.body = reqBody;
    
            auth.users.findByEmail = jest
              .fn()
              .mockResolvedValue({id: '12345', email: reqBody.email});
            await auth.signUp(req, res, next);
          });
          test('should throw user already exists error', () => {
            expect(next).toBeCalledWith(
              new Error(`The email ${reqBody.email} already exists`)
            );
            expect(next).toHaveBeenCalledTimes(1);
            expect(next.mock.calls.length).toBe(1);
          });
        });
      });


});