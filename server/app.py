from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/generate_game', methods=['POST'])
def generate_game():
    data = request.json
    prompt = data.get('prompt', '').strip()

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    game_data = generate_game_data(prompt)
    return jsonify(game_data)

def generate_game_data(prompt):
    prompt = prompt.lower()

    # Environment setup
    if 'jungle' in prompt:
        environment = 'jungle'
        objects = ['tree', 'rock', 'waterfall']
    elif 'bank' in prompt:
        environment = 'bank'
        objects = ['vault door', 'cash desk', 'security camera']
    elif 'space' in prompt:
        environment = 'space station'
        objects = ['control panel', 'laser gate', 'escape pod']
    elif 'desert' in prompt:
        environment = 'desert base'
        objects = ['sandbag', 'bunker', 'watch tower']
    else:
        environment = 'urban city'
        objects = ['car', 'building', 'street light']

    # Player setup
    if 'thief' in prompt or 'robbery' in prompt:
        player_name = 'Thief'
        player_actions = ['run', 'hide', 'steal']
    elif 'agent' in prompt or 'spy' in prompt:
        player_name = 'Agent'
        player_actions = ['sneak', 'hack', 'attack']
    else:
        player_name = 'Explorer'
        player_actions = ['move', 'scan', 'defend']

    # NPCs setup
    npcs = []
    if 'police' in prompt or 'security' in prompt:
        for _ in range(random.randint(2, 4)):
            npcs.append({
                'type': 'police',
                'position': [random.randint(1, 9), random.randint(1, 9)],
                'behavior': 'patrol'
            })
    elif 'drones' in prompt:
        for _ in range(random.randint(2, 3)):
            npcs.append({
                'type': 'drone',
                'position': [random.randint(1, 9), random.randint(1, 9)],
                'behavior': 'fly'
            })
    else:
        for _ in range(random.randint(1, 3)):
            npcs.append({
                'type': 'enemy',
                'position': [random.randint(1, 9), random.randint(1, 9)],
                'behavior': random.choice(['guard', 'idle', 'roam'])
            })

    # Game mechanics
    gameplay_mechanics = ['movement', 'AI interaction']
    if 'shoot' in prompt or 'attack' in prompt:
        gameplay_mechanics.append('combat')
    if 'stealth' in prompt or 'sneak' in prompt:
        gameplay_mechanics.append('stealth mechanics')

    # Return game data for frontend
    return {
        'game_type': '3D Mission',
        'player': {
            'name': player_name,
            'position': [0, 0],
            'actions': player_actions
        },
        'npcs': npcs,
        'environment': {
            'type': environment,
            'objects': objects  # frontend renders these as blue cubes
        },
        'gameplay_mechanics': gameplay_mechanics
    }

if __name__ == '__main__':
    app.run(debug=True)
