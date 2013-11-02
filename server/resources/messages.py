from flask.ext.restful import Resource

from flask import current_app


class Messages(object):
    
    messages = []

    @classmethod
    def make_message(cls, message, status):
        """ returns a dict of message and status """
        return {
            'message': message,
            'status': status
        }
   
    @classmethod
    def get_message(cls):
        """ pops the next message """
        try:
            result = list(cls.messages)
            print len(result)
            cls.messages = []
            return result
        except:
            return None

    @classmethod
    def add_message(cls, message, status):
        """ creates a mesasge and adds it to the queue """

        log = current_app.logger

        # create the message
        message_response = cls.make_message(message, status)

        # add message to the queue
        cls.messages.insert(0, message_response)

        # log message to file TODO more robust solution
        log.info(message.replace('<br>', '\n'))


class GetMessages(Resource):

    def get(self):
        return Messages.get_message()
