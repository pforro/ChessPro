from flask import Flask, render_template, request, jsonify, redirect, url_for, abort, session, flash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_socketio import SocketIO, emit
from flask_mail import Mail, Message
from datetime import timedelta
from functools import wraps
from datamanager import *
from forms import *
from hash import *


app = Flask(__name__)
app.secret_key = "ThisIsAVerySecretKey"
socketio = SocketIO(app)
app.config.from_pyfile('config.cfg')
mail = Mail(app)
s = URLSafeTimedSerializer('VerySecretKey')

# new_game('hello', 10, 'Black', 11)
# heroku pg:psql --app gopnik-chess < init.sql


def login_required(function):
    @wraps(function)
    def decorated_function(*args, **kwargs):
        if not verify_session(session.get('id')):
            abort(404)
        return function(*args, **kwargs)
    return decorated_function



def redirect_if_user_in_session(function):
    @wraps(function)
    def decorated_function(*args, **kwargs):
        if  verify_session(session.get('id')):
            return redirect(url_for('home'))
        return function(*args, **kwargs)
    return decorated_function



def set_permanent_session(remember_me,days):
    if remember_me:
        session.permanent = True
        app.permanent_session_lifetime = timedelta(days=days)



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
@redirect_if_user_in_session
def sign_up():
    form = RegistrationForm()
    if form.validate_on_submit():
        usr_input = form.data
        usr_input['password'] = hash_password(usr_input['password'])
        register(usr_input)
        send_verification_token(usr_input)
        return redirect(url_for('sign_in'))
    return render_template('signup.html', form=form)



@app.route('/',methods=['GET','POST'])
@redirect_if_user_in_session
def sign_in():
    form = LoginForm()
    if form.validate_on_submit():
        user = get_user(form.data['email'])
        if user and verify_password(form.data['password'],user['password']):
            if not user['confirmed']:
                flash("Your account has not been confirmed")
                return redirect(request.referrer)
            set_permanent_session(form.data['remember_me'], 10)
            session['id'] = user['id']
            session['username'] = user['username']
            return redirect(url_for('home'))
        else:
            flash('Wrong e-mail or password')
    return render_template('signin.html',form=form)



@app.route('/home')
@login_required
def home():
    user_id = session['id']
    rooms = get_rooms_by_user_id(user_id)
    return render_template('home.html',rooms=rooms)


@app.route('/logout')
@login_required
def log_out():
    session.clear()
    return redirect(url_for('sign_in'))



@app.route('/confirm_email/')
def confirm_email():
    try:
        token = request.args.get('token')
        username = request.args.get('username')
        s.loads(token,salt='email-confirm',max_age=3600)
        confirm_account(username)
        flash('Your account has been activated!')
        return redirect(url_for('sign_in'))
    except SignatureExpired:
        flash('Your registration has expired\nA new activation link has been sent!')
        abort(404)



@app.route('/game')
@login_required
def game():
    return render_template('chess.html',player=request.args)



if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host='0.0.0.0'
    )
