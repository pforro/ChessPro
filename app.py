from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from datamanager import *

app = Flask(__name__)
app.secret_key = "ThisIsAVerySecretKey"
socketio = SocketIO(app)


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



@app.route('/load_board')
def load_board():
    pieces = get_pieces()
    return jsonify({'pieces':pieces})


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
