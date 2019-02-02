from db_connection import connection_handler
from psycopg2 import sql


@connection_handler
def get_pieces(cursor,board_name):
    query = ''' SELECT * FROM {}'''
    query = sql.SQL(query).format(sql.Identifier(board_name))
    cursor.execute(query)
    return cursor.fetchall()



@connection_handler
def register(cursor, usr_input):
    query = ''' INSERT INTO users (username, email, password)
                VALUES (%(username)s, %(email)s, %(password)s)'''
    cursor.execute(query,usr_input)



@connection_handler
def confirm_account(cursor,username):
    query = ''' UPDATE users
                SET confirmed=true
                WHERE username=%(username)s'''
    params = {'username':username}
    cursor.execute(query,params)



@connection_handler
def get_user(cursor,email):
    query = ''' SELECT * FROM users
                WHERE email=%(email)s'''
    params = {'email':email}
    cursor.execute(query,params)
    return cursor.fetchone()



@connection_handler
def verify_session(cursor,id):
    query = ''' SELECT * FROM users
                WHERE id=%(id)s'''
    params = {'id':id}
    cursor.execute(query,params)
    return cursor.fetchone()



@connection_handler
def new_board(cursor,name):
    query = ''' create table if not exists {}(
                id text not null,
                ycor text not null,
                xcor text,
                cellid text not null,
                color text not null,
                type text not null,
                status boolean);  '''
    query = sql.SQL(query).format(sql.Identifier(name))
    cursor.execute(query)



@connection_handler
def add_piece(cursor,board_name,piece_data):
    query = ''' INSERT INTO {}
                VALUES (%(id)s,%(ycor)s,%(xcor)s,%(cellid)s,%(color)s,%(type)s,%(status)s)'''
    query = sql.SQL(query).format(sql.Identifier(board_name))
    cursor.execute(query,piece_data)



@connection_handler
def populate_new_board(cursor,board_name):
    pieces = get_pieces('init_board')
    for piece in pieces:
        add_piece(board_name,piece)



@connection_handler
def create_room(cursor,board_name):
    new_board(board_name)
    populate_new_board(board_name)
    query = ''' INSERT INTO rooms (board_name)
                VALUES (%(board_name)s);
                SELECT id FROM rooms
                ORDER BY id DESC
                LIMIT 1;'''
    params = {'board_name':board_name}
    cursor.execute(query,params)
    return cursor.fetchone()['id']



@connection_handler
def new_game(cursor,board_name,usr_id1,color,usr_id2):
    room_id = create_room(board_name)
    enemy_color = 'Black' if color == 'White' else 'White'
    query = ''' INSERT INTO owners 
                VALUES  (%(usr_id1)s,%(room_id)s,%(color)s),
                        (%(usr_id2)s,%(room_id)s,%(enemy_color)s)  '''
    params = {
        'usr_id1' : usr_id1,
        'usr_id2' : usr_id2,
        'color': color,
        'enemy_color' : enemy_color,
        'room_id' : room_id
    }
    cursor.execute(query,params)



@connection_handler
def get_rooms_by_user_id(cursor,user_id):
    query = ''' SELECT rooms.board_name, rooms.id, string_agg(users.username,', ') AS owners FROM rooms
                INNER JOIN owners on rooms.id = owners.room_id
                INNER JOIN users on owners.owner_id = users.id
                GROUP BY rooms.board_name, rooms.id
                HAVING %(user_id)s = ANY(array_agg(users.id))'''
    params = {'user_id':user_id}
    cursor.execute(query,params)
    return cursor.fetchall()



@connection_handler
def get_opponents(cursor,user_id):
    query = ''' SELECT * FROM users
                WHERE id!=%(user_id)s '''
    params = {'user_id':user_id}
    cursor.execute(query,params)
    return cursor.fetchall()



@connection_handler
def get_color(cursor,board_name,user_id):
    query = ''' SELECT owners.owner_color AS color FROM owners
                INNER JOIN rooms ON owners.room_id = rooms.id
                WHERE rooms.board_name = %(board_name)s and owners.owner_id = %(user_id)s'''
    params = {'board_name':board_name,'user_id':user_id}
    cursor.execute(query,params)
    return cursor.fetchone()['color']



@connection_handler
def update_moves(cursor, board_name, movedata):
    query = ''' UPDATE {}
                SET ycor=%(yCor)s, xcor=%(xCor)s, cellid=%(cellId)s
                WHERE id=%(id)s'''
    query = sql.SQL(query).format(sql.Identifier(board_name))
    params = {
        'yCor': movedata['newCors']['yCor'],
        'xCor': movedata['newCors']['xCor'],
        'cellId': movedata['target'],
        'id': movedata['element']
    }
    cursor.execute(query, params)



@connection_handler
def update_kill(cursor, board_name, id):
    query = ''' UPDATE {}
                SET status=false
                WHERE id=%(id)s'''
    query = sql.SQL(query).format(sql.Identifier(board_name))
    params = {'id': id}
    cursor.execute(query, params)



@connection_handler
def remove_room(cursor, board_name, room_id):
    query = ''' DROP TABLE {};
                DELETE FROM rooms
                WHERE id = %(room_id)s;'''
    query = sql.SQL(query).format(sql.Identifier(board_name))
    params = {'room_id': room_id}
    cursor.execute(query, params)