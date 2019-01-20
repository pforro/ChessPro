from flask import Flask, render_template, g
from flask_socketio import SocketIO, emit, send

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



@app.route('/')
def index():
    return render_template('chess.html')



if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host='0.0.0.0'
    )
