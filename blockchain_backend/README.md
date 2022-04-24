# omii
Carbon emissions oracle for verifying Toucan projects


## Back-end

Flask app in python to get carbon density from a Verra project ID.

### Usage

`cd` into `/server`, then `pip install -r requirements.txt` (use a virtual environment). Then run the app using `flask run`.

This will spin up a server at localhost http://127.0.0.1:5000/. You can now call the API.

### API

- `/carbon`
  - Params:
    - verraId (int)
    - time (datetime)
  - Response: 
    - carbonDensity (float)
