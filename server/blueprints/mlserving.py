from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import os
import base64
import tensorflow as tf
import tensorflow_hub as hub
from werkzeug.datastructures import ImmutableMultiDict
import pandas as pd
import numpy as np

ml_serving = Blueprint('ml_serving', __name__)

# @ml_serving.route('/test', methods=['GET'])
# def create():
#     try:
#         res = os.listdir("../dataset/dogs_breed")
#         return jsonify({"msg": res}), 201
#     except Exception as e:
#         return jsonify({"msg": str(e)}), 400

@ml_serving.route('/breeds/names', methods=['GET'])
def get_breeds_names():
    try:
        res = [x[4:].replace("_", " ") for x in os.listdir("../dataset/dogs_breed")]
        return jsonify({"data": res}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

# def read_file_as_b64(path):
#     with open(path, "rb") as image_file:
#         encoded_string = base64.b64encode(image_file.read())
#         return "data:image/jpeg;charset=utf-8;base64," + encoded_string.decode("utf-8")

@ml_serving.route('/breeds/preview', methods=['GET'])
def get_breeds_preview():
    try:
        r = request.args.get('count')
        if r is None:
            r = 1000
        res = [{
            "name": x[4:].replace("_", " "),
            "count": len(os.listdir("../dataset/dogs_breed/" + x)),
            "photo": "/dataset/" + x + "/" + os.listdir("../dataset/dogs_breed/" + x)[0]
            # "photo": read_file_as_b64("../dataset/dogs_breed/" + x + "/" + os.listdir("../dataset/dogs_breed/" + x)[0])
        } for x in os.listdir("../dataset/dogs_breed")[:int(r)]]

        return jsonify({"data": res}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

@ml_serving.route('/breeds/names/find', methods=['GET'])
def get_breeds_preview_():
    try:
        r = request.args.get('name')
        if r is None:
            return jsonify({"msg": "de neim?"}), 400

        all_names = [x[4:].replace("_", " ") for x in os.listdir("../dataset/dogs_breed")[:]]

        user_data = r.strip().lower().split()

        stop = False
        bread = ""
        opa = -1
        for i in range(len(all_names)):
            if stop:
                break
            for j in range(len(user_data)):
                if stop:
                    break
                spltd = all_names[i].strip().lower().split()
                for k in range(len(spltd)):
                    if user_data[j] == spltd[k]:
                        stop = True
                        bread = all_names[i]
                        opa = i
                        break

        if opa < 0:
            return jsonify({"msg": "not found"}), 404

        q = os.listdir("../dataset/dogs_breed")[opa]

        res = {
            "name": bread,
            "photo": "/dataset/" + q + os.listdir("../dataset/dogs_breed/" + q)[0]
        }

        return jsonify({"data": res}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

# Define image size
IMG_SIZE = 224

def process_image(image_path):
    """
    Takes an image file path and turns it into a Tensor.
    """
    # Read in image file
    image = tf.io.read_file(image_path)
    # Turn the jpeg image into numerical Tensor with 3 colour channels (Red, Green, Blue)
    image = tf.image.decode_jpeg(image, channels=3)
    # Convert the colour channel values from 0-225 values to 0-1 values
    image = tf.image.convert_image_dtype(image, tf.float32)
    # Resize the image to our desired size (224, 244)
    image = tf.image.resize(image, size=[IMG_SIZE, IMG_SIZE])
    return image

def load_model(model_path):
    """ Loads a saved model from a specified path. """
    print(f"Loading saved model from: {model_path}")
    model = tf.keras.models.load_model(model_path, custom_objects={"KerasLayer":hub.KerasLayer})
    return model

loaded_full_model = load_model('../ml/mobilnetV2-9000-images.h5')

BATCH_SIZE = 32

def get_pred_label(prediction_probabilities):  
    """  Turns an array of prediction probabilities into a label. """
    return unique_labels[np.argmax(prediction_probabilities)]

labels_csv = pd.read_csv('../ml/labels.csv')

# get the images filenames
filenames = ['/content/drive/My Drive/Colab Notebooks/train/'+file+'.jpg' for file in labels_csv.id]

# get string labels
string_labels = np.array(labels_csv.breed)

# get a list of unique labels
unique_labels = np.unique(string_labels)

@ml_serving.route('/breeds/image/predict', methods=['POST'])
def get_breeds_image():
    try:
        data = request.files.get('file_img')
        # print(request.files['file_name'])
        data.save('/tmp/' + data.filename)

        # image = process_image('/tmp/' + data.filename)
        # print(image)

        # Get the slices of an array in the form of tensors, we only pass filepaths
        data = tf.data.Dataset.from_tensor_slices((tf.constant(['/tmp/' + data.filename])))
        # Preprocess each image object with our 'process_image' function
        data = data.map(process_image)
        # Turn our data into batches
        data_batch = data.batch(BATCH_SIZE)
        # test_data = create_data_batches(test_filenames, test_data=True)

        test_predictions = loaded_full_model.predict(data_batch,  verbose=1)

        # print(test_predictions)

        res = get_pred_label(test_predictions)

        # print(res)
        # unique_labels[np.argmax(prediction_probabilities)]
        flat_list_predicts = test_predictions.flatten().tolist()
        rawData = [{ "name": unique_labels[idx], "val": x } for idx, x in enumerate(flat_list_predicts)]
        rawData.sort(key=lambda x: x["val"], reverse=True)
        rawData = rawData[:10]

        # print(rawData)

        return jsonify({"data": res, "rawData": rawData }), 201
    except Exception as e:
        print(e)
        return jsonify({"msg": str(e)}), 400
