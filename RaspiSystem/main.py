# -*- coding: utf-8 -*-
import cv2
import numpy as np
from base64 import b64encode
from os import makedirs
from os.path import join, basename
from sys import argv
import json
import requests
import datetime
import sys
import os

from google.cloud import automl_v1beta1
from google.cloud.automl_v1beta1.proto import service_pb2

from googletrans import Translator
translator = Translator()

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'AutoVisionTEST-06165db18019.json'
file_path = "recognition.jpg"
project_id = "auto-vision-test"
model_id = "ICN3620454382794234853"
cap = cv2.VideoCapture(0)

url = 'http://18.220.201.195:3000/api/fridgestatus'

################################################################################
ENDPOINT_URL = 'https://vision.googleapis.com/v1/images:annotate'
RESULTS_DIR = 'jsons'
makedirs(RESULTS_DIR, exist_ok=True)
################################################################################
def make_image_data_list(image_filenames):
    img_requests = []
    for imgname in image_filenames:
        with open(imgname, 'rb') as f:
            ctxt = b64encode(f.read()).decode()
            img_requests.append({
                    'image': {'content': ctxt},
                    'features': [{
                        'type': 'LABEL_DETECTION',
                        'maxResults': 10
                    }]
            })
    return img_requests
################################################################################
def make_image_data(image_filenames):
    imgdict = make_image_data_list(image_filenames)
    return json.dumps({"requests": imgdict }).encode()
################################################################################
def request_ocr(api_key, image_filenames):
    response = requests.post(ENDPOINT_URL,
                            data=make_image_data(image_filenames),
                            params={'key': api_key},
                            headers={'Content-Type': 'application/json'})
################################################################################
def image_object_detector(image):
    api_key, *image_filenames = argv[1:]
################################################################################
def frame_sub(img1, img2, img3, th):
    diff1 = cv2.absdiff(img1, img2)
    diff2 = cv2.absdiff(img2, img3)

    diff = cv2.bitwise_and(diff1, diff2)

    diff[diff < th] = 0
    diff[diff >= th] = 255

    mask = cv2.medianBlur(diff, 5)

    return diff
################################################################################
def diff():
    time1 = datetime.datetime.now()
    min_moment = 20000

    frame1 = cv2.cvtColor(cap.read()[1], cv2.COLOR_RGB2GRAY)
    frame2 = cv2.cvtColor(cap.read()[1], cv2.COLOR_RGB2GRAY)
    frame3 = cv2.cvtColor(cap.read()[1], cv2.COLOR_RGB2GRAY)

    while(cap.isOpened()):
        mask = frame_sub(frame1, frame2, frame3, th=10)

        moment = cv2.countNonZero(mask)

        if moment <= min_moment:
            time2 = datetime.datetime.now()
            if (time2-time1).total_seconds() > 3:
                ret, frame = cap.read()
                return frame

        frame1 = frame2
        frame2 = frame3
        frame3 = cv2.cvtColor(cap.read()[1], cv2.COLOR_RGB2GRAY)
################################################################################
def get_prediction(content, project_id, model_id):
  prediction_client = automl_v1beta1.PredictionServiceClient()

  name = 'projects/{}/locations/us-central1/models/{}'.format(project_id, model_id)
  payload = {'image': {'image_bytes': content }}
  params = {}
  request = 0
  request = prediction_client.predict(name, payload, params)
  return request  # waits till request is returned
################################################################################
#main
while True:
    frame = diff()
    cv2.imwrite(file_path, frame)
    with open(file_path, 'rb') as ff:
      content = ff.read()
    res = get_prediction(content, project_id,  model_id)

    ################################################################################
    try:
        label = res.payload[0].display_name
        print(res)
        score = res.payload[0].classification.score

        print(res.payload[0].display_name)
        vegetable = translator.translate(res.payload[0].display_name[:-1], dest='ja').text
        print(vegetable)
        number=int(res.payload[0].display_name[-1])
        data = { "categoryName" : vegetable, "num" : number }
        res = requests.put(url, data=data)

    except:
        print("No")
    ################################################################################

cap.release()

################################################################################
