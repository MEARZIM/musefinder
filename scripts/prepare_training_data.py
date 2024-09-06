import json

# Load the museum data
with open('D:/chatbot/scripts/museums.json') as f:
    museums = json.load(f)

# Create a list of prompts and responses in JSONL format
with open('museums_prompts_responses.jsonl', 'w') as f:
    for museum in museums:
        prompt = f"Tell me about the {museum['name']}."
        response = (
            f"{museum['name']} is a museum located in {museum['location']}. "
            f"It is known for {museum['description']} The ticket price is ${museum['ticketPrice']} "
            f"and it has a rating of {museum['rating']}. Here is an image: {museum['img']}"
        )
        json.dump({'prompt': prompt, 'completion': response}, f)
        f.write('\n')
