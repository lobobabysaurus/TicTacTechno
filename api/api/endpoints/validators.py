from re import findall

nonempty_string = {"type": "string", "minLength": 1}
number = {"type": "number"}

email = nonempty_string.copy()
email.update({'pattern': "[^@]+@[^@]+\.[^@]+"})


def handle_validation_errors(error_iter):
    errors = {}
    for error in error_iter:
        if error.validator == 'required':
            field_name = findall(r"'(\w+)'", error.message)[0]
            errors.update({field_name: error.message})
        else:
            field = error.path.pop()
            if field == 'email' and error.validator == 'pattern':
                errors.update({field: '{} is not a valid email'.format(
                    error.instance)})
            elif error.validator == 'minLength':
                errors.update(
                    {field: 'must have a value for {}'.format(field)})
    return errors
