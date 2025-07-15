import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function ValidateNumDoc(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: ValidateNumDocConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'ValidateNumDoc' })
export class ValidateNumDocConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const relatedValue = (args.object as any)["type_doc"];
        if (relatedValue === 'dni') {
            return (/^\d{8}$/).test(value)
        } 
            return (/^\d{8,}$/).test(value)

    }

    defaultMessage(args: ValidationArguments): string {
        const type = (args.object as any)["type_doc"]
        return type === 'dni'
            ? 'num_doc must be exactly 8 digits' 
            : 'num_doc must have at least 8 characters with no spaces'
    }
}
