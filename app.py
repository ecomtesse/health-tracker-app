from flask import (
	Flask,
	redirect,
	jsonify,
	session,
	request,
	g
	)

from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
import os

from .db import get_db, close_db

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

@app.before_request
def connect_to_db():
	get_db()

@app.after_request
def disconnect_from_db(response):
	close_db()
	return response

# Home/Index Route
@app.route('/home')
def home():
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	weight_query = """
		SELECT weight.weight, weight.date FROM weight
		WHERE user_id = %s
		ORDER BY weight.date DESC LIMIT 1
	"""
	g.db['cursor'].execute(weight_query, (user['id'],))
	weight_current = g.db['cursor'].fetchone()
	height_query = """
		SELECT height.height, height.date FROM height
		WHERE user_id = %s
		ORDER BY height.date DESC LIMIT 1
	"""
	g.db['cursor'].execute(height_query, (user['id'],))
	height_current = g.db['cursor'].fetchone()
	hr_query = """
		SELECT heart_rate.heart_rate, heart_rate.date FROM heart_rate
		WHERE user_id = %s
		ORDER BY heart_rate.date DESC LIMIT 1
	"""
	g.db['cursor'].execute(hr_query, (user['id'],))
	hr_current = g.db['cursor'].fetchone()
	return jsonify([
		{"weight": weight_current},
		{"height": height_current},
		{"heart_rate": hr_current}
	])
	# return jsonify(weight=weight_current, height=height_current, hr=hr_current)

# Weight - Show
@app.route('/weight')
def show_weight():
	cur = g.db['cursor']
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	query = """
		SELECT weight, date, weight.id FROM weight
		JOIN users ON weight.user_id = users.id
		WHERE weight.user_id = %s
		ORDER BY weight.date
	"""
	cur.execute(query, (user['id'],))
	weight = cur.fetchall()
	return jsonify(weight=weight)

# Weight - Delete
@app.route('/weight/<weight_id>', methods=['DELETE'])
def delete_weight(weight_id):
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	query = """
		DELETE FROM weight
		WHERE id = %s
		RETURNING *
	"""
	cur = g.db['cursor']
	cur.execute(query, (weight_id,))
	g.db['connection'].commit()
	weight = cur.fetchone()
	return jsonify(weight)

#  Weight - New
@app.route('/weight/new', methods=['POST'])
def new_weight():
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	weight = request.json['weight']
	query = """
		INSERT INTO weight
		(weight, user_id)
		VALUES (%s, %s)
		RETURNING *
	"""
	g.db['cursor'].execute(query, (weight, user['id'],))
	g.db['connection'].commit()
	newWeight = g.db['cursor'].fetchone()
	return jsonify(newWeight)


# Heart Rate - Show
@app.route('/heart_rate')
def show_hr():
	cur = g.db['cursor']
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	query = """
		SELECT heart_rate.heart_rate, heart_rate.date, heart_rate.id FROM heart_rate
		JOIN users ON heart_rate.user_id = users.id
		WHERE heart_rate.user_id = %s
		ORDER BY heart_rate.date
	"""
	cur.execute(query, (user['id'],))
	heart_rate = cur.fetchall()
	return jsonify(heart_rate=heart_rate)

# Heart Rate - Delete
@app.route('/heart_rate/<heart_rate_id>', methods=['DELETE'])
def delete_hr(heart_rate_id):
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	query = """
		DELETE FROM heart_rate
		WHERE id = %s
		RETURNING *
	"""
	cur = g.db['cursor']
	cur.execute(query, (heart_rate_id,))
	g.db['connection'].commit()
	heart_rate = cur.fetchone()
	return jsonify(heart_rate)

#  Heart Rate - New
@app.route('/heart_rate/new', methods=['POST'])
def new_hr():
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	heart_rate = request.json['heart_rate']
	query = """
		INSERT INTO heart_rate
		(heart_rate, user_id)
		VALUES (%s, %s)
		RETURNING *
	"""
	g.db['cursor'].execute(query, (heart_rate, user['id'],))
	g.db['connection'].commit()
	newHR = g.db['cursor'].fetchone()
	return jsonify(newHR)

# Height - Show
@app.route('/height')
def show_height():
	cur = g.db['cursor']
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	query = """
		SELECT height, date, height.id FROM height
		JOIN users ON height.user_id = users.id
		WHERE height.user_id = %s
		ORDER BY height.date
	"""
	cur.execute(query, (user['id'],))
	height = cur.fetchall()
	return jsonify(height=height)

# Height Update
# @app.route('/height/<height_id>', methods=['PUT'])
# def update_height(height_id):
#     text = request.json['text']
#     query = """
#         UPDATE height
#         SET height.height = %s
#         WHERE height.id = %s
#         RETURNING *
#     """
#     cur = g.db['cursor']
#     cur.execute(query, (height, height_id))
#     g.db['connection'].commit()
#     updatedHeight = g.db['cursor'].fetchone()
#     return jsonify(updatedHeight)

