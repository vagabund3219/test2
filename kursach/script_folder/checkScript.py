import json
import requests

import requests



def send_check(file):
    url = 'https://proverkacheka.com/api/v1/check/get'
    data = {'token': '17072.ReLJYknAYHiPk5ohg'}
    files = {'qrfile': file}
    response = requests.post(url, data=data, files=files)#send request to API
    # response = requests.post('url', data=data, files=files)#send request to API
    parsed_data = response.json()
    list_of_items = []
    if (response.status_code == 200):
        try:
            for k in parsed_data["data"]['json']['items']:
                if not isinstance(k['quantity'], int):
                    list_of_items.append({'item': k['name'], 'price': float('{:.2f}'.format(k['price']/100*k['quantity'])), 'count': k['quantity']})
                else:
                    list_of_items.append({'item': k['name'], 'price': k['price']/100, 'count': k['quantity']})
            return list_of_items
        except:
            pass
    else:
        print('Error')


def update_bill(query, form, user):
    bill = query.objects.get_or_create(user_id=user)
    if int(form.data['type']) == 3:
        bill[0].sum += int(form.data['price'])
    else:
        bill[0].sum -= int(form.data['price'])
    bill[0].save()

def sort_by_date(*args):
    lst = []
    for dic in args:
        for item in dic:
            lst.append(item)
    lst.sort(key=lambda o: o.date, reverse=True)
    return lst

