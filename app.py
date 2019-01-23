from flask import Flask, render_template, request, jsonify, redirect, url_for, abort
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_socketio import SocketIO, emit
from flask_mail import Mail, Message
from datamanager import *
from forms import *
from hash import *


app = Flask(__name__)
app.secret_key = "ThisIsAVerySecretKey"
socketio = SocketIO(app)
app.config.from_pyfile('config.cfg')
mail = Mail(app)
s = URLSafeTimedSerializer('VerySecretKey')


def send_verification_token(usr_input):
    email = usr_input.get('email')
    username = usr_input.get('username')
    token = s.dumps(email, salt='email-confirm')
    message = Message('Confirm Email', sender="forropcs@gmail.com", recipients=[email])
    link = url_for('confirm_email',username=username, token=token, _external=True)
    message.body = f"Your activation link is: {link}"
    mail.send(message)





@socketio.on('connection')
def connection_handler(msg):
    print(f'Message: {msg}')
    emit('log', msg, broadcast=True)



@socketio.on('send_message')
def message_handler(nickname, message):
    data = {'nickname': nickname, 'message':message}
    emit('receive_message', data, broadcast=True)



@socketio.on('send_move')
def move_handler(move_data):
    emit('move', move_data, broadcast=True)



@socketio.on('send_kill')
def kill_handler(enemyId):
    emit('kill', enemyId, broadcast=True)



@app.route('/load_board')
def load_board():
    pieces = get_pieces()
    return jsonify({'pieces':pieces})



@app.route('/signup',methods=['GET','POST'])
def sign_up():
    register_form= RegistrationForm()
    if register_form.validate_on_submit():
        usr_input = register_form.data
        usr_input['password'] = hash_password(usr_input['password'])
        register(usr_input)
        send_verification_token(usr_input)
        return redirect(url_for('login'))
    return render_template('register.html',form=register_form)




@app.route('/confirm_email/')
def confirm_email():
    try:
        token = request.args.get('token')
        username = request.args.get('username')
        s.loads(token,salt='email-confirm',max_age=3600)
        confirm_account(username)
        return redirect(url_for('login'))
    except SignatureExpired:
        abort(404)






@app.route('/')
def login():
    if request.args:
        login = request.args.to_dict()
        login['color'] = login['color'].capitalize()
        return render_template('chess.html',player=login)
    return render_template('login.html')


@app.route('/game')
def game():
    return render_template('chess.html',player=request.args)




if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host='0.0.0.0'
    )
