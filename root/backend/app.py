from hangman import Hangman
import pusher
import json

from flask import Flask, render_template, request, jsonify, redirect, json

app = Flask(__name__)


testPlayer = None


pusher_client = pusher.Pusher(
    app_id='1121006',
    key='63a449ee585251585a11',
    secret='a2a172a4715629909373',
    cluster='eu',
    ssl=True
)

username = ''


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/play/state', methods=['POST'])
def getGameState():
    print('lefutottam')
    return jsonify({
        'lives': testPlayer.getLives(),
        'currentState': testPlayer.getCurrentWord()
    })


@app.route('/play/guess', methods=['POST'])
def guess():
    testPlayer.play(request.json.get('guess'))
    print('guessed char:', request.json.get('guess'))
    pusher_client.trigger('presence-global-channel',
                          'my-event', {
                              'currentState': testPlayer.getCurrentWord()
                          })
    return jsonify({
        'lives': testPlayer.getLives(),
        'currentState': testPlayer.getCurrentWord()
    })


@app.route('/play/restart', methods=['POST'])
def restart():
    global testPlayer
    testPlayer = Hangman(14, 'nodles')
    pusher_client.trigger('presence-global-channel',
                          'my-event', {
                              'currentState': testPlayer.getCurrentWord()
                          })
    return jsonify({
        'lives': testPlayer.getLives(),
        'currentState': testPlayer.getCurrentWord()
    })


@app.route('/login', methods=['POST'])
def login():
    try:
        global username
        username = request.json.get('username')
        global testPlayer
        if testPlayer is None:
            testPlayer = Hangman(14, 'nodles')
        return jsonify({'result': 'success'})
    except Exception as e:
        print(e)
        return jsonify({'result': 'failure'})


@app.route('/play', methods=['POST', 'GET'])
def play():

    return render_template('play.html', username=username, player=testPlayer)


@app.route("/pusher/auth", methods=['POST'])
def pusher_authentication():
    print('new user: ', username)
    auth = pusher_client.authenticate(
        channel=request.form['channel_name'],
        socket_id=request.form['socket_id'],
        custom_data={
            u'user_id': request.form['socket_id'],
            u'user_info': {
                u'user_name': username,
            }
        }
    )
    return json.dumps(auth)


@app.route('/lobby', methods=['POST'])
def lobby():
    return render_template('lobby.html')


# if __name__ == '__main__':
#     app.debug = True
#     app.run()


username = ''
