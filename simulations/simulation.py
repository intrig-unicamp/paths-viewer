import csv
from datetime import datetime
from time import sleep
import requests
import sys

sys.path.append('.')

SPEED = 120
SESSION_ID = 1654778188926
CSV_FILES = ['vehicle1.csv','vehicle2.csv']

def get_payload_from_row(row: list) -> dict:
    date, time, id, line, longitude, latitude, speed = row
    payload = {
        'date': date,
        'time': time,
        'id': id,
        'line': line,
        'longitude': longitude,
        'latitude': latitude,
        'speed': speed
    }
    return payload


def send_request(payload: dict):
    URL = 'http://localhost:3000/api/session'
    print(payload)
    response = requests.post(f'{URL}/{SESSION_ID}', json=payload)
    return response.json()


def get_milliseconds_from_datetime(date: str , time: str) -> int:
    data = f"{date}T{time}"
    format_data = "%d-%m-%YT%H:%M:%S"
    current = datetime.strptime(data, format_data)
    return current


def main():
    coordinates_list = []

    for file in CSV_FILES:
        with open(file, 'r', encoding='utf-8') as csv_file:
            data = csv.reader(csv_file)

            for row in data:
                coordinates_list.append(
                    get_payload_from_row(row)
                )

    coordinates_list.sort(key=lambda data: (data['date'], data['time']))

    first_record = coordinates_list[0]
    current = get_milliseconds_from_datetime(first_record['date'], first_record['time'])

    for payload in coordinates_list:
        next = get_milliseconds_from_datetime(payload['date'], payload['time'])
        delta = next - current

        sleep((1.0/SPEED) * (delta.total_seconds()))

        print(send_request(payload))
        current = next

if __name__ == '__main__':
    main()
