import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pprint import pprint
scope = ['https://www.googleapis.com/auth/spreadsheets']
credentials = ServiceAccountCredentials.from_json_keyfile_name('keys.json', scope)
client = gspread.authorize(credentials)
# Open the spreadsheet by its ID
spreadsheet_id = '1Vlm9rD2NoO0LO1UczYjTU5bPSd214LrwcpDtmjm5IDI'
spreadsheet = client.open_by_key(spreadsheet_id)
# Select a specific worksheet within the spreadsheet
worksheet_name = 'halloffame'
worksheet = spreadsheet.worksheet(worksheet_name)


# Получаем все значения в колонке C, D и E, начиная с ячеек C2
data_range_cde = worksheet.range('C2:E')
data_user = []
data_book = []
data_author = []

for cell_c, cell_d, cell_e in zip(data_range_cde[::3], data_range_cde[1::3], data_range_cde[2::3]):
    user = cell_c.value
    book = cell_d.value
    author = cell_e.value

    if user != '':
        data_user.append(user)
        data_book.append(book)
        data_author.append(author)

# Создаем уникальные идентификаторы и считаем количество появлений каждого пользователя
unique_users = list(set(data_user))
user_counts = {}

for i, user in enumerate(unique_users, start=1):
    user_counts[user] = i

# Создаем словарь для каждого пользователя с объединенными книгами и авторами в виде списков
users_data = []
for user in unique_users:
    count = user_counts[user]
    user_books = []
    user_authors = []

    for i in range(len(data_user)):
        if data_user[i] == user:
            if data_book[i] not in user_books:
                user_books.append(data_book[i])
            if data_author[i] not in user_authors:
                user_authors.append(data_author[i])

    user_data = {
        'Пользователь': user,
        'Идентификатор': count,
        'Появления': data_user.count(user),
        'Книги_Авторы': [{'Книга': book, 'Автор': author} for book, author in zip(user_books, user_authors)]
    }
    users_data.append(user_data)

# Выводим результаты (список словарей)
pprint(users_data)