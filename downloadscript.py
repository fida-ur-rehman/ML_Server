# -*- coding: utf-8 -*-
"""
Created on Wed Dec  2 12:03:00 2020

@author: Sharjeel
"""
import pandas as pd
import urllib.request

def dl_jpg(url,file_path,file_name):
    full_path = file_path + file_name + '.jpg' #folder
    urllib.request.urlretrieve(url,full_path)
    


url = input("enter image url")

file_name = input("enter file name to save as")

dl_jpg(url,"images/",file_name)