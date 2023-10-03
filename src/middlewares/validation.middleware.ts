import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {RequestHandler} from 'express';
import {validationErrorException} from '@/errors/generics.error';

const validationMiddleware =
  (
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true
  ): RequestHandler =>
  (req, res, next): void => {
    validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        // fix: errors array to concatenate string
        const message = errors;
        // .map((error: ValidationError) => Object.values(error.constraints))
        // .join(', ');
        next(validationErrorException(message));
      } else {
        next();
      }
    });
  };

export default validationMiddleware;
