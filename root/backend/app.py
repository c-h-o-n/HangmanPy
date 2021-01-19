from hangman import Hangman
import pusher
import json

from flask import Flask, render_template, request, jsonify, redirect, json

app = Flask(__name__)

gameInstances = {}


username = ''


pusher_client = pusher.Pusher(
    app_id='1121006',
    key='63a449ee585251585a11',
    secret='a2a172a4715629909373',
    cluster='eu',
    ssl=True
)


@app.route('/create-game-<gameId>', methods=['POST'])
def createGame(gameId):
    gameInstances[gameId] = Hangman(12, 'noodles')
    return ''


@app.route('/game-<gameId>/state')
def getGameState(gameId):
    print(gameInstances)
    return jsonify({
        'lives': gameInstances[gameId].getLives(),
        'currentState': gameInstances[gameId].getCurrentWord()
    })


@ app.route('/rooms')
def getRooms():
    global gameInstances
    if gameInstances == {}:
        gameIds = list(pusher_client.channels_info(
            u"presence-", [u'user_count'])['channels'].keys())
        for gameId in gameIds:
            gameId = gameId[gameId.index('-')+1:]
            gameInstances[gameId] = Hangman(1, 'noodles')
        print(gameInstances)
    return pusher_client.channels_info(u"presence-", [u'user_count'])['channels']


@ app.route('/game-<gameId>/guess', methods=['POST'])
def guess(gameId):
    guessedChar = request.get_json('guess')['guess']
    gameInstances[gameId].play(guessedChar)
    print('guessed char:', guessedChar)

    pusher_client.trigger(
        f'presence-{gameId}', 'update-event', {'message': 'Someone guessed'})
    return jsonify({
        'lives': gameInstances[gameId].getLives(),
        'currentState': gameInstances[gameId].getCurrentWord()
    })


@ app.route('/game-<gameId>/restart')
def restart(gameId):
    testPlayer = Hangman(14, 'nodles')
    pusher_client.trigger('presence-global-channel',
                          'my-event', {
                              'currentState': testPlayer.getCurrentWord()
                          })
    return jsonify({
        'lives': testPlayer.getLives(),
        'currentState': testPlayer.getCurrentWord()
    })


@ app.route('/login', methods=['POST'])
def login():
    try:
        global username
        username = request.get_json('username')['username']
        return jsonify({'result': 'success'})
    except Exception as e:
        print(e)
        return jsonify({'result': 'failure'})


@ app.route("/pusher/auth", methods=['POST'])
def pusher_authentication():
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


if __name__ == '__main__':
    app.debug = True
    app.run()


username = ''
