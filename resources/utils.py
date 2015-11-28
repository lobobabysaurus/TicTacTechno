from flask import json


def process_post_data(raw_data):
    ###
    # Converts raw post data to a dictionary
    #
    # :param raw_data Raw body from a HTTP post request
    # :return dictionary with all post parameters
    ###
    return json.loads(raw_data.decode('utf-8'))
