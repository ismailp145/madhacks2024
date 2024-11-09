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

# Insert a single document
document = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Insert multiple documents
documents = [
    {"name": "Bob", "age": 25, "city": "Los Angeles"},
    {"name": "Charlie", "age": 35, "city": "Chicago"}
]

try:
    # Insert the single document
    collection.insert_one(document)
    print("Single document inserted successfully!")

    # Insert multiple documents
    collection.insert_many(documents)
    print("Multiple documents inserted successfully!")

    # Fetch and print data from the collection
    print("Documents in collection:")
    for doc in collection.find():
        print(doc)

except Exception as e:
    print("An error occurred:", e)

finally:
    # Close the MongoDB connection
    client.close()
