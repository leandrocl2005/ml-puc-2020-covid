
from flask import Flask, request, jsonify, render_template
import pandas as pd
from pycaret.regression import *

# app
app = Flask(__name__)

# model
model = load_model("svm_model_12072020")

@app.route("/predict", methods=["POST"])
def predict():
     data = request.json
     formatted_data = pd.DataFrame(data)
     return jsonify({
          "tempo": predict_model(model, data=formatted_data)["Label"].values[0]
     })

if __name__ == "__main__":
    app.run(port=5000, debug=True)