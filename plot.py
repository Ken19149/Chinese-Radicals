import matplotlib.pyplot as plt
import pandas as pd
import json
import os
import math
from collections import Counter

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

# append data into a single array
for i in range(0, len(os.listdir(output_dir))):
    data.append([])
    for j in range(0, len(os.listdir(output_dir + "/" + os.listdir(output_dir)[i]))):
        path = (output_dir + "/" + str(os.listdir(output_dir)[i]) + "/" + str(os.listdir(output_dir + "/" + os.listdir(output_dir)[i])[j]))
        data[i].append(read_data(path))

# plot data

# compare input
'''
# input vs output
print("count opt count:  " + str(list(map(lambda x:x[0][1][0], data[0])))) # data[0] = count opt
print("weight opt count: " + str(list(map(lambda x:x[0][1][0], data[1]))) + "\n") # data[1] = weight opt

plt.plot(list(map(lambda x:str(x[0][0][0]), data[0])), list(map(lambda x:x[0][1][0], data[0])), color="#ff0000") # data[0] = count opt
plt.plot(list(map(lambda x:str(x[0][0][0]), data[1])), list(map(lambda x:x[0][1][0], data[1])), color="#0000ff") # data[1] = weight opt
plt.yticks(range(round((math.floor(min(list(map(lambda x: x[0][1][0], data[0]))) - min(list(map(lambda x: x[0][1][0], data[0]))) * 0.1))/10)*10, round((math.ceil(max(list(map(lambda x: x[0][1][0], data[0]))) + max(list(map(lambda x: x[0][1][0], data[0]))) * 0.1))/10)*10+1, 2))
plt.title("Input vs Output")
plt.legend(["Count", "Weight"])
plt.xlabel("Input Set")
plt.ylabel("Output Character Count")

plt.savefig("graphs/input_output.png")
plt.show()
'''

# input vs stroke
'''
print("count opt stroke:  " + str(list(map(lambda x:x[0][2], data[0])))) # data[0] = count opt
print("weight opt stroke: " + str(list(map(lambda x:x[0][2], data[1]))) + "\n") # data[1] = weight opt

plt.plot(list(map(lambda x:str(x[0][0][0]), data[0])), list(map(lambda x:x[0][2], data[0])), color="#ff0000") # data[0] = count opt
plt.plot(list(map(lambda x:str(x[0][0][0]), data[1])), list(map(lambda x:x[0][2], data[1])), color="#0000ff") # data[1] = weight opt
plt.yticks(range(1000, 1401, 50))
plt.title("Input vs Stroke")
plt.legend(["Count Optimization", "Weight Optimization"])
plt.xlabel("Input Set")
plt.ylabel("Total Stroke Count")

plt.savefig("graphs/input_stroke.png")
plt.show()
'''

# input vs missing radicals
'''
print("count opt missing rad:  " + str(list(map(lambda x:x[0][3][0], data[0])))) # data[0] = count opt
print("weight opt missing rad: " + str(list(map(lambda x:x[0][3][0], data[1]))) + "\n") # data[1] = weight opt

plt.plot(list(map(lambda x:str(x[0][0][0]), data[0])), list(map(lambda x:x[0][3][0], data[0])), color="#ff000088") # data[0] = count opt
plt.plot(list(map(lambda x:str(x[0][0][0]), data[1])), list(map(lambda x:x[0][3][0], data[1])), color="#0000ff88") # data[1] = weight opt
plt.yticks(range(0, 50, 10))
plt.title("Input vs Missing Radicals")
plt.legend(["Count Optimization", "Weight Optimization"])
plt.xlabel("Input Set")
plt.ylabel("Missing Radicals Count")

plt.savefig("graphs/input_missing_radicals.png")
plt.show()
'''

# histogram frequency count
'''
# radicals count frequency
for i in range(0, len(data[0])):
    plt.plot(list(map(list, zip(*sorted(Counter(list(map(lambda x:x[0][2], data[0][i][1]))).items()))))[0], list(map(list, zip(*sorted(Counter(list(map(lambda x:x[0][2], data[0][i][1]))).items()))))[1], color="#ff000088") # red data[0][0][i] = count opt  ik
    plt.plot(list(map(list, zip(*sorted(Counter(list(map(lambda x:x[0][2], data[1][i][1]))).items()))))[0], list(map(list, zip(*sorted(Counter(list(map(lambda x:x[0][2], data[1][i][1]))).items()))))[1], color="#0000ff88") # blue data[1][0][i] = weight opt ik
plt.title("Radicals Count Frequency")
plt.legend(["Count Optimization", "Weight Optimization"])
plt.xlabel("Radicals Count")
plt.ylabel("Frequency")
plt.xticks(range(1, 11, 1))
plt.yticks(range(0, 61, 5))
plt.savefig("graphs/radicals_count_frequency.png")

plt.show()
'''
