# import sys, os
# import jinja2
# import csv

# in_file="csv_file.csv"
# jinja_template = "test.j2"
# env = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath="."))

# with open(in_file, "rb") as FD:
#     reader = csv.DictReader(FD)
#     for vals in reader:
#         gen_template = env.get_template(jinja_template)
#         output = gen_template.render(vals)
#         print output


from io import StringIO
from jinja2 import Template
from itertools import groupby
from operator import itemgetter
from csv import DictReader

csv_data = '''country,city
UK,London
UK,Manchester
UK,Liverpool
US,Chicago
US,Denver
US,Atlanta
'''

tmpl = 'country: {{country}} has cities {{cities}}'
template = Template(tmpl)

with StringIO(csv_data) as file:
    rows = DictReader(file)
    for country, groups in groupby(rows, key=itemgetter('country')):
        cities = ', '.join(row['city'] for row in groups)
        output = template.render(country=country, cities=cities)
        print(output)


### Prefer to join inside jinja
# tmpl = 'country: {{country}} has cities {{cities | join(", ")}}'
# template = Template(tmpl)

# with StringIO(csv_data) as file:
#     rows = DictReader(file)
#     for country, groups in groupby(rows, key=itemgetter('country')):
#         cities = (row['city'] for row in groups)
#         output = template.render(country=country, cities=cities)