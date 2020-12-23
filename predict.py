# load and evaluate a saved model
import numpy as np
from keras.models import load_model

# load model
model = load_model('model.h5')

# summarize model.
model.summary()
# load dataset
from keras.preprocessing import image

test_image=image.load_img("uploads/photo.jpg",target_size=(64,64))
#convert pale to array...convert pale to array..which is in pil format
test_image=image.img_to_array(test_image)
test_image=np.expand_dims(test_image,axis=0) #first dimension of batch
result=model.predict(test_image)
print(result)
# train_set.class_indices
if(result[0][0]==0):
    prediction="relatives"
else:
    prediction="suspicious"

print(prediction)
data = prediction
