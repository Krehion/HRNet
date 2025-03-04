# Instructions

Follow these steps to run the app on your machine:

**1. Navigate to the project folder:**

Make sure you are in the correct directory.

```
cd .\HRNet-React\
```

**2. Install dependencies:**

Before you start, ensure that all necessary dependencies are installed. Run the following command:

```
npm install
```

**3. Install json-server (if not already installed):**

If you don't have `json-server` installed globally, install it by running:

```
npm install -g json-server
```

**4. Launch json-server to access the database:**

In the terminal, run the following command to start the server:

```
json-server --watch db.json --port 3001
```

**5. Open another terminal and start the app:**

In a new terminal window or tab, run the following command to start the app:

```
npm run dev
```
