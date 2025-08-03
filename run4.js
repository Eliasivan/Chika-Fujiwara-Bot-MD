import { spawn } from 'child_process';
console.log('Welcome to your server!\nType your command and send it to your server on "type a command..."')
spawn('bash', [], {
  stdio: ['inherit', 'inherit', 'inherit', 'ipc']
});