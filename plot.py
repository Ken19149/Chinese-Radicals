import matplotlib.pyplot as plt
import pandas as pd
import json
import os

data = []  # [[count],[weight]]

# [count] = [[file_count_1],..,[file_count_N]]      N=5
# [weight] = [[file_weight_1],..,[file_weight_N]]

# data from each count/weight_file = below
# [[[in_count, in_str], [out_count, out_str], total_stroke, [missing_rad_count, missing_rad_str]], [[char1],..,[charN]]]
# char = [["character", stroke_count, radical_count],[radicals]]

def read_data(path):
    f = open(path, "r", encoding="utf-8")
    file = f.read().split("\n")
    data = [[[int(file[2].replace("Input - ", "")), file[4][0:5]], [int(file[7].replace("Output - ", "")), file[9][0:5]], int(file[16].replace("Total Stroke - ", "")), [int(file[12].replace("Missing Radicals - ", "")), file[14][0:5]]], []]
    f.close()

    #load each character's data
    for i in range(21, len(file) - 1):
        data[1].append(json.loads(file[i]))

    return data

output_dir = "output"

for i in range(0, len(os.listdir(output_dir))):
    data.append([])
    for j in range(0, len(os.listdir(output_dir + "/" + os.listdir(output_dir)[i]))):
        path = (output_dir + "/" + str(os.listdir(output_dir)[i]) + "/" + str(os.listdir(output_dir + "/" + os.listdir(output_dir)[i])[j]))
        data[i].append(read_data(path))
print(data[0][0][0])