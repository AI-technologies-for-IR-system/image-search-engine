from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import os
import base64
import tensorflow as tf
import tensorflow_hub as hub
from werkzeug.datastructures import ImmutableMultiDict
import pandas as pd
import numpy as np
from keras.preprocessing import image  
from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from models.requests import RequestsModel
# from connection import PostgresConnection




# define ResNet50 model
ML__ResNet50_model = ResNet50(weights='imagenet')
                

def ML__path_to_tensor(img_path):
    # loads RGB image as PIL.Image.Image type
    img = image.load_img(img_path, target_size=(224, 224))
    # convert PIL.Image.Image type to 3D tensor with shape (224, 224, 3)
    x = image.img_to_array(img)
    # convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and return 4D tensor
    return np.expand_dims(x, axis=0)


def ML__ResNet50_predict_labels(img_path):
    # returns prediction vector for image located at img_path
    img = preprocess_input(ML__path_to_tensor(img_path))
    return np.argmax(ML__ResNet50_model.predict(img))


### returns "True" if a dog is detected in the image stored at img_path
def ML__dog_detector(img_path):
    prediction = ML__ResNet50_predict_labels(img_path)
    return ((prediction <= 268) & (prediction >= 151))


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
        return jsonify({"data": res}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

def read_file_as_b64(path):
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        return "data:image/jpeg;charset=utf-8;base64," + encoded_string.decode("utf-8")

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

        return jsonify({"data": res}), 200
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

        return jsonify({"data": res}), 200
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

@ml_serving.route('/breeds/preview_new', methods=['GET'])
def get_breeds_preview_new():
    try:
        print(unique_labels)

        res = [{
            "name": x.replace("_", " "),
            "count": len(labels_csv.loc[labels_csv['breed'] == x]),
            "photo": "/dataset_new/" + labels_csv.loc[labels_csv['breed'] == x].iloc[0].id + ".jpg"
            # "photo": read_file_as_b64("../dataset/dogs_breed/" + x + "/" + os.listdir("../dataset/dogs_breed/" + x)[0])
        } for x in unique_labels]
        # print(res)

        return jsonify({"data": res}), 200
    except Exception as e:
        # print(e)
        return jsonify({"msg": str(e)}), 400

@ml_serving.route('/breeds/names/find_new', methods=['GET'])
def get_breeds_preview__new():
    try:
        r = request.args.get('name')
        if r is None:
            return jsonify({"msg": "de neim?"}), 400

        all_names = unique_labels

        user_data = r.strip().lower().split()

        stop = False
        # bread = ""
        opa = -1
        results = []
        for i in range(len(all_names)):
            stop = False
            # if stop:
            #     break
            for j in range(len(user_data)):
                if stop:
                    break
                # print(all_names[i])
                # print(all_names[i].strip().lower().replace("_", " "))
                # print(len(all_names[i].strip().lower().replace("_", " ").split()))
                spltd = all_names[i].strip().lower().replace("_", " ").split()
                # print(spltd)
                for k in range(len(spltd)):
                    if user_data[j] in spltd[k]:
                        # print(user_data[j], spltd[k])
                        # print()
                        opa = 1
                        stop = True
                        results.append(all_names[i])
                        break

        if opa < 0:
            return jsonify({"msg": "not found"}), 404

        res = [{
            "name": x.replace("_", " "),
            "photo": "/dataset_new/" + labels_csv.loc[labels_csv['breed'] == x].iloc[0].id + ".jpg"
        } for x in results]

        return jsonify({"data": res}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

# Create a function which builds a Keras model
def create_model(input_shape, output_shape, model_url):
    print("Building model")
    # We define the model layers
    model = tf.keras.Sequential([
        # Layer 1 (input layer)
        hub.KerasLayer(model_url),
        # Layer 2 (output layer)
        tf.keras.layers.Dense(units=output_shape,   activation="softmax") 
    ])

    # Compile the model, we define how the model is going to learn
    model.compile(
        loss=tf.keras.losses.CategoricalCrossentropy(), # Our model wants to reduce this (how wrong its guesses are)
        optimizer=tf.keras.optimizers.Adam(), # A friend telling our model how to improve its guesses
        metrics=["accuracy"] # We'd like this to go up
    )

    # Build the model
    model.build(input_shape) # Let the model know what kind of inputs it'll be getting
    
    return model

@ml_serving.route('/breeds/model/retrain', methods=['POST'])
def retrain_ml_model():
    data = request.files.get('file_img')
    actual = request.get_json('actual')
    data.save('/tmp/' + data.filename)
    data = tf.data.Dataset.from_tensor_slices((tf.constant(['/tmp/' + data.filename])))
    model = create_model()
    model.load('../ml/mobilnetV2-9000-images.h5')

    model.fit(x=data,
                epochs=5,
                validation_data=actual,
                validation_freq=1)

    model.save('../ml/mobilnetV2-9000-images.h5')


@ml_serving.route('/breeds/image/predict', methods=['POST'])
def get_breeds_image():
    try:
        data = request.files.get('file_img')
        # print(request.files['file_name'])
        data.save('/tmp/' + data.filename)

        filename_full = '/tmp/' + data.filename

        is_dog = ML__dog_detector(filename_full)


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


        if not is_dog:
            if rawData[0]['val'] * 100 > 85:
                is_dog = True

        data = RequestsModel().getAll()
       
        data_accepted = [x for x in data if x['accepted'] == True]
        data_user_file = read_file_as_b64(filename_full)

        data_user_file = data_user_file[data_user_file.find(','):]

        is_user_setup = False
        user_predict = ""


        for x in data_accepted:
            val = x['photo'][x['photo'].find(','):]
            if data_user_file == val:
                is_user_setup = True
                user_predict = x['expected']
                print("ALAAAAAAAAAARM")

        if is_user_setup:
            return jsonify({"data": user_predict, "rawData": [{"name": user_predict, "val": 1}], "isDog": True }), 200

        return jsonify({"data": res, "rawData": rawData, "isDog": bool(is_dog) }), 200
    except Exception as e:
        print(e)
        return jsonify({"msg": str(e)}), 400
