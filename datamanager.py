from db_connection import connection_handler


@connection_handler
def get_pieces(cursor):
    query = ''' SELECT * FROM new_board'''
    cursor.execute(query)
    return cursor.fetchall()

