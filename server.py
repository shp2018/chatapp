from flask import Flask, escape, request, render_template
import sqlite3
import json

conn = sqlite3.connect('chat-app.db')
c = conn.cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    message text, 
    username text)''')
conn.commit()
conn.close()

app = Flask(__name__, static_url_path='')

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/all-messages', methods=["GET","POST"])
def all_messages():
    conn = sqlite3.connect('chat-app.db')
    c = conn.cursor()
    selected = c.execute("select * from messages").fetchall()
    conn.close()
    return json.dumps(selected)

@app.route('/message', methods = ["POST"])
def message():
     conn = sqlite3.connect('chat-app.db')
     c = conn.cursor()
     print(request.form)
     username = request.form["username"]
     message = request.form["message"]
     c.execute("INSERT INTO messages(message, username) VALUES(?,?)", (username, message))
     conn.commit()
     





if __name__ == '__main__':
    app.run()

# conn = sqlite3.connect('chat-app.db')
# c = conn.cursor()
# c.execute("INSERT INTO messages(message, username) VALUES('Kevin', 'Hi my name is Kevin')")
# c.execute("INSERT INTO messages(message, username) VALUES('Ben', 'Nobody asked')")
# c.execute("INSERT INTO messages(message, username) VALUES('Kevin', 'Fuck you')")
# conn.commit()
# conn.close()

conn = sqlite3.connect('chat-app.db')
c = conn.cursor()
selected = c.execute("select * from messages").fetchall()
print(selected)
