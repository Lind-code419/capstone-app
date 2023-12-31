from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(_name_)

# Load the pickled model
with open('reg.pkl', 'rb') as file:
    model = pickle.load(file)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/history")
def history():
    return render_template('history-screen.html')


@app.route("/login")
def login():
    return render_template('login-screen.html')


@app.route("/")
def optimal():
    return render_template('predict.html')


@app.route("/route")
def route():
    return render_template('route-screen.html')


@app.route("/tax")
def tax():
    return render_template('predict.html')


@app.route("/settings")
def settings():
    return render_template('result.html')


@app.route('/predict', methods=['POST'])
def predict():
    # Get the input values from the form
    int_features = [float(x) for x in request.form.values()]
    features = [np.array(int_features)]

    # Make a prediction using the loaded model
    prediction = model.predict(features)

    # Process the prediction as needed
    output = round(prediction[0], 3)

    return render_template('result.html', prediction=output)

    # Render the result in the template
    # return {
        # 'prediction': prediction.tolist()
    # }


if _name_ == "_main_":
    app.run(debug=True)