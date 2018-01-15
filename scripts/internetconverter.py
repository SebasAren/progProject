import csv
import json
import codecs

if __name__ == '__main__':
    csv_file = '../app/data/inclusive-internet-index-data-2.csv'
    json_file = '../app/data/inclusive-internet-index-data.json'

    with codecs.open(csv_file, 'r', encoding='utf-8', errors='ignore') as f:
        csvreader = csv.DictReader(f)
        json = []
        for row in csvreader:
            print(row)
            json.append(row)
        # print(json)
        json.dump(json, json_file)
