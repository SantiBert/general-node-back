export default {
    mockRequest: (): any => {
      const req: any = {};
      req.body = jest.fn().mockReturnValue(req);
      req.params = jest.fn().mockReturnValue(req);
      req.cookies = jest.fn().mockReturnValue(req);
      return req;
    },
  
    mockResponse: (): any => {
      const res: any = {};
      res.send = jest.fn().mockReturnValue(res);
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.setHeader = jest.fn().mockReturnValue(res);
      return res;
    },
  
    mockNext: (): any => jest.fn(),
  
    mockRequestWithUser: (): any => {
      const req: any = {};
      req.body = jest.fn().mockReturnValue(req);
      req.params = jest.fn().mockReturnValue(req);
      req.cookies = jest.fn().mockReturnValue(req);
      req.user = jest.fn().mockReturnValue({});
      return req;
    }
  };
  