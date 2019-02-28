import pyrebase
from PyInquirer import prompt
import json
import time

def initialize(env):
    config = {
        'apiKey': env['apiKey'],
        'authDomain': env['projectId'] + '.firebaseapp.com',
        'databaseURL': 'https://' + env['databaseName'] + '.firebaseio.com/',
        'storageBucket': env['bucket'] + '.appspot.com'
    }
    firebase = pyrebase.initialize_app(config)
    return firebase

def prompt_login():
    questions = [
        {
            'type': 'input',
            'name': 'email',
            'message': 'Email:'
        },
        {
            'type': 'password',
            'name': 'password',
            'message': 'Password:'
        }
    ]
    print('Please login with your credentials:')
    answers = prompt(questions)
    return answers['email'], answers['password']

def prompt_action():
    questions = [
        {
            'type': 'list',
            'name': 'action',
            'message': 'What do you want to do?',
            'choices': [
                { 'name': 'Export database', 'value': 'export'  },
                { 'name': 'Listen for changes', 'value': 'listen'  },
                #  { 'name': 'Import JSON to database', 'value': 'import'  },
                { 'name': 'Quit', 'value': 'quit'  },
            ]
        },
        # {
        #     'type': 'confirm',
        #     'name': 'toBeDelivered',
        #     'message': 'Is this for delivery?',
        #     'default': False
	# }
    ]
    print('Please select an action:')
    answers = prompt(questions)
    return answers['action']

if __name__ == '__main__':
    # Read from environment file
    with open('environment.json') as f:
        env = json.load(f)

    # Initialize firebase
    firebase = initialize(env)

    # Prompt for login
    auth = firebase.auth()
    email, password = prompt_login()
    user = auth.sign_in_with_email_and_password(email, password)

    # TODO have an option to use idToken
    #  with open('.env') as f:
    #      user = {}
    #      user['idToken'] = f.read()

    print('Using token: ' + user['idToken'])

    # Get a reference to the database
    db = firebase.database()

    # Loop forever
    while True:
        action = prompt_action()
        if action == 'export':
            # Export out everything in JSON format
            fname = 'output.json'
            ref = db.child('').get(user['idToken'])
            val = ref.val()
            with open(fname, 'w') as f:
                json.dump(val, f, indent=4)
                print('Exported to ' + fname)

        elif action == 'listen':
            def stream_handler(msg):
                t = time.strftime('%d %b %Y %H:%M:%S', time.localtime())
                print('[%s] \x1b[33m%s %s\x1b[0m' % (t, msg['event'], msg['path']))

            stream = db.child('').stream(stream_handler)
            input('Now listening for changes. Press enter to stop listening...\n')
            stream.close()

        # elif action == 'import':
        #     pass

        elif action == 'quit':
            print('Goodbye!')
            exit(0)
