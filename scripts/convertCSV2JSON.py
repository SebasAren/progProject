# https://github.com/igormilovanovic/python-data-viz-cookbook/blob/master/3367OS_Code/3367OS_06_Code/ch06/pirates_temperature.csv
# Sebastiaan Arendsen
# 6060072
#
# Converts CSV2JSON

# imports
import csv
import json
import codecs
import pycountry

# constants
INPUT = 'hpi.csv'
OUTPUT = 'hpi.json'

# function to read csv file
def csv_reader(f):

    # init empty list for csv data
    data = []
    with codecs.open(f, 'r', encoding='utf-8', errors='ignore') as infile:

        # use DictReader to create dicts
        reader = csv.reader(infile)
        next(reader)
        for row in reader:
            try:
                country = pycountry.countries.lookup(row[0]).alpha_3
            except LookupError:
                country = 'Fill'
            data_entry = {'ISO': country,
                'country': row[0],
                'life expectancy': float(row[1].replace(',', '.')),
                'wellbeing': float(row[2].replace(',', '.')),
                'inequality': float(row[3].replace(',', '.')),
                'ecological footprint': float(row[4].replace(',', '.')),
                'hpi':float(row[5].replace(',', '.'))}
            data.append(data_entry)
    return data

def json_writer(f, data):
    with open(f, 'w') as outfile:
        json.dump(data, outfile)

if __name__ == '__main__':

    # read the csv and produce the JSON
    json_writer(OUTPUT, csv_reader(INPUT))
