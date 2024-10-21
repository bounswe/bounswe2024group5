## Build and Deploy Instructions

### Local Deployment

1. Install Git, Docker, and Docker Compose if they are not already installed.

2. Clone the repository:
   ```
   git clone https://github.com/bounswe/bounswe2024group5.git
   cd bounswe2024group5
   ```

3. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

4. Access the application by opening a web browser and navigating to `http://localhost/`

### Cloud Deployment

1. Create a virtual machine on a cloud provider. Ensure it has a public IP address and that HTTP port 80 is open.

2. Connect to the virtual machine via SSH. Install Git, Docker, and Docker Compose if they are not already installed.

3. Clone the repository to the virtual machine:
   ```
   git clone https://github.com/bounswe/bounswe2024group5.git
   cd bounswe2024group5
   ```

4. Change the IP address in `frontend/src/App.tsx` to the public IP address of your virtual machine.

5. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

6. Access the application by opening a web browser and navigating to `http://<VM-IP>/`
