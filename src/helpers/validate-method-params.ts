import { BadRequestException, Logger } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

/**
 * ValidateMethodParams validates the properties of a given object using the class-validator library.
 *
 * @template SpecificClass The class to validate the parameters against.
 * @param {ClassConstructor<SpecificClass>} BaseClass The constructor of the class to validate the parameters against.
 * @param {SpecificClass} params The parameters to validate.
 * @returns {Promise<void>} A Promise that resolves if the parameters are valid, or throws a BadRequestException if they are not.
 */
export async function ValidateMethodParams<SpecificClass>(
  BaseClass: ClassConstructor<SpecificClass>,
  params: SpecificClass,
): Promise<void> {
  // Convert the parameters to an instance of the given class using the class-transformer library
  const instanceOf = plainToClass(BaseClass, params);
  try {
    // Validate the instance against the class-validator decorators using the validateOrReject function
    await validateOrReject(instanceOf as Record<string, unknown>, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  } catch (errors) {
    // If validation fails, log the error and throw a BadRequestException
    Logger.error(`Validation of body failed:`);
    Logger.error(errors);
    throw new BadRequestException(errors);
  }
}
