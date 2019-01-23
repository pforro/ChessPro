from db_connection import connection_handler


@connection_handler
def get_pieces(cursor):
    query = ''' SELECT * FROM new_board'''
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