import configparser
import json
import openai

from telethon.tl.types import PeerChat
from telethon.sync import TelegramClient
from telethon import events

config = configparser.ConfigParser()
config.read("config.ini")

api_id   = config['Telegram']['api_id']
api_hash = config['Telegram']['api_hash']
username = config['Telegram']['username']

chat_id = int(config['Telegram']['chat_id'])

openai.api_key = config['Telegram']['api_key']

client = TelegramClient('tg_parser', api_id=api_id, api_hash=api_hash, system_version="4.16.30-vxCUSTOM")


@client.on(events.NewMessage(chats = [chat_id]))
async def handler(event):
    print("Event Occured")
    print(event.raw_text)
    
    get_messages = await client.get_messages(chat, limit=10)
    answ = ""
    
    for message in get_messages:
        answ += '   -' + message.message + '\n'
    
    prompt = f"""
             Extract information fom the imput text in the following format. Make it json. For each settlement, give a score from 0 to 10, where 0 is a completely free road, no cars, 5 is few cars, about 10 minutes of waiting, 10 is a completely busy road, wait more than 30 minutes.\n
             If there is no data required in message or you are not sure then leave \"no information\": \n\n\n
             \"Uspenka\": \"\", тут опиши загруженность для Успенки\n
             \"Shramko\": \"\", тут опиши загруженность для Шрамко\n
             \"Marinovka\": \"\", тут опиши загруженность для Мариновки\n\n
             \"Novoazovsk\": \"\", тут опиши загруженность для Новоазовск\n
             Input: {answ}\n
             """

    answ = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
          {"role": "user", "content": prompt}
      ]
    );

    print(answ) 
    print(answ.choices[0].message)

client.start()
chat = client.get_entity(PeerChat(chat_id))
client.run_until_disconnected()