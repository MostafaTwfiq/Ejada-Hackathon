from openai import OpenAI
import speech_recognition as sr
import tkinter as tk

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key="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",
)

def create_chat_messages(messages, system):
    context = [{"role": "system", "content": system}]
    for message in messages:
        context.append(message)

    return context

def get_chat_gpt3_response(messages, system='You are a very helpful assistant'):
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
        audio = r.listen(source, timeout=5)
        try:
            text = r.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
            print("Could not request results from Google Speech Recognition service; {0}".format(e))

def on_record_start():
    global messages
    user_input = get_voice_input()
    if user_input:
        messages.append({"role": "user", "content": user_input})
        response = get_chat_gpt3_response(messages, system_input.get("1.0", tk.END).strip())
        messages.append({"role": "assistant", "content": response})
        chat_log.insert(tk.END, 'USER: ' + user_input + '\n', 'user')
        chat_log.insert(tk.END, 'ASSISTANT: ' + response + '\n', 'assistant')
        chat_log.insert(tk.END, '----------------------------------------\n', 'separator')
        chat_log.see(tk.END)

def on_manual_input():
    global messages
    user_input_text = user_input.get("1.0", tk.END).strip()
    messages.append({"role": "user", "content": user_input_text})
    response = get_chat_gpt3_response(messages, system_input.get("1.0", tk.END).strip())
    messages.append({"role": "assistant", "content": response})
    chat_log.insert(tk.END, 'USER: ' + user_input_text + '\n', 'user')
    chat_log.insert(tk.END, 'ASSISTANT: ' + response + '\n', 'assistant')
    chat_log.insert(tk.END, '----------------------------------------\n', 'separator')
    chat_log.see(tk.END)

root = tk.Tk()
root.title("Chat Assistant")

root.option_add('*background', 'white')
root.option_add('*foreground', 'black')
root.option_add('*font', ('Arial', 10))

system_input = tk.Text(root, height=4, width=50, background='#f0f0f0')
system_input.pack()
system_input.insert('1.0', 'Enter system input here...')

user_input = tk.Text(root, height=4, width=50, background='#f0f0f0')
user_input.pack()
user_input.insert('1.0', 'Enter user input here...')

chat_log = tk.Text(root, height=20, width=50, background='white', foreground='black', font=('Arial', 10))
chat_log.tag_configure('user', background='#FFD700', foreground='black', font=('Arial', 10))
chat_log.tag_configure('assistant', background='#87CEEB', foreground='black', font=('Arial', 10))
chat_log.tag_configure('separator', background='black', foreground='white', font=('Arial', 10))
chat_log.pack()

button_frame = tk.Frame(root)
button_frame.pack()

manual_input_button = tk.Button(button_frame, text="Submit", width=20, height=2, command=on_manual_input, bg='#001081', fg='white')
manual_input_button.pack(side=tk.LEFT)

record_button = tk.Button(button_frame, text="Start Recording", width=20, height=2, bg="#1dec93", fg='black', command=on_record_start)
record_button.pack(side=tk.LEFT)

messages = []
root.mainloop()