from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os, re, datetime
import db
from models import Book


app = Flask(__name__)
CORS(app)

# create the database and table. Insert 10 test books into db
# Do this only once to avoid inserting the test books into 
# the db multiple times
if not os.path.isfile('books.db'):
    db.connect()

@app.route("/request", methods=['POST'])
def postRequest():
    print('Request to add book')
    req_data = request.get_json()
    print(req_data)
    title = req_data['title']
    price = req_data['price']
    author = req_data['author']
    bks = [b.serialize() for b in db.view()]
    for b in bks:
        if b['title'] == title:
            return jsonify({
                'Error! Book with title {title} is already in library!'
            })

    bk = Book(db.getNewId(), True, title, price, author)
    print('new book: ', bk.serialize())
    db.insert(bk)
    new_bks = [b.serialize() for b in db.view()]
    print('books in lib: ', new_bks)
    
    return jsonify(bk.serialize())


@app.route('/request', methods=['GET'])
def getRequest():
    content_type = request.headers.get('Content-Type')
    bks = [b.serialize() for b in db.view()]
    if (content_type == 'application/json'):
        json = request.json
        for b in bks:
            if b['id'] == int(json['id']):
                return jsonify(b)
        return jsonify({f"Error! Book with id '{json['id']}' not found!"})
    else:
        return jsonify(bks)


@app.route('/request/<id>', methods=['GET'])
def getRequestId(id):
    req_args = request.view_args
    # print('req_args: ', req_args)
    bks = [b.serialize() for b in db.view()]
    if req_args:
        for b in bks:
            if b['id'] == int(req_args['id']):
                return jsonify(b)
        return jsonify({
            f"Error! Book with id '{req_args['id']}' was not found!"})
    else:
        return jsonify(bks)

@app.route("/request", methods=['PUT'])
def putRequest():
    req_data = request.get_json()
    availability = req_data['available']
    title = req_data['title']
    the_id = req_data['id']
    price = req_data['price']
    author = req_data['author']
    bks = [b.serialize() for b in db.view()]
    for b in bks:
        if b['id'] == the_id:
            bk = Book(
                the_id, 
                availability, 
                title, 
                price,
                author
            )
            print('new book: ', bk.serialize())
            db.update(bk)
            new_bks = [b.serialize() for b in db.view()]
            print('books in lib: ', new_bks)
            return jsonify(bk.serialize())        
    return jsonify({f'Error! Failed to update Book with title: {title}!'})
    
    
@app.route('/request/<id>', methods=['DELETE'])
def deleteRequest(id):
    req_args = request.view_args
    print('req_args: ', req_args)
    bks = [b.serialize() for b in db.view()]
    if req_args:
        for b in bks:
            if b['id'] == int(req_args['id']):
                db.delete(b['id'])
                updated_bks = [b.serialize() for b in db.view()]
                print('updated_bks: ', updated_bks)
                return jsonify([updated_bks])
    else:
        return jsonify({f"Error! No Book ID sent!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)