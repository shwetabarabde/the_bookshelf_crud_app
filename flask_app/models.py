class Book:
  def __init__(self, id, available, title, price, author):
    self.id = id
    self.title = title
    self.available = available
    self.price = price
    self.author = author

  def __repr__(self):
    return '<id {}>'.format(self.id)

  def serialize(self):
    return {
      'id': self.id,
      'title': self.title,
      'available': self.available,
      'price': self.price,
      'author': self.author
    }