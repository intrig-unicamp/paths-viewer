import argparse
import csv
from datetime import datetime
from time import sleep
import sys
import requests

MAX_OBJECTS = 3

sys.path.append('.')
parser = argparse.ArgumentParser()
parser.add_argument("--city", "-c", help="Select which city dataset to use. \
    Current options are BELO_HORIZONTE, RIO_DE_JANEIRO, ROME and SAN_FRANCISCO.")
parser.add_argument("--objects-quantity", "-o", help="Select how many objects to use, up to 3.")
parser.add_argument("--session-id", "-s", help="Specifies session id.")
parser.add_argument("--simulation-velocity", "-v", help="Specifies simulation velocity.")
args = parser.parse_args()
print(args)

city = args.city \
    if args.city is not None and args.city in ['BELO_HORIZONTE', 'RIO_DE_JANEIRO', 'ROME','SAN_FRANCISCO'] \
    else 'RIO_DE_JANEIRO'
objects_quantity = int(args.objects_quantity) \
    if args.objects_quantity is not None \
        and args.objects_quantity.isnumeric() \
        and int(args.objects_quantity) <= MAX_OBJECTS \
    else 1
simulation_velocity = int(args.simulation_velocity) \
    if args.simulation_velocity is not None \
        and args.simulation_velocity.isnumeric() \
        and int(args.simulation_velocity) <= MAX_OBJECTS \
    else 120
session_id = args.session_id

if session_id is None:
    raise Exception('Session id not specified.')

def get_payload_from_row(row: list) -> dict:
    id, date, time, latitude, longitude = row
    payload = {
        'id': id,
        'date': date,
        'time': time,
        'latitude': latitude,
        'longitude': longitude,
    }
    return payload


def send_request(payload: dict):
    URL = 'http://localhost:3000/api/session'
    print(payload)
    response = requests.post(f'{URL}/{session_id}', json=payload)
    return response.json()


def get_milliseconds_from_datetime(date: str , time: str) -> int:
    data = f"{date}T{time}"
    format_data = "%d-%m-%YT%H:%M:%S"
    current = datetime.strptime(data, format_data)
    return current


def main():
    coordinates_list = []

    for object_index in range(1, objects_quantity+1):
        path = f'{city.lower()}/object_{object_index}.csv'

        with open(path, 'r', encoding='utf-8') as csv_file:
            data = csv.reader(csv_file)

            for row in data:
                coordinates_list.append(
                    get_payload_from_row(row)
                )

    coordinates_list.sort(key=lambda data: (data['date'], data['time']))

    first_record = coordinates_list[0]
    current_ms = get_milliseconds_from_datetime(first_record['date'], first_record['time'])

    for payload in coordinates_list:
        next_ms = get_milliseconds_from_datetime(payload['date'], payload['time'])
        delta = next_ms - current_ms

        sleep((1.0/simulation_velocity) * (delta.total_seconds()))

        print(send_request(payload))
        current_ms = next_ms

if __name__ == '__main__':
    main()
