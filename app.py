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
@app.route('/')
def home():
	user = session.get('user', None)
	if user is None:
		return jsonify(msg='Must be logged in')
	query = """
		SELECT weight.weight, weight.date, users.first_name FROM weight
		JOIN users ON weight.user_id = users.id
		WHERE users.id = %s
		ORDER BY weight.date DESC LIMIT 1
	"""
	g.db['cursor'].execute(query, (user['id'],))
	user_current = g.db['cursor'].fetchall()
	return jsonify(user_current)

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
# @app.route('/hr/<user_id>')
# def show_hr(user_id):
# 	cur = g.db['cursor']
# 	query = """
# 		SELECT heart_rate FROM from heart_rate
# 		JOIN users ON heart_rate.user_id = users.id
# 		where users.id = %s
# 	"""
# 	cur.execute(qeury, (user_id,))
# 	hr = cur.fetchall()
# 	username = weight[0]['username']
# 	return jsonify(username=username, hr=hr)

# @app.route('/hr/<heart_rate_id>', methods=['DELTE'])
# def delete_hr(heart_rate_id):
# 	query = """
# 		DELETE FROM heart_rate
# 		WHERE id = %s
# 		RETURNING *
# 	"""
# 	cur = g.db['cursor']
# 	cur.execute(query, (heart_rate_id,))
# 	g.db['connection'].commit()
# 	hr = cur.fetchone()
# 	return jsonify(hr)


# Blood Pressure - Show
# @app.route('/bp/<user_id>')
# def show_hr(user_id):
# 	cur = g.db['cursor']
# 	query = """
# 		SELECT systolic_bp, diastolic_bp FROM from blood_pressure
# 		JOIN users ON blood_pressure.user_id = users.id
# 		where users.id = %s
# 	"""
# 	cur.execute(qeury, (user_id,))
# 	bp = cur.fetchall()
# 	username = weight[0]['username']
# 	return jsonify(usernamen=username, bp=bp)

# @app.route('/hr/<blood_pessure_id>', methods=['DELTE'])
# def delete_bp(blood_pessure_id):
# 	query = """
# 		DELETE FROM blood_pessure
# 		WHERE id = %s
# 		RETURNING *
# 	"""
# 	cur = g.db['cursor']
# 	cur.execute(query, (heart_rate_id,))
# 	g.db['connection'].commit()
# 	bp = cur.fetchone()
# 	return jsonify(bp)

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
		RETURNING id, username
	"""
	cur = g.db['cursor']
	try:
		cur.execute(query, (username, password_hash))
	except psycopg2.IntegrityError:
		return jsonify(success=False,msg='Username already exists')
	g.db['connection'].commit()
	user = cur.fetchone()
	# print(user)
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