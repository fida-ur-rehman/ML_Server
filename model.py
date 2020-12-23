

import numpy as np

import tensorflow as tf

import requests
from keras.preprocessing.image import ImageDataGenerator
from string import Template
link = Template('$x')
# print(tf.__version__)

#preprocssin... augmentation

train_datagen = ImageDataGenerator(
        rescale=1./255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)
train_set = train_datagen.flow_from_directory(
        'training_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='binary')  #number of classes

#test generator
test_datagen = ImageDataGenerator(rescale=1./255)
test_set = test_datagen.flow_from_directory(
        'test_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='binary')


#building the cnn

cnn=tf.keras.models.Sequential()
#cnnnovoliutujrjoijrn
cnn.add(tf.keras.layers.Conv2D(filters=32,kernel_size=3,activation="relu",input_shape=[64,64,3]))

#pooling
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2,strides=2))  #pool size represents shifting the squares
#adding a second convilutional layer
cnn.add(tf.keras.layers.Conv2D(filters=32,kernel_size=3,activation="relu"))
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2,strides=2))

#flattening
cnn.add(tf.keras.layers.Flatten())

#full connection
cnn.add(tf.keras.layers.Dense(units=128,activation="relu"))

#output layer
cnn.add(tf.keras.layers.Dense(units=1,activation="sigmoid")) #1 neuron for classfication ...use softmax for multiple classfication


#------------------------------------------------------------------------------training cnn
#compiling the cnn

cnn.compile(optimizer="adam",loss="binary_crossentropy",metrics=["accuracy"])

#training the cnn on the training set and evaluating it on the test set

cnn.fit(x=train_set,validation_data=test_set, epochs=15)

cnn.save("model.h5")
print("Trained model and save it as h5 extension")

#making  a asingle prediction
from keras.preprocessing import image

test_image=image.load_img("uploads/photo.jpg",target_size=(64,64))
#convert pale to array...convert pale to array..which is in pil format
test_image=image.img_to_array(test_image)
test_image=np.expand_dims(test_image,axis=0) #first dimension of batch
result=cnn.predict(test_image)
print(result)
train_set.class_indices
if(result[0][0]==0):
    
        prediction="relatives"
else:
    prediction="suspicious"

print(prediction)
data = prediction

























