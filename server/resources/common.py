def attach_message(album, status, message):
    """ Attaches a message to an album """
    message = {
        'message': message,
        'status': status
    }
    if album.get('messages'):
        album['messages'].append(message)
    else:
        album['messages'] = [message]
    if not album.get('status') == 'error':
        album['status'] = status
