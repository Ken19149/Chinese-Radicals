import matplotlib.pyplot as plt
import pandas as pd

data = [[], []]  # [[count],[weight]]

# [count] = [[file_count_1],..,[file_count_N]]      N=5
# [weight] = [[file_weight_1],..,[file_weight_N]]

# data from each count/weight_file = below
# [[[in_count, in_str], [out_count, out_str], total_stroke, [missing_rad_count, missing_rad_str]], [[char1],..,[charN]]]
# char = [["character", stroke_count, radical_count],[radicals]]

def read_data():
    data = []
    return data