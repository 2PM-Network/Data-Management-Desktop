import sys
import json
import random

def generate_random_integers():
    # Define the min and max values
    min_value = 0
    max_value = 100

    # Generate int between the range
    num1 = random.randint(min_value, max_value)
    num2 = random.randint(min_value, max_value)

    # Return value
    return num1, num2

data = generate_random_integers()

# Create a dictionary with the data
result = {"data": data}

# Print the result in JSON format
print(json.dumps(result))

# Flush the output (useful in certain environments like 
# web servers or real-time applications)
sys.stdout.flush()