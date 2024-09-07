const fs = require('fs');
const OpenAI = require('openai');

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
});

const fineTune = async () => {
const response = await openai.files.create({ file: fs.createReadStream('D:/musefinder/scripts/converted_prompts.jsonl'), purpose: 'fine-tune' });
const fineTune = await openai.fineTuning.jobs.create({ training_file: response["id"], model: 'gpt-3.5-turbo'});
console.log(`Fine-tuning started: ${fineTune["id"]}`)

}

fineTune()