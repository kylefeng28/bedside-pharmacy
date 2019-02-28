import pyrebase
from PyInquirer import prompt
import json

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

    # Get a reference to the database
    db = firebase.database()

    # Print out everything in JSON format
    ref = db.child('').get(user['idToken'])
    print(json.dumps(ref.val()))
