"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_accesss_token, jwt_required
from flask_sqlalchemy import SQLAlchemy
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
import os

app= Flask(__name__)
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#configuración de la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['JWT_SECRET_KEY']= 'penultimo-proyecto'
db= SQLAlchemy(app)
jwt= JWTManager(app)

class User(db.Model):
    id= db.Column(db.Integer, primary_key=True)
        email= db.Column(db.String(120), unique=True, nullable=False)
            password= db.Column(db.String(255), nullable=False)
            
            #crear db
            with app.app_context():
                db.create_all()
                
                
                
                @api.route('/signup', methods=['POST'])
                def signup():
                    data= request.get_json()
                        email=data.get('email')
                            password=data.get('password')
                            
                                if not email or not password:
                                        return jsonify({'msg': "Email and password are required"}), 400
                                            
                                                if User.query.filter_by(email=email).first():
                                                        return jsonify({'msg': "Email already exist"}), 400
                                                            
                                                            #hashear la contraseña
                                                            hashed_password= bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                                                            new_user= User(email=email, password=hashed_password)
                                                            db.session.add(new_user)
                                                            db.session.commit()
                                                            
                                                            return jsonify({'msg':'User created'}), 201
                                                            
                                                            #endpoint inicio de sesion
                                                            
                                                            @api.route('/login', methods=['POST'])
                                                            def login():
                                                                data= request.get_json()
                                                                    email= data.get('email')
                                                                        password= data.get('password')
                                                                        
                                                                            user= User.query.filter_by(email=email).first()
                                                                                if not user or not bcrypt.checkpw(password.encode('utf-8', user.password)):
                                                                                        return jsonify({'msg':'Credenciales inválidas'}), 401
                                                                                            access_token=create_access_token(identity=user.id)
                                                                                                return jsonify({'access_token': access_token}), 200
                                                                                                
                                                                                                #endpoint protegida
                                                                                                
                                                                                                @app.route('/private', methods=['GET'])
                                                                                                @jwt_required()
                                                                                                def private():
                                                                                                    return jsonify({'msg': 'Private area'}), 200
                                                                                                    
                                                                                                        if __name__== '__main__':
                                                                                                                """