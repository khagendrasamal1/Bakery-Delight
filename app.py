# app.py

from flask import Flask, render_template, redirect, flash, url_for, request
from forms import SignupForm, LoginForm
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['SECRET_KEY'] = 'gyuhwdqdewbljkhl2egwqbshdqwgluli3uwdhgidqsghdqwhweggelwgsk'
app.config['MONGO_URI'] = 'mongodb+srv://khagendra_1:EbhBi7HFuGKZzh4u@cluster0.egd8m.mongodb.net/user_db?retryWrites=true&w=majority&appName=Cluster0'  # Add your MongoDB URI
mongo = PyMongo(app)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        existing_user = mongo.db.users.find_one({'email': form.email.data})
        if existing_user:
            flash('Email already exists. Please use a different email.', 'danger')
            return redirect(url_for('signup'))
        
        # Insert user into the database
        mongo.db.users.insert_one({
            'username': form.username.data,
            'email': form.email.data,
            'password': form.password.data  # Make sure to hash passwords in a real app
        })
        flash('Account created successfully!', 'success')
        return redirect(url_for('login'))
    else:
        for field, errors in form.errors.items():
            for error in errors:
                flash(f'{field.capitalize()}: {error}', 'danger')
    
    return render_template('signup.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = mongo.db.users.find_one({'username': form.username.data})
        if user and user['password'] == form.password.data:  # Use password hashing in production
            flash('Logged in successfully!', 'success')
            return redirect(url_for('index'))  # Redirect to your index page
        else:
            flash('Invalid username or password. Please try again.', 'danger')

    return render_template('login.html', form=form)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
