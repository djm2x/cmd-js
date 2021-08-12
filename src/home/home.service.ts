import { Injectable } from '@nestjs/common';
import { exec, execFile, fork, spawn } from "child_process";
import { resolve } from "path/posix";
import * as path from "path";

@Injectable()
export class HomeService {


    mySpawn(command: string, args: string[]) {
        const execProcess = spawn(command, args);
        return new Promise((res, rej) => {
            execProcess.on('spawn', () => {
                res('spawn on spawn');
            });
            execProcess.stdout.on('data', (data) => {
                res(`spawn stdout: ${data}`);
            });
            execProcess.stderr.on('data', (data) => {
                rej(`spawn on error ${data}`);
            });
            execProcess.on('exit', (code, signal) => {
                res(`spawn on exit code: ${code} signal: ${signal}`);
            });
            execProcess.on('close', (code: number, args: any[]) => {
                res(`spawn on close code: ${code} args: ${args}`);
            });
        });

        // spawnSample('powershell',['node', '-v']);
    }

    childProcessSpawn(args: string[], command = 'powershell') {

        return this.mySpawn(command, args)
    }


    childProcessExec(args: string) {

        return new Promise<any>((res, rej) => {
            exec(args, { 'encoding': 'utf8' }, (error, stdout) => {
                res({out: stdout});
                rej({out: stdout});
            });
        });

        // execSample('node -v');
    }


    childProcessExecFile(command: string, args: string[]) {
        const execProcess = execFile(command, args, { 'encoding': 'utf8' }, (error, stdout) => {
            console.log(`execFile stdout: ${stdout} error: ${error}`);
        });
        console.log('execFile spawn');
        console.log(execProcess.spawnfile);
        execProcess.on('on spawn', () => {
            console.log('execFile on spawn');
        });
        execProcess.on('exit', (code, signal) => {
            console.log(`execFile on exit code: ${code} signal: ${signal}`);
        });
        execProcess.on('error', (err) => {
            console.log(`execFile on error:${err}`);
        });
        execProcess.on('close', (code: number, args: any[]) => {
            console.log(`execFile on close code: ${code} args: ${args}`);
        });

        //execFileSample('powershell', ['node', '-v']);
    }

    childProcessFork() {
        const controller = new AbortController();
        const { signal } = controller;
        const child = fork(path.join(__dirname, 'sample.js'), ['child'], { signal });
        child.on('error', (err: any) => {
            // This will be called with err being an AbortError if the controller aborts
        });
        setTimeout(() => controller.abort(), 5_000);
    }
}
