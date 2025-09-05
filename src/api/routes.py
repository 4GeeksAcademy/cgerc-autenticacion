import os
import bcrypt
from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.models import db, User

app = Flask(__name__)
api = Blueprint('api', __name__)

# Configuración de CORS
CORS(app)

# Configuración de la base de datos SQLite
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['JWT_SECRET_KEY'] = os.environ.get('FLASK_APP_KEY', os.urandom(32).hex())
#db = SQLAlchemy(app)
#jwt = JWTManager(app)

# Modelo de usuario
#class User(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    email = db.Column(db.String(120), unique=True, nullable=False)
#    password = db.Column(db.String(255), nullable=False)

# Crear las tablas de la base de datos
#with app.app_context():
#    db.create_all()

# Rutas de la API
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    ##if email != "test" or password != "test":
     ##   return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    is_active = data.get('is_active')

    if not email or not password:
        return jsonify({'msg': "Correo y contraseña son requeridos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'msg': "El correo ya existe"}), 400

    # Hashear la contraseña
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(email=email, password=hashed_password, is_active=is_active)


    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg': 'Usuario creado'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': f'Error en la base de datos: {str(e)}'}), 500

@api.route('/login', methods=['POST'])
def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        # Verificamos primero que exista usuario y que tenga contraseña
        if not user or not user.password:
            return jsonify({'msg': 'Credenciales inválidas'}), 401

        # Comparar la contraseña hasheada
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({'msg': 'Credenciales inválidas'}), 401

        access_token = create_access_token(identity=user.email)
        return jsonify({'access_token': access_token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    return jsonify({'msg': 'Área privada'}), 200





# Registrar el blueprint
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
