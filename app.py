from flask import Flask, render_template, request, send_file, jsonify
from cryptography.fernet import Fernet
import os
from werkzeug.utils import secure_filename
import base64

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create uploads folder if it doesn't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-key', methods=['GET'])
def generate_key():
    key = Fernet.generate_key()
    return jsonify({'key': key.decode()})

@app.route('/encrypt', methods=['POST'])
def encrypt_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        key = request.form['key'].encode()

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Read and encrypt the file
        f = Fernet(key)
        file_content = file.read()
        encrypted_data = f.encrypt(file_content)

        # Save encrypted file
        encrypted_filename = f'encrypted_{secure_filename(file.filename)}'
        encrypted_path = os.path.join(app.config['UPLOAD_FOLDER'], encrypted_filename)

        with open(encrypted_path, 'wb') as ef:
            ef.write(encrypted_data)

        return send_file(encrypted_path, as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/decrypt', methods=['POST'])
def decrypt_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        key = request.form['key'].strip().encode()

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Read the encrypted file
        file_content = file.read()

        # Initialize Fernet with the key
        f = Fernet(key)

        # Decrypt the data
        decrypted_data = f.decrypt(file_content)

        # Save decrypted file
        decrypted_filename = secure_filename(file.filename)
        if decrypted_filename.startswith('encrypted_'):
            decrypted_filename = decrypted_filename[10:]
        decrypted_filename = f'decrypted_{decrypted_filename}'
        decrypted_path = os.path.join(app.config['UPLOAD_FOLDER'], decrypted_filename)

        with open(decrypted_path, 'wb') as df:
            df.write(decrypted_data)

        return send_file(decrypted_path, as_attachment=True)

    except Exception as e:
        print(f"Decryption error: {str(e)}")  # Server-side logging
        return jsonify({'error': 'Decryption failed. Please ensure you are using the correct key and file.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
