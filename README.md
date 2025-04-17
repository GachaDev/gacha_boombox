# gacha_boombox

## Important Notes

- **Database Setup**:  
  You **need to import the SQL file** into your database. This step is crucial for the resource to work properly.
  
- **Using ESX**:  
  If you want to use **ESX** framework, you will need to **uncomment the line** in the `fxmanifest.lua` file that imports ESX. This allows the resource to interact with the ESX framework.

- **Using Items**:  
  - **If the option `useItem` is activated** in the configuration, you need to **create the item in your framework (either in the Config file or in the database)**. Once the item is created, you can use it to create a boombox.
  - **If the option `useItem` is not activated**, you can use the command `/createSpeaker` to create a boombox directly.

- **Need Help?**  
  If you need further assistance, join the community Discord: [https://discord.com/invite/GarJqg77aC](https://discord.com/invite/GarJqg77aC)

---

## Dependencies

- `oxmysql`: This is required to interact with the database.

---

## Getting Started: Running the Resource in Development Mode

### Prerequisites

Before you can run the resource, make sure you have the following installed:

1. **Node.js**:  
   Install Node.js from [here](https://nodejs.org). This will allow you to run the development server and build the project.

2. **MySQL Database**:  
   The resource interacts with a MySQL database. Ensure that you have a working database connection and have imported the provided SQL file into your database.

3. **Framework (Optional)**:  
   If you're using the **ESX framework**, ensure you have it installed and properly configured.

### Running the Resource in **development mode**

To start the resource in **development mode**, follow these steps:

1. Clone or download the project.
2. Navigate to the project folder in your terminal.
3. Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

4. After the dependencies are installed, run the development server with:

   ```bash
   npm run start
   ```

   This will start the resource in development mode and allow you to see live changes as you make edits.

---

## Building the Resource

To **build** the resource (for production or final deployment), use the following steps:

1. Once you’re ready to build, run the following command:

   ```bash
   npm run build
   ```

   This command compiles the resource and prepares it for production use.

---

## Troubleshooting

- If you have problems related to missing dependencies, try running `npm install` again or delete the `node_modules` folder and reinstall the dependencies.
