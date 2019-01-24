from flask import Flask, render_template, request, jsonify, redirect, url_for, abort, session, flash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_socketio import SocketIO, emit, join_room, leave_room, send
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
            return redirect(url_for('sign_in'))
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
    message.body = f'Your activation link is: {link}'
    mail.send(message)


def join_chess_room():
    room = session['board_name']
    session['room'] = room
    join_room(room)



@socketio.on('connection')
def connection_handler(msg):
    print(f'Message: {msg}')
    emit('log', msg, broadcast=True)



@socketio.on('join')
def join(data):
    join_chess_room()
    username = session['username']
    emit('join',{'username':username},room=session['room'])



@socketio.on('send_chat')
def chat_handler(data):
    emit('chat', data, room=session['room'])



@socketio.on('send_move')
def move_handler(move_data):
    update_moves(session['board_name'], move_data)
    emit('move', move_data,room=session['room'])



@socketio.on('send_kill')
def kill_handler(enemyId):
    update_kill(session['board_name'], enemyId)
    emit('kill', enemyId, room=session['room'])



@app.route('/load_board',methods=['POST'])
def load_board():
    pieces = get_pieces(request.form['board_name'])
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
        flash('Confirmation e-mail has been sent!','alert-success')
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
                flash("Your account has not been confirmed",'alert-danger')
                return redirect(request.referrer)
            set_permanent_session(form.data['remember_me'], 10)
            session['id'] = user['id']
            session['username'] = user['username']
            flash('You have logged in successfully!','alert-success')
            return redirect(url_for('home'))
        else:
            flash('Wrong e-mail or password!','alert-danger')
    return render_template('signin.html',form=form)



@app.route('/home')
@login_required
def home():
    user_id = session['id']
    rooms = get_rooms_by_user_id(user_id)
    opponents = get_opponents(user_id)
    return render_template('home.html',
                           rooms = rooms,
                           opponents = opponents)


@app.route('/logout')
@login_required
def log_out():
    session.clear()
    flash('You have successfully logged out!', 'alert-success')
    return redirect(url_for('sign_in'))



@app.route('/confirm_email')
def confirm_email():
    try:
        token = request.args.get('token')
        username = request.args.get('username')
        s.loads(token,salt='email-confirm',max_age=3600)
        confirm_account(username)
        flash('Your account has been activated!','alert-success')
        return redirect(url_for('sign_in'))
    except SignatureExpired:
        flash('Your registration has expired\nA new activation link has been sent!')
        abort(404)



@app.route('/newgame',methods=['POST'])
def newgame():
    board_name = request.form['board_name']
    color = request.form['color']
    opponent_id = request.form['opponent_id']
    user_id = session['id']
    flash('New game has been created!','alert-success')
    new_game(board_name, user_id, color, opponent_id)
    return jsonify('ok')



@app.route('/game/<string:board_name>')
@login_required
def game(board_name):
    session['board_name'] = board_name
    color = get_color(board_name,session['id'])
    return render_template('chess.html',
                           board_name = board_name,
                           color = color)



@app.route('/delete-room/<string:board_name>/<int:room_id>')
def delete_room(board_name, room_id):
    remove_room(board_name, room_id)
    flash('Game has been deleted!', 'alert-danger')
    return redirect(url_for('home'))



if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host='0.0.0.0'
    )
