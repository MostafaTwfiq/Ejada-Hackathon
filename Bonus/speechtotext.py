from openai import OpenAI
import speech_recognition as sr

tools = [
    {
    "type": "function",
    "function": {
        "name": "get_system_user_prompts",
        "description": "Get system and user prompts",
        "parameters": {
            "type": "object",
            "properties": {
                "system": {
                    "type": "string",
                    "descriptio n": "System prompt to display",
                },
                "user": {
                    "type": "string",
                    "description": "User prompt to display",
                }
            },
            "required": ["user"]
        }
    }
}
]

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key="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",
)

def create_chat_messages(messages, system):
    context = [{"role": "system", "content": system}]
    for message in messages:
        context.append(message)

    return context

def get_chat_gpt3_response(messages, system= 'You are a very helpful assistant', tools=[]):
    chat_messages = create_chat_messages(messages, system)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=chat_messages
    )

    return response.choices[0].message.content.strip()

def get_voice_input():
    r = sr.Recognizer()
    r.dynamic_energy_threshold = False
    r.energy_threshold = 400
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source, timeout= 5)
        try:
            text = r.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
            print("Could not request results from Google Speech Recognition service; {0}".format(e))

messages = []
while True:
    print("Please speak your prompt (or say 'stop' to exit): ")
    prompt_from_voice_input = get_voice_input()
    if prompt_from_voice_input.lower() == 'stop':
        break

    messages.append({"role": "user", "content": prompt_from_voice_input})
    response = get_chat_gpt3_response(messages)
    messages.append({"role": "assistant", "content": response})
    print('USER: ' + prompt_from_voice_input)
    print('ASSISTANT: ' + response)