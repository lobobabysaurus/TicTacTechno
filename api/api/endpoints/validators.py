from re import findall

nonempty_string = {"type": "string", "minLength": 1}
number = {"type": "number"}

email = nonempty_string.copy()
email['pattern'] = "[^@]+@[^@]+\.[^@]+"


def handle_validation_errors(error_iter):
    errors = {}
    for error in error_iter:
        if error.validator == 'required':
            field_name = findall(r"'(\w+)'", error.message)[0]
            errors[field_name] = '{} cannot be empty'.format(field_name)
        else:
            field = error.path.pop()
            if error.validator == 'minLength':
                errors[field] = '{} cannot be empty'.format(field)
            elif field == 'email'\
                    and error.validator == 'pattern'\
                    and error.instance != '':
                errors[field] = '{} is not a valid email'.format(
                                                                error.instance)
    return errors
