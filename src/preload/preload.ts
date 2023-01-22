import { ipcRenderer, contextBridge } from 'electron';

console.log('preload.js loaded');

const inputChannels: string[] = ["controller-init", "update-axis"]; // Channels whitelisted for communicating TO MAIN
const outputChannels: string[] = []; // Channels whitelisted for communicating TO RENDERER


contextBridge.exposeInMainWorld(
  'api', {
    electronIpcSend: (channel: string, ...arg: any) => {
      console.log("Channel: " + channel + "; Arg: " + arg);
      ipcRenderer.send(channel, arg);

    },
    electronIpcSendSync: (channel: string, ...arg: any) => {
      if(inputChannels.includes(channel)){
        return ipcRenderer.sendSync(channel, arg);
      }
    },
    electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => {
      if(outputChannels.includes(channel)){
        ipcRenderer.on(channel, listener);
      }
    },
    electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => {
      if(outputChannels.includes(channel)){
        ipcRenderer.once(channel, listener);
      }
    },
    electronIpcRemoveListener:  (channel: string, listener: (event: any, ...arg: any) => void) => {
      if(inputChannels.includes(channel) || outputChannels.includes(channel)){
        ipcRenderer.removeListener(channel, listener);
      }
    },
    electronIpcRemoveAllListeners: (channel: string) => {
      if(inputChannels.includes(channel) || outputChannels.includes(channel)){
        ipcRenderer.removeAllListeners(channel);
      }
    }
  }
);
