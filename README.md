# Encryptly - File Encryption Tool
#### Video Demo: https://youtu.be/wvN9KKsSNBE
#### Description:

Encryptly is a sophisticated web-based file encryption tool that leverages modern cryptographic techniques to provide secure, user-friendly file encryption and decryption capabilities. Built using Python's robust cryptography library and the Flask web framework, this application demonstrates the practical implementation of symmetric encryption in a web environment. The project aims to make file encryption accessible to users while maintaining high security standards and a seamless user experience.

## Key Features

- **User-Friendly Interface**: Clean, modern design with a responsive layout that works seamlessly across all devices, from mobile phones to desktop computers. The interface uses intuitive visual cues and clear instructions to guide users through the encryption/decryption process.

- **Two-Way Operation**: Supports both encryption and decryption modes with easy switching between them. The mode selection is prominently displayed at the top of the interface, allowing users to quickly switch between operations without page reloads.

- **Secure Key Generation**: Implements cryptographically secure keys using the Fernet symmetric encryption scheme. Fernet guarantees that a message encrypted using it cannot be manipulated or read without the key. It also has built-in protection against several common cryptographic attacks.

- **File Management**: Handles file uploads and downloads securely with size limitations and proper file naming conventions. The system implements secure file handling practices to prevent common vulnerabilities like path traversal attacks.

- **Error Handling**: Comprehensive error handling system with user-friendly messages that guide users through problem resolution without exposing sensitive system information.

- **Visual Feedback**: Implements loading states and notifications for all operations, ensuring users always know the status of their actions.

## Technical Implementation

### Backend (app.py)
The Flask application serves as the backbone of Encryptly, handling all cryptographic operations and file management. Key components include:

- Flask server configuration with a carefully chosen 16MB file size limit to prevent server overload
- Secure key generation endpoint utilizing Fernet encryption from the cryptography library
- File encryption endpoint that processes uploaded files using symmetric encryption
- File decryption endpoint with robust error handling and validation
- Secure file naming system using Werkzeug's secure_filename utility
- Temporary storage management with automatic cleanup
- MIME type validation for uploaded files
- Base64 encoding/decoding for key management

### Frontend (templates/index.html & static/script.js)
The frontend implementation provides a rich, interactive user interface with:

- Dynamic mode switching between encryption and decryption operations
- Asynchronous file processing using the Fetch API for smooth user experience
- Real-time button state management to prevent multiple submissions
- Key file download functionality with proper file naming
- Progress indicators and error messages using custom notification system
- Responsive design implementation using modern CSS features
- Client-side validation for file types and sizes
- Automatic key validation and format checking

### Styling (static/styles.css)
The CSS implementation features a thoughtfully designed interface with:

- Modern, clean design using flexbox layout for optimal content organization
- Responsive design with mobile-first approach ensuring compatibility across devices
- Interactive elements with carefully crafted hover and active states
- Smooth loading animations and transitions for better user experience
- Comprehensive error state styling for clear visual feedback
- Custom notification system for success and error messages
- Accessible color scheme with appropriate contrast ratios
- Consistent spacing and typography throughout the application

## Security Considerations

Encryptly implements multiple layers of security measures:

1. Server-side encryption using the cryptography library, which is actively maintained and audited for security vulnerabilities
2. Secure key generation using cryptographically secure random number generators
3. Temporary file storage with secure naming conventions and automatic cleanup
4. Input validation and sanitization to prevent injection attacks
5. Error handling designed to prevent information leakage
6. Content Security Policy implementation
7. Secure HTTP headers configuration
8. Protection against common web vulnerabilities

## Design Decisions

The development process involved several crucial design decisions:

1. **Single Page Application**:
   - Improves user experience by eliminating page reloads
   - Reduces server load and bandwidth usage
   - Enables smooth transitions between operations
   - Maintains application state effectively

2. **Key Management**:
   - Provides both viewing and downloading options for encryption keys
   - Implements secure key storage practices
   - Ensures key format validation
   - Supports key file upload for convenience

3. **File Size Limit**:
   - 16MB limit balances usability with server resources
   - Prevents potential DOS attacks
   - Ensures consistent performance across different network conditions
   - Implements client-side validation to improve user experience

4. **Responsive Design**:
   - Mobile-first approach ensures universal accessibility
   - Maintains functionality across all screen sizes
   - Optimizes interface elements for touch interactions
   - Provides consistent experience across devices

## Future Enhancements

The project roadmap includes several planned improvements:

- Multiple file encryption/decryption support with batch processing
- Drag and drop file upload interface with preview functionality
- Password-based key generation with strong password requirements
- File integrity verification using checksums
- Automatic file cleanup with configurable retention periods
- Progress bars for large file operations
- Optional compression for encrypted files
- Enhanced error reporting and logging system
- Integration with cloud storage providers
- Support for different encryption algorithms

## Technical Requirements

The application requires:
- Python 3.6 or higher
- Flask web framework
- cryptography library for encryption operations
- Modern web browser with JavaScript enabled
- Minimum 512MB RAM
- Sufficient disk space for temporary file storage

## Installation

1. Clone the repository to your local machine
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install requirements: `pip install -r requirements.txt`
5. Run the application: `python app.py`
6. Access via browser at `http://localhost:5000`

## Usage

1. Select operation mode (Encrypt/Decrypt)
2. For encryption:
   - Generate a new encryption key
   - Save the key securely
   - Select the file to encrypt
   - Download the encrypted file
3. For decryption:
   - Input or upload the original key file
   - Select the encrypted file
   - Download the decrypted file

Encryptly represents a careful balance between security and usability, providing a practical solution for file encryption needs while maintaining a focus on user experience and robust error handling. The application demonstrates the implementation of modern cryptographic practices in a web environment, making secure file encryption accessible to users of all technical levels.
