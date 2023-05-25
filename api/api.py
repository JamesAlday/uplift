import os
import time
from flask import Flask, json, request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/providers', methods=['POST', 'GET'])
def get_providers():
	filename = 'providers.json'
	with open(filename) as providers:
		data = json.load(providers)

	if request.method == 'POST':
		body = request.json
		# {active: {values: ["true"], filterType: "set"}}
		for field, filters in body['filterModel'].items():
			if field == 'active':
				filters['values'] = [x == 'true' for x in filters['values']]
			if filters['filterType'] == 'set':
				data = [row for row in data if row[field] in filters['values']]
			elif filters['filterType'] == 'text':
				if filters['type'] == 'contains':
					data = [row for row in data if filters['filter'] in row[field]]
				elif filters['type'] == 'notContains':
					data = [row for row in data if filters['filter'] not in row[field]]
		for sortModel in body['sortModel']:
			reverse = sortModel['sort'] == 'desc'
			sorted_data = sorted(data, key=lambda row:row[sortModel['colId']], reverse=reverse)
			return sorted_data

	return data