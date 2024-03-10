# Set base image (host OS)
FROM python:3.11-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the content of the local src directory to the working directory
COPY . .

# Install any dependencies
RUN pip install -r requirements.txt

# By default, listen on port 4999
EXPOSE 4999

# Specify the command to run on container start
CMD [ "python", "server.py" ]