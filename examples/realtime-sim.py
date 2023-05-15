#!/usr/bin/env python3

import argparse
import csv
from datetime import datetime
from time import sleep
import sys
import requests

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

def get_payload_from_rowSP(row: list) -> dict:
    #print(row)
    #id, date, time, latitude, longitude = row
    Timestamp, Longitude, Latitude, _Speed, _Operatorname, _Operator, _CGI, _Cellname, _Node, _CellID, _LAC, NetworkTech, _NetworkMode, *_ = row
    #id = NetworkTech
    id = 'celular 1 - SM-G991B'
    latitude = Latitude
    longitude = Longitude
    payload = {
        'id': id,
        'timestamp': Timestamp,
        'latitude': latitude,
        'longitude': longitude,
    }
    return payload


def send_request(endpoint, payload: dict):
    print(payload)
    response = requests.post(endpoint, json=payload)
    return response.json()


def get_milliseconds_from_datetime(date: str , time: str) -> int:
    data = f'{date}T{time}'
    format_data = '%d-%m-%YT%H:%M:%S'
    current = datetime.strptime(data, format_data)
    return current

def get_milliseconds_from_datetimeSP(timestamp: str) -> int:
    print(timestamp)
    format_data = '%Y.%m.%d_%H.%M.%S'
    current = datetime.strptime(timestamp, format_data)
    return current

def mainSP(city, objects_quantity, simulation_speed, endpoint):
    coordinates_list = []

    for object_index in range(1, objects_quantity+1):
        path = f'{city.lower()}/object_{object_index}.csv'

        with open(path, 'r', encoding='utf-8') as csv_file:
            data = csv.reader(csv_file, dialect='excel-tab')

            for row in data:
                coordinates_list.append(
                    get_payload_from_rowSP(row)
                )

    coordinates_list = coordinates_list[1:]
    #coordinates_list.sort(key=lambda data: (data['date'], data['time']))

    first_record = coordinates_list[0]
    current_ms = get_milliseconds_from_datetimeSP(first_record['timestamp'])

    for payload in coordinates_list:
        next_ms = get_milliseconds_from_datetimeSP(payload['timestamp'])
        delta = next_ms - current_ms
        date = next_ms.strftime('%Y-%m-%d')
        time = next_ms.strftime('%H:%M:%S')

        del payload['timestamp']
        response = send_request(endpoint, { **payload, 'date': date, 'time': time })
        print(response)

        sleep((1.0/simulation_speed) * (delta.total_seconds()))
        current_ms = next_ms

def main(city, objects_quantity, simulation_speed, endpoint):
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

        response = send_request(endpoint, payload)
        print(response)

        sleep((1.0/simulation_speed) * (delta.total_seconds()))
        current_ms = next_ms

if __name__ == '__main__':
    MAX_OBJECTS = 3
    city_choices = ['BELO_HORIZONTE', 'RIO_DE_JANEIRO', 'ROME', 'SAN_FRANCISCO', 'SAO_PAULO']

    parser = argparse.ArgumentParser()
    parser.add_argument('--city', '-c', choices=city_choices, default='RIO_DE_JANEIRO', help='Which city dataset to use')
    parser.add_argument('--objects-quantity', '-q', type=int, choices=range(1, MAX_OBJECTS + 1), default=1, help='Amount of objects to use')
    parser.add_argument('--endpoint', '-e', required=True, help='Endpoint to send the requests')
    parser.add_argument('--simulation-speed', '-s', type=int, default=120, help='Simulation speed')
    args = parser.parse_args()

    if args.city == 'SAO_PAULO':
        mainSP(args.city, args.objects_quantity, args.simulation_speed, args.endpoint)
    else:
        main(args.city, args.objects_quantity, args.simulation_speed, args.endpoint)
