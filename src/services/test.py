from fhe import fhe_encrypt
import asyncio
import sys
import json

async def main():
    res = await fhe_encrypt("./", "spector.csv")
    # Create a dictionary with the data
    res = {"data": res}

    # Print the result in JSON format
    print(json.dumps(res))

    # Flush the output (useful in certain environments like 
    # web servers or real-time applications)
    sys.stdout.flush()

asyncio.run(main())

