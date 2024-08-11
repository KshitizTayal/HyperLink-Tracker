import sys
import json
import sqlite3
import struct

def send_message(message):
    encoded_message = json.dumps(message).encode('utf-8')
    sys.stdout.buffer.write(struct.pack('I', len(encoded_message)))
    sys.stdout.buffer.write(encoded_message)
    sys.stdout.buffer.flush()

def read_message():
    raw_length = sys.stdin.buffer.read(4)
    if len(raw_length) == 0:
        return None
    message_length = struct.unpack('I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)

def log_hyperlinks(data):
    conn = sqlite3.connect('hyperlinks.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS hyperlinks
                      (id INTEGER PRIMARY KEY, url TEXT, hyperlink TEXT, count INTEGER)''')

    for link in data['hyperlinks']:
        cursor.execute('''INSERT INTO hyperlinks (url, hyperlink, count)
                          VALUES (?, ?, 1)
                          ON CONFLICT(url, hyperlink) DO UPDATE SET count = count + 1''',
                       (data['url'], link))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    while True:
        message = read_message()
        if message is None:
            break
        log_hyperlinks(message)
        send_message({'status': 'success'})
