import mongoose from 'mongoose';
import { IGenericErrorMessage, IGenericErrorResult } from '../interface/error';

const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResult => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleMongooseValidationError;
