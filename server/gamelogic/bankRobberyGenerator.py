import sys
import json

def generate_for_prompt(prompt):
    prompt = prompt.lower()

    if "bank robbery" in prompt:
        return {
            "player": {"position": [0, 0]},
            "npcs": [
                {"type": "police", "path": [[10, 5], [15, 5]]},
                {"type": "guard", "path": [[5, 15], [5, 20]]}
            ],
            "environment": {
                "objects": [
                    {"type": "bank", "position": [12, 12]},
                    {"type": "car", "position": [8, 8]}
                ]
            }
        }

    elif "prison break" in prompt:
        return {
            "player": {"position": [2, 2]},
            "npcs": [
                {"type": "guard", "path": [[10, 10], [15, 10]]},
                {"type": "guard", "path": [[5, 5], [5, 10]]}
            ],
            "environment": {
                "objects": [
                    {"type": "prison", "position": [14, 14]},
                    {"type": "car", "position": [6, 6]}
                ]
            }
        }

    else:
        return {
            "player": {"position": [0, 0]},
            "npcs": [],
            "environment": {
                "objects": [
                    {"type": "car", "position": [4, 4]}
                ]
            }
        }

if __name__ == "__main__":
    prompt = " ".join(sys.argv[1:])
    data = generate_for_prompt(prompt)
    print(json.dumps(data))
