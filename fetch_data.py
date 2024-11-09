from pymongo import MongoClient

# MongoDB connection details
username = "mad"
password = "123"
host = "localhost"
port = 27017
database_name = "TestDB"
collection_name = "TestUser"

# Create a MongoDB client
client = MongoClient(f"mongodb://mad:123@localhost:27017/")

# Access the database and collection
db = client[database_name]
collection = db[collection_name]

# Fetch and print data from the collection
try:
    documents = collection.find()  # Retrieves all documents in the collection
    for document in documents:
        print(document)
except Exception as e:
    print("An error occurred:", e)
finally:
    client.close()  # Close the MongoDB connection
