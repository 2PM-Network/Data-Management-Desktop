### Step1

Create a new python environment.

Use `pyinstaller` to compile the `src/py/server.py` file: `pyinstaller --onefile server.py`. Will find a compiled file called `server` in the dist folder. It should be an executable file.

Test the function in the following command:

```python
python server.py <function_name>
```

You can check more configurations in the file `main.ts`:

```typescript
ipcMain.handle(
  'call-python',
  async (event: IpcMainInvokeEvent, methodName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // find the executable file in the same folder.
      const pythonExecutable = path.join(__dirname, 'server');
      execFile(pythonExecutable, [methodName], (error, stdout, stderr) => {
        if (error) {
          console.error('Error executing Python script:', error);
          reject(error);
        } else if (stderr) {
          console.error('Python script returned an error:', stderr);
          reject(stderr);
        } else {
          resolve(stdout.trim());
        }
      });
    });
  },
);
```

### Step2

In components, use `ipcRenderer.invoke` to call the python function defined in `server.py`. Here is a simple example.

```js
const handleClick = async () => {
  try {
    const result = await window.electron.ipcRenderer.invoke(
      'call-python',
      'fhe',
    );
    console.log('Python script output:', result);
  } catch (error) {
    console.error('Error calling Python script:', error);
  }
};
```

### Step3

Use `npm start` to test, and `npm run build` to check the compiled electron app.

Note: Make sure compiled python file (server) and the compiled electron app in the same folder.
