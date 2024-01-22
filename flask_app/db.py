import sqlite3, random, datetime
from models import Book


def getNewId():
    return random.getrandbits(28)


books = [
    {
        'available': True,
        'title': 'Don Quixote',
        'price': 450,
        'author': 'XYZ'
    },
    {
        'available': True,
        'title': 'A Tale of Two Cities',
        'price': 450,
        'author': 'Adam'
    },
    {
        'available': True,
        'title': 'The Lord of the Rings',
        'price': 450,
        'author': 'Eve'
    },
    {
        'available': True,
        'title': 'The Little Prince',
        'price': 300,
        'author': 'ABC'
    },
    {
        'available': True,
        'title': "Harry Potter and the Sorcerer's Stone",
        'price': 600,
        'author': 'J.K.Rowling'
    },
    {
        'available': True,
        'title': 'And Then There Were None',
        'price': 450,
        'author': 'Nonee'
    },
    {
        'available': True,
        'title': 'The Dream of the Red Table',
        'price': 600,
        'author': 'dream'
    },
    {
        'available': True,
        'title': 'The Hobbit',
        'price': 450,
        'author': 'Hobbit'
    },
    {
        'available': True,
        'title': 'The Lion, the Witch and the Wardrobe',
        'price': 250,
        'author': 'Lion'
    },
    {
        'available': True,
        'title': 'The Da Vinci Code',
        'price': 450,
        'author': 'Shweta'
    },
]    

def connect():
    conn = sqlite3.connect('books.db')
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, available BOOLEAN, title TEXT, price INTEGER, author TEXT)")
    conn.commit()
    conn.close()
    for i in books:
        bk = Book(getNewId(), i['available'], i['title'], i['price'], i['author'])
        insert(bk)

def insert(book):
    conn = sqlite3.connect('books.db')
    cur = conn.cursor()
    cur.execute("INSERT INTO books VALUES (?,?,?,?,?)", (
        book.id,
        book.available,
        book.title,
        book.price,
        book.author
    ))
    conn.commit()
    conn.close()

def view():
    conn = sqlite3.connect('books.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM books")
    rows = cur.fetchall()
    books = []
    for i in rows:
        book = Book(i[0], True if i[1] == 1 else False, i[2], i[3], i[4])
        books.append(book)
    conn.close()
    return books

def update(book):
    conn = sqlite3.connect('books.db')
    cur = conn.cursor()
    cur.execute("UPDATE books SET available=?, title=?, price=?, author=? WHERE id=?", (book.available, book.title, book.price, book.author, book.id))
    conn.commit()
    conn.close()

def delete(theId):
    conn = sqlite3.connect('books.db')
    cur = conn.cursor()
    cur.execute("DELETE FROM books WHERE id=?", (theId,))
    conn.commit()
    conn.close()

def deleteAll():
    conn = sqlite3.connect('books.db')
    cur = conn.cursor()
    cur.execute("DELETE FROM books")
    conn.commit()
    conn.close()