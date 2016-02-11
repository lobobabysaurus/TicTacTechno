from json import loads


def process_raw_data(raw_data):
    ###
    # Converts raw post data to a dictionary
    #
    # :param raw_data Raw body from a HTTP post request
    # :return dictionary with all post parameters
    ###
    return loads(raw_data.decode('utf-8'))
