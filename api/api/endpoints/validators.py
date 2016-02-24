from re import match


def email(email):
    return match(r"[^@]+@[^@]+\.[^@]+", email)
