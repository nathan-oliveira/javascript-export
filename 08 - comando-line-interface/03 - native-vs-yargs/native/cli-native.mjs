const [nodePath, filePath, ...commands]  = process.argv;

function parseArguments(commands) {
  const cmd = new Map()
  const commandPrefix = '--';
  for(const key in commands) {
    const index = parseInt(key);
    const command = commands[key];
    if (!command.includes(commandPrefix)) continue;
    cmd.set(command.replace('--', ''), commands[index + 1])
  }
}
console.log(parseArguments(commands))

// node cli-native.mjs --name Nathan --age 25