# Height - Delete
# @app.route('/weight/<weight_id>', methods=['DELETE'])
# def delete_weight(weight_id):
# 	user = session.get('user', None)
# 	if user is None:
# 		return jsonify(msg='Must be logged in')
# 	query = """
# 		DELETE FROM weight
# 		WHERE id = %s
# 		RETURNING *
# 	"""
# 	cur = g.db['cursor']
# 	cur.execute(query, (weight_id,))
# 	g.db['connection'].commit()
# 	weight = cur.fetchone()
# 	return jsonify(weight)

#   Height - New
@app.route('/height/new', methods=['POST'])
def new_height():
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	height = request.json['height']
	query = """
		INSERT INTO height
		(height, user_id)
		VALUES (%s, %s)
		RETURNING *
	"""
	g.db['cursor'].execute(query, (height, user['id'],))
	g.db['connection'].commit()
	newHeight = g.db['cursor'].fetchone()
	return jsonify(newHeight)

# # Blood Pressure - Show
# @app.route('/weight')
# def show_weight():
# 	cur = g.db['cursor']
# 	user = session.get('user', None)
# 	if user is None:
# 		return jsonify(msg='Must be logged in')
# 	query = """
# 		SELECT weight, date, weight.id FROM weight
# 		JOIN users ON weight.user_id = users.id
# 		WHERE weight.user_id = %s
# 		ORDER BY weight.date
# 	"""
# 	cur.execute(query, (user['id'],))
# 	weight = cur.fetchall()
# 	return jsonify(weight=weight)

# # Blood Pressure - Delete
# @app.route('/weight/<weight_id>', methods=['DELETE'])
# def delete_weight(weight_id):
# 	user = session.get('user', None)
# 	if user is None:
# 		return jsonify(msg='Must be logged in')
# 	query = """
# 		DELETE FROM weight
# 		WHERE id = %s
# 		RETURNING *
# 	"""
# 	cur = g.db['cursor']
# 	cur.execute(query, (weight_id,))
# 	g.db['connection'].commit()
# 	weight = cur.fetchone()
# 	return jsonify(weight)

# #  Blood Pressure - New
# @app.route('/weight/new', methods=['POST'])
# def new_weight():
# 	user = session.get('user', None)
# 	if user is None:
# 		return jsonify(msg='Must be logged in')
# 	weight = request.json['weight']
# 	query = """
# 		INSERT INTO weight
# 		(weight, user_id)
# 		VALUES (%s, %s)
# 		RETURNING *
# 	"""
# 	g.db['cursor'].execute(query, (weight, user['id'],))
# 	g.db['connection'].commit()
# 	newWeight = g.db['cursor'].fetchone()
# 	return jsonify(newWeight)

# Register Route
@app.route('/register', methods=['POST'])
def register():
	username = request.json['username']
	password = request.json['password']
	password_hash = generate_password_hash(password)
	# print(username, password_hash)
	query = """
		INSERT INTO users
		(username, password_hash)
		VALUES (%s, %s)
		RETURNING *
	"""
	cur = g.db['cursor']
	try:
		cur.execute(query, (username, password_hash))
	except psycopg2.IntegrityError:
		return jsonify(success=False,msg='Username already exists')
	g.db['connection'].commit()
	user = cur.fetchone()
	# print(user)
	user.pop('password_hash')
	# import session at top to use
	session['user'] = user
	return jsonify(success=True, user=user)

# Login Route
@app.route('/login', methods=['POST'])
def login():
	username = request.json['username']
	password = request.json['password']
	query = """
		SELECT * FROM users
		WHERE username = %s
	"""
	cur = g.db['cursor']
	# trailing commas after username req'd bc its a tuple
	cur.execute(query, (username,))
	user = cur.fetchone()
	# conditional statement bc query will return None if the username doesn't exist
	if user is None:
		return jsonify(success=False, msg='Username or password is incorrect')
	# returns boolean
	password_matches = check_password_hash(user['password_hash'], password)
	# print(password_matches)
	if not password_matches:
		return jsonify(success=False, msg='Username or password is incorrect')
	# removes password_hash from users dictionary so it isn't sent back to the client
	user.pop('password_hash')
	# import session at top to use
	session['user'] = user
	return jsonify(success=True, user=user)	

# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
	# prints user dictionary that is set under session['user'] in register & login
	# print(session)
	# None as second arg prevents error if user is already logged out.
	session.pop('user', None)
	# if below empty, user is logged out
	return jsonify(success=True)

# Authenicated - check if user logged in
@app.route('/is-authenticated')
def is_authenticated():
	user = session.get('user', None)
	if user:
		return jsonify(success=True, user=user)
	else:
		return jsonify(success=False, msg='User is not logged in')	

# Update User Route
@app.route('/user/<user_id>', methods=['PUT'])
def update_user_id(user_id):
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	first_name = request.json['first_name']
	surname = request.json['surname']
	email = request.json['email']
	query = """
		UPDATE users
		SET first_name = %s,
		surname = %s,
		email = %s
		WHERE users.id = %s
		RETURNING *
	"""
	cur = g.db['cursor']
	cur.execute(query, (first_name, surname, email, user['id']))
	g.db['connection'].commit()
	updatedUser = g.db['cursor'].fetchone()
	updatedUser.pop('password_hash')
	return jsonify(updatedUser)

